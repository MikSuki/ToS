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



    /*backImg = new Image();
    cursor = new Image();
    timeBar = new Image();
    lifeBar = new Image();
    timeImg = new Image();
    lifeImg = new Image();
    musicPlay = new Image();
    musicPause = new Image();*/

    for (; i < 6; ++i) {
        //beadsImg[i] = new Image();
        imgDic["bead" + i.toString()] = new Image();
    }




    /*backImg.src = "image/UI/background.png";
    cursor.src = "image/UI/cursor.png";
    timeBar.src = "image/UI/timebar.png";
    lifeBar.src = "image/UI/lifebar.png";
    timeImg.src = "image/UI/clock.png";
    lifeImg.src = "image/UI/heart.png";
    musicPlay.src = "image/UI/musicPlay.png";
    musicPause.src = "image/UI/musicPause.png";*/

    imgDic['startBack'].src = "image/UI/startBack.jpg";
    imgDic['grid'].src = "image/UI/grid.png";
    imgDic['cursor'].src = "image/UI/cursor.png";
    imgDic['timebar'].src = "image/UI/timebar.png";
    imgDic['lifebar'].src = "image/UI/lifebar.png";
    imgDic['clock'].src = "image/UI/clock.png";
    imgDic['heart'].src = "image/UI/heart.png";
    imgDic['musicPlay'].src = "image/UI/musicPlay.png";
    imgDic['musicPause'].src = "image/UI/musicPause.png";


    imgDic['bead0'].src = "image/beads/f.png";
    imgDic['bead1'].src = "image/beads/t.png";
    imgDic['bead2'].src = "image/beads/w.png";
    imgDic['bead3'].src = "image/beads/l.png";
    imgDic['bead4'].src = "image/beads/d.png";
    imgDic['bead5'].src = "image/beads/h.png";

    
    for (i in imgDic) {
        imgDic[i].addEventListener('load', incrementCounter1, false);
        ++len1;
    }
    


    /*beadsImg[0].src = "image/beads/f.png";
    beadsImg[1].src = "image/beads/t.png";
    beadsImg[2].src = "image/beads/w.png";
    beadsImg[3].src = "image/beads/l.png";
    beadsImg[4].src = "image/beads/d.png";
    beadsImg[5].src = "image/beads/h.png";*/




    for (i = 0; i < 9; ++i) {
        //var source = "music/combo/combo" + (i + 1).toString() + ".mp3";
        //comboAud[i] = new Audio(source);
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

    /*
    comboMaxAudSrc = "music/combo/combo10.mp3"
    moveAudSrc = "music/movebeads/1.wav";
    cntAudSrc = "music/cnt/1.wav";
    */
    //bgm = new Audio("music/bgm/1.mp3");

    /*
    // repeat
    bgm.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    */

    for (var j in audioDic) {
        audioDic[j].addEventListener('canplay', incrementCounter2, false);
        ++len2;
    }
    




    function incrementCounter1() {
        ++counter1;
        if (counter1 === len1) {
            imgOk = true;
            console.log('All Image loaded!');
            if(imgOk && AudOk) display();
        }
        else
            console.log(counter1);
    }

    function incrementCounter2() {
        ++counter2;
        if (counter2 === len2) {
            AudOk = true;
            console.log('All Audio loaded!');
            if(imgOk && AudOk) display();
        }
        else
            console.log(counter2);
    }

    function display(){
        isLoad = true;
        setTimeout((() => {
            loadImg.style.display = "none";
            drawStartView();
        }), 1000);
    }
}