<?php
// On récupère l'URL propre de ton fichier PHP
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$page_racine = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];

$url_prefixe = "https://perso.limos.fr/~maburon/teaching/sql/";
$json_url = "https://raphaeldelhomenede.github.io/tifsec.github.io/TNSI/json/v_SHjigsSBA.json";

if (isset($_GET['tp1_exo_zip'])) {
    $url_complete = "https://raphaeldelhomenede.github.io/tifsec.github.io/TNSI/lesbiennes/python/pdfs/SQL/tp1_exo.zip";
    $contenu = @file_get_contents($url_complete);
    if ($contenu !== false) {/* 1. On définit le type de fichier comme une archive ZIP */ header("Content-Type: application/zip"); /* 2. On FORCE le téléchargement avec le nom de fichier souhaité */ header("Content-Disposition: attachment; filename=\"tp1_exo.zip\""); // 3. Optionnel : on indique la taille pour la barre de progression
        header("Content-Length: " . strlen($contenu)); echo $contenu; exit;
    }
}

// --- PARTIE 1 : PROXY ---
if (isset($_GET['url']) && $_GET['url'] !== "") {
    $nom_reel = str_replace('_', '.', $_GET['url']);
    $url_complete = $url_prefixe . $nom_reel;
    $contenu = @file_get_contents($url_complete);
    if (strpos($nom_reel, '.css') !== false) header("Content-Type: text/css");
    if (strpos($nom_reel, '.js') !== false)  header("Content-Type: application/javascript");
    if (strpos($nom_reel, '.pdf') !== false) header("Content-Type: application/pdf");
    echo $contenu;
    exit;
}

if (isset($_GET['url1'])) {
    $nom_reel = str_replace('_', '.', $_GET['url1']); 
    $url_complete = "http://sql.bdpedia.fr/" . $nom_reel;
    $contenu = @file_get_contents($url_complete);
    if (strpos($nom_reel, '.pdf') !== false) header("Content-Type: application/pdf");
    echo $contenu;
    exit;
}

// --- PARTIE 2 : TRAITEMENT HTML ---
$html = file_get_contents($url_prefixe);
$videos_json = json_decode(file_get_contents($json_url), true) ?? [];
$compteur_video = 0; 

function formater_url_courte($lien, $prefixe) {
    $chemin = str_replace($prefixe, "", $lien);
    $chemin = ltrim($chemin, './');
    return str_replace(".", "_", $chemin);
}

// 1. Transformation des liens relatifs avec EXCEPTION CREATIVE COMMONS
$html_modifie = preg_replace_callback(
    '/(src|href)="([^"]+)"/i',
    function($matches) use ($url_prefixe) {
        $attribut = $matches[1];
        $lien_original = $matches[2];

        // AJOUT DE L'EXCEPTION CREATIVE COMMONS ICI
        if (strpos($lien_original, 'creativecommons.org') !== false || 
            strpos($lien_original, 'bdpedia.fr') !== false || 
            strpos($lien_original, 'lecnam.net') !== false || 
            strpos($lien_original, '#') === 0) {
            return $matches[0];
        }

        $url_courte = formater_url_courte($lien_original, $url_prefixe);
        return $attribut . '="?url=' . $url_courte . '"';
    },
    $html
);

// 2. CORRECTION DU LIEN "EN LIGNE"
$html_modifie = str_replace('href="?url="', 'href="' . $page_racine . '"', $html_modifie);

// 3. Remplacement LECNAM par IFRAME YOUTUBE
$html_modifie = preg_replace_callback(
    '/<a [^>]*href="[^"]*lecnam\.net[^"]*"[^>]*>(.*?)<\/a>/is',
    function($matches) use (&$videos_json, &$compteur_video) {
        // On vérifie si on a une vidéo pour ce lien dans le JSON
        if (isset($videos_json[$compteur_video])) {
            $url_youtube = $videos_json[$compteur_video];
            
            // Nettoyage de l'ID YouTube (gère youtu.be, youtube.com et les paramètres ?t=...)
            $video_id = "";
            if (preg_match('/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/', $url_youtube, $id_matches)) {
                $video_id = $id_matches[1];
            }

            if ($video_id !== "") {
                $texte_video = trim(strip_tags($matches[1])); 
                $compteur_video++;
                
                return '<div style="margin:30px 0; padding:15px; background:#f9f9f9; border-radius:8px; border: 1px solid #ddd;">
                            <p style="font-weight:bold; font-size:1.1em; margin-bottom:10px; font-family: sans-serif; color: #333;">' . $texte_video . '</p>
                            <div style="width:100%; max-width:800px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                <iframe 
                                    src="https://www.youtube-nocookie.com/embed/'.$video_id.'" 
                                    style="width:100%; aspect-ratio: 16 / 9; border:0; border-radius:4px;" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen 
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>';
            }
        }
        // Si pas de vidéo trouvée, on laisse le lien original (Le Cnam)
        return $matches[0];
    },
    $html_modifie
);

// 4. BDPEDIA -> IFRAME PDF
$html_modifie = preg_replace_callback(
    '/<a [^>]*href="http:\/\/sql\.bdpedia\.fr\/([^"]+\.pdf)"[^>]*>(.*?)<\/a>/is',
    function($matches) {
        $chemin_clean = str_replace('.', '_', $matches[1]);
        $pdf_params = "#view=FitH&navpanes=0&toolbar=0&statusbar=0&messages=0";
        return '<div style="margin:20px 0;">
                    <p><b>📄 Document : '.$matches[2].'</b></p>
                    <iframe width="100%" height="600" src="?url1=' . $chemin_clean . $pdf_params . '" frameborder="0" loading="lazy"></iframe>
                </div>';
    },
    $html_modifie
);

// 5. LIMOS PDF -> IFRAME PDF
$html_modifie = preg_replace_callback(
    '/<a [^>]*href="(\?url=[^"]+_pdf)"[^>]*>(.*?)<\/a>/is',
    function($matches) {
        $pdf_params = "#view=FitH&navpanes=0&toolbar=0&statusbar=0&messages=0";
        return '<div style="margin:20px 0;">
                    <p><b>📄 Document : '.$matches[2].'</b></p>
                    <iframe width="100%" height="600" src="' . $matches[1] . $pdf_params . '" frameborder="0" loading="lazy"></iframe>
                </div>';
    },
    $html_modifie
);
?>
<!-- https://tifsec-nsi.yzz.me/SQL-s1-2026/?tp1_exo_zip -->
<?
echo $html_modifie;
?>
