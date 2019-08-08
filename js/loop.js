(() => {
    var lastframe = performance.now()
    var time = 0
    const newParticleTime = 50

    var ID = 0;

    function loop(timestamp) {
        var dt = timestamp - lastframe
        lastframe = timestamp;

        game.loop.doSth.forEach((e) => { e.f(); })

        // particle
        if (game.status.is_start) {
            if (++time > newParticleTime) {
                time = 0
                game.particle.add.back()
            }
            game.particle.update(dt);
            game.particle.draw();
        }
        // miku
        game.view.draw.main.back.miku.redraw();


        requestAnimationFrame(loop);
    }

    function newWork(f) {
        if (++ID % 100 == 0) ID = 0;
        game.loop.doSth.push({
            ID: ID,
            f: f
        })
        return ID
    }

    game.loop.start = loop;
    game.loop.newWork = newWork;
})();



