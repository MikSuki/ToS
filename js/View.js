function setSize() {
    // canvas
    (() => {
        game.view.canvas.black = document.getElementById("blackCanvas");
        game.view.canvas.start = document.getElementById("startCanvas");
        game.view.canvas.back = document.getElementById("backCanvas");
        game.view.canvas.char = document.getElementById("charCanvas");
        game.view.canvas.backParticle = document.getElementById("backParticleCanvas");
        game.view.canvas.top = document.getElementById("topCanvas");

        game.view.canvas.width = window.innerWidth;
        game.view.canvas.height = window.innerHeight;

        for (let i in game.view.canvas) {
            game.view.canvas[i].width = game.view.canvas.width
            game.view.canvas[i].height = game.view.canvas.height
        }
    })();

    // ctx
    (() => {
        game.view.ctx.s = game.view.canvas.start.getContext("2d");
        game.view.ctx.b = game.view.canvas.back.getContext("2d");
        game.view.ctx.c = game.view.canvas.char.getContext("2d");
        game.view.ctx.bp = game.view.canvas.backParticle.getContext("2d");
        game.view.ctx.t = game.view.canvas.top.getContext("2d");
    })();

    // beadsGroup
    (() => {
        game.view.beadsGroup = document.getElementById("beadsGroup");
        game.view.beadsGroup.style.opacity = 0;
    })();

    // size
    (() => {
        if (game.view.canvas.height >= game.view.canvas.width) {
            game.view.size.grid = Math.floor(game.view.canvas.width / 6 / 10) * 10;
            game.view.size.halfGrid = Math.floor(game.view.size.grid / 2);
            game.view.size.gap = Math.floor(game.view.size.grid * 0.1 / 10) * 10;
            game.view.size.endX = Math.floor(game.view.canvas.width - (game.view.canvas.width - game.view.size.grid * 6) / 2);
            game.view.size.endY = Math.floor(game.view.canvas.height * 0.95 - (game.view.canvas.width - game.view.size.grid * 6));
            game.view.size.startX = Math.floor((game.view.canvas.width - game.view.size.grid * 6) / 2);
            game.view.size.startY = Math.floor(game.view.size.endY - game.view.size.grid * 5);
            game.view.size.sub = Math.floor(game.view.size.grid / game.view.size.drop);
        }
        else {
            game.view.size.grid = Math.floor(game.view.canvas.height * 0.1 / 10) * 10;
            game.view.size.halfGrid = Math.floor(game.view.size.grid / 2);
            game.view.size.gap = Math.floor(game.view.size.grid * 0.1 / 10) * 10;
            game.view.size.startX = Math.floor(game.view.canvas.width * 0.5 - game.view.size.grid * 3);
            game.view.size.startY = Math.floor(game.view.canvas.height * 0.4);
            game.view.size.endX = Math.floor(game.view.canvas.width * 0.5 + game.view.size.grid * 3);
            game.view.size.endY = Math.floor(game.view.size.startY + game.view.size.grid * 5);
            game.view.size.sub = Math.floor(game.view.size.grid / game.view.size.drop);
        }

    })();

    // UI
    (() => {
        game.view.ui.img.load = document.getElementById("loadImg");
        game.view.ui.text.div = document.getElementById("text");
        game.view.ui.btn.aud = document.getElementById("audBtn");
        game.view.ui.img.aud = document.getElementById("audImg");
        game.view.ui.btn.cheatSetting = document.getElementById('cheatSettingBtn')
        game.view.ui.btn.cheatBtn = document.getElementById('cheatBtn')


        game.view.ui.img.load.style.height = Math.floor(game.view.canvas.height * 0.1) + "px";
        game.view.ui.img.load.style.width = Math.floor(game.view.canvas.height * 0.1) + "px";
        game.view.ui.img.load.style.left = Math.floor(game.view.canvas.width * 0.5 - game.view.canvas.height * 0.05) + "px";
        game.view.ui.img.load.style.top = Math.floor(game.view.canvas.height * 0.85 - game.view.canvas.height * 0.05) + "px";
        game.view.ui.img.load.style.display = "block";

        game.view.ui.text.div.style.top = Math.floor(game.view.canvas.height * 0.95 - game.view.canvas.height * 0.05) + "px";

        if (game.view.canvas.height >= game.view.canvas.width) {
            game.view.ui.text.div.style.color = "#FFFFFF";
        }
        game.view.ui.text.div.style.fontSize = Math.floor(game.view.canvas.height * 0.05) + "px";


        // game.view.ui.btn.aud.style.left = Math.floor(game.view.size.endX - game.view.size.grid) + "px";
        // game.view.ui.btn.aud.style.top = game.view.size.grid + "px";
        // game.view.ui.img.aud.style.width = game.view.size.halfGrid + "px";
        // game.view.ui.img.aud.style.height = game.view.size.halfGrid + "px";


        // game.view.ui.btn.cheatSetting.style.left = game.view.size.startX + "px";
        // game.view.ui.btn.cheatSetting.style.top = Math.floor(game.view.canvas.height * 0.1) + "px";
        // game.view.ui.btn.cheatSetting.style.borderRadius = Math.floor(game.view.canvas.height * 0.05) + "px";

        // game.view.ui.btn.cheatBtn.style.left = game.view.size.startX + "px";
        // game.view.ui.btn.cheatBtn.style.top = Math.floor(game.view.canvas.height * 0.2) + "px";
        // game.view.ui.btn.cheatBtn.style.borderRadius = Math.floor(game.view.canvas.height * 0.05) + "px";

        // game.view.ui.btn.cheatSetting.style.display = 'none'
        // game.view.ui.btn.cheatBtn.style.display = 'none'
    })();
}