function setSize() {
    loadImg = document.getElementById("loadImg");
    startBtn = document.getElementById("button");
    divText = document.getElementById("text");
    audBtn = document.getElementById("audBtn");
    audImg = document.getElementById("audImg");
    blackCanvas = document.getElementById("blackCanvas");
    startCanvas = document.getElementById("startCanvas");
    backCanvas = document.getElementById("backCanvas");
    beadsGroup = document.getElementById("beadsGroup");

    beadsGroup.style.opacity  = 0;
    backCanvas.style.opacity  = 0;

    sCtx = startCanvas.getContext("2d");
    bCtx = backCanvas.getContext("2d");

    // size
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    blackCanvas.width = canvasWidth;
    blackCanvas.height = canvasHeight;
    blackCanvas.style.opacity = 0;
    startCanvas.width = canvasWidth;
    startCanvas.height = canvasHeight;
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
        endY = Math.floor(canvasHeight * 0.95 - (canvasWidth - gridSize * 6));
        startX = Math.floor((canvasWidth - gridSize * 6) / 2);
        startY = Math.floor(endY - gridSize * 5);
        sub = Math.floor(gridSize / dropSize);
    }

    // UI
    loadImg.style.height = Math.floor(canvasHeight * 0.1) + "px";
    loadImg.style.width = Math.floor(canvasHeight * 0.1) + "px";
    loadImg.style.left = Math.floor(canvasWidth * 0.5 - canvasHeight * 0.05) + "px";
    loadImg.style.top = Math.floor(canvasHeight * 0.85 - canvasHeight * 0.05) + "px";
    loadImg.style.display = "block";

    divText.style.top = Math.floor(canvasHeight * 0.95 - canvasHeight * 0.05) + "px";
    
    if (canvasHeight >= canvasWidth){
        divText.style.color = "#FFFFFF";
    }
    divText.style.fontSize = Math.floor(canvasHeight * 0.05) + "px";


    audBtn.style.left = Math.floor(endX - gridSize) + "px";
    audBtn.style.top = gridSize + "px";
    audImg.style.width = halfGridSize + "px";
    audImg.style.height = halfGridSize + "px";



    cheatSettingBtn = document.getElementById('cheatSettingBtn')
    cheatBtn = document.getElementById('cheatBtn')

    cheatSettingBtn.style.left = startX + "px";
    cheatSettingBtn.style.top = Math.floor(canvasHeight * 0.1) + "px";
    cheatSettingBtn.style.borderRadius = Math.floor(canvasHeight * 0.05) + "px";

    cheatBtn.style.left = startX + "px";
    cheatBtn.style.top = Math.floor(canvasHeight * 0.2) + "px";
    cheatBtn.style.borderRadius = Math.floor(canvasHeight * 0.05) + "px";

    cheatSettingBtn.style.display = 'none'
    cheatBtn.style.display = 'none'
}