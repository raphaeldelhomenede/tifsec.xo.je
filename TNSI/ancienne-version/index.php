<?php
$seances_data3 = json_decode(file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances.json'), true);
$sessions = $seances_data3[6][3][0][0][1];

/*if ((!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on')) { ?>
    <meta http-equiv="refresh" content="0; URL=https://<?= $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ?>" />
    <?php exit;
}*/

if (strpos($_SERVER['REQUEST_URI'], 'index.php') !== false) {
    // Envoie un header 404 et affiche une page d'erreur ou rien
    header("HTTP/1.0 404 Not Found");
    exit;
}

$session_actuelle = $_GET['session'] ?? '';
if (
    $_SERVER['HTTP_HOST'] === 'tifsec-nsi.rf.gd' && $session_actuelle === 'calendar' && $_SERVER['REQUEST_URI'] !== '/TNSI') { ?>
        <meta http-equiv="refresh" content="0; URL=../TNSI" /><?php
        exit;
}

$sessions = array_merge($sessions, [
    // 'programme1' => 'Programme potentiel Jeux vidéos',
    // 'programme2' => 'Programme potentiel Application de gestion de budget',
    // 'programme3' => 'Programme potentiel Application de gestion de mangas',
    // 'programme4' => 'Programme potentiel Site Web',
]);

$sessions1 = $seances_data3[5];

$timezones = DateTimeZone::listIdentifiers();

$timezone = isset($_GET['time1']) ? $_GET['time1'] : 'Europe/Paris';

if (!in_array($timezone, $timezones)) {
    $timezone = 'Europe/Paris';
}

date_default_timezone_set($timezone);

$today11 = date("d/m/Y H:i:s");
$today11dmy = date("d/m/Y");

$session_actuelle = $_GET['session'] ?? 'calendar';
$session_titre = $sessions1[$session_actuelle] ?? '';
$seances = [];
function ajouter_evenements(&$liste, $donnees, $titre, $classe = 'vacation') {
    foreach ($donnees as $date) {$liste[] = ['date' => $date, 'titre' => $titre, 'class' => $classe, 'id' => 'calendar'];}
}
foreach ([[$seances_data3[3][0], "Vacances de la Toussaint"],[$seances_data3[3][1][0], "Noël", "holiday"],[$seances_data3[3][1][1], "Vacances de Noël"],[$seances_data3[3][1][2], "Jour de l'An", "holiday"],[$seances_data3[3][1][3], "Vacances de Noël"],[$seances_data3[3][2], "Vacances d'hiver"],[$seances_data3[3][3][0], "Vacances de printemps"],[$seances_data3[3][3][1], "Fête du Travail", "holiday"],[$seances_data3[3][3][2], "Vacances de printemps"],[$seances_data3[3][4], "Vacances d'été"]] as $vacance) {ajouter_evenements($seances, $vacance[0], $vacance[1], $vacance[2] ?? 'vacation');}
$seances = array_merge($seances, ...array_map(fn($i) => $seances_data3[$i], [0, 1, 2, 4]));
$seances = array_merge($seances, $seances_data3[6][3][0][0][3]);
$seances = array_merge($seances, array_map(fn($item) => ['date'  => $item[0],'titre' => $item[1],'id'    => $item[2],'class' => $item[3] ?? null], []));
usort($seances, fn($a, $b) => DateTime::createFromFormat('d/m/Y', $a['date']) <=> DateTime::createFromFormat('d/m/Y', $b['date']));
$seanceCount = count($seances);
if (isset($_GET["session"]) && $_GET["session"] === "f.php") {
    if (isset($_GET['fichier'])) {
        $fichier = $_GET['fichier'];

        $json_path = 'https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/download1.json';
        $fichiers_autorises = [];

        // CORRECTION ICI
        $contenu_json = @file_get_contents($json_path);
        if ($contenu_json !== false) {
            $fichiers_autorises = json_decode($contenu_json, true);
        }

        if (in_array($fichier, $fichiers_autorises, true)) {
            $base_url = 'https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/pratique/html/consignes/sujets/2025-NSI/';
            $url_fichier = $base_url . $fichier;

            $contenu = @file_get_contents($url_fichier);

            if ($contenu === false) {
                http_response_code(404); ?>
                <head>
                <meta http-equiv="refresh" content="0;url=https://tifsec.github.io/TNSI/?session=f.php&fichier=<?= htmlspecialchars($fichier, ENT_QUOTES, 'UTF-8') ?>">
                </head>
                <?php exit;
            }

            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($fichier) . '"');
            header('Content-Length: ' . strlen($contenu));

            echo $contenu;
            exit;
        } else {
            http_response_code(403); ?>
            <head>
                <meta http-equiv="refresh" content="0;url=https://tifsec.github.io/TNSI/?session=f.php&fichier=<?= htmlspecialchars($fichier, ENT_QUOTES, 'UTF-8') ?>">
            </head>
            <?php exit;
        }
    } elseif (isset($_GET['fonts1'])) {
        $fichier = $_GET['fonts1'];

        if (in_array($fichier, ['BakaTaida.ttf', 'yunranofont.ttf'], true)) {
            $base_url = 'https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/fonts/';
            $url_finale = $base_url . $fichier;
            $context = stream_context_create($options);
            $contenu = @file_get_contents($url_finale, false, $context);

            if ($contenu === false) {
                http_response_code(404); ?>
                <head>
                    <meta http-equiv="refresh" content="0;url=https://tifsec.github.io/TNSI/?session=f.php&fichier=<?= htmlspecialchars($fichier, ENT_QUOTES, 'UTF-8') ?>">
                    <title>Fichier non trouvé</title>
                </head>
                <?php exit;
            }

            // Envoyer le fichier au client
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($fichier) . '"');
            header('Content-Length: ' . strlen($contenu));
            echo $contenu;
            exit;
        } else {
            http_response_code(403); ?>
            <head>
                <meta http-equiv="refresh" content="0;url=https://tifsec.github.io/TNSI/?session=f.php&fichier=<?= htmlspecialchars($fichier, ENT_QUOTES, 'UTF-8') ?>">
                <title>Accès interdit</title>
            </head>
            <?php exit;
        }
    } else {
        echo '<script>console.log("Paramètre \'fichier\' ou \'fonts1\' manquant.");</script>';
    }
}
if (isset($_GET["session"]) && $_GET["session"] == 'revision') {
    //<a href="https://www.annabac.com/terminale-generale/numerique-et-sciences-informatiques-nsi" target="_blank" rel="noopener noreferrer">C'est ici pour réviser</a>
    ?><meta http-equiv="refresh" content="0; URL=<?= 'https://www.annabac.com/terminale-generale/numerique-et-sciences-informatiques-nsi' ?>" /><?php
    exit;
}
if (($session_actuelle === "gtn.php" || $session_actuelle === "yoyo")) {}
if (($session_actuelle === "gtn.php.com.br")) {
    $code_php = file_get_contents("https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/gtn.php.com/ajax1.php");
    if ($code_php === false) {die("Impossible de récupérer le fichier.");}
    eval('?>' . $code_php);
}
if ($session_actuelle === "pratique/sujet") {
    $code_php = file_get_contents("http://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/pratique/sujet/file.php");
    if ($code_php === false) {die("Impossible de récupérer le fichier.");}
    eval('?>' . $code_php);
}
if (isset($_GET['time_is1'])) {
    date_default_timezone_set('Europe/Paris');
    if (isset($_GET['dmY'])) {echo $today11;exit;}
    exit;
}

if (isset($_GET["logo_qui_fait_fuir_toutes_les_jolies_filles"])) {

    // URL du fichier .ico sur GitHub
    $fichier = "https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/ico/logo_qui_fait_fuir_toutes_les_jolies_filles.png";

    // Récupère le contenu binaire du fichier
    $data = @file_get_contents($fichier);

    if ($data !== false) {
        // Envoie les headers pour un vrai fichier .ico
        header("Content-Type: image/x-icon");
        header("Content-Disposition: inline; filename=\"logo_qui_fait_fuir_toutes_les_jolies_filles\"");
        header("Content-Length: " . strlen($data));
        echo $data;
        exit;
    }

    // Si le fichier n’existe pas ou n’a pas pu être récupéré
    header("HTTP/1.1 404 Not Found");
    exit("Icon not found");
}
?>
<?php function afficherFaviconUmbroSVG() { ?><link rel="icon" type="image/svg+xml" href="?logo_qui_fait_fuir_toutes_les_jolies_filles"><?php } ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php afficherFaviconUmbroSVG(); ?>
    <meta name="description" content="Ce site est illégal donc utiliser tor comme navigateur pour se protéger. Ceci est le message du ministère des affaires illégales et le ministère de la sante, de la sécurité, de l'intérieur, du numérique, de l'extérieur, de l'économie, de l'Intelligence Artificielle, des sports, de Rafael Nadal.">
    <title>Programme NSI Tle</title>
    <?php
    function lien_absolu1271($params = '') {
        $host = $_SERVER['HTTP_HOST'];
        $script = $_SERVER['SCRIPT_NAME'];
        $dir = rtrim(dirname($script), '/\\');
        $base = "//" . $host . ($dir === '/' ? '' : $dir) . '/'; // On commence par //
        return $base . $params;
    }
    ?>
    <link rel="stylesheet" href="<?= lien_absolu1271('?session=gtn.php.com.br&index_css') ?>">
    <?php
    $fonts1 = json_decode(file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/index-data.json'), true);
    $font1 = isset($_GET['font']) ? $_GET['font'] : 'default';
    /*$cssLink1 = isset($fonts1[$font1]) ? $fonts1[$font1]['linkcss'] : $fonts1['default']['linkcss'];
    $cssContent = @file_get_contents($cssLink1);
    if ($cssContent !== false): ?>
        <style>
            <?php echo $cssContent; ?>
        </style>
    <?php endif;*/ ?>
    <?php
    if (isset($_GET['background']) && (!isset($_GET['session']) || $_GET['session'] !== 'Background')) { ?>
     <meta http-equiv="refresh" content="0; URL=<?= '?session=Background&background=' . urlencode($_GET["background"]) ?>" /><?php
        exit();
    }
    ?>
</head>
<body>
    <header>
        <h1>Programme NSI Tle</h1>
    </header>
    
    <aside>
        <button class="hamburger" onclick="toggleMenu()">☰ Menu</button>
        <nav id="session-nav">
            <ul>
                <?php foreach ($sessions as $key5522 => $title) : ?>
                    <li>
                        <?php if ($key5522 === 'pratique.html') : ?>
                            <?php
                            $json_url = 'https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/session=pratique.html.json';
                            $sessions_autorisees = [];

                            $contenu_json = @file_get_contents($json_url);
                            if ($contenu_json !== false) {
                                $sessions_autorisees = json_decode($contenu_json, true);
                            }
                            ?>
                            <a href="?session=pratique.html"
                            class="session-link <?= (in_array($session_actuelle, $sessions_autorisees, true) || str_starts_with($session_actuelle, 'pratique/sujet')) ? 'active' : '' ?>"
                            id="session-linkiegRLyCCDtc"
                            data-link-one="?session=pratique.html"
                            data-link-two="?session=pratique/Sujet"
                            data-link-three="?session=pratique/chatGPT.com"
                            data-link-download-four="?session=download">
                            <?= $title ?>
                            </a>
                            <script>
                                <?php echo file_get_contents("https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/cours_annabac_NSI/cours_en_video/iegRLyCCDtc.js"); ?>
                            </script>
                        <?php elseif ($key5522 === 'revision') : ?>
                            <a href="?session=revision" class="session-link <?= ($session_actuelle === 'revision' || $session_actuelle === 'cours_annabac_NSI') ? 'active' : '' ?>" id="session-linkwgRRCIKHSfI" data-link-one="?session=revision" data-link-two="?session=cours_annabac_NSI"><?= $title ?></a>
                            <script><?php echo file_get_contents("https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/cours_annabac_NSI/cours_en_video/wgRRCIKHSfI.js"); ?></script>
                        <?php elseif ($key5522 === 'sujetB') : ?>
                            <a href="?session=sujetB" class="session-link <?= ($session_actuelle === 'sujetB' || $session_actuelle === 'sujet_bac_18_juin_2025') ? 'active' : '' ?>" id="session-linkbV8wsz2KJxc" data-link-one="?session=sujetB" data-link-two="?session=sujet_bac_18_juin_2025"><?= $title ?></a>
                            <?php // echo file_get_contents("https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/cours_annabac_NSI/cours_en_video/bV8wsz2KJxc.js"); ?>
                        <?php else: ?>
                            <a href="<?php 
                                if ($_SERVER['HTTP_HOST'] == 'localhost') {
                                    if ($key5522 == 'calendar') {
                                        echo (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://" . $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?');
                                    } else {
                                        echo (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://" . $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?') . '?session=' . urlencode($key5522);
                                    }
                                } elseif ($_SERVER['HTTP_HOST'] == 'tifsec-nsi.rf.gd') {
                                    if ($key5522 == 'calendar') {
                                        $url1 = $fonts1[$font1]['link2'];
                                        echo 'https://' . $_SERVER['HTTP_HOST'] . '/TNSI' . $fonts1[$font1]['link2'];
                                    } else {
                                        $url1 = $fonts1[$font1]['link3'];
                                        echo 'https://' . $_SERVER['HTTP_HOST'] . '/TNSI/?session=' . $key5522 . $fonts1[$font1]['link3'];
                                    }
                                } elseif ($_SERVER['HTTP_HOST'] == 'tifsec-nsi.up.railway.app') {
                                    if ($key5522 == 'calendar') {
                                        $url1 = $fonts1[$font1]['link2'];
                                        echo 'https://' . $_SERVER['HTTP_HOST'] . '/TNSI/ancienne-version' . $fonts1[$font1]['link2'];
                                    } else {
                                        $url1 = $fonts1[$font1]['link3'];
                                        echo 'https://' . $_SERVER['HTTP_HOST'] . '/TNSI/ancienne-version/?session=' . $key5522 . $fonts1[$font1]['link3'];
                                    }
                                }
                            ?>" class="<?= ($key5522 == $session_actuelle) ? 'active' : '' ?>">
                                <?= $title ?>
                            </a>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        </nav>
    </aside>
    
    <main>
        <h2><?= htmlspecialchars($session_titre) ?></h2>
        <?php if ($session_actuelle == 'calendar') : ?>
            <table class="calendar">
                <thead>
                    <tr>
                        <?php
                        foreach ($seances_data3[6][1] as $rgh1665) {
                            echo "<th>" . htmlspecialchars($rgh1665) . "</th>";
                        }
                        ?>
                    </tr>
                </thead>
                <tbody id="calendar-body">
                <?php
                for ($i82229 = 0; $i82229 < $seanceCount; $i82229 += 3) {
                    echo '<tr>';
                    
                    for ($j82229 = 0; $j82229 < 3; $j82229++) {
                        if ($i82229 + $j82229 < $seanceCount) {
                            $seance = $seances[$i82229 + $j82229];
                            $class = isset($seance['class']) ? 'class="' . $seance['class'] . '"' : '';
                            
                            $joursFeries22582 = $seances_data3[3][5];
                
                            if (in_array($seance["date"], $joursFeries22582)) {
                                $todayClass11 = ($seance['date'] === $today11dmy) ? 'today' : '';
                                echo "<td id='".$seance['date']."' class='" . (($seance['date'] === $today11dmy) ? $todayClass11 : $seance['class']) . "'>{$seance['date']}</td>";
                                echo "<td class='" . (($seance['date'] === $today11dmy) ? $todayClass11 : $seance['class']) . "'>{$seance['titre']}</td>";
                            } else {
                                $todayClass11 = ($seance['date'] === $today11dmy) ? 'today' : '';
                                echo "<td id='".$seance['date']."' $class class='$todayClass11'>{$seance['date']}</td>";
                                echo "<td $class class='$todayClass11'><a href='?session={$seance["id"]}" /* . $fonts1[$font1]['link3'] */ . "'>{$seance["titre"]}</a></td>";
                            }
                        }
                    }
                    
                    echo '</tr>';
                }

                if (isset($_GET['session'])) {
                    $id = $_GET['session'];
                    $seance = array_filter($seances, fn($s14232) => $s14232["id"] === $id);
                }
                ?>
                </tbody>
            </table> <!--<?php echo $today11; echo ' '.$today11dmy; ?>-->
        <?php elseif (in_array($session_actuelle, array_keys($seances_data3[6][0]))) : ?>
                <embed src="//<?= $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ?>&<?= $seances_data3[6][0][$session_actuelle] ?>" type="application/pdf" width="100%" height="600px" /> <?php
              elseif (in_array($session_actuelle, array_keys($seances_data3[6][3][0][0][5][6]))) :
    $url = json_decode(file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/index-data1.json'), true)[$font1][$seances_data3[6][3][0][0][5][6][$session_actuelle]];
                if (file_get_contents($url) === false) {echo "⚠️ Erreur lors du chargement du HTML depuis : " . $url;} else {echo file_get_contents($url);}
              elseif (in_array($session_actuelle, array_keys($seances_data3[6][3][0][0][5][7]))) :
                $pdfUrl = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . ((basename($_SERVER['SCRIPT_NAME']) === 'index.php') ? rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') . '/' : $_SERVER['SCRIPT_NAME']) . $seances_data3[6][3][0][0][5][10][0][0][$seances_data3[6][3][0][0][5][7][$session_actuelle]] ?? null;
                if (!$pdfUrl || ($pdfContent = @file_get_contents($pdfUrl)) === false) {echo "Erreur récupération PDF depuis l’URL : " . ($pdfUrl ?? 'URL introuvable');exit;}?>
                <embed src="<?= $pdfUrl ?>" type="application/pdf" width="100%" height="600px" />
        <?php elseif ($session_actuelle == 'pratique.html') :
                if (@file_get_contents("https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/pratique/pratique1.html?font=" . ($_GET['font'] ?? 'default')) !== false) {echo @file_get_contents("https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/pratique/pratique1.html?font=" . ($_GET['font'] ?? 'default'));} else {echo "<p>Impossible de charger le fichier pratique.html</p>";}?>
        <?php elseif (preg_match('/^seance(\d+)$/', $session_actuelle, $matches)) :
            $seance_num = intval($matches[1]);
            if ($seance_num < 107) {
                $seance_url = 'https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/seance' . $seance_num . '.html' . $fonts1[$font1]['link4'];
                $seance_content = @file_get_contents($seance_url);
                if ($seance_content !== false) {echo $seance_content;} else {echo "<p>Impossible de charger la séance.</p>";}
            } else {
                $font_param12614684685 = isset($_GET['font']) ? "&font=" . urlencode($_GET['font']) : ''; ?>
                <meta http-equiv="refresh" content="0; URL=<?= 'https://tifsec.github.io/TNSI/?session=seance' . $seance_num . $font_param12614684685 ?>" /><?php
                exit();
            }
        elseif ($session_actuelle == 'toto') :
            file_put_contents('temp_toto.php', file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/toto.php'));require 'temp_toto.php';unlink('temp_toto.php');
        elseif (strpos($session_actuelle, "08/03") === 0) : ?>
            <meta http-equiv="refresh" content="0; URL=<?= ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/TNSI/?session=Joyeux-anniversaire' ?>" /><?php
            exit;
        elseif ($session_actuelle == 'Joyeux-anniversaire') :
            file_put_contents('temp_toto.php', file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/joyeuxanniversaire.php'));require 'temp_toto.php';unlink('temp_toto.php');
        elseif (in_array($session_actuelle, array_keys($seances_data3[6][2]))) : ?>
            <?php file_put_contents('temp_toto.php', file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/iframe-fonts1.php'));require 'temp_toto.php';unlink('temp_toto.php'); ?>
        <?php elseif (in_array($session_actuelle, array_keys($seances_data3[6][3][0][0][5][8]))) : ?>
            <?php
            $path = $seances_data3[6][3][0][0][5][8][$session_actuelle][$font1];
            echo @file_get_contents($path);
            ?>
        <?php elseif (in_array($session_actuelle, array_keys($seances_data3[6][3][0][0][5][1]))) :
            file_put_contents('temp_toto.php', file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/img_image.php'));require 'temp_toto.php';unlink('temp_toto.php'); ?>
        <?php elseif (in_array($session_actuelle, array_keys($seances_data3[6][3][0][0][0]))) : ?>
            <meta http-equiv="refresh" content="0; url=<?= $seances_data3[6][3][0][0][0][$session_actuelle] ?>">
            <p>JavaScript est désactivé. <a href="<?= $seances_data3[6][3][0][0][0][$session_actuelle] ?>">Cliquez ici pour continuer</a>.</p>
            <?php elseif ($session_actuelle === "pratique/Sujet") : 
                    file_put_contents('temp_toto.php', file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/seances/pratique_NSI2025.php'));require 'temp_toto.php'; unlink('temp_toto.php');?>
            <?php elseif (preg_match('/^pratique\/sujet(\d+)$/', $session_actuelle, $matches)) :
                    file_put_contents('temp_toto.php', file_get_contents('https://raphaeldelhomenede.github.io/tifsec-nsi-rf-gd/TNSI/pratique_NSI2025.php'));require 'temp_toto.php';
                    unlink('temp_toto.php'); ?>
            <?php elseif ($session_actuelle === "Background") : ?>
                <?php 
                if (isset($_GET['background']) && $_GET['background']) : ?>
                    <?= str_replace("BACKGROUND_URL", htmlspecialchars($_GET['background']), $seances_data3[6][3][0][0][5][3]["background_style"]) ?>
                <?php endif; ?>
            <?php elseif (in_array($session_actuelle, array_keys($seances_data3[6][3][0][0][5][9]))) :
                file_put_contents('temp_toto.php', file_get_contents($seances_data3[6][3][0][0][5][9][$session_actuelle]));require 'temp_toto.php';unlink('temp_toto.php'); ?>
            <?php endif; ?>
    </main>

    <!-- <footer>
        <p>&copy; <?php date_default_timezone_set('Europe/Paris'); echo date("Y"); ?> Programme NSI</p>
    </footer> -->
    <!--<?php
    function lien2partage1($param1) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        $dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        if ($dir === '.' || $dir === '/') {$dir = '';}
        return $protocol . '://' . $host . $dir . '/session/' . $param1;
    }

    $queryString = $_SERVER['QUERY_STRING'] ?? '';

    if ($queryString === '' || isset($_GET['i'])) {
        if (basename($_SERVER['SCRIPT_NAME']) === 'index.php') {
            $dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
            if ($dir === '.' || $dir === '/') {$dir = '';}
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
            echo $protocol . $_SERVER['HTTP_HOST'] . $dir;
        } else {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
            echo $protocol . $_SERVER['HTTP_HOST'] . $_SERVER["PHP_SELF"];
        }
    } else {
        $pos = strpos($queryString, 'session=');
        if ($pos !== false) {$sessionValue = substr($queryString, $pos + strlen('session='));echo lien2partage1($sessionValue);
        } else {echo "Paramètre session non trouvé.";}
    }
    ?> -->
</body>
</html>
<?= $seances_data3[6][3][0][0][5][2]['toggleMenu']; ?>
<?php
$config = $seances_data3[6][3][0][0][5][4];

if (!isset($config['hosts'][$_SERVER['HTTP_HOST']])) {
    exit("Host inconnu");
}
function estDateValide($d) {
    return preg_match(
        "/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/", 
        $d
    );
}
if ($session_actuelle == 'today') {
    if ($_SERVER['HTTP_HOST'] == 'localhost') {
        echo $fonts1[$font1]['link6'][0] . $today11dmy . $fonts1[$font1]['link6'][1];
        exit;
    }
    
    elseif ($_SERVER['HTTP_HOST'] == 'tifsec-nsi.rf.gd') {
        echo $fonts1[$font1]['link6'][0] . $today11dmy . $fonts1[$font1]['link6'][1];
        exit;
    }
} elseif ($session_actuelle == 'id:today') { ?>
    <meta http-equiv="refresh" content="0; URL=<?= '?session=' . '#' . $today11dmy ?>" /><?php
    exit;
}
elseif (estDateValide($session_actuelle)) {
    foreach ($seances as $seance) {
        if ($session_actuelle === $seance['date']) { ?>
            <meta http-equiv="refresh" content="0; URL=<?= htmlspecialchars($fonts1[$font1]['link6'][$config['hosts'][$_SERVER['HTTP_HOST']]['today']['link_index']][0] . $seance['id'] . $fonts1[$font1]['link6'][$config['hosts'][$_SERVER['HTTP_HOST']]['today']['link_index']][1], ENT_QUOTES) ?>" /><?php
            exit;
        }
    } ?>
    <meta http-equiv="refresh" content="0; URL=<?= $fonts1[$font1]['link6'][$config['hosts'][$_SERVER['HTTP_HOST']]['today']['link_index']][0] . $config['hosts'][$_SERVER['HTTP_HOST']]['default_id'] . $fonts1[$font1]['link6'][$config['hosts'][$_SERVER['HTTP_HOST']]['today']['link_index']][1] ?>" /><?php
    exit;
}

?>
