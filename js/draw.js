function drawBackground() {
    var x = startX;
    var y = startY;
    for (var i = 0; i < 5; ++i) {
        if (i % 2) {
            var color1 = "#DDDDDD";
            var color2 = "#AAAAAA";
        }
        else {
            var color1 = "#AAAAAA";
            var color2 = "#DDDDDD";
        }

        for (var j = 0; j < 6; ++j) {
            if (j % 2)
                bCtx.fillStyle = color1;
            else
                bCtx.fillStyle = color2;
            bCtx.fillRect(x, y, gridSize, gridSize);
            x += gridSize;
        }
        x = startX;
        y += gridSize;
    }

    bCtx.fillStyle = "#000000";
    bCtx.fillRect(startX, startY, gridSize * 6, 1);
    bCtx.fillRect(startX, startY, 1, gridSize * 5);
    bCtx.fillRect(startX, endY, gridSize * 6, 1);
    bCtx.fillRect(endX, startY, 1, gridSize * 5);
}

function drawBeads() {
    mCtx.globalAlpha = 1;
    for (var i = 0; i < 6; ++i) {
        chooseColor(i);
        for (var j = 0; j < 30; ++j) {
            if (j === hover)
                continue;
            if (beads[j].type === i) {
                mCtx.fillRect(beads[j].x - halfBeadSize, beads[j].y - halfBeadSize, beadSize, beadSize);
            }
        }
    }
    if (isClick) {
        chooseColor(clickedBead.type);
        mCtx.globalAlpha = 0.3;
        mCtx.fillRect(beads[hover].x - halfBeadSize, beads[hover].y - halfBeadSize, beadSize, beadSize);
    }
}
function drawDropBeads() {
    mCtx.globalAlpha = 1;
    var i, j, k;
    for (i = 0; i < 6; ++i) {
        var len = dropBeads[i].length;
        var x = beads[i].x - halfBeadSize;
        for (j = 0; j < len; ++j) {
            if (!dropBeads[i][j].dropGrid) continue;
            mCtx.clearRect(x, dropBeads[i][j].y - halfBeadSize - sub, beadSize, beadSize);
        }
    }

    for (i = 0; i < 6; ++i) {
        chooseColor(i);
        for (j = 0; j < 6; ++j) {
            var len = dropBeads[j].length;
            var x = beads[j].x - halfBeadSize;
            for (k = 0; k < len; ++k) {
                if ((dropBeads[j][k].type !== i) || (dropBeads[j][k].dropGrid <= 0)) continue;
                dropBeads[j][k].y += sub;
                mCtx.fillRect(x, dropBeads[j][k].y - halfBeadSize, beadSize, beadSize);
                --dropBeads[j][k].dropGrid;
            }
        }
    }
}

function drawDropBeads2() {
    mCtx.globalAlpha = 1;
    var i, j, k;
    for (i = 0; i < 6; ++i) {
        var len = newBeads[i].length;
        var x = beads[i].x - halfBeadSize;
        for (j = 0; j < len; ++j) {
            if (!newBeads[i][j].dropGrid) continue;
            mCtx.clearRect(x, newBeads[i][j].y - halfBeadSize - sub, beadSize, beadSize);
        }
    }

    for (i = 0; i < 6; ++i) {
        chooseColor(i);
        for (j = 0; j < 6; ++j) {
            var len = newBeads[j].length;
            var x = beads[j].x - halfBeadSize;
            for (k = 0; k < len; ++k) {
                if ((newBeads[j][k].type !== i) || (newBeads[j][k].dropGrid <= 0)) continue;
                newBeads[j][k].y += sub;
                mCtx.fillRect(x, newBeads[j][k].y - halfBeadSize, beadSize, beadSize);
                --newBeads[j][k].dropGrid;
            }
        }
    }
}


// redraw when move beads
function drawMove() {
    var x = clickedBead.x;
    var y = clickedBead.y;
    // clear only a part 
    mCtx.clearRect(x - gridSize * 1.5, y - gridSize * 1.5, x + gridSize * 1.5, y + gridSize * 1.5);
    drawBeads();
    mCtx.globalAlpha = 0.5;
    chooseColor(clickedBead.type);
    mCtx.fillRect(x, y, beadSize, beadSize);
}

// redraw when input up or out 
function drawUp() {
    var x = beads[hover].x - halfBeadSize;
    var y = beads[hover].y - halfBeadSize;
    // clear only a part 
    mCtx.clearRect(x - gridSize * 2, y - gridSize * 2, gridSize * 4, gridSize * 4);
    
    drawBeads();
    mCtx.globalAlpha = 1;
    chooseColor(beads[hover].type);
    mCtx.fillRect(x, y, beadSize, beadSize);
}

// redraw when clear beads
function drawClear(thisClear) {
    for (k = 0; k < thisClear.length; ++k) {
        var index = thisClear[k];
        var x = startX + (index % 6) * gridSize;
        var y = startY + Math.floor(index / 6) * gridSize;
        mCtx.clearRect(x, y, gridSize, gridSize);
    }
}

function chooseColor(i) {
    switch (i) {
        case 0:
            mCtx.fillStyle = "#FF0000";
            break;
        case 1:
            mCtx.fillStyle = "#00DD00";
            break;
        case 2:
            mCtx.fillStyle = "#77DDFF";
            break;
        case 3:
            mCtx.fillStyle = "#FFFF77";
            break;
        case 4:
            mCtx.fillStyle = "#B94FFF";
            break;
        case 5:
            mCtx.fillStyle = "#FF88C2";
            break;
    }
}