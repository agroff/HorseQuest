Crafty.scene('Racing', function() {

    Track.reset();

    Track.generate();

    Crafty.e("SpeedBar").at(26,14);
    Crafty.e("StaminaBar").at(36,14);

    Track.ui();

    Crafty.e("HorseField").player(50).generate(Game.settings.horsesPerRace, 60, 10)

    Track.startRace();

    Crafty.bind("RaceFinished", function () {
            Crafty.scene("Town");
    });

}, function() {

});

