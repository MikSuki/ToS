function drawStartView() {
    var t = 0;
    if (canvasWidth > canvasHeight) {
        var h = canvasHeight;
        var w = Math.floor(h / 492 * 900);
        var x = Math.floor((canvasWidth - w) / 2);
        var y = 0;
    }
    else {
        var w = canvasWidth;
        var h = Math.floor(w / 640 * 960);
        var y = Math.floor((canvasHeight - h) / 2);
        var x = 0;
    }

    sCtx.fillStyle = "#000000";
    var s = setInterval(() => {
        if (++t > 41) {
            clearInterval(s);
            divText.style.display = "block";
            startCanvas.addEventListener("click", start);
            return;
        }
        sCtx.globalAlpha = 1;
        sCtx.fillRect(0, 0, canvasWidth, canvasHeight);;
        sCtx.globalAlpha = 0.025 * t;

        sCtx.drawImage(imgDic['startBack'], x, y, w, h);
    }, 50);

}

function breakStartView() {
    var t = 0;
    var s = setInterval(() => {
        if (++t > 41) {
            startCanvas.style.display = "none";
            drawGameView()
            clearInterval(s);
            return;
        }
        startCanvas.style.opacity = 1 - 0.025 * t;
    }, 75);
}

function drawGameView() {
    var t = 0;
    audioDic["start"].pause();
    var s = setInterval(() => {
        if (++t > 21) {
            sCtx.globalAlpha = 1;
            sCtx.fillRect(0, 0, canvasWidth, canvasHeight);
            setTimeout(() => {
                beadsGroup.style.opacity = 1;
                backCanvas.style.opacity = 1;
                if (music) audioDic["bgm"].play();
                gameStart = true;
                canPlay = true;
            }, 500);
            clearInterval(s);
            return;
        }
        beadsGroup.style.opacity = 0.05 * t;
        backCanvas.style.opacity = 0.05 * t;
    }, 60);
}

function drawGrid() {

    bCtx.drawImage(imgDic['grid'], startX, startY, gridSize * 4, gridSize * 4);
    bCtx.drawImage(imgDic['grid'], 0, 0, 168, 168, startX + gridSize * 4, startY, gridSize * 2, gridSize * 2);
    bCtx.drawImage(imgDic['grid'], 0, 0, 168, 168, startX + gridSize * 4, startY + gridSize * 2, gridSize * 2, gridSize * 2);
    bCtx.drawImage(imgDic['grid'], 0, 0, 168, 84, startX, startY + gridSize * 4, gridSize * 2, gridSize);
    bCtx.drawImage(imgDic['grid'], 0, 0, 168, 84, startX + + gridSize * 2, startY + gridSize * 4, gridSize * 2, gridSize);
    bCtx.drawImage(imgDic['grid'], 0, 0, 168, 84, startX + gridSize * 4, startY + gridSize * 4, gridSize * 2, gridSize);
    drawBar(0, 1);
}

function drawBar(w, mode) {
    var w = (!w) ? gridSize * 6 : w;
    var h = Math.floor(gridSize * 6 / 15);
    clearBar();

    if (mode) {
        bCtx.drawImage(imgDic['lifebar'], startX, startY - h, w, h);
        bCtx.drawImage(imgDic['heart'], startX, startY - h * 1.75, h * 2, h * 2);
    }
    else {
        bCtx.drawImage(imgDic['timebar'], startX, startY - h, w, h);
        bCtx.drawImage(imgDic['clock'], startX, startY - h * 1.75, h * 2, h * 2);
    }
}

function clearBar() {
    var w = gridSize * 6;
    var h = Math.floor(w / 15);
    bCtx.clearRect(startX, startY - h, w, h);
    bCtx.clearRect(startX, startY - h * 1.75, h * 2, h);
}

function drawTransparentBead() {
    transparentBead = createBead(hover, beads[hover].type)
    transparentBead.style.opacity = 0.3
}

function drawDropBeads() {
    var i, j, k;
    for (i = 0; i < 6; ++i) {
        for (j = 0; j < 6; ++j) {
            var len = dropBeads[j].length;
            for (k = 0; k < len; ++k) {
                if ((dropBeads[j][k].type !== i) || (dropBeads[j][k].dropGrid <= 0)) continue;
                dropBeads[j][k].y += sub;
                dropBeads[j][k].img.style.top = dropBeads[j][k].y + 'px'
                --dropBeads[j][k].dropGrid;
            }
        }
    }
}

function drawNewBeads() {
    var i, j, k;
    for (i = 0; i < 6; ++i) {
        for (j = 0; j < 6; ++j) {
            var len = newBeads[j].length;
            for (k = 0; k < len; ++k) {
                if ((newBeads[j][k].type !== i) || (newBeads[j][k].dropGrid <= 0)) continue;
                newBeads[j][k].y += sub;
                newBeads[j][k].img.style.top = newBeads[j][k].y + 'px'
                --newBeads[j][k].dropGrid;
            }
        }
    }
}

function drawMove() {
    transparentBead.style.left = beads[hover].x + 'px'
    transparentBead.style.top = beads[hover].y + 'px'
}

function drawUp() {
    beads[hover].img.style.left = beads[hover].x + 'px'
    beads[hover].img.style.top = beads[hover].y + 'px'
    transparentBead.style.display = 'none'
}

function drawClear(thisClear) {
    thisClear.forEach(e => {
        beads[e].img.style.display = 'none'
    });
}


function drawBoom(thisClear) {
    const divide = 3
    thisClear.forEach(e => {
        var imgDiv = document.createElement('div')
        var imgList = []
        var unit = ~~(gridSize / divide)

        for (var i = 0; i < divide * divide; ++i) {
            var img = new Image()
            img.src = selBeadsType(beads[e].type)
            img.style.width = gridSize + 'px'
            img.style.height = gridSize + 'px'
            img.style.position = 'absolute'
            img.style.left = beads[e].x + 'px'
            img.style.top = beads[e].y + 'px'
            img.style.zIndex = '1000'
            img.style.clip = 'rect(' + unit * (~~(i / divide)) + 'px ' + unit * (i % divide + 1) + 'px ' + unit * (~~(i / divide + 1)) + 'px ' + unit * (i % divide) + 'px)'
            img.style.transform = 'scale(' + Math.random() * 1.5 + ')'
            img.style.transform = 'rotate(' + Math.random() * 360 + 'deg)'

            imgList.push(img)
            imgDiv.appendChild(img)
        }

        beadsGroup.appendChild(imgDiv)


        var t = 0
        var s = setInterval(() => {
            var i = 0
            if (++t > 25) {
                clearInterval(s)
                imgDiv.parentNode.removeChild(imgDiv)
                return
            }
            imgList.forEach(e => {
                var x = parseInt(e.style.left)
                var y = parseInt(e.style.top)

                x += (i % divide < 2) ? Math.random() * -2 : Math.random() * 2
                y += (i / divide < 2) ? Math.random() * -2 : Math.random() * 2
                ++i
                e.style.left = x + 'px'
                e.style.top = y + 'px'
            });
        }, boomT)
    });
}

function drawMiku() {
    imgDic["miku"].style.position = 'absolute'
    imgDic["miku"].style.width = ~~(gridSize * 3.5) + 'px'
    imgDic["miku"].style.height = ~~(gridSize * 3.5 * 1049 / 1007) + 'px'
    imgDic["miku"].style.left = ~~(startX + gridSize * 3 - gridSize * 3.5 / 2) + 'px'
    imgDic["miku"].style.height = ~~(gridSize * 3.5 * 1049 / 1007) + 'px'
    beadsGroup.appendChild(imgDic["miku"])
}