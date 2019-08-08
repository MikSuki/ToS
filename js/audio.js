function audPlay() {
    if(!game.status.is_load) return;
    game.status.music = ~game.status.music;
    if (game.status.music) {
        if (game.status.is_start)
            game.res.aud.dic["bgm"].play();
        else
            game.res.aud.dic["start"].play();
        game.view.ui.img.aud.src = "image/UI/musicPause.png";
    }
    else {
        if (game.status.is_start)
            game.res.aud.dic["bgm"].pause();
        else
            game.res.aud.dic["start"].pause();
        game.view.ui.img.aud.src = "image/UI/musicPlay.png";
    }
}