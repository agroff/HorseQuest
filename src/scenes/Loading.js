// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function () {
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x : 0, y : Game.height() / 2 - 24, w : Game.width() })
        .css($text_css);

    // Load our sprite map image
    Crafty.load(['assets/16x16_forest_1.gif',
        'assets/sound/horn.ogg',
        'assets/sound/town.ogg',
        'assets/sound/goldUp.ogg',
        'assets/sound/goldDown.ogg',
        'assets/sound/click.ogg',
        'assets/sound/nope.ogg',
        'assets/sound/boost.ogg',
        'assets/town.png',
        'assets/components.png',
        'assets/dialogFade.png',
        'assets/ui.png',
        'assets/dialog.png',
        'assets/horse.png'], function () {

        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite
        Crafty.sprite(16, 'assets/16x16_forest_1.gif', {
            spr_tree    : [0, 0],
            spr_bush    : [1, 0],
            spr_village : [0, 1]
        });

        Crafty.sprite(122, 101, 'assets/components.png', {
            //        Crafty.sprite(101, 101, 'assets/components.png', {
            spr_register : [0, 0],
            spr_bet      : [0, 1]
        });

        //        Crafty.sprite(192, 103, 'assets/hud.png', {
        //            spr_gold:    [0, 0]
        //        });

        // Define the sprite for horses
        Crafty.sprite(49, 'assets/horse.png', {
            spr_horse : [0, 0]
        }, 0, 2);

        Crafty.sprite(16, 'assets/hunter.png', {
            spr_player : [0, 2]
        }, 0, 2);


        Crafty.sprite(37, 'assets/ui.png', {
            number_1      : [0, 0, 2, 2],
            number_2      : [2, 0, 2, 2],
            number_3      : [4, 0, 2, 2],
            number_4      : [6, 0, 2, 2],
            number_5      : [0, 2, 2, 2],
            number_6      : [2, 2, 2, 2],
            number_7      : [4, 2, 2, 2],
            number_8      : [6, 2, 2, 2],
            spr_blank     : [9, 1, 2, 2],
            spr_upArrow   : [6, 5, 1, .5],
            spr_downArrow : [6, 5.5, 1, .5],
            spr_bttn      : [0, 6, 2.2, 1],
            spr_bttnDark  : [0, 7, 2.2, 1],
            spr_bttnBig   : [0, 8, 2.6, 1],
            spr_coins     : [5, 5, 1, 1],
            spr_hole      : [7, 5, 1, 1],
            spr_first     : [5, 6, 1, 1],
            spr_second    : [5, 7, 1, 1],
            spr_third     : [5, 8, 1, 1],
            spr_betBox    : [8, 0, 5, 3.6],
            spr_tent: [13, 0, 2, 1],
            spr_farm: [8, 4, 8, 3.5],
            spr_pub: [13, 1.3, 2.2, 1.7],
            spr_lake: [7, 8, 7, 3.2],
            spr_auction: [0, 9, 3.5, 2.6],
            spr_cancel    : [3, 6, 1, 2]
        });

//        Crafty.e("2D, DOM, Grid, number_1").at(3, 3);
//        Crafty.e("2D, DOM, Grid, number_2").at(8, 3);
//        Crafty.e("2D, DOM, Grid, number_3").at(13, 3);
//        Crafty.e("2D, DOM, Grid, number_4").at(18, 3);
//        Crafty.e("2D, DOM, Grid, number_5").at(3, 9);
//        Crafty.e("2D, DOM, Grid, number_6").at(8, 9);
//        Crafty.e("2D, DOM, Grid, number_7").at(13, 9);
//        Crafty.e("2D, DOM, Grid, number_8").at(18, 9);
        Crafty.e("2D, DOM, Grid, spr_upArrow").at(18, 14);
        Crafty.e("2D, DOM, Grid, spr_downArrow").at(18, 15);
        Crafty.e("2D, DOM, Grid, spr_bttn").at(3, 22);
        Crafty.e("2D, DOM, Grid, spr_bttnDark").at(3, 25);
        Crafty.e("2D, DOM, Grid, spr_bttnBig").at(3, 28);

        var y = 4;
        var x = 26;
        Crafty.e("2D, DOM, Grid, spr_coins").at(x, y);
        y += 4;
        Crafty.e("2D, DOM, Grid, spr_hole").at(x, y);
        y += 4;
        Crafty.e("2D, DOM, Grid, spr_first").at(x, y);
        y += 4;
        Crafty.e("2D, DOM, Grid, spr_second").at(x, y);
        y += 4;
        Crafty.e("2D, DOM, Grid, spr_third").at(x, y);
        y += 4;
        Crafty.e("2D, DOM, Grid, spr_cancel").at(x, y);
        y += 4;
        Crafty.e("2D, DOM, Grid, spr_betBox").at(x, y);
        y += 4;

        x+= 6;
        y = 2;
        Crafty.e("2D, DOM, Grid, spr_farm").at(x, y);
        x+= 17;
        Crafty.e("2D, DOM, Grid, spr_lake").at(x, y);
        y += 10
        x -= 19
        Crafty.e("2D, DOM, Grid, spr_tent").at(x, y);
        x+= 4
        Crafty.e("2D, DOM, Grid, spr_pub").at(x, y);
        x+= 7
        Crafty.e("2D, DOM, Grid, spr_auction").at(x, y);

        Crafty.e("Button").at(3, 20).click(function () {
            alert("regular")
        });
        Crafty.e("Button").at(3, 24).type("Dark").click(function () {
            alert("Dark")
        })
        Crafty.e("Button").at(3, 28).type("Big").click(function () {
            alert("Big")
        })


        Crafty.audio.add({
            town     : ['assets/sound/town.ogg'],
            horn     : ['assets/sound/horn.ogg'],
            goldUp   : ['assets/sound/goldUp.ogg'],
            goldDown : ['assets/sound/goldDown.ogg'],
            boost: ['assets/sound/boost.ogg'],
            click: ['assets/sound/click.ogg'],
            nope: ['assets/sound/nope.ogg']
        });


        var char = Crafty.e("PlayerCharacter").at(40, 6);
        Game.player = char;
        char.h = 20
        char.w = 20
        Game.player.at(62,10);

        // Now that our sprites are ready to draw, start the game
//        Crafty.scene('Betting');
        Crafty.scene('Town');


    })
}, function () {
    //Crafty.au
});