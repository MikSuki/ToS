window.onload = function () {
    // size
    setSize();
    // add touch event
    addTL();
    // load image & audio 
    load();

    // 2d array
    for (i = 0; i < 6; ++i) {
        // i -> type 
        row[i] = [];
        col[i] = [];
        // i -> which row
        newBeads[i] = [];
        dropBeads[i] = [];
    }
}


