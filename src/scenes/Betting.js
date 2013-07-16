Crafty.scene('Betting', function () {
    Game.player.at(78,20);
    Game.player.hide();
    Game.currentRace.type = "bet";

    Track.reset();

    Track.generate();

    Track.ui();

    Crafty.e("HorseField").generate(Game.settings.horsesPerRace, 70, 14)


    var bets = Crafty.e("BetBoard");

    Crafty.bind("NewBet", function (bet) {
        bets.append('<p>' + bet.toString() + '</p>');
    });

    Crafty.bind("RaceStarting", function (bet) {
        bets.css({"display":"block"});
    });

    Crafty.e("BetUI").attr({z:27});

    //    Crafty.e("Button").val("Win").at(7,7).click(function () {
    //        alert("regular")
    //    });

    //Track.startRace();

}, function () {

});

