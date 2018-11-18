// UI
function drawBackground() {
    bCtx.drawImage(backImg, startX, startY, gridSize * 4, gridSize * 4);
    bCtx.drawImage(backImg, 0, 0, 168, 168, startX + gridSize * 4, startY, gridSize * 2, gridSize * 2);
    bCtx.drawImage(backImg, 0, 0, 168, 168, startX + gridSize * 4, startY + gridSize * 2, gridSize * 2, gridSize * 2);
    bCtx.drawImage(backImg, 0, 0, 168, 84, startX, startY + gridSize * 4, gridSize * 2, gridSize);
    bCtx.drawImage(backImg, 0, 0, 168, 84, startX +  + gridSize * 2, startY + gridSize * 4, gridSize * 2, gridSize);
    bCtx.drawImage(backImg, 0, 0, 168, 84, startX + gridSize * 4, startY + gridSize * 4, gridSize * 2, gridSize);
    drawBar(0, 1);
    drawMusic();
}

function drawBar(w, mode) {
    var w = (!w) ? gridSize * 6 : w;
    var h = Math.floor(gridSize * 6 / 15);
    clearBar();
    if(mode){
        bCtx.drawImage(lifeBar, startX, startY - h, w, h);
        bCtx.drawImage(lifeImg, startX, startY - h * 1.75, h * 2, h * 2);
    }
    else {
        bCtx.drawImage(timeBar, startX, startY - h, w, h);
        bCtx.drawImage(timeImg, startX, startY - h * 1.75, h * 2, h * 2);
    }
}

function clearBar(){
    var w = gridSize * 6;
    var h = Math.floor(w / 15);
    bCtx.clearRect(startX, startY - h, w, h);
}

function drawMusic(){
    music = ~music;
    bCtx.clearRect(endX - gridSize, gridSize, halfGridSize, halfGridSize);
    if(music){
        bCtx.drawImage(musicPause, endX - gridSize, gridSize, halfGridSize, halfGridSize);
        bgm.play();
    }
    else{
        bCtx.drawImage(musicPlay, endX - gridSize, gridSize, halfGridSize, halfGridSize);
        bgm.pause();
    }
}




// beads
function drawBeads() {
    for (var i = 0; i < 6; ++i) {
        var img = beadsImg[i];
        for (var j = 0; j < 30; ++j) {
            if (j === hover)
                continue;
            if (beads[j].type === i) {
                mCtx.drawImage(img, beads[j].x , beads[j].y , gridSize, gridSize);
            }
        }
    }
    if (isClick) {
        var img = beadsImg[clickedBead.type];
        mCtx.globalAlpha = 0.3;
        mCtx.drawImage(img, beads[hover].x , beads[hover].y , gridSize, gridSize);
        mCtx.globalAlpha = 1;
    }
}

function drawDropBeads() {
    var i, j, k;
    for (i = 0; i < 6; ++i) {
        var len = dropBeads[i].length;
        var x = beads[i].x ;
        for (j = 0; j < len; ++j) {
            if (!dropBeads[i][j].dropGrid) continue;
            mCtx.clearRect(x, dropBeads[i][j].y  - sub, gridSize, gridSize);
        }
    }
    for (i = 0; i < 6; ++i) {
        var img = beadsImg[i];
        for (j = 0; j < 6; ++j) {
            var len = dropBeads[j].length;
            var x = beads[j].x ;
            for (k = 0; k < len; ++k) {
                if ((dropBeads[j][k].type !== i) || (dropBeads[j][k].dropGrid <= 0)) continue;
                dropBeads[j][k].y += sub;
                mCtx.drawImage(img, x, dropBeads[j][k].y , gridSize, gridSize);
                --dropBeads[j][k].dropGrid;
            }
        }
    }
}

function drawNewBeads() {
    var i, j, k;
    for (i = 0; i < 6; ++i) {
        var len = newBeads[i].length;
        var x = beads[i].x ;
        for (j = 0; j < len; ++j) {
            if (!newBeads[i][j].dropGrid) continue;
            mCtx.clearRect(x, newBeads[i][j].y  - sub, gridSize, gridSize);
        }
    }

    for (i = 0; i < 6; ++i) {
        var img = beadsImg[i];
        for (j = 0; j < 6; ++j) {
            var len = newBeads[j].length;
            var x = beads[j].x ;
            for (k = 0; k < len; ++k) {
                if ((newBeads[j][k].type !== i) || (newBeads[j][k].dropGrid <= 0)) continue;
                newBeads[j][k].y += sub;
                mCtx.drawImage(img, x, newBeads[j][k].y , gridSize, gridSize);
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
    mCtx.clearRect(x - gridSize * 2, y - gridSize * 2, gridSize * 4, gridSize * 4);
    mCtx.clearRect(startX, startY, endX, endY);
    drawBeads();
    mCtx.globalAlpha = 0.5;
    var img = beadsImg[clickedBead.type];
    mCtx.drawImage(img, x, y, gridSize, gridSize);
    mCtx.globalAlpha = 1;
    mCtx.drawImage(cursor, x, y);
}

// redraw when input up or out 
function drawUp() {
    var x = beads[hover].x ;
    var y = beads[hover].y ;
    // clear only a part 
    mCtx.clearRect(x - gridSize * 2, y - gridSize * 2, gridSize * 4, gridSize * 4);
    mCtx.clearRect(startX, startY, endX, endY);
    drawBeads();
    var img = beadsImg[beads[hover].type];
    mCtx.drawImage(img, x, y, gridSize, gridSize);
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