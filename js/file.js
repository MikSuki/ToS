(() => {
    function load() {
        var i = 0, len1 = 0, len2 = 0;
        var counter1 = 0, counter2 = 0;
        var imgOk = false, AudOk = false;
        const IMG_SRC = 'image/UI/'
        const AUDIO_SRC = "music/"

        this.img.dic['startBack'] = new Image();
        this.img.dic["grid"] = new Image();
        this.img.dic["cursor"] = new Image();
        this.img.dic["timebar"] = new Image();
        this.img.dic["lifebar"] = new Image();
        this.img.dic["clock"] = new Image();
        this.img.dic["heart"] = new Image();
        this.img.dic["musicPlay"] = new Image();
        this.img.dic["musicPause"] = new Image();
        this.img.dic["miku"] = new Image();
        this.img.dic["miku"].crossOrigin = '';


        this.img.dic['startBack'].src = (game.view.canvas.width > game.view.canvas.height) ? IMG_SRC + "startBack.jpg" : IMG_SRC + "startBackPhone.jpg";
        this.img.dic['grid'].src = IMG_SRC + "grid.png";
        this.img.dic['cursor'].src = IMG_SRC + "cursor.png";
        this.img.dic['timebar'].src = IMG_SRC + "timebar.png";
        this.img.dic['lifebar'].src = IMG_SRC + "lifebar.png";
        this.img.dic['clock'].src = IMG_SRC + "clock.png";
        this.img.dic['heart'].src = IMG_SRC + "heart.png";
        this.img.dic['musicPlay'].src = IMG_SRC + "musicPlay.png";
        this.img.dic['musicPause'].src = IMG_SRC + "musicPause.png";
        this.img.dic["miku"].src = 'https://i.imgur.com/TBbsh8Z.png'




        for (i in this.img.dic) {
            this.img.dic[i].addEventListener('load', incrementCounter1, false);
            ++len1;
        }




        for (i = 0; i < 9; ++i) {
            this.aud.dic["comboAud" + (i + 1).toString()] = new Audio("music/combo/combo" + (i + 1).toString() + ".mp3");
        }
        this.aud.dic["start"] = new Audio(AUDIO_SRC + "bgm/start.mp3");
        this.aud.dic["bgm"] = new Audio(AUDIO_SRC + "bgm/1.mp3");

        // repeat
        this.aud.dic["start"].addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        this.aud.dic["bgm"].addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);


        this.aud.src_dic["comboMax"] = AUDIO_SRC + "combo/combo10.mp3";
        this.aud.src_dic["moveAud"] = AUDIO_SRC + "movebeads/1.wav";
        this.aud.src_dic["cntAud"] = AUDIO_SRC + "cnt/1.wav";


        for (var j in this.aud.dic) {
            this.aud.dic[j].addEventListener('canplay', incrementCounter2, false);
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
            game.status.is_load = true;
            setTimeout((() => {
                game.view.ui.img.load.style.display = "none";
                // game.view.ui.btn.aud.style.display = "block";
                game.view.ctx.s.fillStyle = "#000000";
                game.view.draw.start.open();
            }), 1000);
        }
    }
    game.res.load = load;
})();
