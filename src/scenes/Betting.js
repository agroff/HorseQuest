Crafty.scene('Betting', function () {


    Track.reset();

    Track.generate();

    Track.ui();

    Crafty.e("HorseField").generate(Game.settings.horsesPerRace, 60, 14)


    var bets = Crafty.e("DomActor, HTML")
        .at(25, 14)
        .css({ "background-color" : "#444",
            "font-family"         : "mono",
            "color"               : "#fff",
            "display"               : "none",
            "border-radius"       : "6px",
            "padding-left"        : "5px" })
        .attr({ w : 200, h : 120, z: -1 });

    Crafty.bind("NewBet", function (bet) {
        bets.append('<p>' + bet.toString() + '</p>');
    });

    Crafty.bind("RaceStarting", function (bet) {
        bets.css({"display":"block"});
    });

    Crafty.bind("RaceFinished", function () {
        var order = Game.currentRace.order,
            dialog = Track.getBetReport(order);


        Crafty.e("Dialog").dialog(dialog, function(){
            Track.payBets(order);
            Crafty.scene("Town");
        });
    });

    Crafty.e("BetUI").attr({z:27});

    //    Crafty.e("Button").val("Win").at(7,7).click(function () {
    //        alert("regular")
    //    });

    //Track.startRace();

}, function () {

});

