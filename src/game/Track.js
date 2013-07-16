Track = {

    hud : {

    },

    townTrees : [
        //TOP PART
        [72, 1],
        [71, 1],
        [71, 2],
        [71, 6],
        [71, 7],
        [70, 1],
        [70, 2],
        [70, 3],
        [70, 4],
        [70, 5],
        [70, 6],
        [70, 7],
        [69, 1],
        [69, 2],
        [69, 3],
        [69, 4],
        [68, 1],
        [68, 2],
        [68, 3],
        [67, 1],
        [66, 1],
        [66, 5],
        //END TOP PART

        //Between Buildings
        [74, 13],
        [75, 12],
        [75, 13],
        [75, 14],
        [76, 14],
        [76, 15],
        //END Between Buildings
        [82, 18],

        [1, 2]
    ],

    distance : function (x1, y1, x2, y2) {
        var x, y, d;
        x = x2 - x1;
        x = x * x;
        y = y2 - y1;
        y = y * y;

        d = Math.sqrt(x + y)

        return d;
    },

    reset: function(){
        this.horses = [];
        Game.currentRace.order = [];
        Game.currentRace.horses = [];
        Game.currentRace.started = false;
    },

    generate : function () {
        Crafty.background('rgb(87, 109, 20)');

        var insideStart = 22,
            circleRadius = 8,
            top = 11,
            width = 40,
            centerTop = top + circleRadius;

        Draw.trackCircle("Bush", insideStart, centerTop, circleRadius);
        Draw.trackCircle("Bush", (insideStart + width), centerTop, circleRadius);
        Draw.trackCenter(insideStart, top, width, 16);

        this.treeBox();

        Crafty.e("FinishLine").at(20, 27);
        Draw.finishLine(20, 27, 3, 13);

        this.addDestinations();
    },

    addDestinations : function () {
        var top = 9,
            bottom = 27,
            topMiddle = 8,
            bottomMiddle = 28;
        Crafty.e('DestinationPoint').at(67, top).order(1).directionTo(DIR.e);
        Crafty.e('DestinationPoint').at(67, bottomMiddle).order(2).directionTo(DIR.s);
        Crafty.e('DestinationPoint').at(16, bottom).order(3).directionTo(DIR.w);
        Crafty.e('DestinationPoint').at(17, topMiddle).order(4).directionTo(DIR.n);
    },

    drawTownTrees : function () {
        var trees = this.townTrees, leaves;
        for (leaves in trees) {

            Crafty.e('Tree').at(trees[leaves][0], trees[leaves][1]);
        }
    },

    treeBox : function () {
        // Place a tree at every edge square on our grid of 16x16 tiles
        for (var x = 0; x < Game.map_grid.width; x++) {
            for (var y = 0; y < Game.map_grid.height; y++) {
                var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

                var fromCenter = Track.distance((Game.map_grid.width / 2), (Game.map_grid.height / 2), x, y);

                if (at_edge || fromCenter > 42) {
                    // Place a tree entity at the current tile
                    Crafty.e('Tree').at(x, y);
                }
            }
        }
    },

    ui : function () {
        this.hud.goldBar = Crafty.e('GoldBar').at(1, 0);
    },

    startRace: function(){
        Crafty.audio.play('horn');

        setTimeout(function(){
            Game.currentRace.started = true;
            Crafty.trigger("RaceStarted");
        }, 9500);
    },

    finishRace: function(){
        if(Game.currentRace.type == "bet") {

            var order = Game.currentRace.order,
                dialog = this.getBetReport(order);

            Crafty("BetBoard").destroy();
//            Crafty("BetBoard").css({"display":"none"});


            Crafty.e("Dialog").dialog(dialog, function(){
                Track.payBets(order);
                Crafty.scene("Town");
            });

            return;
        }
        //else, type is race
        Crafty.scene("Town");
    },

    initialBindings: function(){
        var that = this;
        Crafty.bind("RaceFinished", function () {
            that.finishRace();
        });
    },

    getBetReport: function(order) {
        var bets = Game.player.save.currentBets,
            report = [];
        for(var i in bets) {
            var bet = bets[i]
            report.push("Checking Bet:"+bet.toString());

            var paid = bet.paid(order);
            if( paid > 0) {
                report.push("PAID: "+paid+"GP");
            }
            else {
                report.push("Lost...");
            }
        }

        return report;
    },

    payBets: function(order){
        var bets = Game.player.save.currentBets,
            report = [];
        for(var i in bets) {
            var bet = bets[i]
            Track.hud.goldBar.addGold(bet.paid(order));
        }

        return report;
    }
};
