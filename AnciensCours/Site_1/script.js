function NavMenu()
{
    let chp_1 = "1 - Représentation des données types et valeurs de base";
    let chp_2 = "2 - Langages et programmation";
    let chp_3 = "3 - Représentation des données types construits";
    let chp_4 = "4 - Données en tables";
    let chp_5 = "5 - IHM et web";
    let chp_6 = "6 - Architecture et systèmes d'exploitation";
    let chp_7 = "7 - Réseaux et IHM";
    let chp_8 = "8 - Testes et diversité";
    let chp_9 = "9 - Algorithmique avancée";
    let chp_10 = "10 - Projets informatiques";

    document.getElementById('titre_principal').innerText = "Année de 1°";

    document.getElementById('nav_menu').innerHTML = 
    "<ul class='ul_menu'>\
        <li id='chp_1'>\
            <toto onclick='Cours1()'>\
                <div><p>"+chp_1+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_2'>\
            <toto onclick='Cours2()'>\
                <div><p>"+chp_2+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_3'>\
            <toto onclick='Cours3()'>\
                <div><p>"+chp_3+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_4'>\
            <toto onclick='Cours4()'>\
                <div><p>"+chp_4+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_5'>\
            <toto onclick='Cours5()'>\
                <div><p>"+chp_5+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_6'>\
            <toto onclick='Cours6()'>\
                <div><p>"+chp_6+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_7'>\
            <toto onclick='Cours7()'>\
                <div><p>"+chp_7+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_8'>\
            <toto onclick='Cours8()'>\
                <div><p>"+chp_8+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_9'>\
            <toto onclick='Cours9()'>\
                <div><p>"+chp_9+"</p></div>\
            </toto>\
        </li>\
        <li id='chp_10'>\
            <toto onclick='Cours10()'>\
                <div><p>"+chp_10+"</p></div>\
            </toto>\
        </li>\
    </ul>";

    document.getElementById('nav_menu').style.display = 'block';
    document.getElementById('content').style.display = 'none';
    document.getElementById('rtr_btn').style.display = 'none';
}

/* Cours 1_representation_des_donnees_types_et_valeurs_de_base */

function Cours1()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('source_iframe').style.height = '80vh';

    document.getElementById('titre_principal').innerText = 
    "1 - Représentation des données, types et valeurs de base";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Représentation des entiers naturels en binaire";
    let titre_2 = "2 - Opérations fondamentales de l'algèbre booléenne";
    let titre_3 = "3 - Codage des nombres à virgule";
    let titre_4 = "4 - Les enjeux du codage des nombres";
    let titre_5 = "5 - Histoires des sciences";
    let titre_6 = "6 - Représentation des entiers relatifs";
    let titre_7 = "7 - Fonctions logiques composées et lois de l'algèbre booléenne";
    let titre_8 = "8 - Représentation d'un texte en machine";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='Cours1_1(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='Cours1_2(), SelectedLi(this.id);'>"+titre_2+"</li>\
            <li id='cours3' onclick='Cours1_3(), SelectedLi(this.id);'>"+titre_3+"</li>\
            <li id='cours4' onclick='Cours1_4(), SelectedLi(this.id);'>"+titre_4+"</li>\
            <li id='cours5' onclick='Cours1_5(), SelectedLi(this.id);'>"+titre_5+"</li>\
            <li id='cours6' onclick='Cours1_6(), SelectedLi(this.id);'>"+titre_6+"</li>\
            <li id='cours7' onclick='Cours1_7(), SelectedLi(this.id);'>"+titre_7+"</li>\
            <li id='cours8' onclick='Cours1_8(), SelectedLi(this.id);'>"+titre_8+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/1_representation_des_entiers_naturels_en_binaire.pdf";
}

function Cours1_1()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/1_representation_des_entiers_naturels_en_binaire.pdf";
}

function Cours1_2()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/2_operations_fondamentales_de_l_algebre_booleenne.pdf";
}

function Cours1_3()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/3_codage_des_nombres_a_virgule.pdf";
}

function Cours1_4()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/4_les_enjeux_du_codage_des_nombres.pdf";
}

function Cours1_5()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/5_histoires_des_sciences.pdf";
}

function Cours1_6()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/6_representation_des_entiers_relatifs.pdf";
}

function Cours1_7()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/7_fonctions_logiques_composees_et_lois_de_l_algebre_booleenne.pdf";
}

function Cours1_8()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "1_representation_des_donnees_types_et_valeurs_de_base/pdf/8_representation_d_un_texte_en_machine.pdf";
}

/* Cours 2_langages_et_programmation */

function Cours2()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('source_iframe').style.height = '80vh';

    document.getElementById('titre_principal').innerText = 
    "2 - Langages et programmation";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Les types de variables";
    let titre_2 = "2 - Opérations sur les variables";
    let titre_3 = "3 - Les conditions en Python";
    let titre_4 = "4 - Les fonctions";
    let titre_5 = "5 - Les modules Python";
    let titre_6 = "6 - L'instruction conditionnelle";
    let titre_7 = "7 - Les boucles bornées";
    let titre_8 = "8 - Les boucles non bornées";
    let titre_9 = "9 - Exos";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='Cours2_1(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='Cours2_2(), SelectedLi(this.id);'>"+titre_2+"</li>\
            <li id='cours3' onclick='Cours2_3(), SelectedLi(this.id);'>"+titre_3+"</li>\
            <li id='cours4' onclick='Cours2_4(), SelectedLi(this.id);'>"+titre_4+"</li>\
            <li id='cours5' onclick='Cours2_5(), SelectedLi(this.id);'>"+titre_5+"</li>\
            <li id='cours6' onclick='Cours2_6(), SelectedLi(this.id);'>"+titre_6+"</li>\
            <li id='cours7' onclick='Cours2_7(), SelectedLi(this.id);'>"+titre_7+"</li>\
            <li id='cours8' onclick='Cours2_8(), SelectedLi(this.id);'>"+titre_8+"</li>\
            <li id='cours9' onclick='Cours2_9(), SelectedLi(this.id);'>"+titre_9+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/1_les_types_de_variables.pdf";
}

function Cours2_1()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/1_les_types_de_variables.pdf";
}

function Cours2_2()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/2_operations_sur_les_variables.pdf";
}

function Cours2_3()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/3_les_conditions_en_python.pdf";
}

function Cours2_4()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/4_les_fonctions.pdf";
}

function Cours2_5()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/5_les_modules_python.pdf";
}

function Cours2_6()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/6_l_instruction_conditionnelle.pdf";
}

function Cours2_7()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/7_les_boucles_bornees.pdf";
}

function Cours2_8()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/8_les_boucles_non_bornees.pdf";
}

function Cours2_9()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "2_langages_et_programmation/pdf/9_exos.pdf";
}

/* Cours 3_representation_des_donnees_types_construits */

function Cours3()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('source_iframe').style.height = '80vh';

    document.getElementById('titre_principal').innerText = 
    "3 - Représentation des données et types construits";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Historique";
    let titre_2 = "2 - Types construits en Python";
    let titre_3 = "3 - Les p-uplets ou tuples";
    let titre_4 = "4 - Exos les tuples";
    let titre_5 = "5 - Les listes (tableaux)";
    let titre_6 = "6 - Exos les listes";
    let titre_7 = "7 - Les dictionnaires";
    let titre_8 = "8 - Exos les dictionnaires";
    let titre_9 = "9 - Préparer la terminale";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='Cours3_1(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='Cours3_2(), SelectedLi(this.id);'>"+titre_2+"</li>\
            <li id='cours3' onclick='Cours3_3(), SelectedLi(this.id);'>"+titre_3+"</li>\
            <li id='cours4' onclick='Cours3_4(), SelectedLi(this.id);'>"+titre_4+"</li>\
            <li id='cours5' onclick='Cours3_5(), SelectedLi(this.id);'>"+titre_5+"</li>\
            <li id='cours6' onclick='Cours3_6(), SelectedLi(this.id);'>"+titre_6+"</li>\
            <li id='cours7' onclick='Cours3_7(), SelectedLi(this.id);'>"+titre_7+"</li>\
            <li id='cours8' onclick='Cours3_8(), SelectedLi(this.id);'>"+titre_8+"</li>\
            <li id='cours9' onclick='Cours3_9(), SelectedLi(this.id);'>"+titre_9+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/1_historique.pdf";
}

function Cours3_1()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/1_historique.pdf";
}

function Cours3_2()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/2_types_construits_en_python.pdf";
}

function Cours3_3()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/3_les_p_uplets_ou_tuple.pdf";
}

function Cours3_4()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/4_exos_les_p_uplets_ou_tuple.pdf";
}

function Cours3_5()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/5_les_listes_(tableaux).pdf";
}

function Cours3_6()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/6_exos_les_listes_(tableaux).pdf";
}

function Cours3_7()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/7_les_dictionnaires.pdf";
}

function Cours3_8()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/8_exos_les_dictionnaires.pdf";
}

function Cours3_9()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "3_representation_des_donnees_types_construits/pdf/9_preparer_la_terminale.pdf";
}

/* Cours 4_donnees_en_tables */

function Cours4()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('source_iframe').style.height = '80vh';

    document.getElementById('titre_principal').innerText = "4 - Données en tables";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Données en tables";
    let titre_2 = "2 - Importation des tables";
    let titre_3 = "3 - Indexation de table";
    let titre_4 = "4 - Opération de selection des lignes d'une table";
    let titre_5 = "5 - Test de cohérence";
    let titre_6 = "6 - Trier une table";
    let titre_7 = "7 - Construire une nouvelle table";
    let titre_8 = "8 - Manipulation de tables avec la bibliothèque Pandas";
    let titre_9 = "9 - Exos Pandas";
    let titre_10 = "Ressources (fichiers CSV)";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='Cours4_1(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='Cours4_2(), SelectedLi(this.id);'>"+titre_2+"</li>\
            <li id='cours3' onclick='Cours4_3(), SelectedLi(this.id);'>"+titre_3+"</li>\
            <li id='cours4' onclick='Cours4_4(), SelectedLi(this.id);'>"+titre_4+"</li>\
            <li id='cours5' onclick='Cours4_5(), SelectedLi(this.id);'>"+titre_5+"</li>\
            <li id='cours6' onclick='Cours4_6(), SelectedLi(this.id);'>"+titre_6+"</li>\
            <li id='cours7' onclick='Cours4_7(), SelectedLi(this.id);'>"+titre_7+"</li>\
            <li id='cours8' onclick='Cours4_8(), SelectedLi(this.id);'>"+titre_8+"</li>\
            <li id='cours9' onclick='Cours4_9(), SelectedLi(this.id);'>"+titre_9+"</li>\
            <li id='cours10' onclick='SelectedLi(this.id);'>\
                <a class='dwd_title' href='4_donnees_en_tables/csv/csv.zip'>"+titre_10+"</a>\
            <i class='fa fa-download'></i></li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/1_donnees_en_tables.pdf";
}

function Cours4_1()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/1_donnees_en_tables.pdf";
}

function Cours4_2()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/2_importation_des_tables.pdf";
}

function Cours4_3()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/3_indexation_de_table.pdf";
}

function Cours4_4()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/4_operation_de_selection_des_lignes_d_une_table.pdf";
}

function Cours4_5()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/5_test_de_coherence.pdf";
}

function Cours4_6()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/6_trier_une_table.pdf";
}

function Cours4_7()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/7_construire_une_nouvelle_table.pdf";
}

function Cours4_8()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/8_manipulation_de_tables_avec_la_bibliotheque_pandas.pdf";
}

function Cours4_9()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "4_donnees_en_tables/pdf/9_exercices_pandas.pdf";
}

/* Cours 5_ihm_et_web */

function Cours5()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('source_iframe').style.height = '80vh';

    document.getElementById('titre_principal').innerText = "5 - IHM et Web";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Introduction";
    let titre_2 = "2 - Javascript";
    let titre_3 = "3 - Programmation";
    let titre_4 = "4 - HTTP";
    let titre_5 = "5 - Formulaires";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='Cours5_1(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='Cours5_2(), SelectedLi(this.id);'>"+titre_2+"</li>\
            <li id='cours3' onclick='Cours5_3(), SelectedLi(this.id);'>"+titre_3+"</li>\
            <li id='cours4' onclick='Cours5_4(), SelectedLi(this.id);'>"+titre_4+"</li>\
            <li id='cours5' onclick='Cours5_5(), SelectedLi(this.id);'>"+titre_5+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = 
    "5_ihm_et_web/html/1_introduction.html";
}

function Cours5_1()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "5_ihm_et_web/html/1_introduction.html";
}

function Cours5_2()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "5_ihm_et_web/html/2_javascript.html";
}

function Cours5_3()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "5_ihm_et_web/html/3_programmation.html";
}

function Cours5_4()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "5_ihm_et_web/html/4_http.html";
}

function Cours5_5()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "5_ihm_et_web/html/5_formulaires.html";
}

/* 6_architecture_et_systemes_d_exploitation */

function Cours6()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('source_iframe').style.height = '90vh';

    document.getElementById('titre_principal').innerText = "6 - Architecture et systèmes d'exploitation";

    document.getElementById('source_iframe').src = "6_architecture_et_systemes_d_exploitation/index_6.html";
}

/* 7_réseaux_et_IHM */

function Cours7()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('source_iframe').style.height = '90vh';

    document.getElementById('titre_principal').innerText = "7 - Réseaux et IHM";

    document.getElementById('source_iframe').src = "7_réseaux_et_IHM/index_7.html";
}

/* 8_testes_et_diversite */

function Cours8()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    /*document.getElementById('source_iframe').style.height = '80vh';*/

    document.getElementById('titre_principal').innerText = "8 - Testes et diversité";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Mise au point de programmes testés";
    let titre_2 = "2 - Diversité et unité des langages de programmation";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='Cours8_1(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='Cours8_2(), SelectedLi(this.id);'>"+titre_2+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = 
    "8_testes_et_diversite/pdf/1_mise_au_point_de_programmes_testes.pdf";
}

function Cours8_1()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "8_testes_et_diversite/pdf/1_mise_au_point_de_programmes_testes.pdf";
}

function Cours8_2()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "8_testes_et_diversite/pdf/2_diversite_unite_langage_programmation.pdf";
}

/* 9_algorithmique_avancee */

function Cours9()
{
    document.getElementById('nav_menu').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('rtr_btn').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('source_iframe').style.height = '80vh';

    document.getElementById('titre_principal').innerText = "9 - Algorithmique avancée";

    /* Créer les titre et sous-titres */
    let titre_1 = "1 - Algorithme des k plus proches voisins";
    let titre_2 = "2 - Recherche dichotomique";
    let titre_3 = "3 - Algorithmes gloutons";
    let titre_4 = "4 - Le problème du sac à dos";

    /* Créer le HTML des titres et sous-titres */
    document.getElementById("menu").innerHTML = 
    "<nav class='menu_hor' id='menu_hor'>\
        <ul id='ul_li'>\
            <li id='cours1' onclick='Cours9_1(), SelectedLi(this.id);'>"+titre_1+"</li>\
            <li id='cours2' onclick='Cours9_2(), SelectedLi(this.id);'>"+titre_2+"</li>\
            <li id='cours3' onclick='Cours9_3(), SelectedLi(this.id);'>"+titre_3+"</li>\
            <li id='cours4' onclick='Cours9_4(), SelectedLi(this.id);'>"+titre_4+"</li>\
        </ul>\
    </nav>";

    document.getElementById('cours1').style.backgroundColor = 'orange';

    /* On met la première page directement sur le premier cours */
    document.getElementById('source_iframe').src = 
    "9_algorithmique_avancee/pdf/1_algorithme_des_k_plus_proches_voisins.pdf";
}

function Cours9_1()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "9_algorithmique_avancee/pdf/1_algorithme_des_k_plus_proches_voisins.pdf";
}

function Cours9_2()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "9_algorithmique_avancee/pdf/2_recherche_dichotomique.pdf";
}

function Cours9_3()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "9_algorithmique_avancee/pdf/3_algorithmes_gloutons.pdf";
}

function Cours9_4()
{
    document.getElementById('source_iframe').style.display = 'block';
    document.getElementById('div_cours').style.display = 'none';

    document.getElementById('source_iframe').src = 
    "9_algorithmique_avancee/pdf/4_le_probleme_du_sac_a_dos.pdf";
}

/* Pour faire un effet de selection sur les menus de cours */

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
