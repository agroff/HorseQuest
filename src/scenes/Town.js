Crafty.scene('Town', function() {

    this.reset = function() {
        this.horses = [];
        Game.currentRace.order = [];
    };


    this.reset();

    Track.treeBox();

    var char = Crafty.e("PlayerCharacter").at(40,6);
    Game.player = char;
    char.h = 20
    char.w = 20


    Crafty.background("url('assets/town.png') ");

    Crafty.e("Building")
        .at(70,7)
        .image("spr_register")
        .entrance({w:250,h:50}, function(){
            Track.hud.goldBar.addGold(-40);

            Crafty.e("Dialog").dialog("enterRace", function(){
                Crafty.scene("Racing")
            });
        });

    Track.drawTownTrees();


    Crafty.e("Building")
        .at(75,13.5)
        .image("spr_bet")
        .entrance({x:250,y:250}, function(){
            Crafty.e("Dialog").dialog("enterBet", function(){
                Crafty.scene("Betting")
            });
        });




    Track.ui();
    Crafty.audio.play('town', -1,.2);

    if(!Game.progress.started) {
        Crafty.e("Dialog").dialog("start", function(){
            Game.progress.started = true;
        });
    }

});