// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
    init : function () {
        this.requires('2D, Canvas, Grid');
    }
});
Crafty.c('DomActor', {
    init : function () {
        this.requires('2D, DOM, Grid');
    }
});

Crafty.c("BetBoard", {
    init : function () {
        this.requires("DomActor, HTML")
            .at(25, 14)
            .css({ "background-color" : "#444",
                "font-family"         : "mono",
                "color"               : "#fff",
                "display"             : "none",
                "border-radius"       : "6px",
                "padding-left"        : "5px" })
            .attr({ w : 200, h : 120, z : -1 });
    }
});

Crafty.c('DestinationPoint', {
    init : function () {
        this.requires('ColorBlock')
            .color('red');
        this.visible = false;
    },

    order : function (number) {
        this._order = number;
        return this;
    },

    directionTo : function (direction) {
        this._direction = direction;
        return this;
    }

});

Crafty.c('Building', {
    init : function () {
        this.requires("Actor")
    },

    image : function (spriteName) {
        this.requires(spriteName);
        return this;

    },

    entrance : function (pos, newScene) {
        //        this.scene = newScene;
        //        this.w = pos.w;
        //        this.h = pos.h;
        this.requires("Collision")
            .onHit("PlayerCharacter", function () {
                dbg("Hitting Building");

                if (typeof newScene === 'function') {
                    return newScene();
                }

                Crafty.scene(newScene);
            });
        return this;
    }
});

Crafty.c('GoldBar', {
    init : function () {
        //        dbg("gold bar")
        this.requires("Actor, Solid, Image");
        this.image('assets/hud.png');
        this.txt = Crafty.e("2D, DOM, Text");
        this.attach(this.txt);
        this.txt.z = 20;
        this.txt.x = 60;
        this.txt.y = 20;
        this.txt.css({
            "font-family" : "mono",
            "font-size"   : "20px",
            "color"       : "#fff"
        });
        //        dbg("gold bar: x"+this.x);
        this.addGold(0);
    },

    addGold : function (amount) {
        if (amount > 0) {
            Crafty.audio.play('goldUp');
        }
        if (amount < 0) {
            Crafty.audio.play('goldDown');
        }

        Game.player.save.gold += amount;
        this.txt.text(Game.player.save.gold);
    }
});


// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
    init : function () {
        this.requires('Actor, Solid, spr_tree');
    }
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
    init : function () {
        this.requires('Actor, Solid, spr_bush');
    }
});


Crafty.c('ColorBlock', {
    init : function () {
        this.requires('2D, Canvas, Grid, Color');
    }
});
Crafty.c('Red', {
    init : function () {
        this.requires('ColorBlock');
        this.color('rgb(120, ' + Crafty.math.randomInt(0, 200) + ', 40)');
    }
});
Crafty.c('Black', {
    init : function () {
        this.requires('ColorBlock').color('black');
    }
});

