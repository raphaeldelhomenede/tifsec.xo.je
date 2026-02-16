function RpAff1()
{
    let titre = document.getElementById("titre_1").innerHTML;
    document.getElementById("titre_aff").innerHTML = titre;
    document.getElementById("article").innerHTML = 
    "L'ingénieur américain Ivan Sutherland programme Sketchpad, considéré comme l'ancêtre des interfaces graphiques modernes.";
    document.getElementById("photo").src = "img/SketchpadDissertation-Fig1-2.jpg";
    document.getElementById("photo").width = 200;
    document.getElementById("photo").height = 200;
}

function RpAff2()
{
    let titre = document.getElementById("titre_2").innerHTML;
    document.getElementById("titre_aff").innerHTML = titre;
    document.getElementById("article").innerHTML = 
    "<h4>La commutation par paquets est le principe de base des premières communications</h4>\
    <br><br>\
    Selon le principe universel de la commutation par paquets, les données à transmettre sont découpées en paquets \
    composés d'un en-tête et d'une partie des données. L'en-tête contient notamment des informations nécessaires pour \
    identifier le paquet et le diriger vers sa destination ou récepteur. Le canal de transmission, qui n'est 'occupé' \
    que pendant la transmission du paquet, est ensuite 'libéré' pour d'autres usages.";
    document.getElementById("photo").src = "";
}

function RpAff3()
{
    let titre = document.getElementById("titre_3").innerHTML;
    document.getElementById("titre_aff").innerHTML = titre;
    document.getElementById("article").innerHTML = 
    "Invention de la première souris par l'ingénieur Douglas C. Engelbart";
    document.getElementById("photo").src = "img/SRI_Computer_Mouse.jpg";
    document.getElementById("photo").width = 200;
    document.getElementById("photo").height = 200;
}

function RpAff4()
{
    let titre = document.getElementById("titre_4").innerHTML;
    document.getElementById("titre_aff").innerHTML = titre;
    document.getElementById("article").innerHTML = 
    "<h4>Naissance du réseau ARPANET</h4>\
    <br><br>\
    Création du premier réseau à transfert de paquets ARPANET, par des universitaires américains. Internet a été \
    influencé par son concept de communication.\
    <br>\
    Le réseau ARPANET (Advanced Research Projects Agency Network), conçu aux Etats-Unis, est le premier \
    <b>réseau à transfert de paquets de données</b>. Initialement composé de quatre ordinateurs (on parle de noeuds), \
    le réseau s'étoffe jusqu'à 111 noeuds en 1977.";
    document.getElementById("photo").src = "img/Arpanet_1974.png";
    document.getElementById("photo").width = 200;
    document.getElementById("photo").height = 200;
}

function RpAff5()
{
    let titre = document.getElementById("titre_5").innerHTML;
    document.getElementById("titre_aff").innerHTML = titre;
    document.getElementById("article").innerHTML = 
    "Normalisation des protocoles de communication d'Internet";
    document.getElementById("photo").src = "";
}

function RpAff6()
{
    let titre = document.getElementById("titre_6").innerHTML;
    document.getElementById("titre_aff").innerHTML = titre;
    document.getElementById("article").innerHTML = 
    "<h4>Adoption du protocole TCP/IP</h4>\
    <br><br>\
    A ses débuts, le réseau ARPANET utilisait le protocole de communication NCP (Network Control Protocol). En 1983, \
    il adopte la suite de protocole TCP/IP qui deviendra le protocole universel d'Internet. Le protocole IP définit \
    des règles de communication, tandis que le protocole TCP gère la transmission des contenus, quelle que soit \
    l'infrastructure utilisée: 4G, 5G, ADS, Wi-Fi, etc. En 1990, ARPANET est finalement abandonné pour laisser place \
    au réseau mondial Internet.";
    document.getElementById("photo").src = "img/Comparaison_des_modèles_OSI_et_TCP_IP.png";
    document.getElementById("photo").width = 200;
    document.getElementById("photo").height = 200;
}

function RpAff7()
{
    let titre = document.getElementById("titre_7").innerHTML;
    document.getElementById("titre_aff").innerHTML = titre;
    document.getElementById("article").innerHTML = 
    "<h4>Le modèle OSI en couche devient une norme</h4>\
    <br><br>\
    Le modèle OSI (de l'anglais Open Systems Interconnection) décrit une architecture en couches définies et délimités avec \
    des notions de service, de protocole et d'interface. Les couches hautes sont proches de l'utilisateur, tandis que les \
    couches basses mettent en forme les données à transmettre.";
    document.getElementById("photo").src = "img/modele_osi.png";
    document.getElementById("photo").width = 200;
    document.getElementById("photo").height = 200;
}
