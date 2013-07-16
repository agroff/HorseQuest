Crafty.c("BetUI", {
    betButtons    : [],
    numberButtons : [],
    placeBoxes    : {},
    betButton     : null,
    selectedBet   : false,
    init          : function () {
        this.requires("DialogContainer");

        //reset current bets
        Game.player.save.currentBets = []

        //generate ui
        this.generateButtons();

        this.generatePlaces();

        this.generateGoldCounter();
    },

    generateButtons : function () {
        var that = this,
            bttn;

        this.generateBetButtons();
        this.generateNumberButtons();


        bttn = Crafty.e("Button").val("BET!").click(function () {
            that.makeBet(this);
        });
        this.on(bttn, 24, 14);
        this.betButton = bttn;


        bttn = Crafty.e("Button").val("Clear").click(function () {
            that.clearBet();
        });
        this.on(bttn, 18, 14);

        bttn = Crafty.e("Button").val("Done").type('spr_bttnBig').click(function () {
            if(Game.player.save.currentBets.length > 0) {
                Track.startRace();
                that.destroyInterface();
                Crafty.trigger("RaceStarting");
                return;
            }
            Crafty.scene("Town");
        });
        this.on(bttn, 24.5, 25.5);

    },

    generateBetButtons : function () {
        var that = this,
            bets = Game.settings.bets,
            spacing = 14,
            bttn;

        for (var i in bets) {
            bttn = Crafty.e("Button").val(i).type('spr_bttn').click(function () {
                this.inform(true)
                that.selectBet(this.val());
            });

            this.betButtons.push(bttn);

            this.on(bttn, 2, spacing)

            spacing += 2.4;
        }
    },

    generateNumberButtons : function () {
        var y = 2, bttn, that = this,
            originalSpacing = 2,
            spacing = 2;

        var maxHorses = Game.settings.horsesPerRace;
        for (var i = 1; i <= maxHorses; i++) {
            bttn = Crafty.e("NumberButton").number(i).click(function () {
                that.addHorse(this);
            });

            this.numberButtons.push(bttn);

            this.on(bttn, spacing, y)

            spacing += 7;
            if (i == 4) {
                spacing = originalSpacing
                y = 8
            }
        }
    },

    generatePlaces : function () {
        var fill,
            txt,
            x = 9,
            y = 18, inc = 3;

        fill = Crafty.e("FillBox")
        this.on(fill, x + 3, y)
        this.placeBoxes[1] = fill;

        txt = Crafty.e("DomActor, spr_first");
        this.on(txt, x, y - .5)

        y += inc;
        fill = Crafty.e("FillBox")
        this.on(fill, x + 3, y)
        this.placeBoxes[2] = fill;

        txt = Crafty.e("DomActor, spr_second");
        this.on(txt, x, y - .5)

        y += inc;
        fill = Crafty.e("FillBox")
        this.on(fill, x + 3, y)
        this.placeBoxes[3] = fill;

        txt = Crafty.e("DomActor, spr_third");
        this.on(txt, x, y - .5)

        txt = Crafty.e("DomActor, HTML").css({
            "background-color":"#444",
            "font-family":"mono",
            "color":"#fff",
            "border-radius": "6px",
            "padding-left": "5px"
        });
        txt.w = 195
        txt.h = 120
        this.on(txt, 18,17)
        this.betText = txt;
    },

    generateGoldCounter : function () {
        this.on(Crafty.e("DomActor, spr_coins"), 9, 15)

        var fill = Crafty.e("FillBox").val(2);
        this.on(fill, 12, 15);
        this.betAmountContainer = fill;

        var up = Crafty.e("DomActor, Mouse, spr_upArrow")
            .css({cursor : 'pointer'})
            .bind("Click", function () {
                var newVal = parseInt(fill.val(), 10);
                newVal = newVal * 2;
                if(newVal > Game.player.save.gold) {
                    newVal = Game.player.save.gold;
                }
                fill.val(newVal);

            });
        this.on(up, 14.5, 15);

        var down = Crafty.e("DomActor, Mouse, spr_downArrow")
            .css({cursor : 'pointer'})
            .bind("Click", function () {
                var newVal = parseInt(fill.val(), 10);
                newVal = Math.round(newVal / 2);
                if(newVal < 2) {
                    newVal = 2;
                }
                fill.val(newVal);
            });

        this.on(down, 14.5, 16)
    },

    destroyInterface: function(){
        this.visible = false;
        Crafty("Button").destroy();
        Crafty("spr_coins").destroy();
        Crafty("spr_second").destroy();
        Crafty("spr_upArrow").destroy();
        Crafty("spr_downArrow").destroy();
        Crafty("spr_hole").destroy();
        for(var i in this._children) {
            this._children[i].destroy();
        }
        this.destroy();
    },

    clearBet : function () {
        Crafty.audio.play('click');
        var bet = this.betButtons,
            num = this.numberButtons,
            plc = this.placeBoxes;
        for (var i in bet) {
            bet[i].enable();
        }
        for (var i in num) {
            num[i].enable();
        }
        for (var i in plc) {
            plc[i].val("");
        }
        this.betAmountContainer.val(2);
        this.selectedBet = false;
    },


    selectBet : function (type) {
        var bttns = this.betButtons;
        for (var i in bttns) {
            if (bttns[i].val() == type) {
                bttns[i].enable();
                this.selectedBet = type;
            }
            else {
                bttns[i].disable();
            }

        }
    },

    makeBet : function (button) {
        var totalBets = Game.player.save.currentBets.length;
        if (!this.validateBet() || totalBets >= 3) {
            button.inform(false);
            return;
        }
        var saved = Game.player.save,
            set = Game.settings.bets;
        var bet = {
            type: set[this.selectedBet],
            odds: Game.settings.odds[8],
            toString: Game.settings.betMethods.toString,
            paid: Game.settings.betMethods.getPayment,
            amount: parseInt(this.betAmountContainer.val(), 10),
            places: {
                1:this.placeBoxes[1].val(),
                2:this.placeBoxes[2].val(),
                3:this.placeBoxes[3].val()
            }
        };
        var str = bet.toString();
        this.betText.append('<p>'+str+'</p>');
        Crafty.trigger("NewBet", bet);
        saved.currentBets.push(bet);

        Track.hud.goldBar.addGold(bet.amount * -1);

        this.clearBet();
    },

    addHorse : function (button) {
        if (this.selectedBet === false) {
            button.inform(false);
            return false;
        }

        if (this.validateBet()) {
            button.inform(false);
            return;
        }
        var hole = this.getNextHole();
        this.placeBoxes[hole].val(button._number)
        button.disable();
        button.inform(true);
    },

    validateBet : function () {
        if (this.selectedBet === false) {
            return false;
        }

        if (this.getNextHole() === false) {
            return true;
        }
        return false;
    },
    getNextHole : function () {
        var bet = Game.settings.bets[this.selectedBet],
            plc = this.placeBoxes, nextHole = false;
        for (var i in bet.place) {
            var requiredPlace = bet.place[i],
                value = plc[requiredPlace].val();
            if (value == "") {
                nextHole = requiredPlace;
                return nextHole
            }
        }

        return nextHole;
    }
});

Crafty.c("NumberButton", {
    _number : -1,

    init : function () {
        this.requires("Button");

        //generate all types
        var maxHorses = Game.settings.horsesPerRace;
        this.types = [];
        for (var i = 1; i <= maxHorses; i++) {
            this.types.push("number_" + i);
        }

        this.disabledType = 'spr_blank';
        this.types.push(this.disabledType)
    },

    number : function (num) {
        this._number = num;
        this.type("number_" + num);

        return this;
    }
});


Crafty.c("FillBox", {
    textValue : "",
    textInput : false,
    init      : function () {
        this.requires("DomActor, spr_hole");

        var that = this;
        var text = Crafty.e("2D, DOM, Text")
            .text("")
            .attr({x : 0, y : 9, w : that.w})
            .css($bttnText)
        this.attach(text);
        this.textInput = text;

    },

    val : function (value) {
        if (value === undefined) {
            return this.textValue;
        }

        this.textValue = value;
        this.textInput.text(value)
        return this;
    }
});