function NavMenu()
{
    document.getElementById('nav_menu').style.display = 'block';
    document.getElementById('content').style.display = 'none';
    document.getElementById('rtr_btn').style.display = 'none';

    let chp_1 = "1 - Internet";
    let chp_2 = "2 - Le Web";
    let chp_3 = "3 - Les réseaux sociaux";
    let chp_4 = "4 - Les données structurées et leur traitement";
    let chp_5 = "5 - Localisation, cartographie et mobilité";
    let chp_6 = "6 - Informatique embarquée et objets connectés";
    let chp_7 = "7 - La photographie numérique";
    let chp_8 = "8 - Python";

    document.getElementById('titre_principal').innerText = "Année de 2°";

    document.getElementById('nav_menu').innerHTML = 
    "<ul class='ul_menu'>\
        <li id='chp_1'>\
            <a onclick='Cours1()'>\
                <div><p>"+chp_1+"</p></div>\
            </a>\
        </li>\
        <li id='chp_2'>\
            <a onclick='Cours2()'>\
                <div><p>"+chp_2+"</p></div>\
            </a>\
        </li>\
        <li id='chp_3'>\
            <a onclick='Cours3()'>\
                <div><p>"+chp_3+"</p></div>\
            </a>\
        </li>\
        <li id='chp_4'>\
            <a onclick='Cours4()'>\
                <div><p>"+chp_4+"</p></div>\
            </a>\
        </li>\
        <li id='chp_5'>\
            <a onclick='Cours5()'>\
                <div><p>"+chp_5+"</p></div>\
            </a>\
        </li>\
        <li id='chp_6'>\
            <a onclick='Cours6()'>\
                <div><p>"+chp_6+"</p></div>\
            </a>\
        </li>\
        <li id='chp_7'>\
            <a onclick='Cours7()'>\
                <div><p>"+chp_7+"</p></div>\
            </a>\
        </li>\
        <li id='chp_8'>\
            <a onclick='Cours8()'>\
                <div><p>"+chp_8+"</p></div>\
            </a>\
        </li>\
    </ul>";
}

/* 1_Internet */

function Cours1()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "1 - Internet";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Internet et TCP/IP";
    let titre_2 = "2 - Adresse et DNS";
    let titre_3 = "3 - Adresse exercices";
    let titre_4 = "4 - DNS exercices";
    let titre_5 = "5 - P2P et réseaux physique";
    let titre_6 = "6 - P2P exercices";
    let titre_7 = "Représentation réseaux";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(1, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(1, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(1, 2);'>"+titre_3+"</li>\
            <li id='cours4' onclick='SelectedLi(this.id), AffichageSousChapitre(1, 3);'>"+titre_4+"</li>\
            <li id='cours5' onclick='SelectedLi(this.id), AffichageSousChapitre(1, 4);'>"+titre_5+"</li>\
            <li id='cours6' onclick='SelectedLi(this.id), AffichageSousChapitre(1, 5);'>"+titre_6+"</li>\
            <li id='cours7' onclick='SelectedLi(this.id), AffichageSousChapitre(1, 6);'>"+titre_7+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "1_internet/1 - Internet et TCP IP.pdf";
}

/* 2_Le_Web */

function Cours2()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "2 - Le Web";

    /* Créer les titre et sous-titres*/
    let titre_1 = "1 - Introduction";
    let titre_2 = "2 - Historique";
    let titre_3 = "3 - Affichage d'une page Web";
    let titre_4 = "4 - Les moteurs de recherche";
    let titre_5 = "5 - Création d'une page Web";
    let titre_6 = "Activité";
    let titre_7 = "Dossier ressources";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(2, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(2, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(2, 2);'>"+titre_3+"</li>\
            <li id='cours4' onclick='SelectedLi(this.id), AffichageSousChapitre(2, 3);'>"+titre_4+"</li>\
            <li id='cours5' onclick='SelectedLi(this.id), AffichageSousChapitre(2, 4);'>"+titre_5+"</li>\
            <li id='cours6' onclick='SelectedLi(this.id), AffichageSousChapitre(2, 5);'>"+titre_6+"</li>\
            <li id='cours7'><a href='2_le_web/ressources.zip'>"+titre_7+"</a></li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "2_le_web/1_intro.pdf";
}

/* 3_les_reseaux_sociaux */

function Cours3()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "3 - Les réseaux sociaux";

    /* Créer les titre et sous-titres*/
    let titre_1 = "1 - Introduction";
    let titre_2 = "2 - Glossaire";
    let titre_3 = "3 - Frise chronologique";
    let titre_4 = "4 - Les réseaux et vous";
    let titre_5 = "5 - Les modèles économiques des réseaux sociaux";
    let titre_6 = "6 - Exercice";
    let titre_7 = "7 - Analyse d'un réseaux social";
    let titre_8 = "8 - Gestion des données des réseaux sociaux";
    let titre_9 = "9 - Exercice";
    let titre_10 = "10 - Le harcelement a portée de clic";
    let titre_11 = "11 - La cyberviolence";
    let titre_12 = "12 - Modélisation des réseaux sociaux";
    let titre_13 = "13 - Tableaux a double entrée";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 2);'>"+titre_3+"</li>\
            <li id='cours4' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 3);'>"+titre_4+"</li>\
            <li id='cours5' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 4);'>"+titre_5+"</li>\
            <li id='cours6' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 5);'>"+titre_6+"</li>\
            <li id='cours7' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 6);'>"+titre_7+"</li>\
            <li id='cours8' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 7);'>"+titre_8+"</li>\
            <li id='cours9' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 8);'>"+titre_9+"</li>\
            <li id='cours10' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 9);'>"+titre_10+"</li>\
            <li id='cours11' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 10);'>"+titre_11+"</li>\
            <li id='cours12' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 11);'>"+titre_12+"</li>\
            <li id='cours13' onclick='SelectedLi(this.id), AffichageSousChapitre(3, 12);'>"+titre_13+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "3_les_reseaux_sociaux/html/1_introduction.html";
}

/* 4_donnees_structurees_et_traitement */

function Cours4()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "4 - Les données structurées et leur traitement";

    /* Créer les titre et sous-titres*/
    let titre_1 = "1 - Introduction";
    let titre_2 = "2 - Glossaire";
    let titre_3 = "3 - Frise chronologique";
    let titre_4 = "4 - Données structurées";
    let titre_5 = "5 - Exercices";
    let titre_6 = "6 - Exercices";
    let titre_7 = "7 - VCard";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(4, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(4, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(4, 2);'>"+titre_3+"</li>\
            <li id='cours4' onclick='SelectedLi(this.id), AffichageSousChapitre(4, 3);'>"+titre_4+"</li>\
            <li id='cours5' onclick='SelectedLi(this.id), AffichageSousChapitre(4, 4);'>"+titre_5+"</li>\
            <li id='cours6' onclick='SelectedLi(this.id), AffichageSousChapitre(4, 5);'>"+titre_6+"</li>\
            <li id='cours7' onclick='SelectedLi(this.id), AffichageSousChapitre(4, 6);'>"+titre_7+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "4_donnees_structurees_et_traitement/html/1_introduction.html";
}

/* 5_localisation_cartographie_mobilite */

function Cours5()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "5 - Localisation, cartographie et mobilité";

    /* Créer les titre et sous-titres*/
    let titre_1 = "1 - Introduction";
    let titre_2 = "2 - Glossaire";
    let titre_3 = "3 - Frise chronologique";
    let titre_4 = "4 - Principe de fonctionnement de la géolocalisation";
    let titre_5 = "5 - Des métadonnées d'une photographie à la détermination d'un itinéraire avec OpenStreetMap";
    let titre_6 = "6 - Une autre introduction à la géolocalisation";
    let titre_7 = "7 - La trame NMEA";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(5, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(5, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(5, 2);'>"+titre_3+"</li>\
            <li id='cours4' onclick='SelectedLi(this.id), AffichageSousChapitre(5, 3);'>"+titre_4+"</li>\
            <li id='cours5' onclick='SelectedLi(this.id), AffichageSousChapitre(5, 4);'>"+titre_5+"</li>\
            <li id='cours6' onclick='SelectedLi(this.id), AffichageSousChapitre(5, 5);'>"+titre_6+"</li>\
            <li id='cours7' onclick='SelectedLi(this.id), AffichageSousChapitre(5, 6);'>"+titre_7+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "5_localisation_cartographie_mobilite/html/1_introduction.html";
}

/* 6_informatique_embarquee_et_objets_connectes */

function Cours6()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "6 - Informatique embarquée et objets connectés";

    /* Créer les titre et sous-titres*/
    let titre_1 = "1 - Introduction";
    let titre_2 = "2 - Glossaire";
    let titre_3 = "3 - Frise chronologique";
    let titre_4 = "4 - Impact et importance de l'informatisation des objets";
    let titre_5 = "5 - Réalisation d'une IHM simple d'un objet connecté";
    let titre_6 = "6 - Exercices";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(6, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(6, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(6, 2);'>"+titre_3+"</li>\
            <li id='cours4' onclick='SelectedLi(this.id), AffichageSousChapitre(6, 3);'>"+titre_4+"</li>\
            <li id='cours5' onclick='SelectedLi(this.id), AffichageSousChapitre(6, 4);'>"+titre_5+"</li>\
            <li id='cours6' onclick='SelectedLi(this.id), AffichageSousChapitre(6, 5);'>"+titre_6+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "6_informatique_embarquee_et_objets_connectes/html/1_introduction.html";
}

/* 7_la_photographie_numerique */

function Cours7()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "7 - La photographie numérique";

    /* Créer les titre et sous-titres*/
    let titre_1 = "1 - Apprendre a manipuler une image";
    let titre_2 = "2 - Traitement d'images";
    let titre_3 = "3 - La photographie numérique Python";
    let titre_4 = "4 - Activité 1";
    let titre_5 = "5 - Activité 2";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(7, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(7, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(7, 2);'>"+titre_3+"</li>\
            <li id='cours4' onclick='SelectedLi(this.id), AffichageSousChapitre(7, 3);'>"+titre_4+"</li>\
            <li id='cours5' onclick='SelectedLi(this.id), AffichageSousChapitre(7, 4);'>"+titre_5+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "7_la_photographie_numerique/pdf/1_apprendre_a_manipuler_une_image_numerique.pdf";
}

/* 8_python */

function Cours8()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';

    document.getElementById('titre_principal').innerText = "8 - Python";

    /* Créer les titre et sous-titres*/
    let titre_1 = "1 - Les types de variables";
    let titre_2 = "2 - Opération sur les variables";
    let titre_3 = "3 - Les conditions en Python";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='SelectedLi(this.id), AffichageSousChapitre(8, 0);'>"+titre_1+"</li>\
            <li id='cours2' onclick='SelectedLi(this.id), AffichageSousChapitre(8, 1);'>"+titre_2+"</li>\
            <li id='cours3' onclick='SelectedLi(this.id), AffichageSousChapitre(8, 2);'>"+titre_3+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = "8_python/pdf/1_les_types_de_variables.pdf";
}

/* Pour afficher chaques sous-chapitres */

function AffichageSousChapitre(id_chapitre, sous_chapitre)
{
    let cours = [];

    switch(id_chapitre)
    {
        case 1:
            cours = [
                "1_internet/1 - Internet et TCP IP.pdf",
                "1_internet/2 - Adresse et DNS.pdf",
                "1_internet/3 - Adresse Exo.pdf",
                "1_internet/4 - DNS Exo.pdf",
                "1_internet/5 - P2P et Réseaux physique.pdf",
                "1_internet/6 - P2P Exo.pdf",
                "1_internet/Representation_reseaux.pdf"
            ];
        
            break;

        case 2:
            cours = [
                "2_le_web/1_intro.pdf",
                "2_le_web/2_historique.pdf",
                "2_le_web/3_affichage_page_web.pdf",
                "2_le_web/4_les_moteurs_de_recherche.pdf",
                "2_le_web/5_création_d_une_page_web.pdf",
                "2_le_web/activite.pdf"
            ];
        
            break;

        case 3:
            cours = [
                "3_les_reseaux_sociaux/html/1_introduction.html",
                "3_les_reseaux_sociaux/html/2_glossaire.html",
                "3_les_reseaux_sociaux/html/3_frise_chrono.html",
                "3_les_reseaux_sociaux/html/4_les_reseaux_et_vous.html",
                "3_les_reseaux_sociaux/html/5_les_modeles_eco_reseaux_sociaux.html",
                "3_les_reseaux_sociaux/html/6_exercice.html",
                "3_les_reseaux_sociaux/html/7_analyse_d_un_reseau_social.html",
                "3_les_reseaux_sociaux/html/8_gestion_donnes_reseaux_sociaux.html",
                "3_les_reseaux_sociaux/html/9_exercice.html",
                "3_les_reseaux_sociaux/html/10_harcelement_a_portee_de_clic.html",
                "3_les_reseaux_sociaux/html/11_cyberviolence.html",
                "3_les_reseaux_sociaux/html/12_modelisation_reseaux_sociaux.html",
                "3_les_reseaux_sociaux/html/13_tableaux_double_entree.html"
            ];
        
            break;

        case 4:
            cours = [
                "4_donnees_structurees_et_traitement/html/1_introduction.html",
                "4_donnees_structurees_et_traitement/html/2_glossaire.html",
                "4_donnees_structurees_et_traitement/html/3_frise_chrono.html",
                "4_donnees_structurees_et_traitement/html/4_donnees_structurees.html",
                "4_donnees_structurees_et_traitement/html/5_exercice.html",
                "4_donnees_structurees_et_traitement/html/6_exercice.html",
                "4_donnees_structurees_et_traitement/html/7_vcard.html"
            ];

            break;

        case 5:
            cours = [
                "5_localisation_cartographie_mobilite/html/1_introduction.html",
                "5_localisation_cartographie_mobilite/html/2_glossaire.html",
                "5_localisation_cartographie_mobilite/html/3_frise_chrono.html",
                "5_localisation_cartographie_mobilite/html/4_principe_geoloc.html",
                "5_localisation_cartographie_mobilite/html/5_metadonnees_et_openstreetmap.html",
                "5_localisation_cartographie_mobilite/html/6_intro_geoloc.html",
                "5_localisation_cartographie_mobilite/html/7_nmea.html"
            ];

            break;

        case 6:
            cours = [
                "6_informatique_embarquee_et_objets_connectes/html/1_introduction.html",
                "6_informatique_embarquee_et_objets_connectes/html/2_glossaire.html",
                "6_informatique_embarquee_et_objets_connectes/html/3_frise_chrono.html",
                "6_informatique_embarquee_et_objets_connectes/html/4_impact_importance_informatisation_objets.html",
                "6_informatique_embarquee_et_objets_connectes/html/5_ihm_simple_objet_connecte.html",
                "6_informatique_embarquee_et_objets_connectes/html/6_exercice.html"
            ];

            break;

        case 7:
            cours = [
                "7_la_photographie_numerique/pdf/1_apprendre_a_manipuler_une_image_numerique.pdf",
                "7_la_photographie_numerique/pdf/2_traitement_d_images.pdf",
                "7_la_photographie_numerique/pdf/3_la_photographie_numerique_python.pdf",
                "7_la_photographie_numerique/pdf/4_activite_1_de_l_acquisition_a_l_image.pdf",
                "7_la_photographie_numerique/pdf/5_activite_2_l_image_numerique.pdf"
            ];

            break;
        
        case 8:
            cours = [
                "8_python/pdf/1_les_types_de_variables.pdf",
                "8_python/pdf/2_operations_sur_les_variables.pdf",
                "8_python/pdf/3_les_conditions_en_python.pdf"
            ];

            break;
    }
    document.getElementById('source_iframe').src = cours[sous_chapitre];
}

/* Pour faire un effet de selection de bouton */

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
