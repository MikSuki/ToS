function addTL() {
    beadsGroup.addEventListener('touchstart', function (e) {
        event.preventDefault();
        mouseDown(e.touches[0].clientX, e.touches[0].clientY);
    }
        , true);
    beadsGroup.addEventListener('touchmove', function (e) {
        event.preventDefault();
        mouseMove(e.touches[0].clientX, e.touches[0].clientY);
    }
        , true);
    beadsGroup.addEventListener('touchend', function () {
        event.preventDefault();
        mouseUp();
    }
        , true);
}


function mouseDown(x, y) {
    var mousePosX = Math.floor(x);
    var mousePosY = Math.floor(y);

    if (gameStart) addClkPars(x, y)

    if (canPlay && mousePosX > startX && mousePosX < endX
        && mousePosY > startY && mousePosY < endY) {
        var i = Math.floor(((mousePosX - startX) / gridSize)) + Math.floor(((mousePosY - startY) / gridSize)) * 6;
        canPlay = false;
        isClick = true;
        clickedBead.type = beads[i].type;
        hover = i;
        beads[hover].img.style.zIndex = clickZ

        offsetX = Math.floor(mousePosX - startX - gridSize * (i % 6) - gap);
        offsetY = Math.floor(mousePosY - startY - gridSize * Math.floor(i / 6) + gap);
        clickedBead.x = Math.floor(mousePosX - offsetX);
        clickedBead.y = Math.floor(mousePosY - offsetY);

        drawTransparentBead()
    }
}


function mouseMove(x, y) {
    if (gameStart) addMvPars(x, y)
    if (!isClick) return;
    var mousePosX = Math.floor(x);
    var mousePosY = Math.floor(y);
    if (mousePosX > startX && mousePosX < endX
        && mousePosY > startY && mousePosY < endY) {

        var lastHover = hover;
        beads[hover].img.style.left = Math.floor(mousePosX - offsetX) + 'px';
        beads[hover].img.style.top = Math.floor(mousePosY - offsetY) + 'px';


        clickedBead.x = Math.floor(mousePosX - offsetX);
        clickedBead.y = Math.floor(mousePosY - offsetY);
        var x = Math.floor(((mousePosX - startX) / gridSize));
        var y = Math.floor(((mousePosY - startY) / gridSize)) * 6;
        hover = x + y;
        if (hover != lastHover) {
            // isMove , so  time is counting down
            if (!isMove) {
                isMove = true;
                pBMove();
            }
            var temp = {
                type: beads[lastHover].type,
                img: beads[lastHover].img
            }
            beads[lastHover].type = beads[hover].type;
            beads[lastHover].img = beads[hover].img;
            beads[lastHover].img.style.left = beads[lastHover].x + 'px';
            beads[lastHover].img.style.top = beads[lastHover].y + 'px';
            beads[hover].type = temp.type;
            beads[hover].img = temp.img;
            new Audio(audSrcDic["moveAud"]).play();
        }
        drawMove();
    }
    else mouseUp();
}


function mouseUp() {
    if (canPlay || !isClick) return;
    beads[hover].img.style.zIndex = normalZ
    isClick = false;
    if (!isMove) {
        drawUp();
        canPlay = true;
        return;
    }
    isMove = false;
    drawUp();
    ruleStart();
}



