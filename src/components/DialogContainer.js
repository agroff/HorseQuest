Crafty.c('DialogContainer', {

    dialogCallback : function () {},
    _currentIndex  : 0,
    _dialog        : [],

    init : function (number) {
        this.requires("2D, Canvas, Grid, Image");
        this.image('assets/dialog.png').attr({z:26});

        this.atX = 28;
        this.atY = 4
        this.at(this.atX, this.atY)
        this.z = 26


    },

    on: function(entity, x, y){
        x = this.atX + x;
        y = this.atY + y;
        this.attach(entity);
        entity.at(x,y);
    }


});

Crafty.c("Dialog", {
    init : function () {
        var that = this;
        this.requires("DialogContainer");

        var atX = this.atX,
            atY = this.atY,
            w = 26.2, h = 26.3;

        this.txt = Crafty.e("2D, Grid, HTML")
        this.attach(this.txt);
        this.txt.at(atX + 2, atY + 1);
        this.txt.css($uiText);
        this.txt.w = 440


        var nextButton = Crafty.e("Button").val("NEXT").click(function () {
            that.showNext();
        });

        this.on(nextButton, 25.4,26);

        this.next = nextButton;
    },

    dialog : function (name, finishedCallback) {
        this.dialogCallback = finishedCallback
        if(typeof name === 'object'){
            this._dialog = name;
        }
        else {
            this._dialog = Game.dialogs[name];
        }

        Game.player.stopMovement();
        Game.player.pause();

        this.showNext()

        return this;
    },

    showNext : function () {

        var currentText = this._dialog[this._currentIndex];

        if (currentText === undefined) {
            var callback = this.dialogCallback;
            Game.player.unpause();
            this.next.destroy();
            this.destroy();
            callback();
            return;

        }

        this.txt.append('<p>' + currentText + '</p>');
        this._currentIndex++;
    }
});