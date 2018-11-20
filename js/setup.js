window.onload = function () {
    // size
    setSize();
    // add touch event
    addTL();
    // load image & audio 
    load();

    /*
    console.log("gridSize   " + gridSize);
    console.log("gap   " + gap);
    console.log("startX   " + startX);
    console.log("startY   " + startY);
    console.log("endX   " + endX);
    console.log("endY   " + endY);
    console.log("sub   " + sub);
    */

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
