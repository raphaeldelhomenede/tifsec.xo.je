function IntroAff()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Petite introduction";

    let texte_intro = 
    "Les premières télécommunications électroniques entre machines utilisaient essentiellement le réseau téléphonique. \
    Une connexion directe (appelée point à point) devait alors être établie entre deux machines distantes. En juillet \
    1968, la société américaine Bolt, Beranek and Newman (BBN) conçoit un réseau composé de petits ordinateurs à \
    l'usage très spécifique, les IMP (Interface Message Processor), ancêtres des routeurs actuels. Les routeurs \
    (encore appelés commutateurs à l'époque) assurent la connexion d'un ordinateur au réseau et permettent le transfert \
    de données par la communication de paquets, avec un débit binaire de 50 kbits par seconde.";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+texte_intro+"</p>";
}

function Anec1Aff()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Anecdote 1";

    /* Création du contenu */
    let contenu = 
    "La version 4 du protocole IP permettait de mettre à disposition environs 4 milliards d'adresses IPv4 différentes. \
    Avec l'essor des objets connectés, la version 6 du protocole a été créée afin de pouvoir représenter 3,4 x 10^29 \
    milliards d'adresse IP différentes.\
    <br>\
    Cela représente plus de 600 000 000 millions de milliards d'adresse IPv6 par mètre carré de la surface terrestre !";

    let article = "https://community.fs.com/fr/blog/ipv4-vs-ipv6-whats-the-difference.html";
    let titre_lien = "Quelle est la différence entre IPv4 et IPv6 ?";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+contenu+"</p>\
    <br><br>\
    Lire l'article suivant: \
    <a href="+article+" target='_blank'>"+titre_lien+"</a>";
}

function Anec2Aff()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Anecdote 2";

    /* Création du contenu */
    let contenu = 
    "Après six années de recherche, l'ingénieur américain Douglas C. Engelbart, qui a consacré une partie de sa vie \
    au développement des interfaces homme-machine, présente la première souris de l'histoire. C'était le 9 décembre 1968.";

    let image_1 = "img/Douglas_Engelbart_in_2008.jpg";
    let alt_1 = "Photo de Douglas C. Engelbart";
    let photo_titre_1 = "source: image de Wikipédia";
    let width_1 = "242";
    let height_1 = "298";
    let figcap_1 = "Douglas Engelbart en 2008";

    let image_2 = "img/SRI_Computer_Mouse.jpg";
    let alt_2 = "Photo de la première souris";
    let figcap_2 = "Source:";
    let lien_2 = "Par SRI International — SRI International, \
    <a href='https://creativecommons.org/licenses/by-sa/3.0' \
    title='Creative Commons Attribution-Share Alike 3.0'>CC BY-SA 3.0</a>, \
    <a href='https://commons.wikimedia.org/w/index.php?curid=17294412'>Lien</a>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+contenu+"</p>\
    <br><br>\
    <div class='photos'>\
        <figure>\
            <img src='"+image_1+"' alt='"+alt_1+"' title='"+photo_titre_1+"' width='"+width_1+"' height='"+height_1+"'>\
            <figcaption>"+figcap_1+"</figcaption>\
        </figure>\
        <figure>\
            <img src='"+image_2+"' alt='"+alt_2+"'>\
            <figcaption>"+figcap_2+" "+lien_2+"</figcaption>\
        </figure>\
    </div>";
}

function RepHistoAff()
{
    document.getElementById("h3_titre").innerHTML = "Repères historiques";
    document.getElementById("sous_content").innerHTML = 
    "<ul class='clicable'>\
    Les items suivant sont cliquable:\
    <br>\
        <li id='titre_1' onclick='RpAff1()'>1963 - Sketchpad</li>\
        <li id='titre_2' onclick='RpAff2()'>1965 - Commutation</li>\
        <li id='titre_3' onclick='RpAff3()'>1968 - Première souris</li>\
        <li id='titre_4' onclick='RpAff4()'>1969 - ARPANET</li>\
        <li id='titre_5' onclick='RpAff5()'>1982 - Normalisation</li>\
        <li id='titre_6' onclick='RpAff6()'>1983 - TCP/IP</li>\
        <li id='titre_7' onclick='RpAff7()'>1984 - Modèle OSI</li>\
    </ul>\
    <h3 id='titre_aff'></h3>\
    <table>\
        <tr>\
            <td>\
                <p class='texte_gauche' id='article'></p>\
            </td>\
            <td>\
                <img id='photo' alt=''>\
            </td>\
        </tr>\
    </table>";
}
