Crafty.c("Button", {
    textValue : '',
    disabled  : false,
    callback  : function () {},
    types     : [
        "spr_bttn",
        "spr_bttnDark",
        "spr_bttnBig"
    ],
    disabledType  : "",
    originalType: false,
    init      : function () {
        var that = this;
        this.requires("2D, DOM, Grid, Mouse");

        this.requires(this.types[0]);

        this.disabledType = this.types[1];

        this.css({"cursor":"pointer"});

        return this;
    },
    val       : function (value) {
        if (value === undefined) {
            return this.textValue;
        }

        var that = this;
        var text = Crafty.e("2D, DOM, Text")
            .text(value).attr({x : 0, y : 9, w : that.w})
            .css($bttnText)
        this.attach(text);

        this.textValue = value;
        return this;
    },
    click     : function (callback) {
        var that = this;
        this.callback = callback;
        this.bind("Click", function () {
            that.handleClick();
        })
        return this;
    },

    inform: function(success){
        if(success === true) {
            Crafty.audio.play("click");
            return;
        }
        Crafty.audio.play("nope");
    },

    disable : function () {
        this.disabled = true;
        this.type(this.disabledType);
        this.css({"cursor":"default"});
    },
    enable  : function () {
        this.disabled = false;
        this.type(this.originalType);
        this.css({"cursor":"pointer"});
    },

    handleClick : function () {
        if (this.disabled === true) {
            this.inform(false);
            return;
        }
        this.callback();
    },
    type        : function (newType) {
        if(newType === false) {
            newType = this.types[0];
        }
        if(this.originalType === false) {
            this.originalType = newType;
        }

        for (var i in this.types) {
            this.removeComponent(this.types[i])
        }
        this.addComponent(newType)
        return this;
    }
});