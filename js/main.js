window.onload = function () {
    // size
    setSize();
    // add touch event
    addTL();
    // load image & audio 
    game.res.load();

    // 2d array
    for (i = 0; i < 6; ++i) {
        // i -> type 
        game.bead.clear.row[i] = [];
        game.bead.clear.col[i] = [];
        // i -> which row
        game.bead.new[i] = [];
        game.bead.drop[i] = [];
    }

    game.particle.build()
    requestAnimationFrame(game.loop.start)

}


