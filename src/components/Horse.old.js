Crafty.c('HorseOld', {
    init : function (number) {
        var that = this;
        this.canLap = true;
        this.finished = false;
        this.currentLap = 0;
        //this.horseNumber = number;
        this.horseNumber = 2;
        this.color = '#f60'

        this._movement = {x : 0, y : 0};
        this.speed = 2.6 + (Math.random() / 4);
        this.laneChangeSpeed = .2;
        this.direction = DIR.right;
        this.requires('Actor');

        this.requires('Collision').onHit("FinishLine",
            function () {
                that.registerLap();
            },
            function () {
                Game.helpers.debug("#" + this.horseNumber + " collision finished");
            });

        this.number = function (number) {

            switch (number) {
                case 1:
                    this.color = '#F00';
                    break;
                case 2:
                    this.color = '#FFF';
                    break;
                case 3:
                    this.color = '#00F';
                    break;
                case 4:
                    this.color = '#FF0';
                    break;
                case 5:
                    this.color = '#090';
                    break;
                case 6:
                    this.color = '#000';
                    break;
                case 7:
                    this.color = '#FFF';
                    break;
                default:
                    this.color = '#F60';
                    break;
            }

            var textColor = '#000';
            if (number == 1 || number == 3 || number == 5 || number == 6) {
                textColor = '#fff';
            }

            var position = {
                x : this.x + 19,
                y : this.y + 12,
                z : 25
            }

            var css = {
                'background-color' : this.color,
                "height"           : "12px",
                "color"            : textColor
            }
            var num = Crafty.e("2D, DOM, Text").attr(position).text(number).css(css);
            this.horseNumber = number;
            this.attach(num);
        };

        this.registerLap = function () {
            if (!this.canLap) {
                return;
            }
            this.canLap = false;
            this.currentLap++;

            setTimeout(function () {

                if (that.currentLap === Game.settings.totalLaps) {
                    that.finished = true;
                    Game.currentRace.order.push(that.horseNumber);
                    if (Game.currentRace.order.length == Game.settings.horsesPerRace) {
                        var str = "Results are in!!!!<br />";
                        for (var i in Game.currentRace.order) {
                            var place = i * 1 + 1;
                            str += place + " place - " + Game.currentRace.order[i] + " <br />"
                        }
                        Game.helpers.debug(str);
                    }
                }
                else {
                    that.canLap = true;
                }
            }, 3000);


            Game.helpers.debug("#" + this.horseNumber + " finished lap " + this.currentLap)
        }

        this.setDirection = function (dir) {
            if (this.direction !== dir) {
                this.direction = dir;
                this.trigger('NewDirection', dir);
            }
        };

        this.setMovement = function (x, y) {
            this._movement.x = x;
            this._movement.y = y;
        };

        this.horsesIn = function () {
            var horses = Crafty("Horse");
            for (var i in horses) {

            }
        }

        this.getMovement = function () {
            var saEnd = 65,
                saStart = 15,
                rCornerStart = 64,
                rCornerEnd = 83,
                lCornerStart = 1,
                sideTop = 13,
                sideBottom = 24,
                bottomBottom = 39,
                topBottom = 11,
                speed = this.speed,
                cornerSpeed = .7 * speed,
                neg = Game.helpers.neg;


            //the top, long part of the track
            if (this.inSquare(saStart + 1, 1, saEnd, 11)) {
                this.setDirection(DIR.right);
                var y = 0
                y = this.laneChangeSpeed;
                if (this.lt(this.y, 9)) {
                }
                this.setMovement(speed, y)
                return;
            }
            //bottom left corner
            if (this.inSquare(lCornerStart, sideBottom, saStart + 1, bottomBottom)) {
                this.setDirection(DIR.up);
                this.setMovement(neg(cornerSpeed), neg(cornerSpeed));
                return;
            }
            //the bottom, long part of the track
            if (this.inSquare(saStart - 1, 26, saEnd + 1, bottomBottom)) {
                this.setDirection(DIR.left);
                this.setMovement(neg(speed), neg(this.laneChangeSpeed))
                return;
            }
            //the top right corner
            if (this.inSquare(rCornerStart, 1, rCornerEnd, sideTop + 1)) {
                this.setDirection(DIR.down);
                this.setMovement(cornerSpeed, cornerSpeed);
                return;
            }
            //bottom right corner
            if (this.inSquare(rCornerStart, sideBottom - 1, rCornerEnd, bottomBottom)) {
                this.setDirection(DIR.down);
                this.setMovement(neg(cornerSpeed), cornerSpeed);
                return;
            }
            //the top left corner
            if (this.inSquare(lCornerStart, 1, saStart + 1.4, sideTop)) {
                this.setDirection(DIR.right);
                this.setMovement(cornerSpeed, neg(cornerSpeed));
                return;
            }

            //right edge
            if (this.inSquare(68, sideTop, rCornerEnd, sideBottom)) {
                this.setDirection(DIR.down);
                this.setMovement(0, speed);
                return;
            }
            //left edge
            if (this.inSquare(1, sideTop - 1, 15, sideBottom + 1)) {
                this.setDirection(DIR.up);
                this.setMovement(0, neg(speed));
                return;
            }
        };

        this.bind("EnterFrame", function (data) {
            this.getMovement();
            var movX = this._movement.x,
                movY = this._movement.y;

            if (!Game.currentRace.started || this.finished) {
                return;
            }

            this.x += movX;
            this.y += movY;
            this.trigger('Moved', { x : movX, y : movY});
        })
    }
});