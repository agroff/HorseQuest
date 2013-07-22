

Crafty.c('Building', {
    init : function () {
        this.requires("Actor")
    },

    image : function (spriteName) {
        this.requires(spriteName);
        return this;

    },

    addCollision: function(onHit){
        this.requires("Collision")
//        this.requires("Collision, WiredHitBox")
            .onHit("PlayerCharacter", onHit);
        if(this._poly != undefined) {

            this.collision(this._poly);
        }
    },

    entrance : function (newScene) {

        var onHit = function () {
            Crafty.scene(newScene);
        };
        if(typeof newScene === 'function') {
            onHit = newScene
        }

        this.addCollision(onHit);

        return this;
    },

    setDialog: function(dialogName){
        var onHit = function () {
            Crafty.e("Dialog").dialog(dialogName, function(){});
        };

        this.addCollision(onHit);

        return this;
    }
});


Crafty.c("RegistrationTent", {
    _poly: new Crafty.polygon([10,25],[60,110],[100,30]),

    init: function(){
        this.requires("Building")
            .image("spr_register")
            .setDialog("enterRace");
    }

});

Crafty.c("BettingBuilding", {
    _poly: new Crafty.polygon([10,65],[75,95],[114,65], [25,10]),

    init: function(){
        this.requires("Building")
            .image("spr_bet")
            .setDialog("enterBet");
    }
});

Crafty.c("Farm", {
    _poly: new Crafty.polygon([-5,35],[158,125],[290,55], [200,5], [45,2]),

    init: function(){
        this.requires("Building")
            .image("spr_farm")
            .setDialog("hitFarm");
    }
});
Crafty.c("Tent", {
    _poly: new Crafty.polygon([10,10],[0,35],[59,30], [45,5]),

    init: function(){
        this.requires("Building")
            .image("spr_tent")
            .setDialog("hitTent");
    }
});
Crafty.c("Pub", {
    _poly: new Crafty.polygon([20,5],[20,60],[75,50], [70,5]),

    init: function(){
        this.requires("Building")
            .image("spr_pub")
            .setDialog("hitPub");
    }
});
Crafty.c("Lake", {
    _poly: new Crafty.polygon([0,60],[0,85],[165,110],[255,75], [185,15]),

    init: function(){
        this.requires("Building")
            .image("spr_lake")
            .setDialog("hitLake");
    }
});
Crafty.c("Auction", {
    _poly: new Crafty.polygon([0,45],[65,70],[120,40], [90,0],[40,0]),

    init: function(){
        this.requires("Building")
            .image("spr_auction")
            .setDialog("hitAuction");
    }
});

