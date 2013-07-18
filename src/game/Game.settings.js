Game.settings = {
    horsesPerRace : 8,
    totalLaps     : 2,

    boost: {
        increment :.2,
        seconds : 3
    },

    horses : {
        staminaIncrement : .3,
        maxStamina       : 200,
        initialStamina   : 80,
        maxSpeed         : 4,
        colors           : {
            1 : {
                bg   : "#F00",
                text : "#FFF"
            },
            2 : {
                bg   : "#FFF",
                text : "#000"
            },
            3 : {
                bg   : "#00F",
                text : "#FFF"
            },
            4 : {
                bg   : "#FF0",
                text : "#000"
            },
            5 : {
                bg   : "#090",
                text : "#FFF"
            },
            6 : {
                bg   : "#000",
                text : "#FFF"
            },
            7 : {
                bg   : "#F60",
                text : "#000"
            },
            8 : {
                bg   : "#444",
                text : "#FFF"
            }
        }
    },

    track : {
        minRadius    : 146,
        yLimitTop    : 140,
        yMiddle      : 290,
        yLimitBottom : 435,

        c1 : {
            x : 314,
            y : 290
        },

        c2 : {
            x : 1000,
            y : 290
        }
    },

    betMethods : {
        toString   : function () {
            var horseList = '';
            for (var i in this.places) {
                var num = this.places[i];
                if (num > 0) {
                    horseList += num + ","
                }

            }
            horseList = horseList.slice(0, -1);
            var string = this.amount + "GP on " + horseList + " " + this.type.abbr;
            return string;
        },

        getPayment : function (order) {
            var pays = this.amount * (this.odds.top / this.odds.bottom);
            if (this.type.horses === 1) {
                var position = this.type.place[0];
                var horseNumber = this.places[position];
                var place = Game.currentRace.horses[horseNumber - 1].place
                if(place <= position) {
                    return Math.round(pays * this.type.payoff)+this.amount;
                }
                return 0;
            }
            var firstPlace = this.places[1],
                secondPlace = this.places[2];

            var firstWon = order[0] == firstPlace;
            var secondWon = order[1] == secondPlace;

            if (this.type.horses === 2) {

                if(firstWon && secondWon) {
                    return Math.round(pays * this.type.payoff)+this.amount;
                }
                return 0;
            }
            if (this.type.horses === 3) {
                var thirdPlace = this.places[3];
                var thirdWon = order[2] == thirdPlace

                if(firstWon && secondWon && thirdWon) {
                    return Math.round(pays * this.type.payoff)+this.amount;
                }
                return 0;
            }

            return 0;
        }
    },

    bets : {
        Win      : {
            name   : "Win",
            abbr   : "WIN",
            payoff : 1,
            horses : 1,
            place  : [1]
        },
        Place    : {
            name   : "Win",
            abbr   : "PLC",
            payoff : .666,
            horses : 1,
            place  : [2]
        },
        Show     : {
            name   : "Show",
            abbr   : "SHW",
            payoff : .333,
            horses : 1,
            place  : [3]
        },
        Exacta   : {
            name   : "Exacta",
            abbr   : "EXCT",
            payoff : 4,
            horses : 2,
            place  : [1, 2]
        },
        Trifecta : {
            name   : "Trifecta",
            abbr   : "TRIF",
            payoff : 9,
            horses : 3,
            place  : [1, 2, 3]
        }
    },

    odds : [
        {
            top    : 1,
            bottom : 5
        },
        {
            top    : 2,
            bottom : 5
        },
        {
            top    : 1,
            bottom : 2
        },
        {
            top    : 3,
            bottom : 5
        },
        {
            top    : 4,
            bottom : 5
        },
        {
            top    : 1,
            bottom : 1
        },
        {
            top    : 6,
            bottom : 5
        },
        {
            top    : 7,
            bottom : 5
        },
        {
            top    : 3,
            bottom : 2
        },
        {
            top    : 8,
            bottom : 5
        },
        {
            top    : 9,
            bottom : 5
        },
        {
            top    : 2,
            bottom : 1
        },
        {
            top    : 5,
            bottom : 2
        },
        {
            top    : 3,
            bottom : 1
        },
        {
            top    : 7,
            bottom : 2
        },
        {
            top    : 4,
            bottom : 1
        },
        {
            top    : 9,
            bottom : 2
        },
        {
            top    : 5,
            bottom : 1
        },
        {
            top    : 6,
            bottom : 1
        },
        {
            top    : 7,
            bottom : 1
        },
        {
            top    : 8,
            bottom : 1
        },
        {
            top    : 9,
            bottom : 1
        },
        {
            top    : 10,
            bottom : 1
        },
        {
            top    : 15,
            bottom : 1
        },
        {
            top    : 20,
            bottom : 1
        },
        {
            top    : 25,
            bottom : 1
        },
        {
            top    : 30,
            bottom : 1
        },
        {
            top    : 35,
            bottom : 1
        },
        {
            top    : 40,
            bottom : 1
        },
        {
            top    : 45,
            bottom : 1
        },
        {
            top    : 50,
            bottom : 1
        },
        {
            top    : 60,
            bottom : 1
        },
        {
            top    : 70,
            bottom : 1
        },
        {
            top    : 80,
            bottom : 1
        },
        {
            top    : 90,
            bottom : 1
        },
        {
            top    : 99,
            bottom : 1
        }
    ]
};