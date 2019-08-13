function addTL() {
    game.view.canvas.top.addEventListener('touchstart', function (e) {
        event.preventDefault();
        mouseDown(e.touches[0].clientX, e.touches[0].clientY);
    }
        , true);
    game.view.canvas.top.addEventListener('touchmove', function (e) {
        event.preventDefault();
        mouseMove(e.touches[0].clientX, e.touches[0].clientY);
    }
        , true);
    game.view.canvas.top.addEventListener('touchend', function () {
        event.preventDefault();
        mouseUp();
    }
        , true);
}


function mouseDown(x, y) {
    var mousePosX = Math.floor(x);
    var mousePosY = Math.floor(y);

    if (game.status.is_start) game.particle.add.click(x, y)

    if (game.status.can_play && mousePosX > game.view.size.startX && mousePosX < game.view.size.endX
        && mousePosY > game.view.size.startY && mousePosY < game.view.size.endY) {
        var i = Math.floor(((mousePosX - game.view.size.startX) / game.view.size.grid)) + Math.floor(((mousePosY - game.view.size.startY) / game.view.size.grid)) * 6;
        game.status.can_play = false;
        game.status.is_click = true;
        game.bead.clicked.type = game.bead.cur[i].type;
        game.bead.hover = i;
        game.bead.cur[game.bead.hover].img.style.zIndex = game.view.size.z.click

        game.view.size.x.offset = Math.floor(mousePosX - game.view.size.startX - game.view.size.grid * (i % 6) - game.view.size.gap);
        game.view.size.y.offset = Math.floor(mousePosY - game.view.size.startY - game.view.size.grid * Math.floor(i / 6) + game.view.size.gap);
        game.bead.clicked.x = Math.floor(mousePosX - game.view.size.x.offset);
        game.bead.clicked.y = Math.floor(mousePosY - game.view.size.y.offset);

        game.bead.draw.transparent()
    }
}


function mouseMove(x, y) {
    if (game.status.is_start) game.particle.add.move(x, y)
    if (!game.status.is_click) return;
    var mousePosX = Math.floor(x);
    var mousePosY = Math.floor(y);
    if (mousePosX > game.view.size.startX && mousePosX < game.view.size.endX
        && mousePosY > game.view.size.startY && mousePosY < game.view.size.endY) {

        var lastHover = game.bead.hover;
        game.bead.cur[game.bead.hover].img.style.left = Math.floor(mousePosX - game.view.size.x.offset) + 'px';
        game.bead.cur[game.bead.hover].img.style.top = Math.floor(mousePosY - game.view.size.y.offset) + 'px';


        game.bead.clicked.x = Math.floor(mousePosX - game.view.size.x.offset);
        game.bead.clicked.y = Math.floor(mousePosY - game.view.size.y.offset);
        var x = Math.floor(((mousePosX - game.view.size.startX) / game.view.size.grid));
        var y = Math.floor(((mousePosY - game.view.size.startY) / game.view.size.grid)) * 6;
        game.bead.hover = x + y;
        if (game.bead.hover != lastHover) {
            // game.status.is_move , so  time is counting down
            if (!game.status.is_move) {
                game.status.is_move = true;
                pBMove();
            }
            var temp = {
                type: game.bead.cur[lastHover].type,
                img: game.bead.cur[lastHover].img
            }
            game.bead.cur[lastHover].type = game.bead.cur[game.bead.hover].type;
            game.bead.cur[lastHover].img = game.bead.cur[game.bead.hover].img;
            game.bead.cur[lastHover].img.style.left = game.bead.cur[lastHover].x + 'px';
            game.bead.cur[lastHover].img.style.top = game.bead.cur[lastHover].y + 'px';
            game.bead.cur[game.bead.hover].type = temp.type;
            game.bead.cur[game.bead.hover].img = temp.img;
            new Audio(game.res.aud.src_dic["moveAud"]).play();
        }
        game.bead.draw.move();
    }
    else mouseUp();
}


function mouseUp() {
    if (game.status.can_play || !game.status.is_click) return;
    game.bead.cur[game.bead.hover].img.style.zIndex = game.view.size.z.normal
    game.status.is_click = false;
    if (!game.status.is_move) {
        game.bead.draw.up();
        game.status.can_play = true;
        return;
    }
    game.status.is_move = false;
    game.bead.draw.up();
    game.ruleStart();
}



