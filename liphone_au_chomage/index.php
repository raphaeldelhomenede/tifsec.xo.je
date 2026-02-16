<?php
$remote_url = "https://magictendo.github.io/api/img/baka-wiki/character/korufuyuki.png";

$filename = basename($remote_url);

$data_img = @file_get_contents($remote_url);

if ($data_img !== false) {
    header("Content-type: image/png");
    header("Content-disposition: attachement; filename=\"L'iphone est au chômage.png\"");
    header("Content-Length: " . strlen($data_img));
    
    echo $data_img;
    exit;
} else {
    echo "Erreur : Impossible de récupérer l'image";
}
?>
