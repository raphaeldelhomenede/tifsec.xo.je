function ActAff1()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Activité 1";

    let intro = 
    "Un réseau local ou LAN (de l'anglais Local Area Network) est un réseau informatique dans lequel les machines \
    s'envoient des informations sans utiliser d'accès à Internet. L'administrateur du réseau du lycée a choisi de \
    faire deux réseaux locaux (ou LAN), un pour les élèves et un pour les enseignants.\
    <br>\
    Les commutateurs (ou switches) et les routeurs sont des équipements informatiques qui assurent le transit des \
    données. Un commutateur permet de connecter des machines au sein d'un même réseau, tandis qu'un routeur est \
    utilisé pour interconnecter des réseaux locaux entre eux.";

    let image = "img/reseau_lycee.png";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>\
    <a href='"+image+"' target='_blank'>Réseau du lycée</a>\
    <br><br>\
    1 - Donner le réseau local élève:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    2 - Donner le réseau local enseignant:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    3 - Combien de commutateurs et de routeurs possède ce réseau ?\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    4 - On nomme 'point d'accès' les commutateurs permettant un accès Internet par Wi-Fi, donner le nom du commutateur pour:\
    <br>\
    Point d'accès élèves: <input type='text'>\
    <br>\
    Point d'accès enseignants: <input type='text'>\
    <br><br>\
    5 - Quel sont les routeurs associé a:\
    <br>\
    Routeur élèves: <input type='text'>\
    <br>\
    Routeur enseignants: <input type='text'>\
    <br>\
    Routeur vers Internet: <input type='text'>";
}

function DefsAff()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Définitions";

    let intro = 
    "<table>\
        <tr>\
            <th>Réseau</th>\
            <th>Réseau local</th>\
            <th>Réseau étendu</th>\
        </tr>\
        <tr>\
            <td>\
                Un réseau est un ensemble de machines reliées entre elles par des équipements informatiques pour \
                échanger des informations via des liaisons filaires (câble Ethernet, fibre optique, ...) ou sans fil (Wi-Fi, \
                Bluetooth, 4G, 5G, ...).\
            </td>\
            <td>\
                Un réseau local ou LAN (Local Area Network) est un réseau informatique dans lequel les machines s'envoient \
                des informations sans utiliser d'accès à Internet.\
            </td>\
            <td>\
                Un réseau étendu ou WAN (Wide Area Network) est un réseau de grande taille: à l'échelle d'un pays ou \
                d'un continent.\
            </td>\
        </tr>\
        <tr>\
            <th>Internet</th>\
            <th>Routeur</th>\
            <th>Commutateur réseau</th>\
        </tr>\
        <tr>\
            <td>\
                Internet désigne le réseau informatique mondial, accessible à tout le monde grâce à son universalité. Ce \
                terme, d'origine américaine, est dérivé d'<em>interconnected network</em> (réseau interconnecté).\
            </td>\
            <td>\
                Un routeur est un équipement informatique qui assure le transit des données de proche en proche, afin que \
                les paquets de données soient acheminés de l'émetteur au récepteur. Les routeurs sont utilisés pour \
                interconnecter des réseaux locaux.\
            </td>\
            <td>\
                Un commutateur réseau (switch) est un équipement informatique qui permet de connecter des machines et des \
                routeurs entre eux au sein d'un même réseau physique.\
            </td>\
        </tr>\
        <tr>\
            <th>Point d'accès</th>\
            <th>Interface</th>\
            <th>Architecture de réseau</th>\
        </tr>\
        <tr>\
            <td>\
                Un point d'accès est un commutateur ou un routeur qui donne accès à Internet via Wi-Fi.\
            </td>\
            <td>\
                Une interface est un périphérique d'entrée/sortie qui permet de connecter la machine à un réseau.\
            </td>\
            <td>\
                L'architecture de réseau est l'organisation des équipements de transmission, des infrastructures filaires \
                ou sans fil permettant la transmission des données entre les différents composants grâce à des logiciels \
                et des protocoles de communication.\
            </td>\
        </tr>\
    </table>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function AdResAff()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Les adresses réseau";

    let intro = 
    "Chaque ordinateur ou routeur est identifié de façon unique sur le réseau par une adresse IP. Sur Internet, l'adresse IP \
    d'un appareil mobile ou d'une box Internet est fournie par le fournisseur d'accès.\
    <br>\
    Dans un réseau local, l'adresse IP est fournie localement par l'administrateur réseau ou automatiquement par le réseau \
    en fonction de sa configuration. Même dans ce cas, sur Internet, la machine sera identifiée par l'adresse IP du routeur \
    qui permet de se connecter à Internet.\
    <br><br>\
    Une adresse IP (Internet Protocol) est une suite de chiffres et de lettres qui identifie une machine de façon unique \
    sur un réseau.\
    <br><br>\
    Une adresse <b>IPv4</b> (version 4 du protocole IP) est composée de 4 octets, soit 32 bits. Sur un octet, on peut \
    représenter toutes les valeurs entières entre 0 et 255, donc une adresse IPv4 est composée de 4 valeurs de 0 à 255 \
    séparées par des points.\
    Ainsi, 2^32 ~= 4 milliards d'adresses IPv4 différentes possibles.\
    <h6>Exemple:</h6>\
    Une adresse IPv4 possible: 51.38.38.211.\
    <br>\
    Comme le nombre d'adresses IPv4 différentes était insuffisant, les adresses IPv6 (version 6 du protocole IP) est \
    composée de 8 champs hexadécimaux de 16 bits, sous forme hexadécimale, délimités par deux-points, ce qui représente: \
    2^128 ~= 3.4x10^29 milliards d'adresses IP différentes.\
    <h6>Exemple:</h6>\
    Actuellement, les adresses IPv4 et IPv6 continuent à cohabiter.\
    <br>\
    Sur une liaison Ethernet ou en Wi-Fi, tous les ordinateurs sont également identifiés par une adresse MAC.\
    <br><br>\
    Une adresse MAC (Media Access Control), appelée également adresse Ethernet, est l'adresse physique d'une interface \
    (carte réseau, Wi-Fi, ...). Chaque adresse MAC est normalement unique au monde et fournie par le fabricant de \
    l'interface.\
    <br>\
    Une adresse MAC est constituée de 6 octets soit 48 bits, eb générale sous forme hexadécimale, séparés par deux-point.\
    <br>\
    <h6>Exemple:</h6> SC:FA:CE:D2:CF:36.";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function RoutAff()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Le routage";

    let intro = 
    "<table>\
        <tr>\
            <th>Routage</th>\
            <th>Table de routage</th>\
        </tr>\
        <tr>\
            <td>Le routage est le mécanisme de transport d'un paquet de données d'un émetteur à un récepteur</td>\
            <td>\
                Une table de routage est une structure de données associée à un routeur ou à une machine qui recense \
                à quel routeur transmettre tel ou tel paquet en fonction de son adresse de déstination.\
            </td>\
        </tr>\
    </table>\
    <br>\
    Le routage est effectué par les routeurs (ou passerelles), qui sont en mesure d'acheminer les données de proche \
    en proche jusqu'au récepteur. Leurs tables de routage peuvent être mises à jour régulièrement grâce à des \
    échanges avec les routeurs voisins.\
    <br><br>\
    Lors du routage, il arrive qu'un paquet soit détruit ou perdu, en raison d'une panne ou d'un encombrement du réseau.";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function ComResLinAff()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Les commandes réseaux pour Linux";

    let intro = 
    "<b>ifconfig (ou ip)</b>: Affiche les informations des interfaces et permet de les configurer.\
    <br><br>\
    <b>ping</b>: Teste l'accessibilité d'une machine grâce à son adresse IP et donne la durée nécessaire pour la joindre.\
    <br><br>\
    <b>traceroute</b>: Dresse une cartographie des routeurs intercalés entre l'émetteur et le récepteur.\
    <br><br>\
    <b>nslookup</b>: Interroge les serveurs DNS afin d'obtenir les informations d'un nom de domaine.\
    <br><br>\
    Tester les commandes dans l'émulateur jslinux.";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}
