<?php
// Si l'URL contient "?style.css"
if (isset($_GET['style_css'])) {
    // 1. On dit au navigateur que c'est du CSS
    header("Content-type: text/css; charset: UTF-8");
    
    // 2. On récupère le CSS distant
    $css = file_get_contents("https://raphaeldelhomenede.github.io/tifsec/AnciensCours/style.css");
    
    // 3. On l'affiche et on arrête le script pour ne pas afficher le HTML plus bas
    echo $css;
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Les cours de NSI">
    <meta name="keywords" content="HTML, Python, JavaScript">
    <meta name="author" content="Un super prof de NSI(Numérique et sciences informatique)">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil de NSI</title>
    <link rel="icon" type="image/png" href="https://tifsec-nsi.rf.gd/TNSI/?logo_qui_fait_fuir_toutes_les_jolies_filles">
    <link rel="stylesheet" href="?style_css">
</head>
<body>
    <h1>Bienvenue en NSI</h1>
    <p>Voici les cours de NSI</p>
    <div class="display-flex">
        <div class="element">
            <a href="https://tifsec-nsi.up.railway.app/TNSI/ancienne-version/SNT"><h2 style="margin-top: 0px;">SNT</h2></a>
        </div>
        <div class="element">
            <a href="https://tifsec-nsi.up.railway.app/TNSI/ancienne-version/1NSI"><h2 style="margin-top: 0px;">Première NSI</h2></a>
        </div>
        <div class="element">
            <a href="https://tifsec-nsi.up.railway.app/TNSI/ancienne-version"><h2 style="margin-top: 0px;">Terminale NSI</h2></a>
        </div>
    </div>
    <br><br>
    <a href="https://raphaeldelhomenede.github.io/tifsec/AnciensCours/"><p>Voici les anciens cours de NSI</p></a>
    <a href="https://tifsec-nsi.up.railway.app/TNSI/version-scrappe"  style="margin-top: -5px;"><p>Voici les nouveaux cours de NSI en scrappé</p></a>
</body>
</html>
<script>
/*function logoNSI() {
    const img = new Image();
    img.src = '../732212.ico';

    document.body.appendChild(img);

    img.classList.add('full-screen');
    img.style.cursor = 'default';
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'X';
    closeBtn.classList.add('close-btn');
    document.body.appendChild(closeBtn);

    closeBtn.style.display = 'block';
    if (window.innerWidth > window.innerHeight) {
        // Landscape mode
        img.style.width = 'auto';
        img.style.height = '100%';
    } else {
        // Portrait mode
        img.style.width = '100%';
        img.style.height = 'auto';
    }
    closeBtn.addEventListener('click', function() {
        closeLogoNSI(img, closeBtn);
    });
}

function closeLogoNSI(img, closeBtn) {
    img.classList.remove('full-screen');

    closeBtn.style.display = 'none';
    document.body.removeChild(img);
    document.body.removeChild(closeBtn);

    img.style.width = '';
    img.style.height = '';
}*/
</script>
