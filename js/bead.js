function initBeads() {
    for (var i = 0; i < 30; ++i) {
        var type = Math.floor((Math.random() * beadTypes))
        beads[i] = {
            index: i,
            // 0 fire / 1 tree / 2 water / 3 light / 4 dark / 5 heart 
            type: type,
            x: startX + i % 6 * gridSize,
            y: startY + Math.floor(i / 6) * gridSize,
            img: null,
            isClear: false
        };
        beads[i].img = createBead(i, type)
    }
}


function createBead(i, type) {
    var img = new Image(gridSize, gridSize)
    img.src = selBeadsType(type)
    beadsGroup.appendChild(img);
    img.style.position = 'absolute';
    img.ondragstart = function () { return false; }
    img.style.left = beads[i].x + 'px';
    img.style.top = beads[i].y + 'px';
    img.style.zIndex = normalZ;
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
