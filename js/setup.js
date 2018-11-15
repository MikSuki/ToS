window.onload = function () {
    mainCanvas = document.getElementById("mainCanvas");
    backCanvas = document.getElementById("backCanvas");
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

    mCtx = mainCanvas.getContext("2d");
    bCtx = backCanvas.getContext("2d");

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    mainCanvas.width = canvasWidth;
    mainCanvas.height = canvasHeight;
    backCanvas.width = canvasWidth;
    backCanvas.height = canvasHeight;



    gridSize = Math.floor(canvasHeight * 0.1 / 10) * 10;
    beadSize = Math.floor(gridSize * 0.85 / 10) * 10;
    halfBeadSize = Math.floor(beadSize * 0.5);
    gap = Math.floor((gridSize - beadSize) / 2);
    startX = Math.floor(canvasWidth * 0.5 - gridSize * 3);
    startY = Math.floor(canvasHeight * 0.4);
    endX = Math.floor(canvasWidth * 0.5 + gridSize * 3);
    endY = Math.floor(startY + gridSize * 5);
    sub = Math.floor(gridSize / dropSize);


    console.log("gridSize   " + gridSize);
    console.log("beadSize   " + beadSize);
    console.log("halfBeadSize   " + halfBeadSize);
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

    gameStart();
}

function gameStart() {
    createBeads();
    drawBackground();
    drawBeads();
    canPlay = true;
}