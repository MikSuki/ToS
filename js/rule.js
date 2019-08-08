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
            .then(() => findConnect())
            .then(() => findEachClear())
            .then(() => calDrop())
            .then(() => buildBeads())
            .then(() => allClear())
            //          again
            .then(() => ruleStart())
            .catch(() => { });
    }

    function findConnect() {
        var i, j, type, connect;
        // row
        for (i = 0; i < 5; ++i) {
            type = game.bead.cur[i * 6].type;
            connect = 1;
            for (j = 1 + i * 6; j < (6 + i * 6); ++j) {
                if (type === game.bead.cur[j].type) {
                    ++connect;
                }
                else {
                    pushArr(j, type, connect, 0);
                    type = game.bead.cur[j].type;
                    connect = 1;
                }
            }
            pushArr(j, type, connect, 0);
        }
        // col
        for (i = 0; i < 6; ++i) {
            type = game.bead.cur[i].type;
            connect = 1;
            for (j = i + 6; j < 30; j += 6) {
                if (type === game.bead.cur[j].type) {
                    ++connect;
                }
                else {
                    pushArr(j, type, connect, 1);
                    type = game.bead.cur[j].type;
                    connect = 1;
                }
            }
            pushArr(j, type, connect, 1);
        }
        if (!game.status.is_clear) {
            game.status.can_play = true;
            game.status.combo = 0;
            throw ('no connect');
        }
    }

    // total each time beads to clear
    function findEachClear() {
        var i = 0, j, k, l, l1, l2, l3;
        var thisClear = [];
        // dir : 1 -> col , -1 -> row
        var dir;
        var dirArr;
        var ID;

        return new Promise(r => {
            //game.loop.doSth.push(loop);

            //ID = game.loop.newWork(loop);

            var s = setInterval(() => {
                // first, find one of col or row need to clear
                while (!(l1 = game.bead.clear.row[i].length) && !(l2 = game.bead.clear.col[i].length)) {
                    if (++i >= 6) {
                        clearInterval(s);
                        //game.loop.doSth = game.loop.doSth.filter(function (e) { return e.ID != ID })
                        r();
                        return
                    }
                }
                l1 = (game.bead.clear.row[i] != undefined && game.bead.clear.row[i][0]) ? game.bead.clear.row[i][0].length : 0;
                l2 = (game.bead.clear.col[i] != undefined && game.bead.clear.col[i][0]) ? game.bead.clear.col[i][0].length : 0;
                if (l1) {
                    for (j = 0; j < l1; ++j)
                        thisClear.push(game.bead.clear.row[i][0][j]);
                    dir = 1;
                    game.bead.clear.row[i].splice(0, 1);
                }
                else {
                    for (j = 0; j < l2; ++j)
                        thisClear.push(game.bead.clear.col[i][0][j]);
                    dir = -1;
                    game.bead.clear.col[i].splice(0, 1);
                }
                // find has any connect with thisclear ?
                var flag = true;
                // is any thisClear[row] conect col  or  thisClear[col] connect row ?
                while (flag) {
                    flag = false;
                    dirArr = (dir) ? game.bead.clear.col[i] : game.bead.clear.row[i];
                    if (!dirArr) break;

                    l1 = thisClear.length;
                    for (j = 0; j < l1; ++j) {
                        var val = thisClear[j];
                        var l2 = dirArr.length;
                        for (k = 0; k < l2; ++k) {
                            l3 = (dirArr[k]) ? dirArr[k].length : 0;
                            for (l = 0; l < l3; ++l) {
                                if (val === dirArr[k][l]) {
                                    for (var m = 0; m < l3; ++m)
                                        thisClear.push(dirArr[k][m]);
                                    dirArr.splice(k, 1);

                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                // is any row or col next to thisClear ?
                flag = 2
                while (flag) {
                    if (flag === 2)
                        dirArr = game.bead.clear.row[i];
                    else
                        dirArr = game.bead.clear.col[i];

                    if (!dirArr) {
                        --flag;
                        continue;
                    }

                    l1 = thisClear.length;
                    for (j = 0; j < l1; ++j) {
                        var val1 = thisClear[j];
                        var l2 = dirArr.length;
                        for (k = 0; k < l2; ++k) {
                            var l3 = (dirArr[k]) ? dirArr[k].length : 0;
                            for (l = 0; l < l3; ++l) {
                                var val2 = dirArr[k][l];
                                var diff = Math.abs(val1 - val2);
                                if ((diff === 6)
                                    // diff = 1 , check is not col 0  and col5
                                    || (diff === 1 && !(((val1 % 6) == 0 && (val2 % 6) == 5) || ((val1 % 6) == 5 && (val2 % 6) == 0)))) {

                                    for (var m = 0; m < l3; ++m)
                                        thisClear.push(dirArr[k][m]);

                                    dirArr.splice(k, 1);
                                    ++flag;
                                    break;
                                }
                            }
                        }
                    }
                    --flag;
                }
                game.bead.draw.clear(thisClear);
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

                thisClear = [];
            }, game.time.clear)
        });
    }

    // calculate original beads fall and new beads drop down
    function calDrop() {
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

    //dir: row -> 0, col -> 1
    function pushArr(j, type, connect, dir) {
        if (connect < 3) return;
        var arr = (dir) ? game.bead.clear.col[type] : game.bead.clear.row[type];
        // row or col
        var s = dir ? 6 : 1;
        arr.push([]);
        var len = arr.length - 1;

        for (var k = 0; k < connect; ++k) {
            j -= s;
            game.bead.cur[j].isClear = true;
            arr[len].push(j);
        }
        game.status.is_clear = true;
    }

    game.ruleStart = ruleStart;
})();
