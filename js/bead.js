(() => {
    function initBeads() {
        for (var i = 0; i < 30; ++i) {
            var type = Math.floor((Math.random() * game.bead.type))
            game.bead.cur[i] = {
                index: i,
                // 0 fire / 1 tree / 2 water / 3 light / 4 dark / 5 heart 
                type: type,
                x: game.view.size.startX + i % 6 * game.view.size.grid,
                y: game.view.size.startY + Math.floor(i / 6) * game.view.size.grid,
                img: null,
                isClear: false
            };
            game.bead.cur[i].img = createBead(i, type)
        }
    }

    function createBead(i, type) {
        var img = new Image(game.view.size.grid, game.view.size.grid)
        img.src = selBeadsType(type)
        game.view.beadsGroup.appendChild(img);
        img.style.position = 'absolute';
        img.ondragstart = function () { return false; }
        img.style.left = game.bead.cur[i].x + 'px';
        img.style.top = game.bead.cur[i].y + 'px';
        img.style.zIndex = game.view.size.z.normal;
        return img
    }

    function selBeadsType(type) {
        switch (type) {
            case 0:
                return "image/beads/f.png"
            case 1:
                return "image/beads/t.png"
            case 2:
                return "image/beads/w.png"
            case 3:
                return "image/beads/l.png"
            case 4:
                return "image/beads/d.png"
            case 5:
                return "image/beads/h.png"
        }
    }
    
    
    game.bead.init = initBeads;
    game.bead.create = createBead;
    game.bead.selType = selBeadsType;
})();



