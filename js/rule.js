// game.start
(() => {
    function start() {
        if (game.status.is_start) return;

        if (game.status.music) {
            var cnt = 0;
            game.loop.doSth.push({
                cnt: cnt,
                f: loop
            });

            function loop() {
                if (++cnt > 20) {
                    game.res.aud.dic["start"].pause();
                }
                game.res.aud.dic["start"].volume -= 0.05;
            }
        }

        game.status.is_start = true;
        game.view.ui.text.div.style.display = "none";
        game.bead.init();
        game.view.draw.main.back.grid();
        game.view.draw.main.back.miku.set();
        game.view.draw.start.close();
    }
    game.start = start;
})();


// game.ruleStart
(() => {
    function ruleStart() {
        var p = new Promise((r) => {
            r();
        });

        p
            //          if no connect throw error
            .then(() => clear())
            .then(() => drop())
            .then(() => buildBeads())
            .then(() => allClear())
            //          again
            .then(() => ruleStart())
            .catch((err) => { 
                // console.log(err) 
            });
    }

    game.ruleStart = ruleStart;

    function clear() {
        const clearRow = [], clearCol = [];
        let offset = 1
        // find all row clear
        for (i = 0; i < 5; ++i) {
            type = game.bead.cur[i * 6].type;
            connect = 1;
            for (j = offset + i * 6; j < (6 + i * 6); j += offset) {
                if (type === game.bead.cur[j].type) {
                    ++connect;
                }
                else {
                    pushToRowOrColClear(clearRow)
                    type = game.bead.cur[j].type;
                    connect = 1;
                }
            }
            pushToRowOrColClear(clearRow)
        }
        // find all col clear
        offset = 6
        for (i = 0; i < 6; ++i) {
            type = game.bead.cur[i].type;
            connect = 1;
            for (j = i + offset; j < 30; j += offset) {
                if (type === game.bead.cur[j].type) {
                    ++connect;
                }
                else {
                    pushToRowOrColClear(clearCol)
                    type = game.bead.cur[j].type;
                    connect = 1;
                }
            }
            pushToRowOrColClear(clearCol)
        }
        const clears = []

        for (let i = 0; i < clearRow.length; ++i) {
            let clear = [i]
            let row_a = clearRow[i]
            // find which row connect to row_a
            for (let j = i + 1; j < clearRow.length; ++j) {
                let row_b = clearRow[j]
                if (row_a.type != row_b.type ||
                    Math.abs(row_a.y - row_b.y) > 1 ||
                    Math.abs(row_a.x - row_b.x) >= 3)
                    continue
                clear.push(j)
            }
            // find which col connect to row_a
            for (let j = 0; j < clearCol.length; ++j) {
                let col_b = clearCol[j]
                if (row_a.type != col_b.type ||
                    !(col_b.x >= row_a.x && col_b.x <= row_a.x + row_a.length - 1) ||
                    !(col_b.y <= row_a.y && col_b.y + col_b.length - 1 >= row_a.y))
                    continue
                clear.push(j + 100)
            }
            pushToEachClear(clear)
        }

        for (let i = 0; i < clearCol.length; ++i) {
            let clear = [i + 100]
            let col_a = clearCol[i]
            // find which col connect to col
            for (let j = i + 1; j < clearCol.length; ++j) {
                let col_b = clearCol[j]
                if (col_a.type != col_b.type ||
                    Math.abs(col_a.x - col_b.x) > 1)
                    continue
                clear.push(j + 100)
            }
            pushToEachClear(clear)
        }
        // no connect return
        if (!game.status.is_clear) {
            game.status.can_play = true;
            game.status.combo = 0;
            throw ('no connect');
        }
        // clear start
        return new Promise(r => {
            //game.loop.doSth.push(loop);
            //ID = game.loop.newWork(loop);
            let i = 0
            let s = setInterval(() => {
                const thisClear = []
                clears[i].forEach(e2 => {
                    if (e2 < 100) {
                        for (let i = 0; i < clearRow[e2].length; ++i) {
                            let index = clearRow[e2].x + clearRow[e2].y * 6 + i * 1
                            game.bead.cur[index].isClear = true;
                            thisClear.push(index)
                        }
                    }
                    else if (e2 >= 100) {
                        for (let i = 0; i < clearCol[e2 - 100].length; ++i) {
                            index = clearCol[e2 - 100].x + clearCol[e2 - 100].y * 6 + i * 6
                            game.bead.cur[index].isClear = true;
                            thisClear.push(index)
                        }
                    }

                })
                game.bead.draw.clear(thisClear)
                game.bead.draw.boom(thisClear)
                // play music
                if (thisClear.length >= 5)
                    new Audio(game.res.aud.src_dic["cntAud"]).play();
                ++game.status.combo;
                if (game.status.combo < 10) {
                    game.res.aud.dic["comboAud" + game.status.combo.toString()].play();
                }
                else
                    new Audio(game.res.aud.src_dic["comboMax"]).play();

                if (++i >= clears.length) {
                    clearInterval(s);
                    setTimeout(() => {
                        r();  
                    }, 400);

                    return
                }
            }, game.time.clear)
        });

        function pushToRowOrColClear(arr) {
            if (connect < 3) return;
            game.status.is_clear = true;
            let x, y;
            if (offset == 1) {
                x = j - offset * connect - i * 6
                y = i
            }
            else {
                x = i
                y = (j - i) / offset - connect
            }
            arr.push({
                x: x,
                y: y,
                length: connect,
                type: type,
            })
        }

        function pushToEachClear(clear) {
            let alreay_connect = false
            for (let j = 0; j < clears.length; ++j) {
                for (let k = 0; k < clear.length; ++k) {
                    if (clears[j].indexOf(clear[k]) != -1) {
                        alreay_connect = true
                        clear.forEach(e => {
                            if (clears[j].indexOf(e) == -1)
                                clears[j].push(e)
                        })
                        break
                    }
                }
            }
            if (!alreay_connect)
                clears.push(clear)
        }
    }

    // calculate original beads fall and new beads drop check_down
    function drop() {
        var i, j, k, t = 0, tT, max = 0;
        // find drop beads from bottom to top
        // start at 24 (left bottom)
        i = 24;
        // which col
        j = 0;
        // how many grids need to drop
        k = 0;
        while (i <= 29) {
            var index = i - 6 * j;
            if (!game.bead.cur[index].isClear) {
                if (k !== 0) {
                    // -------------
                    // TODO: del type
                    // -------------
                    game.bead.drop[i % 6].push({
                        type: game.bead.cur[index].type,
                        img: game.bead.cur[index].img,
                        y: game.bead.cur[index].y + game.view.size.sub,
                        dropGrid: k * game.view.size.drop - 1
                    });
                }
            }
            else {
                ++k;
                var type = Math.floor((Math.random() * game.bead.type))
                var bead = {
                    type: type,
                    img: game.bead.create(0, type),
                    y: game.bead.cur[0].y - game.view.size.grid * k + game.view.size.sub,
                    dropGrid: 0
                };
                bead.img.style.left = game.bead.cur[i % 6].x + 'px'
                bead.img.style.top = bead.y + 'px'
                game.bead.cur[index].isClear = false;

                game.bead.new[i % 6].push(bead);
            }
            if (++j > 4) {
                max = (k > max) ? k : max;
                ++i;
                j = 0;
                k = 0;
            }
        }
        // sum clearNum and set game.bead.new.dropGrid
        for (i = 0; i < 6; ++i) {
            var len = game.bead.new[i].length;
            game.bead.clear.clearNum[i] = game.bead.drop[i].length + len;
            for (j = 0; j < len; ++j) {
                game.bead.new[i][j].dropGrid = len * game.view.size.drop - 1;
            }
        }

        tT = max * game.view.size.drop;

        return new Promise(r => {
            var s = setInterval(() => {
                if (++t >= tT) {
                    clearInterval(s);
                    r();
                    return;
                }
                if (!(t % 5)) game.time.drop -= 2.5;
                game.bead.draw.drop();
                game.bead.draw.new();
            }, game.time.drop)
        });


    }

    // build new beads[30]
    function buildBeads() {
        var i = 0, j, k = 0;
        var arr;
        for (; i < 6; ++i) {
            if (!game.bead.drop[i].length) {
                if (!game.bead.new[i].length) continue;
                else arr = game.bead.new[i];
            }
            else arr = game.bead.drop[i];

            j = game.bead.clear.clearNum[i] - 1;

            while (j >= 0) {
                game.bead.cur[i + j * 6].type = arr[k].type;
                //beads[i + j * 6].img.parentNode.removeChild(beads[i + j * 6].img)
                game.bead.cur[i + j * 6].img = arr[k++].img;
                if (!arr[k]) {
                    k = 0;
                    arr = game.bead.new[i];
                    if (!arr.length) continue;
                }
                --j;
            }
        }
    }

    function allClear() {
        for (let i = 0; i < 6; ++i) {
            game.bead.clear.col[i].length = 0;
            game.bead.clear.row[i].length = 0;
            game.bead.drop[i].length = 0;
            game.bead.new[i].length = 0;
            game.bead.clear.clearNum[i].length = 0;
        }
        game.status.is_clear = false;
        game.time.drop = 15;
    }
})();
