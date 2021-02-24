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
        const clearQueue = []
        const clears = [[]]

        for (let i = 0; i < 28; ++i) {
            if (game.bead.cur[i].isClear != true) {
                if (clears[clears.length - 1].length != 0)
                    clears.push([])
                findConnect({
                    index: i,
                    parent: -1
                })
            }
        }
        if (clears[clears.length - 1].length != 0)
            clears.push([])
        // no connect return
        if (!game.status.is_clear) {
            game.status.can_play = true;
            game.status.combo = 0;
            throw ('no connect');
        }

        function findConnect(node) {
            const startPos = node.index
            const offset = [-6, 6, -1, 1] // up down left right
            const type = game.bead.cur[startPos].type
            let contiguous = 1,
                lastPos = startPos;

            // find straight and horizontal connections
            for (let i = 0; i < offset.length; ++i) {
                let curPos = startPos + offset[i];

                if (boundaryCheck(startPos, curPos, offset[i]) != true) {
                    while (type == game.bead.cur[curPos].type) {
                        curPos += offset[i]
                        ++contiguous
                        if (boundaryCheck(startPos, curPos, offset[i]))
                            break
                    }
                }

                if (i % 2) { // column- down || row- right
                    if (contiguous >= 3) {
                        let j = lastPos
                        while (j != curPos) {
                            if (game.bead.cur[j].isClear != true) {
                                clears[clears.length - 1].push(j)
                                clearQueue.push({
                                    index: j,
                                    parent: -1
                                })
                            }
                            game.bead.cur[j].isClear = true
                            j += offset[i]
                        }
                        game.status.is_clear = true
                    }
                    contiguous = 1
                }
                else // column- up || row- left
                    lastPos = curPos - offset[i];
            }

            // recursive find other connections
            let next = clearQueue.shift()
            const temp = [] // same type but not connected
            while (next !== undefined) {
                offset.forEach(o => {
                    const n = next.index + o
                    const b = game.bead.cur[n]
                    if (boundaryCheck(next.index, n, o) != true &&
                        b.isClear != true && b.type == type && b.isIntoQueue != true) {
                        clearQueue.push({
                            index: n,
                            parent: next.index
                        })
                        b.isIntoQueue = true
                    }
                })
                if (next.parent == -1 || clears[clears.length - 1].indexOf(next.parent) != -1)
                    findConnect(next)
                else
                    temp.push(next.index)

                next = clearQueue.shift()
            }

            temp.forEach(index => {
                game.bead.cur[index].isIntoQueue = false
            })

            function boundaryCheck(startPos, curPos, offset) {
                if (curPos < 0 ||
                    curPos > 29 ||
                    (offset == -1 && curPos < ~~(startPos / 6) * 6) ||
                    (offset == 1 && curPos >= ~~(startPos / 6) * 6 + 6)) {
                    return true
                }
                return false
            }
        }

        // clear start
        return new Promise(r => {
            //game.loop.doSth.push(loop);
            //ID = game.loop.newWork(loop);
            let i = 0
            let s = setInterval(() => {
                const thisClear = clears[i]
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

                if (++i >= clears.length - 1) {
                    clearInterval(s);
                    setTimeout(() => {
                        r();
                    }, 400);

                    return
                }
            }, game.time.clear)
        });
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
                game.bead.cur[index].isIntoQueue = false;
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
            // game.bead.clear.col[i].length = 0;
            // game.bead.clear.row[i].length = 0;
            game.bead.drop[i].length = 0;
            game.bead.new[i].length = 0;
            game.bead.clear.clearNum[i].length = 0;
        }
        for (let i = 0; i < 30; ++i) {
            game.bead.cur[i].isIntoQueue = false;
            game.bead.cur[i].isClear = false;
        }
        game.status.is_clear = false;
        game.time.drop = 15;
    }
})();
