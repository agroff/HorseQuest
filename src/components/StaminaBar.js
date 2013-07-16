Crafty.c("StaminaBar", {
    init: function(){
        var set = Game.settings;
        this.requires("Actor, Color")
        this.bind("SpeedChanged", this.showSpeed)
            .color("#DDD");

        this.w = set.horses.maxStamina + 10;
        this.h = 40;

        this.bar = Crafty.e("ColorBlock").at(.1,1.1).color("yellow");

        var label = Crafty.e("2D, DOM, Text").text("STAMINA:");
        label.x = 20
        this.attach(label);
        this.attach(this.bar);


        this.updateBar(set.horses.initialStamina);
    },

    updateBar: function(stamina){
        this.bar.w = stamina;
    },

    getColor: function(i) {
        switch(i) {
            case 1:
                return "#060";
            case 2:
                return "#666";
            case 3:
                return "#FC0";
            default:
                return "#F00";
        }
    }
});