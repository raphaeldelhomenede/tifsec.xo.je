<?php
// ---------------- CONFIG ----------------
$baseUrl = "https://tifsec.github.io/SNT/index.html";
$options = [
    "http" => ["header" => "User-Agent: Mozilla/5.0\r\n"]
];
$context = stream_context_create($options);

function clean($str) {
    return trim(preg_replace('/\s+/', ' ', $str));
}

// ---------------- SCRAPING ----------------
$html = file_get_contents($baseUrl, false, $context);
if ($html === false) die("Erreur récupération page principale");

libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html);
libxml_clear_errors();
$xpath = new DOMXPath($dom);

if (strpos($_SERVER['REQUEST_URI'], 'index.php') !== false) {
    // Envoie un header 404 et affiche une page d'erreur ou rien
    header("HTTP/1.0 404 Not Found");
    exit;
}

// ---------------- SECTIONS ----------------
$sections = [];
$ids = ["bo","sujetA","sujetB","session0","pratique"];
for ($i=1; $i<=108; $i++) $ids[] = "session".$i;

foreach ($ids as $id) {
    $node = $xpath->query("//*[@id='$id']");
    if ($node->length > 0) {
        $content = $node->item(0);
        $title = $xpath->query(".//h1|.//h2|.//h3", $content);
        $titleText = $title->length > 0 ? clean($title->item(0)->textContent) : ucfirst($id);

        // récupérer les liens internes (PDF, HTML, etc.)
        $links = [];
        foreach ($xpath->query(".//a", $content) as $a) {
            $links[] = [
                "text" => clean($a->textContent),
                "href" => $a->getAttribute("href")
            ];
        }

        $sections[] = [
            "id" => $id,
            "title" => $titleText,
            "content" => clean($content->textContent),
            "links" => $links
        ];
    }
}

// ---------------- CALENDRIER ----------------
$calendar = [];
$rows = $xpath->query("//section[@id='calendar']//table[@class='calendar']/tbody/tr");

foreach ($rows as $row) {
    $cols = $xpath->query("td", $row);
    if ($cols->length === 6) {
        $calendar[] = [
            "mercredi" => ["date" => clean($cols->item(0)->textContent), "cours" => clean($cols->item(1)->textContent)],
            "jeudi"    => ["date" => clean($cols->item(2)->textContent), "cours" => clean($cols->item(3)->textContent)],
            "vendredi" => ["date" => clean($cols->item(4)->textContent), "cours" => clean($cols->item(5)->textContent)],
        ];
    }
}

// Fonction pour convertir les chaînes JS avec simples quotes en JSON valide
function jsArrayToJson($jsArrayString) {
    // Remplacer retours à la ligne par un espace
    $jsArrayString = preg_replace("/\r?\n/", " ", $jsArrayString);

    // Entourer uniquement les clés non-encadrées dans les objets
    $jsArrayString = preg_replace_callback(
        '/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/',
        function ($m) {
            return $m[1] . '"' . $m[2] . '":';
        },
        $jsArrayString
    );

    // Remplacer les simples quotes par des doubles quotes, sans casser le contenu
    $jsArrayString = preg_replace_callback(
        "/'((?:[^'\\\\]|\\\\.)*)'/",
        function ($m) {
            // Ici on récupère le contenu de la chaîne, on remplace les \' par juste '
            $content = str_replace("\\'", "'", $m[1]);
            // On échappe les \ et " pour JSON
            $content = str_replace(['\\', '"'], ['\\\\', '\\"'], $content);
            return '"' . $content . '"';
        },
        $jsArrayString
    );

    // Supprimer les virgules en trop avant les crochets ou accolades fermantes
    $jsArrayString = preg_replace('/,\s*([\]}])/', '$1', $jsArrayString);

    return $jsArrayString;
}

function extractJsVariable($jsCode, $varName) {
    // Regex qui capture la variable quelle que soit la déclaration (const, let, var ou rien)
    // Capture l'objet ou tableau JSON-like qui suit =
    $pattern = '/(?:const|let|var)?\s*' . preg_quote($varName) . '\s*=\s*([\[\{][\s\S]*?[\]\}]);/';

    if (preg_match($pattern, $jsCode, $matches)) {
        return $matches[1];
    }
    return null;
}

function getSessionForDate($date, $sessions) {
    foreach ($sessions as $session) {
        if (isset($session['date']) && $session['date'] === $date) {
            $title = $session['title'] ?? '';
            return cleanSessionTitle($title);
        }
    }
    return 'Séance à définir';
}

function cleanSessionTitle($title) {
    // Enlever les guillemets autour du numéro de séance
    $title = preg_replace('/Séance\s+[\'"]?(\d+)[\'"]?\s*[:：]\s*/ui', 'Séance $1 : ', $title);
    return $title;
}

// Fonctions d'aide pour le calendrier
function isHoliday($date, $holidays) {
    return isset($holidays[$date]);
}

function isInVacation($date, $vacations) {
    foreach ($vacations as $vac) {
        // Vérifier que $vac est bien un tableau avec 'start' et 'end'
        if (is_array($vac) && isset($vac['start'], $vac['end'])) {
            if ($date >= $vac['start'] && $date <= $vac['end']) return true;
        }
    }
    return false;
}

function getVacationName($date, $vacations) {
    foreach ($vacations as $vac) {
        if ($date >= $vac['start'] && $date <= $vac['end']) return $vac['name'];
    }
    return '';
}

function formatFrenchDate($date) {
    $dt = DateTime::createFromFormat('Y-m-d', $date);
    return $dt ? $dt->format('d/m/Y') : $date;
}

function extractJsDate($jsCode, $varName) {
    // On cherche TOUTES les fonctions generateCalendar
    if (preg_match_all('/function\s+generateCalendar\s*\(\)\s*\{([\s\S]*?)\}/', $jsCode, $functionMatches)) {
        $allBodies = $functionMatches[1];
        $lastBody = end($allBodies); // Prend la dernière fonction

        // On cherche startDate ou endDate dans cette dernière
        if (preg_match('/const\s+' . preg_quote($varName) . '\s*=\s*new Date\([\'"]([^\'"]+)[\'"]\);/', $lastBody, $dateMatch)) {
            return $dateMatch[1];
        }
    }
    return null;
}

function extractJsArray($jsCode, $varName) {
    if (preg_match('/const\s+' . preg_quote($varName) . '\s*=\s*(\[[^\]]*\])/', $jsCode, $matches)) {
        $json = str_replace("'", '"', $matches[1]); // JSON valide
        return json_decode($json, true);
    }
    return [];
}

function extractAlternatingDaysFromFunction($jsCode) {
    if (preg_match('/function\s+generateCalendar\s*\(\)\s*\{([\s\S]*?)\}/', $jsCode, $matches)) {
        $body = $matches[1];
        preg_match_all('/let\s+display([A-Z][a-z]+)\s*=\s*true\s*;/', $body, $dayMatches);
        if (!empty($dayMatches[1])) {
            return array_map('strtolower', $dayMatches[1]); // ['thursday', 'friday']
        }
    }
    return [];
}

function dayToShortEnglish($day) {
    return match (strtolower($day)) {
        'monday' => 'mon',
        'tuesday' => 'tue',
        'wednesday' => 'wed',
        'thursday' => 'thu',
        'friday' => 'fri',
        'saturday' => 'sat',
        'sunday' => 'sun',
        default => null,
    };
}

function extraireJour(string $texte): ?string {
    $lignes = explode("\n", $texte);
    $joursTrouves = [];

    foreach ($lignes as $ligne) {
        $ligne = trim($ligne);

        // Ignore les lignes comme "//       //"
        if (preg_match('/^\/\/\s*\/\/\s*$/', $ligne)) {
            continue;
        }

        // Cherche "alternance pour <jour>"
        if (preg_match('/alternance pour\s+(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/i', $ligne, $matches)) {
            $joursTrouves[] = strtolower($matches[1]);
        }
    }

    if (empty($joursTrouves)) {
        return null;
    }

    $jourReference = $joursTrouves[0];

    // Vérifie si tous sont égaux au jour de référence
    $toutesEgales = true;
    foreach ($joursTrouves as $jour) {
        if ($jour !== $jourReference) {
            $toutesEgales = false;
            break;
        }
    }

    if ($toutesEgales) {
        return $jourReference;
    }

    // Sinon cherche un jour différent du premier
    foreach ($joursTrouves as $jour) {
        if ($jour !== $jourReference) {
            return $jour;
        }
    }

    // S'il n'y a pas d'autre jour, retourne le premier (au cas où)
    return $jourReference;
}

// ---------------- SORTIE JSON ----------------
if (isset($_GET['json'])) {
    $html_source = file_get_contents($baseUrl, false, $context);
    if ($html_source === false) die("Erreur récupération page principale");

    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML($html_source);
    libxml_clear_errors();
    $xpath = new DOMXPath($dom);

    // Extraction du code JS
    $scriptNode = $xpath->query("//script[not(@src)]")->item(0);
    $jsCode = $scriptNode ? $scriptNode->textContent : '';

    // Extraction des variables de config
    $startDateStr = extractJsDate($jsCode, 'startDate');
    $endDateStr = extractJsDate($jsCode, 'endDate');
    $holidaysArray = ($raw = extractJsVariable($jsCode, 'holidays')) ? json_decode(jsArrayToJson($raw), true) : [];
    $vacationsArray = ($raw = extractJsVariable($jsCode, 'vacations')) ? json_decode(jsArrayToJson($raw), true) : [];
    $sessionsNames = ($raw = extractJsVariable($jsCode, 'sessions')) ? json_decode(jsArrayToJson($raw), true) : [];

    $seancesDetaillees = [];

    // Boucle pour extraire le HTML de CHAQUE séance
    foreach ($sessionsNames as $index => $title) {
        $sessionId = "session" . ($index + 1);
        $sectionNode = $xpath->query("//section[@id='$sessionId']")->item(0);
        
        $htmlContenu = "";
        if ($sectionNode) {
            // Extraction du HTML interne
            foreach ($sectionNode->childNodes as $child) {
                $htmlContenu .= $dom->saveHTML($child);
            }

            // --- MAGIE DES PDF ---
            // On remplace les liens href="TNSI/cours.pdf" par "?affichage=TNSI/cours.pdf"
            // Et les href="../toto.pdf" par "?affichage=toto.pdf"
            $htmlContenu = preg_replace_callback('/href="([^"]+\.pdf)"/i', function($m) {
                $path = str_replace('../', '', $m[1]); // Nettoyage simple
                return 'href="?affichage=' . urlencode($path) . '"';
            }, $htmlContenu);
        }

        $seancesDetaillees[] = [
            "id" => $sessionId,
            "titre" => cleanSessionTitle($title),
            "html" => trim($htmlContenu)
        ];
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        "config" => [
            "debut" => $startDateStr,
            "fin" => $endDateStr
        ],
        "vacances" => $vacationsArray,
        "jours_feries" => $holidaysArray,
        "liste_seances" => $seancesDetaillees // Contient maintenant ID, Titre et HTML
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

if (isset($_GET['session']) && $_GET['session'] === 'calendar') {
    $url = strtok($_SERVER['REQUEST_URI'], '?'); // URL sans query string
    header('Location: ' . $url);
    exit;
}

$currentSession = $_GET['session'] ?? 'calendar'; // Ne pas redéfinir plus bas
$annee_site = "";
if (preg_match('/<section[^>]*id=["\']site(\d{4}-\d{4})["\'][^>]*>/i', $html, $m)) {
    $annee_site = $m[1];
}

if ($currentSession === "site".$annee_site) {
    // 🔍 Affichage direct d’un site si ?site_snt-<nom> est dans l’URL
    foreach ($_GET as $key => $val) {
        if (str_starts_with($key, 'site_snt-')) {
            $eleve = str_replace('site_snt-', '', $key);
            $baseUrl = "https://tifsec.github.io/SNT/site_snt/{$eleve}/";
            $url = $baseUrl . "index.html";
            $content = @file_get_contents($url);

            if ($content !== false) {
                // Réécriture des liens relatifs dans le HTML
                $content = preg_replace_callback(
                    '/(src|href|action)\s*=\s*["\'](?!https?:|\/\/|#)([^"\']+)["\']/i',
                    function ($matches) use ($baseUrl) {
                        $attr = $matches[1];
                        $path = ltrim($matches[2], '/'); // remove leading slash if any
                        return $attr . '="' . $baseUrl . $path . '"';
                    },
                    $content
                );

                // ✅ Suppression du lien retour ici
                echo $content;
            } else {
                echo "Erreur : le site de « $eleve » est introuvable.";
            }
            exit;
        }
    }
}

if (isset($_GET['affichage'])) {
    $path = rawurldecode($_GET['affichage']);
    $remoteUrl = "https://tifsec.github.io/" . str_replace(' ', '%20', ltrim($path, '/'));

    $content = @file_get_contents($remoteUrl);

    if ($content !== false) {
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        if ($ext === "pdf") {
            header("Content-Type: application/pdf");
            header("Content-Disposition: inline; filename=\"" . basename($path) . "\"");
        }
        echo $content;
        exit;
    } else {
        header("HTTP/1.0 404 Not Found");
        die("Fichier introuvable sur GitHub.");
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta name="description" content="blablabla">
        <meta property="og:title" content="Programme SNT 2nd">
        <meta property="og:description" content="blablabla">
        <meta property="og:type" content="website">
        <meta property="og:url" content="<?= (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']); ?>/">
        <link rel="sitemap" type="application/xml" title="Sitemap" href="<?= (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] ?>/sitemap.xml">
        <link rel="canonical" href="<?= (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']); ?>/">
        <?php
        $headNode = $xpath->query("//head")->item(0);
        if ($headNode) {
            foreach ($headNode->childNodes as $child) {
                echo $dom->saveHTML($child);
            }
        }
        ?>
    </head>
    <body>
        <?php
        // 1. Charger la page distante
        $html = file_get_contents($baseUrl, false, $context);
        if ($html === false) {
            die("Erreur récupération page principale");
        }

        // 2. Charger dans DOMDocument
        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        $dom->loadHTML($html);
        libxml_clear_errors();

        // 3. Créer XPath
        $xpath = new DOMXPath($dom);

        // 4. Afficher le header
        $headerNode = $xpath->query("//header")->item(0);
        if ($headerNode) {
            echo $dom->saveHTML($headerNode);
        } else {
            echo "<p>Header non trouvé</p>";
        }

        // 5. Modifier le menu <aside id="menu">
        $asideNode = $xpath->query("//aside[@id='menu']")->item(0);
        if ($asideNode) {
            $links = $xpath->query(".//a", $asideNode);
            $currentSession = $_GET['session'] ?? 'calendar'; // Initialise ici !

            foreach ($links as $link) {
                $onclick = $link->getAttribute('onclick');
                $sessionName = null;

                if (preg_match("/showSession\('([^']+)'\)/", $onclick, $matches)) {
                    $sessionName = $matches[1];
                }

                if ($link->getAttribute('href') === 'pratique.html') {
                    // On met un paramètre GET spécial
                    $link->setAttribute('href', '?pratique_html');
                    // On enlève onclick si il y en avait
                    $link->removeAttribute('onclick');
                    // Continue la boucle pour passer au lien suivant
                    continue;
                }

                if ($sessionName !== null) {
                    if ($sessionName === 'calendar') {
                        $currentFile = basename($_SERVER['PHP_SELF']);
                        if ($currentFile === "index.php") {
                            $link->setAttribute('href', './'); // Page d'accueil relative
                        } else {
                            $link->setAttribute('href', $_SERVER['PHP_SELF']); // Lien vers la même page sans paramètres
                        }
                        $link->removeAttribute('onclick');
                    } else {
                        $currentFile = basename($_SERVER['PHP_SELF']);
                        if ($currentFile === "index.php") {
                            $link->setAttribute('href', "./?session=" . urlencode($sessionName));
                        } else {
                            $link->setAttribute('href', "?session=" . urlencode($sessionName));
                        }
                    }
                    $link->removeAttribute('onclick');
                }

                $linkClass = $link->getAttribute('class') ?? '';
                $linkClass = preg_replace('/\bactive\b/', '', $linkClass); // Supprimer active
                $linkClass = trim($linkClass);

                if ($sessionName === 'calendar' && $currentSession === 'calendar') {
                    $linkClass = trim($linkClass . ' active');
                } elseif ($sessionName === $currentSession) {
                    $linkClass = trim($linkClass . ' active');
                }
                
                if ($currentSession !== null && $sessionName === $currentSession) {
                    $linkClass = trim($linkClass . ' active');
                }

                if ($linkClass !== '') {
                    $link->setAttribute('class', $linkClass);
                } else {
                    $link->removeAttribute('class');
                }
            }

            echo $dom->saveHTML($asideNode);
        } else {
            echo "<p>Menu non trouvé</p>";
        }?>
        <main id="content">
        <?php // 6. Extraire les données JS dans le <script> inline
        $scriptNode = $xpath->query("//script[not(@src)]")->item(0);
        $jsCode = $scriptNode ? $scriptNode->textContent : '';

        $vacationsJson = '{}'; // Valeur par défaut

        // Extraction holidays
        $holidaysArray = [];
        if ($raw = extractJsVariable($jsCode, 'holidays')) {
            $json = jsArrayToJson($raw);
            $holidaysArray = json_decode($json, true) ?: [];
            if (json_last_error() !== JSON_ERROR_NONE) {
                echo "<p>Erreur JSON holidays : " . json_last_error_msg() . "</p><pre>" . htmlspecialchars($json) . "</pre>";
            }
        } else {
            echo "<p>Aucune donnée holidays trouvée.</p>";
        }

        $vacationsArray = NULL;
        if ($raw = extractJsVariable($jsCode, 'vacations')) {
            $json = jsArrayToJson($raw);
            $vacationsArray = json_decode($json, true) ?: [];
            if (json_last_error() !== JSON_ERROR_NONE) {
                echo "<p>Erreur JSON vacations : " . json_last_error_msg() . "</p><pre>" . htmlspecialchars($json) . "</pre>";
            }
        } else {
            echo "<p>Aucune donnée vacations trouvée.</p>";
        }

        $sessionsArray = [];
        if ($raw = extractJsVariable($jsCode, 'sessions')) {
            $json = jsArrayToJson($raw);
            $sessionsArray = json_decode($json, true) ?: [];
            if (json_last_error() !== JSON_ERROR_NONE) {
                echo "<p>Erreur JSON sessions : " . json_last_error_msg() . "</p><pre>" . htmlspecialchars($json) . "</pre>";
            }

            // Nettoyage ici
            foreach ($sessionsArray as &$s) {
                if (isset($s['title'])) {
                    $s['title'] = cleanSessionTitle($s['title']);
                }
            }
        } else {
            echo "<p>Aucune donnée sessions trouvée.</p>";
        }

        // 7. Afficher le calendrier si session=calendar
        $currentSession = $_GET['session'] ?? 'calendar'; // Ne pas redéfinir plus bas

        if ($currentSession === 'calendar') { ?>
            <section id="calendar" class="content-section active"> 
            <?php
            $tbodyNode = $xpath->query("//section[@id='calendar']//h2")->item(0);
            if ($tbodyNode) {
                echo $dom->saveHTML($tbodyNode);
            } else {
                echo "<p>tbody #calendar-body non trouvé.</p>";
            }
            ?>
            <table class="calendar">
            <?php
            $tbodyNode = $xpath->query("//section[@id='calendar']//table[contains(@class,'calendar')]//thead")->item(0);
            if ($tbodyNode) {
                echo $dom->saveHTML($tbodyNode);
            } else {
                echo "<p>thead #calendar-body non trouvé.</p>";
            }

            $joursCours = [];
            $joursTrouvés = [];

            $theadRow = $xpath->query("//section[@id='calendar']//table[@class='calendar']//thead//tr")->item(0);
            if ($theadRow) {
                $validDays = ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
                $ths = $theadRow->getElementsByTagName('th');

                foreach ($ths as $th) {
                    $text = mb_strtolower(trim($th->textContent));

                    foreach ($validDays as $day) {
                        if (str_contains($text, $day) && !in_array($day, $joursTrouvés)) {
                            // Ajoute le jour UNE SEULE FOIS
                            $joursTrouvés[] = $day;

                            $joursCours[] = match ($day) {
                                'lundi' => 'Mon',
                                'mardi' => 'Tue',
                                'mercredi' => 'Wed',
                                'jeudi' => 'Thu',
                                'vendredi' => 'Fri',
                                'samedi' => 'Sat',
                                'dimanche' => 'Sun',
                            };
                            break;
                        }
                    }
                }
            }

            if (empty($joursCours)) {
                echo "<p>Impossible d'extraire les jours de cours. Valeur par défaut utilisée.</p>";
                $joursCours = ['Thu', 'Fri', 'Sat'];
            }
            ?>
            <tbody>
            <?php
            $jsCode = file_get_contents($baseUrl);

            if ($jsCode === false) {
                die("Erreur lors de la récupération du contenu du site distant.");
            }

            $startDateStr = extractJsDate($jsCode, 'startDate');
            $endDateStr = extractJsDate($jsCode, 'endDate');

            if (!$startDateStr || !$endDateStr) {
                die("Impossible d'extraire les dates de début ou fin du calendrier.");
            }

            $start = new DateTime($startDateStr);
            $end = new DateTime($endDateStr);

            $jourAlterne = extraireJour($jsCode);
            //echo $jourAlterne;

            // Convertir en format abrégé anglais compatible avec DateTime->modify (mon, tue, wed, etc.)
            $joursFrancaisToShort = [
                'lundi' => 'mon',
                'mardi' => 'tue',
                'mercredi' => 'wed',
                'jeudi' => 'thu',
                'vendredi' => 'fri',
                'samedi' => 'sat',
                'dimanche' => 'sun',
            ];

            // Par exemple, on veut masquer le jour alterné les semaines paires
            $masquerJourAlternanceSemainePaire = true; // true = on masque le jour alterné en semaines paires, false = on masque en semaines impaires

            // Préparer les jours de cours extraits, déjà en abrégé anglais (exemple : ['mon', 'tue', 'wed'])
            $joursCours = array_map('strtolower', $joursCours); // $joursCours doit être initialisé avant

            // Assurer que la date de départ est un lundi (début de semaine ISO 8601)
            $start->modify('monday this week');
            $current = clone $start;
            $sessionIndex = 0;

            date_default_timezone_set('Europe/Paris');
            $today = (new DateTime())->format('Y-m-d-H-i-s');
            ?><!-- <?= $today ?> --><?php
            while ($current <= $end) {
                $row = '';
                $ligneEstVacances = true;

                $weekNumber = (int) $current->format("W");
                $semainePaire = $weekNumber % 2 === 0;

                foreach ($joursCours as $jour) {
                    // Trouver le jour français complet correspondant
                    $jourFrancaisComplet = array_search($jour, $joursFrancaisToShort);

                    // Date du jour actuel dans la semaine
                    $jourDate = (clone $current)->modify($jour . ' this week');
                    $jourStr = $jourDate->format('Y-m-d');

                    // Par défaut pas de classe CSS
                    $class = '';

                    // Vérifier si ce jour doit être masqué selon alternance
                    if (
                        strtolower($jourFrancaisComplet) === strtolower($jourAlterne) &&
                        (
                            ($masquerJourAlternanceSemainePaire && $semainePaire) ||
                            (!$masquerJourAlternanceSemainePaire && !$semainePaire)
                        )
                    ) {
                        // Case vide (pas de cours ce jour)
                        $row .= "<td></td><td></td>";
                        $ligneEstVacances = true;
                        continue;
                    }

                    // Si la date dépasse la fin de la période, case vide aussi
                    if ($jourDate > $end) {
                        $row .= "<td></td><td></td>";
                        continue;
                    }

                    // Si c'est aujourd'hui, on ajoute la classe today
                    if ($jourStr === substr($today, 0, 10)) {
                        $class = 'today ';
                        $today2025 .= " id=\"today2025\"";
                    }

                    // Gestion jours fériés
                    if (isHoliday($jourStr, $holidaysArray)) {
                        $class = 'holiday';
                        if ($jourStr !== substr($today, 0, 10)) {
                        	$today2025 = "";
                        }
                        $row .= "<td class='$class'$today2025>" . formatFrenchDate($jourStr) . "</td>";
                        $row .= "<td class='$class'>" . htmlspecialchars($holidaysArray[$jourStr]) . "</td>";
                        $ligneEstVacances = false;
                    }
                    // Gestion vacances scolaires
                    elseif (isInVacation($jourStr, $vacationsArray)) {
                        if ($jourStr !== substr($today, 0, 10)) {
                            $class .= 'vacation';
                            $today2025 = "";
                        }
                        $row .= "<td class='$class'$today2025>" . formatFrenchDate($jourStr) . "</td>";
                        $row .= "<td class='$class'>" . htmlspecialchars(getVacationName($jourStr, $vacationsArray)) . "</td>";
                        $ligneEstVacances = true;
                    }
                    // Sinon jour normal de cours
                    else {
                        $session = $sessionsArray[$sessionIndex] ?? '';
                        $sessionId = $session ? 'session' . ($sessionIndex + 1) : 'adefinir';
                        if ($jourStr !== substr($today, 0, 10)) {
                            $today2025 = "";
                        }
                        $row .= "<td class='$class'$today2025>" . formatFrenchDate($jourStr) . "</td>";
                        $row .= "<td class='$class'><a href='?session=$sessionId'>" . htmlspecialchars($session) . "</a></td>";
                        $sessionIndex++;
                        $ligneEstVacances = false;
                    }
                }

                $classeTr = $ligneEstVacances ? ' class="vacation"' : '';
                echo "<tr$classeTr>$row</tr>";

                $current->modify('+7 days');
            }

            echo '</tbody></table>';
        } elseif ((preg_match('/^session(\d+)$/', $currentSession, $matches) && intval($matches[1]) >= 1 && intval($matches[1]) <= 108) 
            || $currentSession === 'adefinir') {            

            $sessionId = htmlspecialchars($currentSession);
            $sectionNode = $xpath->query("//section[@id='$sessionId']")->item(0);

            if ($sectionNode) {
                // Ajouter la classe "active" à la section
                $existingClass = $sectionNode->getAttribute('class');
                $updatedClass = trim($existingClass . ' active');
                $sectionNode->setAttribute('class', $updatedClass);

                // Récupérer l'attribut style
                $existingStyle = $sectionNode->getAttribute('style');

                // Supprimer "visibility: hidden" s'il est présent
                $updatedStyle = preg_replace('/visibility\s*:\s*hidden\s*;?/i', '', $existingStyle);

                // Nettoyer les éventuels espaces/points-virgules en trop
                $updatedStyle = trim(preg_replace('/\s*;\s*$/', '', $updatedStyle)); // retire le dernier point-virgule si seul

                // Réappliquer le style mis à jour
                $sectionNode->setAttribute('style', $updatedStyle);

                // Afficher la section modifiée
                echo $dom->saveHTML($sectionNode);
            }
        } elseif ($currentSession === "bo" || $currentSession === "site".$annee_site || $currentSession === "Codenames" || $currentSession === "session0") {
            $sessionId = htmlspecialchars($currentSession);
            $sectionNode = $xpath->query("//section[@id='$sessionId']")->item(0);

            if ($sectionNode) {
                // Ajouter la classe "active" à la section
                $existingClass = $sectionNode->getAttribute('class');
                $updatedClass = trim($existingClass . ' active');
                $sectionNode->setAttribute('class', $updatedClass);

                // Trouver l'iframe dans la section et modifier son src
                $iframeNode = $xpath->query(".//iframe", $sectionNode)->item(0);
                if ($iframeNode) {
                    // Récupérer le nom du PDF actuel (ex: "spe247_annexe_1158933.pdf")
                    $currentSrc = $iframeNode->getAttribute('src');

                    // Extraire le nom de fichier (sans le chemin)
                    $pdfFile = basename($currentSrc);

                    if ($currentSession === "site" . $annee_site) {
                        // 🧱 Traitement de la section normale
                        $sessionId = htmlspecialchars($currentSession);
                        $sectionNode = $xpath->query("//section[@id='$sessionId']")->item(0);

                        if ($sectionNode) {
                            // Ajouter la classe "active"
                            $existingClass = $sectionNode->getAttribute('class');
                            $updatedClass = trim($existingClass . ' active');
                            $sectionNode->setAttribute('class', $updatedClass);

                            // 🌍 Domaine actuel de ton site
                            $protocole = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
                            $host = $_SERVER['HTTP_HOST'];
                            $baseLocalUrl = $protocole . '://' . $host . dirname($_SERVER['SCRIPT_NAME']) . '/';

                            // 🎯 Modifier les <iframe>
                            foreach ($xpath->query(".//iframe[contains(@class, 'show-site')]", $sectionNode) as $iframe) {
                                $src = $iframe->getAttribute('src');

                                // Extraire le nom du dossier (ex: "chloe_et_elsa") depuis le src GitHub
                                if ($src && preg_match('#site_snt/([^/]+)/#', $src, $matches)) {
                                    $eleve = $matches[1];
                                    // Nouveau lien local
                                    $newSrc = $baseLocalUrl . "?session=site" . $annee_site . "&site_snt-" . $eleve;
                                    $iframe->setAttribute('src', $newSrc);
                                }
                            }

                            // 🎯 Modifier les <a>
                            foreach ($xpath->query(".//a[contains(@class, 'show-site-clic')]", $sectionNode) as $link) {
                                $href = $link->getAttribute('href');

                                if ($href && preg_match('#site_snt/([^/]+)/#', $href, $matches)) {
                                    $eleve = $matches[1];
                                    $newHref = "?session=site" . $annee_site . "&site_snt-" . $eleve;
                                    $link->setAttribute('href', $newHref);
                                }
                            }

                            echo $dom->saveHTML($sectionNode);
                        }
                        exit;
                    }
                    
                    if ($currentSession === "session0") {
                        $newSrc = "?affichage=" . urlencode($pdfFile);
                        $iframeNode->setAttribute('src', $newSrc);
                    } else {
                        $iframeNode->setAttribute('src', str_replace("index.html", "", $baseUrl) . $pdfFile);
                    }
                }

                echo $dom->saveHTML($sectionNode);
            }
        } elseif ($currentSession === "seancetoday") {
			
            // Charger le fichier HTML local (./)
            $url_de_ce_site = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") 
                  . "://" . $_SERVER['HTTP_HOST'] 
                  . dirname($_SERVER['SCRIPT_NAME']);
            $html = file_get_contents($url_de_ce_site);

            // Charger dans DOMDocument
            $dom = new DOMDocument();
            @$dom->loadHTML($html); // @ pour ignorer les warnings HTML mal formé

            $xpath = new DOMXPath($dom);

            // Récupérer toutes les td avec la classe "today"
            $todayCells = $xpath->query('//td[contains(@class,"today")]');

            if ($todayCells->length > 0) {
                foreach ($todayCells as $cell) {

                    // Vérifier s'il y a un lien <a>
                    $links = $xpath->query('.//a', $cell);
                    if ($links->length > 0) {
                        // Prendre le premier lien (ou boucle si plusieurs)
                        $href = $links->item(0)->getAttribute('href');
                    } else {
                        // Pas de lien → vérifier si vacances
                        $vacationSpan = $xpath->query('.//span[contains(@class,"vacation-label")]', $cell);
                        if ($vacationSpan->length > 0) {
                            $href = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME'])."#today2025";
                        } else {
                            $href = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME'])."#today2025";
                        }
                    }
                }
            } else {
                $href = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']);
            }
            echo "<meta http-equiv=\"refresh\" content=\"0; URL=$href\" />";
            exit;
        }
        ?>
        </main>
    </body>
</html>