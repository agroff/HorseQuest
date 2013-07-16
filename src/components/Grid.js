// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
    lastSquare : [],
    init       : function () {
        this.attr({
            w : Game.map_grid.tile.width,
            h : Game.map_grid.tile.height
        })
    },

    // Locate this entity at the given position on the grid
    at         : function (x, y) {
        if (x === undefined && y === undefined) {
            return { x : this.x / Game.map_grid.tile.width, y : this.y / Game.map_grid.tile.height }
        }
        else {
            this.attr({ x : x * Game.map_grid.tile.width, y : y * Game.map_grid.tile.height });
            return this;
        }
    },

    toPx : function (blocks) {
        return blocks * Game.map_grid.tile.width;
    },

    gt : function (value, blocks) {
        return value > this.toPx(blocks)
    },

    lt : function (value, blocks) {
        return value < this.toPx(blocks)
    },

    between : function (value, block1, block2) {
        return this.gt(value, block1) && this.lt(value, block2)
    },

    inSquare : function (x1, y1, x2, y2) {
        var thisSquare = x1 + y1 + x2 + y2;
        //        if(this.lastSquare.indexOf(thisSquare) === -1) {
        //            Draw.rectangle("Red", x1,y1, (x2 - x1), (y2 - y1));
        //            this.lastSquare.push(thisSquare);
        //        }

        if (this.between(this.x, x1, x2) && this.between(this.y, y1, y2)) {
            return true;
        }
        return false;
    }
});