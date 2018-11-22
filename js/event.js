function addTL() {
    mainCanvas.addEventListener('touchstart', function (e) {
        event.preventDefault();
        mouseDown(e.touches[0].clientX, e.touches[0].clientY);
    }
        , true);
    mainCanvas.addEventListener('touchmove', function (e) {
        event.preventDefault();
        mouseMove(e.touches[0].clientX, e.touches[0].clientY);
    }
        , true);
    mainCanvas.addEventListener('touchend', function () {
        event.preventDefault();
        mouseUp();
    }
        , true);
}

function mouseDown(x, y) {
    var mousePosX = Math.floor(x);
    var mousePosY = Math.floor(y);
    if (canPlay && mousePosX > startX && mousePosX < endX
        && mousePosY > startY && mousePosY < endY) {
        var i = Math.floor(((mousePosX - startX) / gridSize)) + Math.floor(((mousePosY - startY) / gridSize)) * 6;
        canPlay = false;
        isClick = true;
        clickedBead.type = beads[i].type;
        hover = i;

        offsetX = Math.floor(mousePosX - startX - gridSize * (i % 6) - gap);
        offsetY = Math.floor(mousePosY - startY - gridSize * Math.floor(i / 6) + gap);

        clickedBead.x = Math.floor(mousePosX - offsetX);
        clickedBead.y = Math.floor(mousePosY - offsetY);

        drawMove();
    }
}


function mouseMove(x, y) {
    if (!isClick) return;

    var mousePosX = Math.floor(x);
    var mousePosY = Math.floor(y);
    if (mousePosX > startX && mousePosX < endX
        && mousePosY > startY && mousePosY < endY) {

        var lastHover = hover;
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
            var temp = beads[lastHover].type;
            beads[lastHover].type = beads[hover].type;
            beads[hover].type = temp;
            new Audio(audSrcDic["moveAud"]).play();
        }
        drawMove();
    }
    else mouseUp();
}


function mouseUp() {
    if (canPlay || !isClick) return;
    if (!isMove) {
        drawUp();
        isClick = false;
        canPlay = true;
        return;
    }
    isClick = false;
    isMove = false;
    drawUp();
    ruleStart();
}