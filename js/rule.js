function findConnect() {
    var i, j;
    var type;
    var connect;
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

    if (clearFlag) 
        findEachClear();
    else
        canPlay = true;
}

// total each time beads to clear
function findEachClear() {
    var i = 0, j, k, l;
    var thisClear = [];
    // dir : 1 -> col , -1 -> row
    var dir;
    var dirArr;
    var s = setInterval(function () {
        var l1 = (row[i]) ? row[i].length : 0;
        var l2 = (col[i]) ? col[i].length : 0;
        while (!l1 && !l2) {
            if (++i >= 6) {
                clearInterval(s);
                calDrop();
                return;
            }
            l1 = (row[i]) ? row[i].length : 0;
            l2 = (col[i]) ? col[i].length : 0;
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
        // find cow and row 
        var flag = true;
        // find if thisClear[row] conect col  or  thisClear[col] connect row
        while (flag) {
            flag = false;
            if (dir === 1)
                dirArr = col[i];
            else if (dir === -1)
                dirArr = row[i];

            if (dirArr.length === 0) {
                break;
            }
            var oLen = thisClear.length;
            for (j = 0; j < oLen; ++j) {
                var val = thisClear[j];
                var l1 = dirArr.length;
                for (k = 0; k < l1; ++k) {
                    var l2 = (dirArr[k]) ? dirArr[k].length : 0;
                    for (l = 0; l < l2; ++l) {
                        if (val === dirArr[k][l]) {
                            for (var m = 0; m < l2; ++m)
                                thisClear.push(dirArr[k][m]);
                            dirArr.splice(k, 1);

                            flag = true;
                            break;
                        }
                    }
                }
            }
        }
        // find if thisClear is next with row or col
        flag = 2
        while (flag) {
            if (flag === 2)
                dirArr = row[i];
            else
                dirArr = col[i];

            if (dirArr.length === 0) {
                --flag;
                continue;
            }

            var l2 = thisClear.length;
            for (j = 0; j < l2; ++j) {
                var val1 = thisClear[j];
                var l3 = dirArr.length;
                for (k = 0; k < l3; ++k) {
                    var l4 = (dirArr[k]) ? dirArr[k].length : 0;
                    for (l = 0; l < l4; ++l) {
                        var val2 = dirArr[k][l];
                        var diff = Math.abs(val1 - val2);
                        if ((diff === 6)
                            // diff = 1 , check is not col 0  and col5
                            || (diff === 1 && !(((val1 % 6) == 0 && (val2 % 6) == 5) || ((val1 % 6) == 5 && (val2 % 6) == 0)))) {

                            for (var m = 0; m < l4; ++m)
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
        thisClear = [];
    }, clearT);
}
// calculate original beads fall and new beads drop down
function calDrop() {
    var i, j, k, t = 0, tT;
    var max = 0;
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
                var bead = {
                    type: beads[index].type,
                    y: beads[index].y + sub,
                    dropGrid: k * dropSize - 1
                };
                dropBeads[i % 6].push(bead);
            }
        }
        else {
            ++k;
            var bead = {
                type: Math.floor((Math.random() * beadTypes)),
                y: beads[0].y - gridSize * k + sub,
                dropGrid: 0
            };
            newBeads[i % 6].push(bead);
            beads[index].isClear = false;
        }

        if (++j > 4) {
            max = (k > max) ? k : max;
            ++i;
            j = 0;
            k = 0;
        }
    }
    // sum clearNum and set newBeads.y
    for (i = 0; i < 6; ++i) {
        var len = newBeads[i].length;
        clearNum[i] = dropBeads[i].length + len;
        for (j = 0; j < len; ++j) {
            newBeads[i][j].dropGrid = len * dropSize - 1;
        }
    }

    tT = max * dropSize;

    var s = setInterval(function () {
        if (++t >= tT) {
            clearInterval(s);
            buildBeads();
            return;
        }
        drawDropBeads();
        drawDropBeads2();
    }, dropT);


}

function buildBeads() {
    var i = 0, j, k = 0;
    var arr;
    for (; i < 6; ++i) {
        if(!dropBeads[i].length){
            if(!newBeads[i].length) continue;
            else arr = newBeads[i];
        }
        else arr = dropBeads[i];
                      
        j = clearNum[i] - 1;

        while (j >= 0) {
            beads[i + j * 6].type = arr[k++].type;
            if (!arr[k]) {
                k = 0;
                arr = newBeads[i];
                if(!arr.length) continue;
            }
            --j;
        }
    }
    allClear();
    findConnect();
}

function allClear(){
    var i = 0;
    for( ; i < 6; ++i){
        col[i].length = 0;
        row[i].length = 0;
        dropBeads[i].length = 0;
        newBeads[i].length = 0;
        clearNum[i].length = 0;
    }
    clearFlag = false;
}

//dir: row -> 0, col -> 1
function pushArr(j, type, connect, dir) {
    if (connect < 3) return;
    var arr = [];
    for (var k = 0; k < connect; ++k) {
        // row or col
        j = dir ? (j - 6) : (j - 1);
        beads[j].isClear = true;
        arr.push(j);
    }
    if (dir) {
        col[type].push(arr);
        clearFlag = true;
    }
    else {
        row[type].push(arr);
        clearFlag = true;
    }

}
