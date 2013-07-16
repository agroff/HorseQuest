// This is the player-controlled character
Crafty.c('PlayerCharacter', {

    save : {
        currentBets: [],
        gold   : 100,
        horses : []
    },

    init : function () {
        this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
            .fourway(2)
            .stopOnSolids()
            .animate('PlayerMovingUp', 0, 0, 2)
            .animate('PlayerMovingRight', 0, 1, 2)
            .animate('PlayerMovingDown', 0, 2, 2)
            .animate('PlayerMovingLeft', 0, 3, 2);

        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 4;
        this.bind('NewDirection', function (data) {
            if (data.x > 0) {
                this.animate('PlayerMovingRight', animation_speed, -1);
            }
            else if (data.x < 0) {
                this.animate('PlayerMovingLeft', animation_speed, -1);
            }
            else if (data.y > 0) {
                this.animate('PlayerMovingDown', animation_speed, -1);
            }
            else if (data.y < 0) {
                this.animate('PlayerMovingUp', animation_speed, -1);
            }
            else {
                this.stop();
            }
        });
    },

    pause        : function () {
        dbg("Pausing");
        this.disableControl();
    },
    unpause      : function () {
        dbg("UN-Pausing");
        this.enableControl();

    },

    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids : function () {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    // Stops the movement
    stopMovement : function () {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    }

});