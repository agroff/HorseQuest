Crafty.scene('Town', function() {

    this.reset = function() {
        this.horses = [];
        Game.currentRace.order = [];
    };

    Game.player.hide();
    Game.player.show();


    this.reset();

    Track.treeBox();


    Crafty.background("url('assets/town.png') ");

    Crafty.e("RegistrationTent").at(70,7);

    Track.drawTownTrees();


    Crafty.e("BettingBuilding").at(75,13.5);
    Crafty.e("Farm").at(14.2,1);
    Crafty.e("Tent").at(16,28);
    Crafty.e("Pub").at(51,1);
    Crafty.e("Lake").at(37,15);
    Crafty.e("Auction").at(64,30);
    Game.progress.started = true;

    Track.ui();

    Crafty.audio.play('town', -1,.2);

    if(!Game.progress.started) {
        Crafty.e("Dialog").dialog("start", function(){
            Game.progress.started = true;
        });
    }

});