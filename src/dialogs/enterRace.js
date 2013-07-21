Game.dialogs.enterRace = {

    has : {
        skipButton  : false,
        closeButton : false
    },

    text : {
        1  : {
            next : 2,
            text : 'You approach the track, but not via the main road. An older lady is sitting at a small table with some documents in front of her. As you approach, you begin to make out the name "Wilmae" pinned to her shirt.'
        },
        2  : {
            next : 3,
            text : '"Hello, and welcome to the race registration tent."'
        },
        3  : {
            next : 4,
            text : 'Wilmae looks noticeably bored, but does her best to feign enthusiasm. '
        },
        4  : {
            next : 5,
            text : "\"Professional races aren't currently accepting registration, but there's a practice race about to begin if you'd like to join?\""
        },
        5  : {
            isChoice : true,
            choices  : [
                {
                    next : 6,
                    text : '"Not today. I was just stopping by to say hi"'
                },
                {
                    next : 16,
                    text : '"I was just seeing what\'s going on over here"'
                },
                {
                    next : 26,
                    text : '"A practice race? Tell me more."'
                }
            ]
        },
        6  : {
            next : -1,
            text : '"Well aren\'t you sweet? Come back if you need anything"'
        },
        16 : {
            next : -1,
            text : '"Move along then, nothin\' to see here."'
        },
        26 : {
            next : 27,
            text : '"For ${PRACTICE_RACE_COST} gold you\'ll have a chance to race against some of the local riders. Everyone pays to race, and if you do good you should come away with a small profit."'
        },
        27 : {
            isChoice : true,
            choices  : [
                {
                    next : 28,
                    text : "Maybe next time..."
                },
                {
                    next  : 29,
                    text  : "Yes, please!"

                }
            ]
        },

        28 : {
            next : -1,
            text : "Alrighty, have a nice day!"
        },
        29 : {
            next : 30,
            text : "Your race begins now. Good Luck!"
        },
        30:{
            next:-1,
            text: "",
            after : function () {
                Track.hud.goldBar.addGold(-40);
                Crafty.scene("Racing");
            }

        }
    }
};