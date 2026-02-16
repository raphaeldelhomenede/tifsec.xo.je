<?php
$redirects = json_decode('{
    "lxrLR1LoX6E": "https://is.gd/YS6zts",
    "ritRJJLiVLc": "https://is.gd/WJqb4P",
    "dzzB9pbXNKE": "https://is.gd/CgaVcx"
}', true);

if (isset($_GET["v"]) && array_key_exists($_GET["v"], $redirects)) { ?>
    <meta http-equiv="refresh" content="0; URL=<?= $redirects[$_GET["v"]] ?>" /><?php
    exit();
}
?>