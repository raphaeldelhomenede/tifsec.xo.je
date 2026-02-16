<?php
// ---------------- CONFIG ----------------
$baseUrl = "https://tifsec.github.io/TNSI/index.html";
$options = [
    "http" => ["header" => "User-Agent: Mozilla/5.0\r\n"]
];
$context = stream_context_create($options);

function clean($str) {
    return trim(preg_replace('/\s+/', ' ', $str));
}

// ---------------- FONCTIONS DE PARSING JS ----------------
function jsArrayToJson($jsArrayString) {
    $jsArrayString = preg_replace("/\r?\n/", " ", $jsArrayString);
    $jsArrayString = preg_replace_callback('/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/', function ($m) {
        return $m[1] . '"' . $m[2] . '":';
    }, $jsArrayString);
    $jsArrayString = preg_replace_callback("/'((?:[^'\\\\]|\\\\.)*)'/", function ($m) {
        $content = str_replace("\\'", "'", $m[1]);
        $content = str_replace(['\\', '"'], ['\\\\', '\\"'], $content);
        return '"' . $content . '"';
    }, $jsArrayString);
    $jsArrayString = preg_replace('/,\s*([\]}])/', '$1', $jsArrayString);
    return $jsArrayString;
}

function extractJsVariable($jsCode, $varName) {
    $pattern = '/(?:const|let|var)?\s*' . preg_quote($varName) . '\s*=\s*([\[\{][\s\S]*?[\]\}]);/';
    if (preg_match($pattern, $jsCode, $matches)) return $matches[1];
    return null;
}

function extractJsDate($jsCode, $varName) {
    if (preg_match('/const\s+' . preg_quote($varName) . '\s*=\s*new Date\([\'"]([^\'"]+)[\'"]\);/', $jsCode, $matches)) {
        return $matches[1];
    }
    return null;
}

function cleanSessionTitle($title) {
    return preg_replace('/Séance\s+[\'"]?(\d+)[\'"]?\s*[:：]\s*/ui', 'Séance $1 : ', $title);
}

function formatFrenchDate($date) {
    $dt = DateTime::createFromFormat('Y-m-d', $date);
    return $dt ? $dt->format('d/m/Y') : $date;
}

function isHoliday($date, $holidays) { return isset($holidays[$date]); }

function isInVacation($date, $vacations) {
    foreach ($vacations as $vac) {
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

// ---------------- CHARGEMENT INITIAL ----------------
$html_source = @file_get_contents($baseUrl, false, $context);
if ($html_source === false) die("Erreur récupération page distante.");

libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html_source);
libxml_clear_errors();
$xpath = new DOMXPath($dom);

// Extraction des données JS pour usage PHP
$scriptNode = $xpath->query("//script[not(@src)]")->item(0);
$jsCode = $scriptNode ? $scriptNode->textContent : '';

$startDateStr = extractJsDate($jsCode, 'startDate');
$endDateStr = extractJsDate($jsCode, 'endDate');
$holidaysArray = ($raw = extractJsVariable($jsCode, 'holidays')) ? json_decode(jsArrayToJson($raw), true) : [];
$vacationsArray = ($raw = extractJsVariable($jsCode, 'vacations')) ? json_decode(jsArrayToJson($raw), true) : [];
$sessionsArray = ($raw = extractJsVariable($jsCode, 'sessions')) ? json_decode(jsArrayToJson($raw), true) : [];

// ---------------- LOGIQUE DE ROUTE ----------------

// 1. JSON API
if (isset($_GET['json'])) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(["vacances" => $vacationsArray, "jours_feries" => $holidaysArray, "sessions" => $sessionsArray], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. PROXY PDF / IMAGES
if (isset($_GET['affichage'])) {
    $file = str_replace(['../', '..\\'], '', $_GET['affichage']);
    $parts = explode('/', $file);
    $encodedPath = implode('/', array_map('rawurlencode', $parts));
    $remoteUrl = "https://tifsec.github.io/" . $encodedPath;
    $content = @file_get_contents($remoteUrl, false, $context);
    if ($content) {
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $type = ($ext === 'pdf') ? 'application/pdf' : 'image/' . $ext;
        header("Content-Type: $type");
        echo $content;
    } else {
        die("Fichier introuvable.");
    }
    exit;
}

// 3. PAGE PRATIQUE
if (isset($_GET['pratique_html'])) {
    $url = "https://tifsec.github.io/TNSI/pratique.html";
    $html = @file_get_contents($url);
    echo preg_replace('/src="([^"]+)"/i', 'src="?affichage=TNSI/$1"', $html);
    exit;
}

// 4. SEANCE DU JOUR (CORRIGÉ : Pas d'appel réseau local)
if (isset($_GET['session']) && $_GET['session'] === "seancetoday") {
    date_default_timezone_set('Europe/Paris');
    $todayStr = date('Y-m-d');
    
    $start = new DateTime($startDateStr);
    $end = new DateTime($endDateStr);
    $current = clone $start;
    $sessionIndex = 0;
    $target = "";
    $joursCours = ['Wed', 'Thu', 'Fri']; // À ajuster selon ton emploi du temps réel

    while ($current <= $end) {
        $d = $current->format('Y-m-d');
        if (in_array($current->format('D'), $joursCours)) {
            if (!isHoliday($d, $holidaysArray) && !isInVacation($d, $vacationsArray)) {
                $sessionIndex++;
                if ($d === $todayStr) { $target = "session$sessionIndex"; break; }
            }
        }
        if ($d > $todayStr) break;
        $current->modify('+1 day');
    }
    header("Location: ./" . ($target ? "?session=$target" : ""));
    exit;
}

// ---------------- RENDU HTML ----------------
$currentSession = $_GET['session'] ?? 'calendar';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Programme NSI</title>
    <?php 
    $head = $xpath->query("//head")->item(0);
    if ($head) {
        foreach ($head->childNodes as $c) {
            $html = $dom->saveHTML($c);
            // On s'assure que les CSS/JS distants pointent au bon endroit
            echo str_replace('href="style.css"', 'href="https://tifsec.github.io/TNSI/style.css"', $html);
        }
    }
    ?>
</head>
<body>
    <?php
    // Header
    $header = $xpath->query("//header")->item(0);
    if ($header) echo $dom->saveHTML($header);

    // Menu (Aside)
    $aside = $xpath->query("//aside[@id='menu']")->item(0);
    if ($aside) {
        foreach ($xpath->query(".//a", $aside) as $l) {
            $href = $l->getAttribute('href');
            $onclick = $l->getAttribute('onclick');
            
            if ($href === 'pratique.html') {
                $l->setAttribute('href', '?pratique_html');
            } elseif (preg_match("/showSession\('([^']+)'\)/", $onclick, $m)) {
                $l->setAttribute('href', ($m[1] === 'calendar') ? './' : "?session=".$m[1]);
            } elseif (strpos($href, '.pdf') !== false) {
                $l->setAttribute('href', '?affichage='.urlencode(str_replace('../', '', $href)));
            }
            $l->removeAttribute('onclick');
        }
        echo $dom->saveHTML($aside);
    }
    ?>

    <main id="content">
        <?php if ($currentSession === 'calendar'): ?>
            <section id="calendar" class="content-section active">
                <h2>Calendrier des séances</h2>
                <table class="calendar">
                    <thead><tr><th>Mercredi</th><th>Séance</th><th>Jeudi</th><th>Séance</th><th>Vendredi</th><th>Séance</th></tr></thead>
                    <tbody>
                    <?php
                    $start = new DateTime($startDateStr);
                    $end = new DateTime($endDateStr);
                    $current = clone $start;
                    $idx = 0;
                    $jours = ['Wed', 'Thu', 'Fri'];
                    $today = date('Y-m-d');

                    while ($current <= $end) {
                        echo "<tr>";
                        for ($i=0; $i<3; $i++) {
                            while ($current <= $end && !in_array($current->format('D'), $jours)) $current->modify('+1 day');
                            if ($current > $end) { echo "<td></td><td></td>"; continue; }
                            
                            $dStr = $current->format('Y-m-d');
                            $class = ($dStr === $today) ? 'today' : '';
                            echo "<td class='$class'>".formatFrenchDate($dStr)."</td>";
                            
                            if (isHoliday($dStr, $holidaysArray)) echo "<td class='holiday'>".$holidaysArray[$dStr]."</td>";
                            elseif (isInVacation($dStr, $vacationsArray)) echo "<td class='vacation'>".getVacationName($dStr, $vacationsArray)."</td>";
                            else {
                                $idx++;
                                $title = isset($sessionsArray[$idx-1]) ? cleanSessionTitle($sessionsArray[$idx-1]) : "Séance $idx";
                                echo "<td><a href='?session=session$idx'>$title</a></td>";
                            }
                            $current->modify('+1 day');
                        }
                        echo "</tr>";
                    }
                    ?>
                    </tbody>
                </table>
            </section>
        <?php else: ?>
            <?php
            $section = $xpath->query("//section[@id='".htmlspecialchars($currentSession)."']")->item(0);
            if ($section) {
                $html = $dom->saveHTML($section);
                // Correction des liens PDF dans le contenu
                $html = preg_replace('/href="([^"]+\.pdf)"/i', 'href="?affichage=$1"', $html);
                echo str_replace('content-section', 'content-section active', $html);
            }
            ?>
        <?php endif; ?>
    </main>
</body>
</html>
