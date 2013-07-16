Crafty.c("SpeedBar", {
    init: function(){
        var set = Game.settings;
        this.requires("Actor, Color")
        this.color("#DDD");

        this.w = 90;
        this.h = 40;

        this.blocks = [];


        for(var i = 1; i <= set.horses.maxSpeed; i++) {
            var xPos = (i-1) * 1.1 +.1;
            var block = Crafty.e("ColorBlock").at(xPos,1.2).color(this.getColor(i));
            this.blocks.push(block);
            this.attach(block);
        }

        var label = Crafty.e("2D, DOM, Text").text("SPEED:");
        label.x = 14
        this.attach(label);


        this.showSpeed(2);
    },

    showSpeed: function(currentSpeed){
        for(var i in this.blocks){
            if(i < currentSpeed) {
                this.blocks[i].color(this.getColor(i*1+1));
            }
            else {
                this.blocks[i].color("#bbb");
            }
        }
    },

    getColor: function(i) {
        switch(i) {
            case 1:
                return "#060";
            case 2:
                return "#444";
            case 3:
                return "#FC0";
            default:
                return "#F00";
        }
    }
});