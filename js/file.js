function load() {
    var i = 0, len1 = 0, len2 = 0;
    var counter1 = 0, counter2 = 0;
    var imgOk = false, AudOk = false;

    imgDic['startBack'] = new Image();
    imgDic["grid"] = new Image();
    imgDic["cursor"] = new Image();
    imgDic["timebar"] = new Image();
    imgDic["lifebar"] = new Image();
    imgDic["clock"] = new Image();
    imgDic["heart"] = new Image();
    imgDic["musicPlay"] = new Image();
    imgDic["musicPause"] = new Image();
    imgDic["miku"] = new Image();

    
    imgDic['startBack'].src = (canvasWidth > canvasHeight) ? "image/UI/startBack.jpg" : "image/UI/startBackPhone.jpg";
    imgDic['grid'].src = "image/UI/grid.png";
    imgDic['cursor'].src = "image/UI/cursor.png";
    imgDic['timebar'].src = "image/UI/timebar.png";
    imgDic['lifebar'].src = "image/UI/lifebar.png";
    imgDic['clock'].src = "image/UI/clock.png";
    imgDic['heart'].src = "image/UI/heart.png";
    imgDic['musicPlay'].src = "image/UI/musicPlay.png";
    imgDic['musicPause'].src = "image/UI/musicPause.png";
    imgDic["miku"].src = 'image/miku/miku.png'




    for (i in imgDic) {
        imgDic[i].addEventListener('load', incrementCounter1, false);
        ++len1;
    }




    for (i = 0; i < 9; ++i) {
        audioDic["comboAud" + (i + 1).toString()] = new Audio("music/combo/combo" + (i + 1).toString() + ".mp3");
    }
    audioDic["start"] = new Audio("music/bgm/start.mp3");
    audioDic["bgm"] = new Audio("music/bgm/1.mp3");

    // repeat
    audioDic["start"].addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    audioDic["bgm"].addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);


    audSrcDic["comboMax"] = "music/combo/combo10.mp3";
    audSrcDic["moveAud"] = "music/movebeads/1.wav";
    audSrcDic["cntAud"] = "music/cnt/1.wav";


    for (var j in audioDic) {
        audioDic[j].addEventListener('canplay', incrementCounter2, false);
        ++len2;
    }



    function incrementCounter1() {
        ++counter1;
        if (counter1 === len1) {
            imgOk = true;
            console.log('All Image loaded!');
            if (imgOk && AudOk) display();
        }
    }

    function incrementCounter2() {
        ++counter2;
        if (counter2 === len2) {
            AudOk = true;
            console.log('All Audio loaded!');
            if (imgOk && AudOk) display();
        }
    }

    function display() {
        isLoad = true;
        setTimeout((() => {
            loadImg.style.display = "none";
            audBtn.style.display = "block";
            drawStartView();
        }), 1000);
    }
}