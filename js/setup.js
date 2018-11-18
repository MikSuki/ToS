window.onload = function () {
    startBtn = document.getElementById("button");
    bar = document.getElementById("bar");
    mainCanvas = document.getElementById("mainCanvas");
    backCanvas = document.getElementById("backCanvas");

    mCtx = mainCanvas.getContext("2d");
    bCtx = backCanvas.getContext("2d");

    // size
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    mainCanvas.width = canvasWidth;
    mainCanvas.height = canvasHeight;
    backCanvas.width = canvasWidth;
    backCanvas.height = canvasHeight;

    gridSize = Math.floor(canvasHeight * 0.1 / 10) * 10;
    halfGridSize = Math.floor(gridSize / 2);
    gap = Math.floor(gridSize * 0.1 / 10) * 10;
    startX = Math.floor(canvasWidth * 0.5 - gridSize * 3);
    startY = Math.floor(canvasHeight * 0.4);
    endX = Math.floor(canvasWidth * 0.5 + gridSize * 3);
    endY = Math.floor(startY + gridSize * 5);
    sub = Math.floor(gridSize / dropSize);


    if (canvasHeight >= canvasWidth) {
        gridSize = Math.floor(canvasWidth / 6 / 10) * 10;
        halfGridSize = Math.floor(gridSize / 2);
        gap = Math.floor(gridSize * 0.1 / 10) * 10;
        endX = Math.floor(canvasWidth - (canvasWidth - gridSize * 6) / 2);
        endY = Math.floor(canvasHeight * 0.9);
        startX = Math.floor((canvasWidth - gridSize * 6) / 2);
        startY = Math.floor(endY - gridSize * 5);
        sub = Math.floor(gridSize / dropSize);
    }

    // UI
    startBtn.style.height = Math.floor(canvasHeight * 0.1) + "px";
    startBtn.style.width = gridSize * 3 + "px";
    startBtn.style.left = startX + gridSize * 1.5 + "px";
    startBtn.style.top = Math.floor(canvasHeight * 0.5 - canvasHeight * 0.05) + "px";
    startBtn.style.fontSize = Math.floor(canvasHeight * 0.05) + "px";

    // add touch event
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


    // audio src
    var i = 0;
    for (; i < 9; ++i) {
        var source = "music/combo/combo" + (i + 1).toString() + ".mp3";
        comboAud[i] = new Audio(source);
    }
    comboMaxAudSrc = "music/combo/combo10.mp3"

    moveAudSrc = "music/movebeads/1.wav";
    cntAudSrc = "music/cnt/1.wav";
    bgm = new Audio("music/bgm/1.mp3");
    // repeat
    bgm.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    
    // image src
    backImg = new Image();
    cursor = new Image();
    timeBar = new Image();
    lifeBar = new Image();
    timeImg = new Image();
    lifeImg = new Image();
    musicPlay = new Image();
    musicPause = new Image();

    backImg.src = "image/UI/background.png";
    cursor.src = "image/UI/cursor.png";
    timeBar.src = "image/UI/timebar.png";
    lifeBar.src = "image/UI/lifebar.png";
    timeImg.src = "image/UI/clock.png";
    lifeImg.src = "image/UI/heart.png";
    musicPlay.src = "image/UI/musicPlay.png";
    musicPause.src = "image/UI/musicPause.png";

    for (i = 0; i < 6; ++i)
        beadsImg[i] = new Image();
    beadsImg[0].src = "image/beads/f.png";
    beadsImg[1].src = "image/beads/t.png";
    beadsImg[2].src = "image/beads/w.png";
    beadsImg[3].src = "image/beads/l.png";
    beadsImg[4].src = "image/beads/d.png";
    beadsImg[5].src = "image/beads/h.png";





    console.log("gridSize   " + gridSize);
    console.log("gap   " + gap);
    console.log("startX   " + startX);
    console.log("startY   " + startY);
    console.log("endX   " + endX);
    console.log("endY   " + endY);
    console.log("sub   " + sub);

    // 2d array
    for (i = 0; i < 6; ++i) {
        // i -> type 
        row[i] = [];
        col[i] = [];
        // i -> which row
        newBeads[i] = [];
        dropBeads[i] = [];
    }
}

function gameStart() {
    startBtn.style.display = "none";
    createBeads();
    drawBackground();
    drawBeads();
    canPlay = true;
}