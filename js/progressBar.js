function pBMove() {
    var width = gridSize * 6;
    var subP = Math.floor(gridSize * 6 / 100);
    var s = setInterval(frame, 50);
    function frame() {
        if (width <= 0 || !isClick) {
            clearInterval(s);
            mouseUp();
        } else {
            width -= subP;
            bar.style.width = width + 'px';
        }
    }
}