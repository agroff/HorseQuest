// Game scene
// -------------
// Runs the core gameplay loop




// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
    // Display some text in celebration of the victory
    Crafty.e('2D, DOM, Text')
        .text('Victory!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .css($text_css);

    // Watch for the player to press a key, then restart the game
    //  when a key is pressed
    this.restart_game = this.bind('KeyDown', function() {
        Crafty.scene('Game');
    });
}, function() {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    this.unbind('KeyDown', this.restart_game);
});
