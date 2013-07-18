var DIR = {
    left  : 1,
    right : 2,
    up    : 3,
    down  : 4,
    e     : 1,
    w     : 2,
    n     : 3,
    s     : 4,
    above: 10,
    below: 11,
    left: 12,
    right: 13
}
Game = {
    DEBUG : true,

    player: false,

    progress: {
        started: false
    },

    helpers : {
        neg             : function (val) {
            return val * -1;
        },
        debug           : function (text) {
            var para = document.createElement("p");
            para.innerHTML = text;
            log.insertBefore(para, log.firstChild);

        },
        normalizeVector : function (vector) {
            var v = vector;
            var length = Math.sqrt((v.x * v.x) + (v.y * v.y));
            v.x = v.x / length;
            v.y = v.y / length;

            return v;
        },

        getPositionInside : function (pos, direction, offset) {
            switch (direction) {
                case DIR.n:
                    pos.x += offset;
                    break;
                case DIR.s:
                    pos.x -= offset;
                    break;
                case DIR.e:
                    pos.y += offset;
                    break;
                case DIR.w:
                    pos.y -= offset;
                    break;
            }
            return pos;
        },

        insideIsOccupied    : function (horse) {
            var pos = {
                x : horse.x,
                y : horse.y
            }

            pos = this.getPositionInside(pos, horse._direction, 30);

            pos.x += 20;

            var occupied = false;
            Crafty("Horse").each(function (i) {
                if (this.intersect(pos.x, pos.y, 50, 50)) {
                    occupied = true;
                }
            });


            if(horse._number === 3) {
                console.log(occupied)
            }

            return occupied;
        },

        stripInsideMovement : function (horse) {
            var mov = horse.movement;
            //console.log(mov);
            switch (horse.direction) {
                case DIR.n:
                    if(mov.x > 0) {mov.x = mov.x * -1}
                    break;
                case DIR.s:
                    if(mov.x < 0) {mov.x = mov.x * -1}
                    break;
                case DIR.e:
                    if(mov.y > 0) {mov.y = mov.y * -1}
                    break;
                case DIR.w:
                    if(mov.y < 0) {mov.y = mov.y * -1}
                    break;
            }
            //console.log(mov);
            horse.movement = mov;
        }
    },

    currentRace : {
        // Valid values can be "race" OR "bet"
        type: "race",
        order   : [],
        started : false,
        thisLap : 0
    },

    // This defines our grid's size and the size of each of its tiles
    map_grid    : {
        width  : 84,
        height : 40,
        tile   : {
            width  : 16,
            height : 16
        }
    },

    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width       : function () {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height      : function () {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    // Initialize and start our game
    start       : function () {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(87, 109, 20)');

        Track.initialBindings();

        Crafty.modules({ 'crafty-debug-bar': 'release' }, function () {
            Crafty.debugBar.show();
        });

        // Simply start the "Loading" scene to get things going
        Crafty.scene('Loading');
    }
}

$text_css = { 'font-size' : '24px', 'font-family' : 'Arial', 'color' : 'white', 'text-align' : 'center' }
$uiText = { 'font-size' : '15px', 'line-height':'1.2', 'font-family' : 'Mono', 'color' : 'white', 'text-align' : 'justify', "font-weight":"bold" }
$bttnText ={ 'font-size' : '15px', 'cursor':'pointer', 'line-height':'1.2', 'font-family' : 'Mono', 'color' : 'black', 'text-align' : 'center', "font-weight":"bold" }