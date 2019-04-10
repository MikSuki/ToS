function start() {
    if (gameStart) return;

    if (music) {
        var t = 0;
        var s = setInterval(() => {
            if (++t > 10) {
                clearInterval(s);
                audioDic["start"].pause();
                return;
            }
            audioDic["start"].volume -= 0.1;
        }, 100);
    }

    gameStart = true;
    divText.style.display = "none";
    initBeads();
    drawGrid();
    drawMiku()
    breakStartView();
}



function findConnect() {
    var i, j, type, connect;
    // row
    for (i = 0; i < 5; ++i) {
        type = beads[i * 6].type;
        connect = 1;
        for (j = 1 + i * 6; j < (6 + i * 6); ++j) {
            if (type === beads[j].type) {
                ++connect;
            }
            else {
                pushArr(j, type, connect, 0);
                type = beads[j].type;
                connect = 1;
            }
        }
        pushArr(j, type, connect, 0);
    }
    // col
    for (i = 0; i < 6; ++i) {
        type = beads[i].type;
        connect = 1;
        for (j = i + 6; j < 30; j += 6) {
            if (type === beads[j].type) {
                ++connect;
            }
            else {
                pushArr(j, type, connect, 1);
                type = beads[j].type;
                connect = 1;
            }
        }
        pushArr(j, type, connect, 1);
    }
    if (!clearFlag) {
        canPlay = true;
        combo = 0;
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
    return new Promise(r => {
        var s = setInterval(function () {
            // first, find one of col or row need to clear
            while (!(l1 = row[i].length) && !(l2 = col[i].length)) {
                if (++i >= 6) {
                    clearInterval(s);
                    r();
                    return;
                }
            }
            l1 = (row[i][0]) ? row[i][0].length : 0;
            l2 = (col[i][0]) ? col[i][0].length : 0;
            if (l1) {
                for (j = 0; j < l1; ++j)
                    thisClear.push(row[i][0][j]);
                dir = 1;
                row[i].splice(0, 1);
            }
            else {
                for (j = 0; j < l2; ++j)
                    thisClear.push(col[i][0][j]);
                dir = -1;
                col[i].splice(0, 1);
            }
            // find has any connect with thisclear ?
            var flag = true;
            // is any thisClear[row] conect col  or  thisClear[col] connect row ?
            while (flag) {
                flag = false;
                dirArr = (dir) ? col[i] : row[i];
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
                    dirArr = row[i];
                else
                    dirArr = col[i];

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
            // clear canvas
            drawClear(thisClear);
            drawBoom(thisClear)
            // play music
            if (thisClear.length >= 5)
                new Audio(audSrcDic["cntAud"]).play();
            ++combo;
            if (combo < 10) {
                audioDic["comboAud" + combo.toString()].play();
            }
            else
                new Audio(audSrcDic["comboMax"]).play();

            thisClear = [];
        }, clearT)
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
        if (!beads[index].isClear) {
            if (k !== 0) {
                // -------------
                // TODO: del type
                // -------------
                dropBeads[i % 6].push({
                    type: beads[index].type,
                    img: beads[index].img,
                    y: beads[index].y + sub,
                    dropGrid: k * dropSize - 1
                });
            }
        }
        else {
            ++k;
            var type = Math.floor((Math.random() * beadTypes))
            var bead = {
                type: type,
                img: createBead(0, type),
                y: beads[0].y - gridSize * k + sub,
                dropGrid: 0
            };
            bead.img.style.left = beads[i % 6].x + 'px'
            bead.img.style.top = bead.y + 'px'
            beads[index].isClear = false;

            newBeads[i % 6].push(bead);
        }

        if (++j > 4) {
            max = (k > max) ? k : max;
            ++i;
            j = 0;
            k = 0;
        }
    }
    // sum clearNum and set newBeads.dropGrid
    for (i = 0; i < 6; ++i) {
        var len = newBeads[i].length;
        clearNum[i] = dropBeads[i].length + len;
        for (j = 0; j < len; ++j) {
            newBeads[i][j].dropGrid = len * dropSize - 1;
        }
    }

    tT = max * dropSize;


    return new Promise(r => {
        var s = setInterval(() => {
            if (++t >= tT) {
                clearInterval(s);
                r();
                return;
            }
            if (!(t % 5)) dropT -= 2.5;
            drawDropBeads();
            drawNewBeads();
        }, dropT)
    });


}

// build new beads[30]
function buildBeads() {
    var i = 0, j, k = 0;
    var arr;
    for (; i < 6; ++i) {
        if (!dropBeads[i].length) {
            if (!newBeads[i].length) continue;
            else arr = newBeads[i];
        }
        else arr = dropBeads[i];

        j = clearNum[i] - 1;

        while (j >= 0) {
            beads[i + j * 6].type = arr[k].type;
            //beads[i + j * 6].img.parentNode.removeChild(beads[i + j * 6].img)
            beads[i + j * 6].img = arr[k++].img;
            if (!arr[k]) {
                k = 0;
                arr = newBeads[i];
                if (!arr.length) continue;
            }
            --j;
        }
    }
}

function allClear() {
    var i = 0;
    for (; i < 6; ++i) {
        col[i].length = 0;
        row[i].length = 0;
        dropBeads[i].length = 0;
        newBeads[i].length = 0;
        clearNum[i].length = 0;
    }
    clearFlag = false;
    dropT = 15;
}

//dir: row -> 0, col -> 1
function pushArr(j, type, connect, dir) {
    if (connect < 3) return;
    var arr = (dir) ? col[type] : row[type];
    // row or col
    var s = dir ? 6 : 1;
    arr.push([]);
    var len = arr.length - 1;

    for (var k = 0; k < connect; ++k) {
        j -= s;
        beads[j].isClear = true;
        arr[len].push(j);
    }
    clearFlag = true;
}