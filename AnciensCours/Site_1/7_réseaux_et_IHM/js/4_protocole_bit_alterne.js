function ProBitAltAff1()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Activité 3";

    let intro = 
    "Le protocole du bit alterné (Alternating Bit Protocol) est un protocole de communication fonctionnant au niveau de la \
    couche liaison du modèle OSI.\
    <br><br>\
    1 - Rappeler ce qu'est un protocole de communication:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    Les trames sont envoyées de l'émetteur au récepteur. Au début, le canal entre l'émetteur et le récepteur est initialisé \
    et on suppose qu'il n'y a aucun message en transit sur le réseau. On fait l'hypothèse que les trames ne sont pas \
    corrompues. Chaque trame émise contient une partie des données et un numéro de séquence d'un bit (parfois appelé \
    bit alterné ou flag) qui ne peut prendre alternativement que deux valeurs: 0 ou 1.\
    <br>\
    On utilisera la notation 'TrameA/0' pour une trame A avec le bit à 0.\
    <img src='img/trame_a_0.png'>\
    <br>\
    Le récepteur n'a, quant à lui, que deux 'code d'aquittement' possibles: <b>ACK0</b> et <b>ACK1</b>, qui tiennent lieu \
    d'accusés de réception:\
    <br>\
    - ACK0 (acknowledgement) pour accuser réception d'une trame munie du bit à 0;\
    <br>\
    - ACK1 pour accuser réception d'une trame munie du bit 1.\
    <br><br>\
    La première trame attendue par le récepteur doit avoir le bit à 0 afin qu'il considère que c'est une trame réelle et \
    qu'elle ne fait pas partie des échanges de l'initialisation.\
    <img src='img/bit_alt_cas_1.png'>\
    <br>\
    2 - Décrire le comportement observé côté émetteur, puis côté récepteur:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function ProBitAltAff2()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Activité 3";

    let intro = 
    "L'émetteur possède une horloge interne symbolisée par deltaT. Pendant qu'une trame ou un acquittement est en transit, \
    une autre trame ou un autre acquittement peut être envoyé.\
    <img src='img/bit_alt_cas_2.png'>\
    <br>\
    3 - Dans le cas 1, le premier envoi de la trame A/0 n'arrive pas à destination.\
    <br><br>\
    Dans le cas 2, l'acquittement de la trame A/0 n'arrive pas à l'émetteur.\
    <br><br>\
    Décrire le comportement observé du côté émetteur.\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    4 - Ce protocole est-il résistant à la perte de trame ? à la perte d'acquittement ? Expliquer.\
    <br>\
    <input type='text' class='input_act_1_chp_2'>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function ProBitAltAff3()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Activité 3";

    let intro = 
    "<img src='img/bit_alt_cas_3.png'>\
    <br>\
    5 - Dans le cas 1, la première trame A/0 met un certain temps à arriver au récepteur. Dans le cas 2, la première \
    trame B/1 et l'accusé sont retardés.\
    <br>\
    Expliquer comment réagissent l'émetteur et le récepteur:\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    6 - Ce protocole est-il résistant aux retards lorsqu'ils ne sont pas trop importants ?\
    <br>\
    <input type='text' class='input_act_1_chp_2'>\
    <br><br>\
    7 - Imaginons le réseau surchargé et qu'une trame soit fortement retardée lors de son transit. \
    Pourriez-vous imaginer une faiblesse de ce protocole du bit alterné ?\
    <br>\
    <input type='text' class='input_act_1_chp_2'>";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}

function ProBitAltAff4()
{
    /* Affichage titres et sous-titres séquence */
    document.getElementById("h3_titre").innerHTML = "Activité 3";

    let intro = 
    "8 - Compléter les algorithmes de protocole côté émetteur et côté récepteur:\
    <table class='algo_bit'>\
        <tr>\
            <td><img src='img/bit_alt_algo.png'>\</td>\
            <td>\
                Algorithme de l'émetteur:\
                <br>\
                A: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                B: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                C: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                <br><br>\
                Algorithme du récepteur:\
                <br>\
                A: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                B: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                C: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                D: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                E: <input type='text' class='input_act_1_chp_2'>\
                <br>\
                F: <input type='text' class='input_act_1_chp_2'>\
            </td>\
        </tr>\
    </table>\
    ";

    /* Code HTML */
    document.getElementById("sous_content").innerHTML = 
    "<p id='contenu_par'>"+intro+"</p>";
}
