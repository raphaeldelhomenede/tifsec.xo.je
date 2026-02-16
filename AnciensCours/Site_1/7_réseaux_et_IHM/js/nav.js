function ChpAff()
{
    /* Affichage titre de la séquence lors du onload */
    document.getElementById("titre").innerHTML = "7 - Réseaux et IHM";
}

function Menu()
{
    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Introduction";
    let titre_2 = "2 - Etude d'un réseau local";
    let titre_3 = "3 - Découpage en paquets et encapsulation";
    let titre_4 = "4 - Le protocole du bit alterné"
    let titre_5 = "5 - Les protocoles de communication";
    let titre_6 = "6 - Interface Homme-Machine";

    let lien_6 = "https://www.copadata.com/fr/produits/zenon-software-platform/visualisation-controle/quest-ce-qu-une-ihm-interface-homme-machine-copa-data/"

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='LeftMenuAff1(), IntroAff(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='LeftMenuAff2(), ActAff1(), SelectedLi(this.id);'>"+titre_2+"</li>\
            <li id='cours3' onclick='LeftMenuAff3(), ActAff2_1(), SelectedLi(this.id);'>"+titre_3+"</li>\
            <li id='cours4' onclick='LeftMenuAff4(), ProBitAltAff1(), SelectedLi(this.id);'>"+titre_4+"</li>\
            <li id='cours5' onclick='LeftMenuAff5(), ProtCom1(), SelectedLi(this.id);'>"+titre_5+"</li>\
            <li id='cours6'><a href="+lien_6+" target='_blank'>"+titre_6+"</a></li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    document.getElementById('menu_left').innerHTML = 
    "<ul id='left_menu'></ul>";
}

function LeftMenuAff1()
{
    /*document.getElementById("h1_titre").innerHTML = "1 - Introduction";*/

    let titre_1_1 = "Petite introduction";
    let titre_1_2 = "Anecdote 1";
    let titre_1_3 = "Anecdote 2";
    let titre_1_4 = "Repères historiques";

    document.getElementById('left_menu').innerHTML = 
    "<li id='cours1_1' onclick='IntroAff(), SelectedLeftLi(this.id);'>"+titre_1_1+"</li>\
    <li id='cours1_2' onclick='Anec1Aff(), SelectedLeftLi(this.id);'>"+titre_1_2+"</li>\
    <li id='cours1_3' onclick='Anec2Aff(), SelectedLeftLi(this.id);'>"+titre_1_3+"</li>\
    <li id='cours1_4' onclick='RepHistoAff(), SelectedLeftLi(this.id);'>"+titre_1_4+"</li>";

    document.getElementById('cours1_1').style.backgroundColor = 'orange';
}

function LeftMenuAff2()
{
    /*document.getElementById("h1_titre").innerHTML = "2 - Etude d'un réseau local";*/

    let titre_2_1 = "- Activité 1";
    let titre_2_2 = "- Définitions";
    let titre_2_3 = "- Adresses réseau";
    let titre_2_4 = "- Routage";
    let titre_2_5 = "- Commandes réseaux pour Linux";

    document.getElementById('left_menu').innerHTML = 
    "<li id='cours2_1' onclick='ActAff1(), SelectedLeftLi(this.id);'>"+titre_2_1+"</li>\
    <li id='cours2_2' onclick='DefsAff(), SelectedLeftLi(this.id);'>"+titre_2_2+"</li>\
    <li id='cours2_3' onclick='AdResAff(), SelectedLeftLi(this.id);'>"+titre_2_3+"</li>\
    <li id='cours2_4' onclick='RoutAff(), SelectedLeftLi(this.id);'>"+titre_2_4+"</li>\
    <li id='cours2_5' onclick='ComResLinAff(), SelectedLeftLi(this.id);'>"+titre_2_5+"</li>";

    document.getElementById('cours2_1').style.backgroundColor = 'orange';
}

function LeftMenuAff3()
{
    /*document.getElementById("h1_titre").innerHTML = "3 - Découpage en paquets et encapsulation";*/

    let titre_3_1 = "- Activité 2_1";
    let titre_3_2 = "- Activité 2_2";

    document.getElementById('left_menu').innerHTML = 
    "<li id='cours3_1' onclick='ActAff2_1(), SelectedLeftLi(this.id);'>"+titre_3_1+"</li>\
    <li id='cours3_2' onclick='ActAff2_2(), SelectedLeftLi(this.id);'>"+titre_3_2+"</li>";

    document.getElementById('cours3_1').style.backgroundColor = 'orange';
}

function LeftMenuAff4()
{
    /*document.getElementById("h1_titre").innerHTML = "4 - Le protocole du bit alterné";*/

    let titre_4_1 = "- Activité 3_1";
    let titre_4_2 = "- Activité 3_2";
    let titre_4_3 = "- Activité 3_3";
    let titre_4_4 = "- Activité 3_4";

    document.getElementById('left_menu').innerHTML = 
    "<li id='cours4_1' onclick='ProBitAltAff1(), SelectedLeftLi(this.id);'>"+titre_4_1+"</li>\
    <li id='cours4_2' onclick='ProBitAltAff2(), SelectedLeftLi(this.id);'>"+titre_4_2+"</li>\
    <li id='cours4_3' onclick='ProBitAltAff3(), SelectedLeftLi(this.id);'>"+titre_4_3+"</li>\
    <li id='cours4_4' onclick='ProBitAltAff4(), SelectedLeftLi(this.id);'>"+titre_4_4+"</li>";

    document.getElementById('cours4_1').style.backgroundColor = 'orange';
}

function LeftMenuAff5()
{
    /*document.getElementById("h1_titre").innerHTML = "5 - Les protocoles de communication";*/

    let titre_5_1 = "- IP, TCP, HTTP, DNS";
    let titre_5_2 = "- Couches réseaux";
    let titre_5_3 = "- Découpage de données en paquets";
    let titre_5_4 = "- Protocole du bit alterné";

    document.getElementById('left_menu').innerHTML = 
    "<li id='cours5_1' onclick='ProtCom1(), SelectedLeftLi(this.id);'>"+titre_5_1+"</li>\
    <li id='cours5_2' onclick='ProtCom2(), SelectedLeftLi(this.id);'>"+titre_5_2+"</li>\
    <li id='cours5_3' onclick='ProtCom3(), SelectedLeftLi(this.id);'>"+titre_5_3+"</li>\
    <li id='cours5_4' onclick='ProtCom4(), SelectedLeftLi(this.id);'>"+titre_5_4+"</li>";

    document.getElementById('cours5_1').style.backgroundColor = 'orange';
}

function SelectedLi(mon_id)
{
    let ul_li = document.getElementById('ul_li');
    let list = ul_li.getElementsByTagName('li');

    for(var i = 0; i < list.length; i++)
    {
        if(mon_id == list[i].id)
        {
            document.getElementById(mon_id).style.backgroundColor = 'orange';
        }
        else
        {
            document.getElementById(list[i].id).style.backgroundColor = 'cornflowerblue';
        }
    }
}

function SelectedLeftLi(mon_id)
{
    let ul_li = document.getElementById('left_menu');
    let list = ul_li.getElementsByTagName('li');

    for(var i = 0; i < list.length; i++)
    {
        if(mon_id == list[i].id)
        {
            document.getElementById(mon_id).style.backgroundColor = 'orange';
        }
        else
        {
            document.getElementById(list[i].id).style.backgroundColor = 'cornflowerblue';
        }
    }
}