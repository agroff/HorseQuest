
Crafty.c("HorseMovement", {
    movement : {x : 0, y : 0},

    init : function () {
        this.requires("Collision");
        this.bind("EnterFrame", this.doMovement);
    },

    unmove : function () {
        //        this.x = this.xInit;
        //        this.y = this.yInit;
        //        this.x -= this.movement.x;
        //        this.y -= this.movement.y;
    },

    doMovement : function () {

        this.movement = {x : 0, y : 0};
        this.xInit = this.x;
        this.yInit = this.y;

        if (this.finished && this.running) {
            this.moveToPlace();
            return;
        }
        if (this.finished) {
            return;
        }
        if(Game.currentRace.started === false) {
            return;
        }

        this.adjustStamina();

        this.moveHorse();

        var horsesHit = this.hit("Horse");
        if (horsesHit) {
            this.avoidHorses(horsesHit);
        }
        else if (this.feeler) {
            this.trigger("MoveInside")
        }

        this.applyMovement();

        if (this.r < Game.settings.track.minRadius) {
            this.r = Game.settings.track.minRadius;
        }
    },

    applyMovement : function () {
        this.y += this.movement.y;
        this.x += this.movement.x;
    },

    moveCircle : function (c) {
        var toRadian = Math.PI / 180;
        var toDegree = 180 / Math.PI;

        if (this.angle === false) {
            //beginning of circle, lets calculate radius and initial angle
            this.r = Crafty.math.distance(this.x, this.y, c.x, c.y);
            this.x -= this.speed;
            this.angle = Math.atan2(c.y - this.y, c.x - this.x) * toDegree;
            this.angle = this.angle - 275;
        }

        var angle = this.angle * toRadian;
        var r = this.r

        //        this.movement.x = (c.x + Math.sin(angle) * r) - this.x;
        //        this.movement.y = (c.y + Math.cos(angle) * r) - this.y;

        this.x = (c.x + Math.sin(angle) * r);
        this.y = (c.y + Math.cos(angle) * r);

        var extraRadius = this.r - Game.settings.track.minRadius
        var effectiveSpeed = this.speed - (extraRadius / 200)
        this.angle -= (effectiveSpeed / 3);
    },

    moveHorse : function () {
        var track = Game.settings.track;
        var c1 = track.c1;
        var c2 = track.c2;

        if (this.x > c2.x) {
//                        this.dbg("Towards Circle One");
            this.moveCircle(c2);
            return;
        }
        if (this.x < c1.x) {
//                        this.dbg("Towards Circle Two");
            this.moveCircle(c1);
            return;
        }

        this.angle = false;

        if (this.y < track.yMiddle) {
            //            this.dbg("Moving Right");
            this.movement.x = this.speed;
            //            this.x += this.speed;
            return;
        }

        this.movement.x = this.speed * -1;
        //        this.x -= this.speed;
        return;
    },

    faster : function () {
        if (this.speedIncrement >= Game.settings.horses.maxSpeed) {
            return false;
        }
        if(this.stamina < 5) {
            return false;
        }
        this.speed += .2;
        this.speedIncrement++;
        var that = this;

        Crafty("SpeedBar").each(function (i) {
            this.showSpeed(that.speedIncrement)
        });

    },

    slower : function () {
        if (this.speedIncrement <= 1) {
            return false;
        }
        this.speed -= .2;

        this.speedIncrement--;
        var that = this;

        Crafty("SpeedBar").each(function (i) {
            this.showSpeed(that.speedIncrement)
        });
    },

    moveInside : function () {
        var track = Game.settings.track;
        this.moveOutside(-.5);
        if (this.y > track.yLimitTop && this.direction == DIR.e) {
            this.y = track.yLimitTop;
        }
        if (this.y < track.yLimitBottom && this.direction == DIR.w) {
            this.y = track.yLimitBottom;
        }
    },

    moveOutside : function (offset) {
        var offset = offset || .5;


        if (this.angle !== false) {
            this.r += offset;
            return;
        }


        switch (this.direction) {
            case DIR.n:
                this.x -= offset;
                break;
            case DIR.s:
                this.x += offset;
                break;
            case DIR.e:
                this.y -= offset;
                break;
            case DIR.w:
                this.y += offset;
                break;
        }
    }
});