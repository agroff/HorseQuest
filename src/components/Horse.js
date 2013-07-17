var dbg = Game.helpers.debug;

/**
 * Creates destination points which trigger a direction change when passed.
 * TODO: Make them lines instead of points, register passses with collision.
 */
Crafty.c("Destination", {
    move               : true,
    movement           : {x : 0, y : 0},
    currentDestination : false,
    dX                 : 0,
    dY                 : 0,
    init               : function () {
        this.origin(20, 20)
        this.setDestination(1);

        this.bind("EnterFrame", function (data) {
            this.checkDestination();
        });
    },

    setDestination : function (orderNumber) {
        var newDestination = null, firstDestination;

        Crafty("DestinationPoint").each(function (i) {
            if (this._order == 1) {
                firstDestination = this;
            }
            if (this._order == orderNumber) {
                newDestination = this;
            }
        });

        if (newDestination == null) {
            newDestination = firstDestination;
        }

        this.trigger('NewDirection', newDestination._direction);


        this.currentDestination = newDestination;
    },

    checkDestination : function () {
        if (this.move === false) {
            this.trigger("NoDestination");
            return;
        }
        if (this.passedCurrentDestination()) {
            this.setDestination(this.currentDestination._order + 1);
        }
    },


    passedCurrentDestination : function () {
        var closeEnough = 30,
            dest = this.currentDestination,
            dir = dest._direction,
            xDistance = Math.abs(dest.x - this.x),
            yDistance = Math.abs(dest.y - this.y);
        switch (dir) {
            case DIR.n:
            case DIR.s:
                return yDistance < closeEnough
                break;
            case DIR.e:
            case DIR.w:
                return xDistance < closeEnough
                break;
        }
        return false;

    },

    moveTowards : function (dest, multiplier) {
        var that = this,
            vector = {
                x : dest.x - that.x,
                y : dest.y - that.y
            };

        multiplier = multiplier || 1;

        vector = Game.helpers.normalizeVector(vector);

        this.movement.x = vector.x * this.speed * multiplier;
        this.movement.y = vector.y * this.speed * multiplier;

        this.x += this.movement.x;
        this.y += this.movement.y;

    }


});


/**
 * Horse Skin Contains all the visual Elements of the horse.
 */
Crafty.c("HorseSkin", {
    init : function () {

        this.requires('spr_horse, SpriteAnimation')
            .bind("NumberChanged", this.displayHorseNumber)
            .bind("NewDirection", this.updateAnimation)
            .animate('HorseUp', 0, 2, 2)
            .animate('HorseRight', 0, 0, 2)
            .animate('HorseDown', 0, 3, 2)
            .animate('HorseLeft', 0, 1, 2);
        //this.move = false;
    },

    updateAnimation : function (direction) {
        var animation_speed = 6;
        this.running = true;
        this.direction = direction;

        this._numberPlate.visible = true;
        if (direction === DIR.n || direction == DIR.s) {
            this._numberPlate.visible = false;
        }

        if (direction == DIR.e) {
            this.animate('HorseRight', animation_speed, -1);
        }
        else if (direction == DIR.w) {
            this.animate('HorseLeft', animation_speed, -1);
        }
        else if (direction == DIR.s) {
            this.animate('HorseDown', animation_speed, -1);

        }
        else if (direction == DIR.n) {
            this.animate('HorseUp', animation_speed, -1);
        }
        else {
            this.stop();
        }
    },

    displayHorseNumber : function (number) {
        var numberDisplay = Game.settings.horses.colors[number]

        var position = {
            x : this.x + 18,
            y : this.y + 12,
            z : 25
        }

        var css = {
            'background-color' : numberDisplay.bg,
            "height"           : "14px",
            "font-weight"      : "bold",
            "padding"          : "-1px 2px",
            "color"            : numberDisplay.text
        }
        var num = Crafty.e("2D, DOM, Text").attr(position).text(number).css(css);

        this.attach(num);
        this._numberPlate = num;
    }
});

Crafty.c("FrontFeeler", {
    init : function () {
        //        var collisionSquare = new Crafty.polygon([38, 36], [76, 36], [76, 29], [38, 29]);
        var collisionSquare = new Crafty.circle(-10, -10, 20);
        this.requires("Actor, Collision, Solid")
    },

    tryToMoveInside : function () {
        if (this.hit("Horse") === false) {
            this._parent.moveInside();
        }
    },

    newDir : function () {
        alert("newDir");
        this.x = 70;
    }

})

Crafty.c("Horse", {
    _number        : 0,
    speedIncrement : 2,
    place          : false,
    angle          : false,
    running        : true,
    stamina        : Game.settings.horses.initialStamina,
    finished       : false,
    baseSpeed      : 2.8,
    direction      : DIR.e,
    currentLap     : 0,
    openingStretch: true,
    path           : {
        cX : 1000,
        cY : 290

    },

    dbg    : function (txt) {
        if (this._number != 8) {
            return;
        }
        console.log(txt);
        Game.helpers.debug(txt);
    },
    number : function (number) {
        this._number = number;
        this.trigger('NumberChanged', number);
        var displaySpeed = Math.round((this.speed - 2 ) * 100)
        return this;
    },

    staminaUp   : function (stamina) {
        var that = this;
        stamina = stamina || Game.settings.horses.staminaIncrement;
        this.stamina += stamina;

        if (this.stamina > Game.settings.horses.maxStamina) {
            this.stamina = Game.settings.horses.maxStamina;
        }

        Crafty("StaminaBar").each(function (i) {
            this.updateBar(that.stamina)
        });
    },
    staminaDown : function () {
        this.staminaUp(Game.settings.horses.staminaIncrement * -1);
    },

    adjustStamina : function () {
        if (this.speedIncrement == 1) {
            this.staminaUp();
        }
        if (this.speedIncrement == 3) {
            this.staminaDown();
        }
        if (this.speedIncrement == 4) {
            this.staminaDown();
        }
        if (this.stamina < 10) {
            this.slower();
        }
    },

    init : function () {
        var that = this;
        var collisionSquare = new Crafty.polygon([8, 36], [36, 36], [36, 24], [8, 24]);
        //        this.requires('Actor, Collision, Solid, Destination, HorseSkin')
        this.requires('Actor, Collision, Solid, Destination, HorseSkin, HorseMovement')
            .collision(collisionSquare)
            .onHit("FinishLine", function () {
                //that.dbg("Hitting... ");
            }, function () {
                //                that.dbg("NOT Hitting... ");
                that.registerLap();
            })
            //.onHit("Horse", that.avoidHorses)
            .bind("NewDirection", this.moveFeeler)

        //        this.speed = this.baseSpeed + ( (Math.random() - .5) / 3 );
        this.speed = this.baseSpeed;
        this.feeler = Crafty.e("FrontFeeler");
        this.attach(this.feeler)
        this.moveFeeler();
    },

    setSpeed : function (speed) {
        this.speed = (speed / 100) + 2;
//        this.speed = (speed / 100) + (this._number / 5) + 2;

        dbg("#" + this._number + " speed: " + speed + " ("+Math.round(this.speed * 100) / 100+") ");

        return this;
    },

    moveFeeler : function () {
        var feeler;
        // = new Crafty.polygon([10,40], [10,50], [80,50], [80,40]);
        switch (this.direction) {
            case DIR.e:

                feeler = new Crafty.circle(52, 52, 20);
                //                feeler =  new Crafty.polygon([10,40], [10,60], [80,50]);
                break;
            case DIR.w:
                //                feeler.shift(-30, -40)
                //feeler =  new Crafty.polygon([40,0], [40,20], [-20,10]);
                feeler = new Crafty.circle(-5, 6, 20);
                break;
            case DIR.n:
                feeler = new Crafty.circle(25, 0, 20);
                break;
            case DIR.s:
                //                feeler =  new Crafty.polygon([0,20], [0,40], [-50,60]);
                feeler = new Crafty.circle(-12, 40, 20);
                break;
        }

        this.feeler.collision(feeler);
    },

    line : function (newX) {
        var xDiff = newX - this.path.b,
            rSquared = this.path.r * this.path.r ,

            xDiff = xDiff * xDiff;

        var newY = Math.sqrt(rSquared = xDiff) + this.path.a;

        return newY;
    },


    registerLap : function () {
        this.currentLap++;

        //        debugger;
        if (this.currentLap === Game.settings.totalLaps) {
            this.finished = true;
            this.move = false;
            Game.currentRace.order.push(this._number);

            this.place = Game.currentRace.order.length;

            if (this.has("PlayerHorse")) {
                //                var totalGold = 40 * Game.settings.horsesPerRace;
                if (this.place < 6) {
                    var inversePlace = Game.settings.horsesPerRace - this.place;
//                    dbg(inversePlace);
                    Track.hud.goldBar.addGold(inversePlace * 10);
                }
            }

            this.moveToPlace();

            if (Game.currentRace.order.length == Game.settings.horsesPerRace) {
                this.finishRace();
            }
        }
//        dbg("#" + this._number + " Finished Lap " + this.currentLap)

    },

    avoidHorses : function (data) {
        if(this.openingStretch) {
            return this.beginningCollision(data);
        }
        //dbg("Avoiding")
        var otherHorse = data[0]["obj"],
            offset = 5,
            slowest = true;
        for (var i in data) {
            var other = data[i]["obj"];
            if (other.speed < this.speed) {
                slowest = false;
            }
        }
        if (slowest) {
            this.moveInside();
            return;
        }
        this.moveOutside();
        this.unmove();

        return;

        var dest = {
            x          : this.currentDestination.x,
            y          : this.currentDestination.y,
            _order     : this.currentDestination._order,
            _direction : this.currentDestination._direction
        };
        switch (this.direction) {
            case DIR.n:
                dest.x -= offset;
                break;
            case DIR.s:
                dest.x += offset;
                break;
            case DIR.e:
                dest.y -= offset;
                break;
            case DIR.w:
                dest.y += offset;
                break;
        }
        this.currentDestination = dest;
        //this.moveTowards(dest);
    },

    beginningCollision: function(data){
        var rnd = Crafty.math.randomInt(1,3);
        var inc = 1.5;
        if(rnd == 1) {
            this.x += inc;
            return;
        }
        if(rnd == 3) {
            this.x -= inc;
            return;
        }
        this.x += inc / 2;
    },


    moveToPlace : function () {

        if (this.running === false) {
            return;
        }
        var base = {x : 50, y : 290}, distance;
        base.y = (this.place * 36) + base.y;
        base.x = (this.place * 14) + base.x;
        distance = Crafty.math.distance(this.x, this.y, base.x, base.y);

        if (distance < 20) {
            this.running = false;
            //this.trigger('NewDirection', DIR.w);
            this.stop();
            return;
        }

        this.moveTowards(base);
    },

    finishRace : function () {
        var str = "Results are in!!!!<br />";
        for (var i in Game.currentRace.order) {
            var place = i * 1 + 1;
            str += place + " place - " + Game.currentRace.order[i] + " <br />"
        }
        dbg(str);


        setTimeout(function () {
            Crafty.trigger("RaceFinished", Game.currentRace.order);
        }, 5000)
    }
});

Crafty.c("AiHorse", {
    init     : function () {
        this.requires("Horse").bind("MoveInside", this.goInside);
    },
    goInside : function () {
        this.feeler.tryToMoveInside();
    }
});


Crafty.c("PlayerHorse", {
    isBoosted : false,
    init : function () {
        this.requires('Horse')
            .bind('KeyDown', function (e) {
                var keys = Crafty.keys;
                if (e.key == keys["UP_ARROW"] || e.key == keys["W"]) {
                    this.faster();
                    return;
                }

                if (e.key == keys["DOWN_ARROW"] || e.key == keys["S"]) {
                    this.slower();
                    return;
                }
                if (e.key == keys["B"]) {
                    this.tryBoost();
                    return;
                }



            })
            .bind('EnterFrame', function (e) {
                var upArrow = Crafty.keydown[Crafty.keys["UP_ARROW"]];
                var rightArrow = Crafty.keydown[Crafty.keys["RIGHT_ARROW"]];
                var downArrow = Crafty.keydown[Crafty.keys["DOWN_ARROW"]];
                var leftArrow = Crafty.keydown[Crafty.keys["LEFT_ARROW"]];

                if (this.hit("AiHorse") !== false) {
                    return;
                }

                if (rightArrow) {
                    this.moveOutside()
                }
                if (leftArrow) {
                    this.moveInside()
                }

            });
//        var tint = Crafty.e("2D, Canvas, Tint").attr({x:100,y:100, z:30,w:50, h: 20}).tint("#999",.3);
//        Crafty.e("2D, Canvas, ")
        var tint = Crafty.e("2D, DOM, Grid, spr_downArrow").at(.5,-1);
        this.attach(tint);
    },

    tryBoost: function(){
        var that = this,
            increment = Game.settings.boost.increment;

        //already boosted, do nothing
        if(this.isBoosted){
            return;
        }

        //not boosted, do boost
        this.speed += increment;
        this.isBoosted = true;
        dbg("BOOSTING New Speed: "+this.speed);

        Crafty.audio.play('boost');

        //set timeout to unboost
        setTimeout(function(){
            that.speed -= increment;
            that.isBoosted = false;
            dbg("unboosting to"+that.speed);
        }, Game.settings.boost.seconds * 1000)
    }
});


Crafty.c("HorseField", {
    playerSpeed : -1,
    horses: [],
    odds: false,

    init : function () {

    },

    /**
     * Sets the player horse. Call this before generation of the field to include a player horse.
     * If this method isn't called, there won't be any player horse.
     *
     * @param speed Int - speed of the player horse
     * @return {*}
     */
    player : function (speed) {
        this.playerSpeed = speed;
        return this;
    },

    /**
     * Generates a field of horses based on the parameters
     * For instance, a base speed of 50 and a variance of ten generates horses with a speed ranging from 40 - 60
     *
     * @param size - Number of horses
     * @param baseSpeed - Base/average speed
     * @param variance - amount to vary the speed
     * @return {*}
     */
    generate : function (size, baseSpeed, variance) {

        var playerNumber = -1;
        this.horses = [];

        if(this.playerSpeed > 0) {
            playerNumber = Crafty.math.randomInt(1,size);
        }

        var number = 1;
        var position = 9;
        var sortable = [];
        while (number <= size) {

            var ent = "AiHorse",
                speed = Crafty.math.randomInt(baseSpeed - variance, baseSpeed + variance)
            if (number == playerNumber) {
                ent = 'PlayerHorse',
                    speed = this.playerSpeed;
            }


            var horse = Crafty.e(ent).at(24, position).number(number).setSpeed(speed);

            sortable.push({num:number,speed: speed});
            this.horses.push(horse);

            number++;
            position--;
        }
        Game.currentRace.horses = this.horses;

        sortable.sort(function(a,b){return b.speed- a.speed});

        for(var i in sortable) {
            dbg("#"+sortable[i].num +": "+sortable[i].speed)
        }

        return this;
    },

    getOdds: function(horseNumber){
        if(odds === false) {
            this.generateOdds();
        }

        return odds[horseNumber];
    },

    generateOdds: function(){

    }
});

