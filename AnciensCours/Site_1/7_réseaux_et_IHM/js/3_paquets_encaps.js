function ActAff2_1()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Activité 2";

    let intro = 
    "Voici deux schéma qui illustrent l'intérêt du découpage des données en paquets:";

    let image = "img/decoupage_paquets_et_encapsulation.png";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>\
    <img src='"+image+"' width='90%'>\
    <br>\
    <a href='"+image+"' target='_blank'>Schémas</a>\
    <br><br>\
    1 - En observant le schéma 1, expliquer pourquoi l'envoi de données en flux continu est source d'inconvénients:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    2 - En observant le schéma 2, expliquer les deux principaux avantages du découpage par paquets:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>";
}

function ActAff2_2()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Activité 2";

    let intro = 
    "D'après le schéma suivant, représentant les couches du modèle OSI:";

    let image = "img/couche_modele_OSI.png";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>\
    <img src='"+image+"' width='90%'>\
    <br>\
    <a href='"+image+"' target='_blank'>Schémas</a>\
    <br><br>\
    1 - Préciser la couche qui effectue le découpage des données:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    2 - En vous aidant du schéma, expliquer en quoi consiste l'encapsulation des données par la couche transport:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    3 - De même, expliquer en quoi consiste l'encapsulation des données par la couche réseau:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>";
}