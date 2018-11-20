function audPlay() {
    if(!isLoad) return;
    music = ~music;
    if (music) {
        if (gameStart)
            audioDic["bgm"].play();
        else
            audioDic["start"].play();
        audImg.src = "image/UI/musicPause.png";
    }
    else {
        if (gameStart)
            audioDic["bgm"].pause();
        else
            audioDic["start"].pause();
        audImg.src = "image/UI/musicPlay.png";
    }
}