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
        .catch(() => {});
}
