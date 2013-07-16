
Crafty.c("FinishLine", {
    init: function(){
        this.requires('Actor');
        this.w = this.toPx(3);
        this.h = this.toPx(13);
        //this.requires('Color, Collision, Solid')
        this.requires('Color, Collision, Solid')
            .collision([45,-30],[48,-30], [48,220], [44,220])
            .onHit('Horse', this.registerHorse)
            .color('rgb(240,240,200)');
    },

    registerHorse: function(data){
        //data[0]['obj'].registerLap();
    }
});