
Game.dialogs.start = {

    has : {
        skipButton: true,
        closeButton: false
    },

    text: {
        1:{
            next: 2,
            text: "A few years ago you never would have guessed you would end up alone in the small town of ${TOWN_NAME}. You're not sure if you'll like it here, but at least no one can find you now."
        },
        2:{
            next: 3,
            text: "No matter how hard things get, you know you stand a better chance here than you would have at home. "
        },
        3:{
            next:4,
            text:"So with a measly ${CURRENT_GOLD} gold, a knack for betting horses, and an affinity for strong drink, you set out on a new life"
        },
        4:{
            next:-1,
            text:"With a little help from Fortuna, things might just turn out okay."
        }

    }

}
