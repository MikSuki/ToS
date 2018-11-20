function setSize() {
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
        endY = Math.floor(canvasHeight - (canvasWidth - gridSize * 6));
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
}