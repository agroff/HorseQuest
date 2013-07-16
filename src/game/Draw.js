
Draw = {

    finishLine: function(x,y,w,h){
        var c = 0;
        this._squarish("Black", x, y, w, h, function(){
            c++;
            if(c % 2 === 1) {
                return true;
            }
            return false;
        });
    },

    rectangle: function(Entity, x, y, w, h){
        this._squarish(Entity, x, y, w, h, function(){
            return true;
        });
    },
    trackCenter: function(x, y, w, h){
        this._squarish("Bush", x, y, w, h, function(d, x, y){
            if(y < 13 || y > 24 ) return true;
            return false;
        });
    },

    trackCircle: function(Entity, x, y, radius){
        var func = function(distance, x, y){
            if(x > 23 && x < 60) {
                return false;
            }

            if(distance > radius){
                return false;
            }

            return true;
        }
        this.aCircle(Entity, x, y, radius, func);
    },
    circle: function(Entity, x, y, radius){
        var func = function(distance){

            if(distance > radius){
                return false;
            }

            return true;
        }
        this.aCircle(Entity, x, y, radius, func);
    },
    aCircle: function(Entity, x, y, radius, func){

        var w = radius * 2
        var h = w;
        var xInitial = x - radius;
        var yInitial = y - radius;

        this._squarish(Entity, xInitial, yInitial, w, h, func)
    },
    _squarish: function(Entity, x, y, w, h, draw){

        var centerX =  (w / 2) + x;
        var centerY =  (h / 2) + y;

        for (var x2 = x; x2 < (w + x); x2++) {
            for (var y2 = y; y2 < (h + y); y2++) {
                var distance = Track.distance(centerX, centerY, x2, y2);
                if(draw(distance, x2, y2) === false) {
                    continue;
                }
                Crafty.e(Entity).at(x2, y2);
            }
        }

        //Crafty.e('Tree').at(centerX, centerY);
    }
}