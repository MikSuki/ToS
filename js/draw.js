(() => {
    function drawStartView() {
        var cnt = 100;
        var ID;

        if (game.view.canvas.width > game.view.canvas.height) {
            var h = game.view.canvas.height;
            var w = Math.floor(h / 492 * 900);
            var x = Math.floor((game.view.canvas.width - w) / 2);
            var y = 0;
        }
        else {
            var w = game.view.canvas.width;
            var h = Math.floor(w / 640 * 960);
            var y = Math.floor((game.view.canvas.height - h) / 2);
            var x = 0;
        }

        ID = game.loop.newWork(loop);

        function loop() {
            game.view.ctx.s.globalAlpha = 1;
            game.view.ctx.s.fillRect(0, 0, game.view.canvas.width, game.view.canvas.height);
            game.view.ctx.s.globalAlpha = 1 - 0.01 * cnt;
            game.view.ctx.s.drawImage(game.res.img.dic['startBack'], x, y, w, h);
            if (--cnt < 0) {
                game.view.ui.text.div.style.display = "block";
                game.view.canvas.start.addEventListener("click", game.start);
                game.loop.doSth = game.loop.doSth.filter(function (e) { return e.ID != ID })
            }
        }
    }

    function breakStartView() {
        var cnt = 31;
        var ID = game.loop.newWork(loop);

        function loop() {
            if (--cnt < 0) {
                game.view.canvas.start.style.display = "none";
                game.view.canvas.top.style.display = "block";
                game.view.canvas.black.style.opacity = 1;
                game.view.draw.main.open()
                game.loop.doSth = game.loop.doSth.filter(function (e) { return e.ID != ID })
            }
            game.view.canvas.start.style.opacity = 0.03 * cnt;
            game.view.canvas.black.style.opacity = 1 - 0.03 * cnt;
        }
    }

    function drawGameView() {
        var cnt = 21;
        var ID = game.loop.newWork(loop);
        game.res.aud.dic["start"].pause();

        function loop() {
            if (--cnt < 0) {
                game.view.ctx.s.globalAlpha = 1;
                game.view.ctx.s.fillRect(0, 0, game.view.canvas.width, game.view.canvas.height);
                game.view.beadsGroup.style.opacity = 1;
                game.view.canvas.back.style.opacity = 1;
                game.view.canvas.char.style.opacity = 1;
                game.view.canvas.top.style.opacity = 1;
                game.view.canvas.black.style.opacity = 0;
                if (game.status.music) game.res.aud.dic["bgm"].play();
                game.statusis_start = true;
                game.status.can_play = true;
                game.loop.doSth = game.loop.doSth.filter(function (e) { return e.ID != ID })
            }
            game.view.beadsGroup.style.opacity = 1 - 0.05 * cnt;
            game.view.canvas.back.style.opacity = 1 - 0.05 * cnt;
            game.view.canvas.black.style.opacity = 0.05 * cnt;
        }
    }

    function drawGrid() {

        game.view.ctx.b.drawImage(game.res.img.dic['grid'], game.view.size.startX, game.view.size.startY, game.view.size.grid * 4, game.view.size.grid * 4);
        game.view.ctx.b.drawImage(game.res.img.dic['grid'], 0, 0, 168, 168, game.view.size.startX + game.view.size.grid * 4, game.view.size.startY, game.view.size.grid * 2, game.view.size.grid * 2);
        game.view.ctx.b.drawImage(game.res.img.dic['grid'], 0, 0, 168, 168, game.view.size.startX + game.view.size.grid * 4, game.view.size.startY + game.view.size.grid * 2, game.view.size.grid * 2, game.view.size.grid * 2);
        game.view.ctx.b.drawImage(game.res.img.dic['grid'], 0, 0, 168, 84, game.view.size.startX, game.view.size.startY + game.view.size.grid * 4, game.view.size.grid * 2, game.view.size.grid);
        game.view.ctx.b.drawImage(game.res.img.dic['grid'], 0, 0, 168, 84, game.view.size.startX + + game.view.size.grid * 2, game.view.size.startY + game.view.size.grid * 4, game.view.size.grid * 2, game.view.size.grid);
        game.view.ctx.b.drawImage(game.res.img.dic['grid'], 0, 0, 168, 84, game.view.size.startX + game.view.size.grid * 4, game.view.size.startY + game.view.size.grid * 4, game.view.size.grid * 2, game.view.size.grid);
        game.view.draw.main.back.bar.redraw(0, 1);
    }

    function drawBar(w, mode) {
        var w = (!w) ? game.view.size.grid * 6 : w;
        var h = Math.floor(game.view.size.grid * 6 / 15);
        game.view.draw.main.back.bar.clear();

        if (mode) {
            game.view.ctx.b.drawImage(game.res.img.dic['lifebar'], game.view.size.startX, game.view.size.startY - h, w, h);
            game.view.ctx.b.drawImage(game.res.img.dic['heart'], game.view.size.startX, game.view.size.startY - h * 1.75, h * 2, h * 2);
        }
        else {
            game.view.ctx.b.drawImage(game.res.img.dic['timebar'], game.view.size.startX, game.view.size.startY - h, w, h);
            game.view.ctx.b.drawImage(game.res.img.dic['clock'], game.view.size.startX, game.view.size.startY - h * 1.75, h * 2, h * 2);
        }
    }

    function clearBar() {
        var w = game.view.size.grid * 6;
        var h = Math.floor(w / 15);
        game.view.ctx.b.clearRect(game.view.size.startX, game.view.size.startY - h, w, h);
        game.view.ctx.b.clearRect(game.view.size.startX, game.view.size.startY - h * 1.75, h * 2, h);
    }

    game.view.draw.start.open = drawStartView;
    game.view.draw.start.close = breakStartView;
    game.view.draw.main.open = drawGameView;
    game.view.draw.main.back.grid = drawGrid;
    game.view.draw.main.back.bar.redraw = drawBar;
    game.view.draw.main.back.bar.clear = clearBar;


    // -------------------------------------
    // -------------------------------------

    function drawTransparentBead() {
        game.bead.transparent = game.bead.create(game.bead.hover, game.bead.cur[game.bead.hover].type)
        game.bead.transparent.style.opacity = 0.3
    }

    function drawDropBeads() {
        var i, j, k;
        for (i = 0; i < 6; ++i) {
            for (j = 0; j < 6; ++j) {
                var len = game.bead.drop[j].length;
                for (k = 0; k < len; ++k) {
                    if ((game.bead.drop[j][k].type !== i) || (game.bead.drop[j][k].dropGrid <= 0)) continue;
                    game.bead.drop[j][k].y += game.view.size.sub;
                    game.bead.drop[j][k].img.style.top = game.bead.drop[j][k].y + 'px'
                    --game.bead.drop[j][k].dropGrid;
                }
            }
        }
    }

    function drawNewBeads() {
        var i, j, k;
        for (i = 0; i < 6; ++i) {
            for (j = 0; j < 6; ++j) {
                var len = game.bead.new[j].length;
                for (k = 0; k < len; ++k) {
                    if ((game.bead.new[j][k].type !== i) || (game.bead.new[j][k].dropGrid <= 0)) continue;
                    game.bead.new[j][k].y += game.view.size.sub;
                    game.bead.new[j][k].img.style.top = game.bead.new[j][k].y + 'px'
                    --game.bead.new[j][k].dropGrid;
                }
            }
        }
    }

    function drawMove() {
        game.bead.transparent.style.left = game.bead.cur[game.bead.hover].x + 'px'
        game.bead.transparent.style.top = game.bead.cur[game.bead.hover].y + 'px'
    }

    function drawUp() {
        game.bead.cur[game.bead.hover].img.style.left = game.bead.cur[game.bead.hover].x + 'px'
        game.bead.cur[game.bead.hover].img.style.top = game.bead.cur[game.bead.hover].y + 'px'
        game.bead.transparent.style.display = 'none'
    }

    function drawClear(thisClear) {
        thisClear.forEach(e => {
            game.bead.cur[e].img.style.display = 'none'
        });
    }

    function drawBoom(thisClear) {
        var boomImgGroup = {
            div: document.createElement('div'),
            img: [],
            age: 20
        }
        var cnt = 20;
        const divide = 3
        var ID

        thisClear.forEach(e => {
            var unit = ~~(game.view.size.grid / divide)

            for (var i = 0; i < divide * divide; ++i) {
                var img = new Image()
                img.src = game.bead.selType(game.bead.cur[e].type)
                img.style.width = game.view.size.grid + 'px'
                img.style.height = game.view.size.grid + 'px'
                img.style.position = 'absolute'
                img.style.left = game.bead.cur[e].x + 'px'
                img.style.top = game.bead.cur[e].y + 'px'
                img.style.zIndex = '1000'
                img.style.clip = 'rect(' + unit * (~~(i / divide)) + 'px ' + unit * (i % divide + 1) + 'px ' + unit * (~~(i / divide + 1)) + 'px ' + unit * (i % divide) + 'px)'
                img.style.transform = 'scale(' + Math.random() * 1.5 + ')'
                img.style.transform = 'rotate(' + Math.random() * 360 + 'deg)'

                boomImgGroup.img.push(img)
                boomImgGroup.div.appendChild(img)
            }
        });

        game.view.beadsGroup.appendChild(boomImgGroup.div)
        //game.view.boomImgGroups.push(boomImgGroup)

        ID = game.loop.newWork(loop);

        function loop() {
            var i = 0
            if (--cnt < 0) {
                game.view.beadsGroup.removeChild(boomImgGroup.div)
                game.loop.doSth = game.loop.doSth.filter(function (e) { return e.ID != ID })
            }
            boomImgGroup.img.forEach(e => {
                var x = parseInt(e.style.left)
                var y = parseInt(e.style.top)

                x += (i % divide < 2) ? Math.random() * -3 : Math.random() * 3
                y += (i / divide < 2) ? Math.random() * -3 : Math.random() * 3
                if (++i > divide * divide - 1) i = 0;
                e.style.left = x + 'px'
                e.style.top = y + 'px'
            });

            /*
            game.view.boomImgGroups.forEach((boomImgGroup) => {
                var i = 0
                if (--boomImgGroup.age < 0) {
                    game.view.beadsGroup.removeChild(boomImgGroup.div)
                    game.view.boomImgGroups.shift()
                }
                boomImgGroup.img.forEach(e => {
                    var x = parseInt(e.style.left)
                    var y = parseInt(e.style.top)

                    x += (i % divide < 2) ? Math.random() * -3 : Math.random() * 3
                    y += (i / divide < 2) ? Math.random() * -3 : Math.random() * 3
                    if (++i > divide * divide - 1) i = 0;
                    e.style.left = x + 'px'
                    e.style.top = y + 'px'
                });
            })

            if (game.view.boomImgGroups.length == 0)
                game.loop.doSth = () => { }*/
        }
    }


    game.bead.draw.transparent = drawTransparentBead;
    game.bead.draw.drop = drawDropBeads;
    game.bead.draw.new = drawNewBeads;
    game.bead.draw.move = drawMove;
    game.bead.draw.up = drawUp;
    game.bead.draw.clear = drawClear;
    game.bead.draw.boom = drawBoom;

})();






// draw miku
(() => {
    var start = false,
        width,
        height,
        x,
        y,
        imgData,
        imgData2,
        off,
        mut;

    function drawMiku() {
        width = ~~(game.view.size.grid * 3.5);
        height = ~~(game.view.size.grid * 3.5 * 1049 / 1007);
        x = ~~(game.view.size.startX + game.view.size.grid * 3 - game.view.size.grid * 3.5 / 2);
        y = ~~(game.view.size.startY - height * 1.2);

        game.view.ctx.c.drawImage(game.res.img.dic["miku"], 0, 0, width, height);


        imgData = game.view.ctx.c.getImageData(0, 0, width, height);
        game.view.ctx.c.clearRect(0, 0, game.view.canvas.width, game.view.canvas.height)
        imgData2 = game.view.ctx.c.getImageData(0, 0, width, height);
        off = 0;
        mut = .003;

        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255
            imgData.data[i + 1] = 255
            imgData.data[i + 2] = 255
        }

        start = true;
    }

    function redraw() {
        if(!start) return;
        // Iterate through every pixel
        for (let i = 0; i < imgData.data.length; i += 4) {
            if (imgData.data[i + 3] > 80) {
                imgData.data[i] = 50
            }
        }

        for (let i = 0, j, x, y, d = imgData.data, d1 = imgData2.data, l = d.length; i < l; i += 4) {
            y = ~~(i / (width * 4));
            x = i - (width * 4) * y;
            j = (y + ~~((height / 13) * Math.cos(mut * x + off))) * (width * 4) + x;
            d1[j] = d[i];
            d1[j + 1] = d[i + 1];
            d1[j + 2] = d[i + 2];
            d1[j + 3] = d[i + 3];
        }
        off += 0.15;

        // Draw image data to the canvas
        game.view.ctx.c.putImageData(imgData2, x, y);
    }

    game.view.draw.main.back.miku.set = drawMiku;
    game.view.draw.main.back.miku.redraw = redraw;
})();



