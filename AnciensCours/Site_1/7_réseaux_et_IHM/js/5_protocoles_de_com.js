function ProtCom1()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "IP, TCP, HTTP, DNS";

    let intro = 
    "<b>Protocole</b>: Un protocole est un ensemble de normes qui régissent la manière d'échanger des informations entre \
    des machines.\
    <br><br>\
    Tous les échanges sur les réseaux sont régis par des protocoles. En SNT, nous avons étudié les protocoles IP, TCP, HTTP, \
    et DNS.\
    <br><br>\
    <b>IP</b>: <em>Internet Protocol</em>, est un ensemble de normes utilisées pour acheminer des données de son émetteur \
    vers son récepteur, de routeur en routeur.\
    <br><br>\
    <b>TCP</b>: <em>Transmission Control Protocol</em>, est un ensemble de normes utilisées pour assurer la communication \
    entre l'émetteur et le récepteur.\
    <br><br>\
    Le protocole IP n'assure pas la fiabilité de transmission, c'est l'ensemble TCP/IP qui assure la fiabilité de \
    transmission, mais n'assure pas de garantie temporelle.\
    <br><br>\
    Le protocole TCP permet de gérer plusieurs échanges entre deux adresses IP grâce aux numéros de port réseau.\
    <br><br>\
    <b>HTTP</b>: <em>HyperText Transfer Protocol</em>, est un ensemble de normes qui permet à un navigateur \
    d'échanger avec la machine sur laquelle le site web est hébergé.\
    <br><br>\
    <b>DNS</b>: <em>Domain Name System</em>, que l'on peut traduire par 'système de noms de domaine', est un ensemble de \
    normes qui permet à un navigateur d'accéder à l'adresse IP d'un serveur à partir d'un nom de domaine.";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function ProtCom2()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Les couches réseaux";

    let intro = 
    "Les protocoles sont associés aux couches du modèle OSI.\
    <br><br>\
    Dans le schéma ci-dessous, vous verrez des couches réseaux avec des exemples de protocoles associés.\
    <br><br>\
    <img src='img/couches_reseaux.png'>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function ProtCom3()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Intérêt du découpage des données en paquets";

    let intro = 
    "En l'absence de découpage des données en paquets, pour transmettre des données d'un émetteur à un récepteur, toutes \
    les données devraient être émises à nouveau en cas de panne. De plus, les équipements réseaux seraient plus \
    complexes pour maintenir un flux de données continu.\
    <br><br>\
    Avec le découpage des données en paquets, lors d'une panne, les paquets peuvent transiter par d'autres chemins, et \
    les paquets qui ne sont pas arrivés à destination seront renvoyés. De plus, les équipements réseaux, ainsi que le \
    récepteur et l'émetteur restent disponibles pour d'autres transferts.\
    <br>\
    L'encapsulation de données consiste à inclure des données supplémentaires (en-tête) d'un protocole à un autre. \
    L'ordre d'encapsulation est descendant dans les couches du modèle OSI.\
    <br><br>\
    Exemple d'encapsulation des données HTTP avec les protocoles TCP puis IP et enfin Ethernet:\
    <br><br>\
    <img src='img/encaps_donnees.png'>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function ProtCom4()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Protocole du bit alterné";

    let intro = 
    "<table>\
        <tr>\
            <td>\
                Le protocole du bit alterné (Alternating Bit Protocol) est un protocol de communication fonctionnant \
                au niveau de la couche liaison du modèle en couches. Il permet de retransmettre les trames perdues avec \
                un système de numéros de séquence codé sur 1 bit.\
                <br><br>\
                Ce protocole est un des protocoles les plus simples de la couche liaison. En réalité, il n'est pas utilisé, \
                mais il permet d'illustrer les principes fondamentaux de tous les protocoles de la couche liaison du modèle \
                OSI en permettant la récupération de trames perdues ou retardées grâce à la numérotation sur un bit (0 ou 1) \
                des trames et des acquittements (ACK0 et ACK1).\
                <br><br>\
                Néanmoins, contrairement au protocole TCP, il ne permet pas de gérer le transfert simultané de plusieurs \
                trames. De plus, si une trame arrive avec un retard important, et que le bit est celui attendu, il peut \
                être pris en compte dans la transmission alors que ce n'est pas la trame attendue. Il en est de même pour \
                un acquittement.\
            </td>\
            <td><img src='img/prot_bit_alt.png'></td>\
        </tr>\
    </table>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}