function pBMove() {
    var w = gridSize * 6;
    var subP = Math.floor(gridSize * 6 / 100);
    var s = setInterval(frame, 50);
    function frame() {
        if (w <= 0 || !isClick) {
            clearInterval(s);
            mouseUp();
            drawBar(0, 1);
        } else {
            w -= subP;
            drawBar(w, 0);
        }
    }
}