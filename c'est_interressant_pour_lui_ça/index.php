<?php
// On détecte le protocole du site
$siteprotoole = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';

/*if ($siteprotoole == "http") { ?>
    <head>
      <meta http-equiv="refresh" content="0; URL=https://<?php echo $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>" />
    </head>
<?php }*/

if (isset($_GET["Cest_interressant_pour_lui_ca"])) {
    $url = "https://audio.com/xiaomi-7/audio/c-est-interressant-pour-lui-ca-x7";
    $html = file_get_contents($url);
    if (preg_match('/<meta\s+property=["\']og:audio:url["\']\s+content=["\']([^"\']+)["\']/', $html, $matches)) {
        $mp3_url = html_entity_decode($matches[1]);
		if (isset($_GET["Cest_interressant_pour_lui_ca"])) {
            echo '<head>
                    <meta http-equiv="refresh" content="0; URL=https://electricite.html-5.me/audio/index?audio-link=' 
                    . urlencode($mp3_url) . '" />
                  </head>';
            exit;
        }
        
        // Ensuite tu peux lire le MP3
        header('Content-Type: audio/mpeg');
        header('Content-Disposition: inline; filename="audio.mp3"');
        readfile($mp3_url);
        exit;
    }
}

// URL de la page à scraper
$url = "https://audio.com/xiaomi-7/audio/c-est-interressant-pour-lui-ca-x7";

// Télécharger le HTML
$html = file_get_contents($url);

// Vérifier si on a bien récupéré le contenu
if ($html === false) {
    die("Impossible de charger la page.");
}

// Chercher la balise meta og:audio:url
if (preg_match('/<meta\s+property=["\']og:audio:url["\']\s+content=["\']([^"\']+)["\']/', $html, $matches)) {
    $mp3_url = html_entity_decode($matches[1]); // décoder les &amp;
    echo "Lien MP3 : " . $mp3_url; ?>
    <br><br>
    <a href="https://electricite.html-5.me/audio/index?audio-link=<?= urlencode("$mp3_url") ?>">Cliquez ici</a>

<?php } else {
    echo "Lien MP3 non trouvé.";
}
?>
