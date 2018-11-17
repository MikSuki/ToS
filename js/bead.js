function createBeads() {
    var firstX = Math.floor(startX);
    var firstY = Math.floor(startY);
    for (var i = 0; i < 30; ++i) {
        beads[i] = {
            // 0 fire / 1 tree / 2 water / 3 light / 4 dark / 5 heart 
            type: Math.floor((Math.random() * beadTypes)),
            isClear: false,
            x: firstX + i % 6 * gridSize,
            y: firstY + Math.floor(i / 6) * gridSize
        };
    }
}