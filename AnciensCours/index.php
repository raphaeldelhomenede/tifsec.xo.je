<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Les cours de NSI">
    <meta name="keywords" content="HTML, Python, JavaScript">
    <meta name="author" content="Un super prof de NSI(Numérique et sciences informatique)">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil de NSI</title>
    <link rel="icon" type="image/svg+xml" href="https://www.umbro.fr/img/favicon.ico?1740388190">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Bienvenue en NSI</h1>
    <p>Voici les cours de NSI</p>
    <div class="display-flex">
        <div class="element">
            <a href="SNT/index.html"><h2 style="margin-top: 0px;">SNT</h2></a>
        </div>
        <div class="element">
            <a href="Site_1/index.html"><h2 style="margin-top: 0px;">Première NSI</h2></a>
        </div>
        <div class="element">
            <a href="Site_T/index.html"><h2 style="margin-top: 0px;">Terminale NSI</h2></a>
        </div>
    </div><br>
    <div class="logo-container">
        <img class="logoNSI" src="./Site_T/img/HTML5_logo_and_wordmark.svg.png" onclick="logoNSI()" alt="Logo NSI" width="512px" height="512px">
    </div>
    <br><br>
    <a href="./nouvelles-versions/"><p>Voici les nouveaux cours de NSI</p></a>
    <a href="./nouvelles-versions/index-en-scrappé.html" style="margin-top: -5px;"><p>Voici les nouveaux cours de NSI en scrappé</p></a>
</body>
</html>
<script>
    function logoNSI() {
    const img = new Image();
    img.src = './Site_T/img/HTML5_logo_and_wordmark.svg.png';

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
}

</script>
