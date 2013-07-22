Game.dialogs.enterBet = {

    has : {
        skipButton  : false,
        closeButton : false
    },

    text : {
        1 : {
            next : 2,
            text : 'You approach the track via the main road to the sound of a small crowd gathered within.'
        },
        2 : {
            next : 3,
            text : 'The excitement in the air is unmistakable. A race is just about to begin. '
        },
        3 : {
            isChoice : true,
            choices  : [
                {
                    next : 4,
                    text : '<i>Make some bets</i>'
                },
                {
                    next : 14,
                    text : '<i>Leave this place</i>'
                }
            ]
        },
        4: {
            next:5,
            text: "You open your gold pouch and run to the till in time to bet before the race begins. How will your luck fare today?"
        },
        5:{
            next:-1,
            text:"",
            after: function(){
                Crafty.scene("Betting");
            }
        },

        14: {
            next:-1,
            text:"Clutching your gold pouch, you cannot stand the thought of it getting any lighter. Hoping no one sees you, you quietly leave the track."
        }
    }

};