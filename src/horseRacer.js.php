<?php
header('Content-Type: application/javascript');

function incl($file)
{
    echo "\n\n//*****************************************//\n";
    echo "//*****************************************//\n";
    echo "//***         ".$file."        **//\n";
    echo "//*****************************************//\n";
    echo "//*****************************************//\n\n\n";
    require_once($file);
}

function includeFolder($directory)
{
    foreach (glob($directory . "/*.js") as $filename) {
        incl($filename);
    }
}


//incl('../lib/crafty.js');

incl('game/game.js');

includeFolder('game');
includeFolder('components');
includeFolder('dialogs');
includeFolder('scenes');

