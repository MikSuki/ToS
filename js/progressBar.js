function pBMove() {
    var w = game.view.size.grid * 6;
    var subP = Math.floor(game.view.size.grid * 6 / 100);
    var s = setInterval(frame, 150);
    function frame() {
        if (w <= 0 || !game.status.is_click) {
            clearInterval(s);
            mouseUp();
            game.view.draw.main.back.bar.redraw(0, 1);
        } else {
            w -= subP;
            game.view.draw.main.back.bar.redraw(w, 0);
        }
    }
}