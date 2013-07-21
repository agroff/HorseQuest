Crafty.c('DialogContainer', {

    dialogCallback : function () {},
    _currentIndex  : 1,
    _dialog        : [],

    init : function (number) {
        this.requires("2D, Canvas, Grid, Image");
        this.image('assets/dialog.png').attr({z : 26});

        this.atX = 28;
        this.atY = 4
        this.at(this.atX, this.atY)
        this.z = 26


    },

    on : function (entity, x, y) {
        x = this.atX + x;
        y = this.atY + y;
        this.attach(entity);
        entity.at(x, y);
    }


});

Crafty.c("Dialog", {
    makingChoice: false,
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
        this.txt.css("overflow", "hidden");
        this.txt.w = 440;
        this.txt.h = 400;

        this.$txt = $('#' + this.txt.getDomId());

        this.bind('KeyDown', function (e) {
            var keys = Crafty.keys;
            if (e.key == keys["ENTER"]) {
                this.showNext();
                return;
            }
        });

//        var fade = Crafty.e("2D, DOM, Grid, Image").image('assets/dialogFade.png').attr({z : 26});
//        this.on(fade, 1,1);
//
//        this.appendText('<br />')

        this.addNextButton();
    },

    addNextButton : function () {
        var that = this,
            nextButton = Crafty.e("Button").val("NEXT").click(function () {
                that.showNext();
            });

        this.on(nextButton, 25.4, 26);

        this.next = nextButton;
    },

    addSkipButton : function () {
        var that = this,
            skipButton = Crafty.e("Button").val("Skip").click(function () {
                that.finishDialog();
            });

        this.on(skipButton, 1, 26);

        this.skip = skipButton;
    },

    dialog : function (name, finishedCallback) {
        this.dialogCallback = finishedCallback
        if (typeof name === 'object') {
            this._dialog = name;
        }
        else {
            this._dialog = Game.dialogs[name];
        }

        Game.player.stopMovement();
        Game.player.pause();


        if (this._dialog.has.skipButton) {
            this.addSkipButton();
        }

        this.showNext()

        return this;
    },

    showNext : function () {
        var textEntry, currentText;

        if(this.makingChoice) {
            this.next.inform(false);
            return;
        }

        this.next.inform(true);

        if (this._currentIndex === -1) {
            this.finishDialog()
            return;
        }

        textEntry = this._dialog.text[this._currentIndex];

        if (textEntry.isChoice) {
            return this.renderChoice(textEntry);
        }

        currentText = this.replaceVariables(textEntry.text);


        this.appendText('<p>' + currentText + '</p>')
        this._currentIndex = textEntry.next;

        if(textEntry.after !== undefined) {
            textEntry.after();
        }

        if(textEntry.next == -1){
            this.next.val("Finish");
        }
    },

    finishDialog : function () {
        var callback = this.dialogCallback;
        Game.player.unpause();
        this.next.destroy();
        if(this.skip !== undefined){
            this.skip.destroy();
        }
        this.destroy();
        callback();
        return;
    },

    replaceVariables : function (text) {
        var vars = this.updateVars(Game.textVars),
            re = /\$\{([A-Za-z_]+)\}/gi;

        text = text.replace(re, function (match, $1, offset, original) {
            var replacement = vars[$1];
            if (replacement === undefined) {
                return "";
            }
            return replacement;
        });

        return text;

    },

    updateVars : function (vars) {
        vars["CURRENT_GOLD"] = Game.player.save.gold;

        return vars;
    },

    renderChoice : function (textEntry) {
        var choices = textEntry.choices,
            domID = this.txt.getDomId(),
            that = this,
            i, p , html, choice;

        this.makingChoice = true;
        this.currentChoices = choices;

        for (i in choices) {
            choice = choices[i];
            html = '<p class="choice dialogChoice" data-choiceIndex="' + i + '">&nbsp;-&nbsp;' + choice.text + '</p>';

            p = $(html).click(function () {
                that.makeChoice($(this));
            });

            this.appendText(p);
        }

    },

    makeChoice: function($element){
        var index = $element.attr("data-choiceIndex"),
            choice = this.currentChoices[index];

        this.makingChoice = false;
        this._currentIndex = choice.next;
        this.showNext();
        $element.addClass("chosenDialogChoice");
        $('.dialogChoice').unbind('click');
        $('.dialogChoice').removeClass("dialogChoice");

        if(choice.after != undefined){
            choice.after();
        }

    },

    appendText : function (htmlOrJquery) {
        var append = $(htmlOrJquery);
        this.$txt.append(append);
        this.$txt.scrollTop(append.position().top)

    }
});