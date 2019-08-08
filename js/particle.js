(() => {
    const spriteSize = 100;
    // 0-> move
    // 1-> click
    // 2-> background
    var par_sprites = []
    var mv_pars = []
    var clk_pars = []
    var back_pars = []

    function buildParSprite() {
        for (let i = 0; i < 2; ++i) {
            par_sprites.push(document.createElement('canvas'))
            par_sprites[i].height = spriteSize
            par_sprites[i].width = spriteSize
        }
        // ---------------------------
        //    particle 0 sprite
        // ---------------------------
        (() => {
            var ctx = par_sprites[0].getContext('2d');
            var imageData = ctx.createImageData(spriteSize, spriteSize);
    
            // Iterate through every pixel
            for (let i = 0; i < imageData.data.length; i += 4) {
                // Percentage in the x direction, times 255
                let x = (i % 400) / 400 * 255;
                // Percentage in the y direction, times 255
                let y = Math.ceil(i / 400) / 100 * 255;
    
                // Modify pixel data
                imageData.data[i + 0] = 45;        // R value
                imageData.data[i + 1] = 152;        // G value
                imageData.data[i + 2] = 255;  // B value
                let l = Math.sqrt(Math.pow(((i % 400) / 4) - spriteSize / 2, 2) + Math.pow((i / 400) - spriteSize / 2, 2))
                if (l > spriteSize / 2)
                    imageData.data[i + 3] = 0;
                else if (l < spriteSize / 2 - 30)
                    imageData.data[i + 3] = 10;
                else if (l < spriteSize / 2 - 20)
                    imageData.data[i + 3] = 70;
                else if (l < spriteSize / 2 - 10)
                    imageData.data[i + 3] = 150;
                else
                    imageData.data[i + 3] = 255;
            }
    
            // Draw image data to the canvas
            ctx.putImageData(imageData, 0, 0);
        })();
    
        // ---------------------------
        //    particle 1 sprite 
        // ---------------------------
        (() => {
            var ctx = par_sprites[1].getContext('2d');
            var imageData = ctx.createImageData(spriteSize, spriteSize);
            // Iterate through every pixel
            for (let i = 0; i < imageData.data.length; i += 4) {
                // Percentage in the x direction, times 255
                let x = (i % 400) / 400 * 255;
                // Percentage in the y direction, times 255
                let y = Math.ceil(i / 400) / 100 * 255;
    
                // Modify pixel data
                imageData.data[i + 0] = x;        // R value
                imageData.data[i + 1] = y;        // G value
                imageData.data[i + 2] = 255 - x;  // B value
                let l = Math.sqrt(Math.pow((i % 400) / 4 - spriteSize / 2, 2) + Math.pow(Math.ceil(i / 400) - spriteSize / 2, 2))
                if (l > spriteSize / 2)
                    imageData.data[i + 3] = 0;
                else
                    imageData.data[i + 3] = 255;
            }
    
            // Draw image data to the canvas
            ctx.putImageData(imageData, 0, 0);
        })();
    
        // ---------------------------
        //    particle 2 sprite
        // ---------------------------
        (() => {
            par_sprites[2] = []
            var RGB_data = [255, 0, 89, 0, 255, 106, 0, 132, 255, 246, 200, 0]
            for (let j = 0; j < 4; ++j) {
                par_sprites[2].push(document.createElement('canvas'))
                par_sprites[2][par_sprites[2].length - 1].height = spriteSize
                par_sprites[2][par_sprites[2].length - 1].width = spriteSize
                var ctx = par_sprites[2][par_sprites[2].length - 1].getContext('2d');
                var imageData = ctx.createImageData(spriteSize, spriteSize);
    
                // Iterate through every pixel
                for (let i = 0; i < imageData.data.length; i += 4) {
                    // Percentage in the x direction, times 255
                    let x = (i % 400) / 400 * 255;
                    // Percentage in the y direction, times 255
                    let y = Math.ceil(i / 400) / 100 * 255;
    
                    // Modify pixel data
                    imageData.data[i + 0] = RGB_data[j * 3 + 0];        // R value
                    imageData.data[i + 1] = RGB_data[j * 3 + 1];        // G value
                    imageData.data[i + 2] = RGB_data[j * 3 + 2];  // B value
                    let l = Math.sqrt(Math.pow(((i % 400) / 4) - spriteSize / 2, 2) + Math.pow((i / 400) - spriteSize / 2, 2))
                    if (l > spriteSize / 2)
                        imageData.data[i + 3] = 0;
                    else
                        imageData.data[i + 3] = 255;
                }
    
                // Draw image data to the canvas
                ctx.putImageData(imageData, 0, 0);
            }
        })();
    
    }

    function Range(start, end) {
        return start + Math.random() * (end - start)
    }
    
    function addMvPars(x, y) {
        mv_pars.push({
            x: x,
            y: y,
            age: 0,
            scale: (game.view.canvas.width + game.view.canvas.height) / 5 / spriteSize * 0.06
        })
    }
    
    function addClkPars(x, y) {
        for (let i = 0; i < 24; ++i)
            clk_pars.push({
                color: ~~(Math.random() * 4),
                x: x,
                y: y,
                vx: 0.4 * Range(Math.cos((i - 1) * 15 * 3.14 / 180), Math.cos((i + 1) * 15 * 3.14 / 180)),
                vy: 0.4 * Range(Math.sin((i - 1) * 15 * 3.14 / 180), Math.sin((i + 1) * 15 * 3.14 / 180)),
                age: 0,
                scale: (game.view.canvas.width + game.view.canvas.height) / 5 / spriteSize * 0.04
            })
    }
    
    function addBackParts() {
        var particle = {
            x: window.innerWidth / 2,
            y: window.innerHeight * 0.5,
            vx: Range(-0.4, 0.4),
            startvy: Range(-0.4, 0.4),
            scale: Range(0, 0.5),
            age: 0,
        }
        particle.vy = particle.startvy
        particle.finalScale = Range(
            0.75 + particle.scale,
            1 + particle.scale
        )
    
        back_pars.push(particle)
    }
    
    function updParticles(deltatime) {
        updBackPars(deltatime)
        updMvPars()
        updClkPars(deltatime)
    }
    
    function updMvPars() {
        mv_pars.forEach((p) => {
            ++p.age
            p.scale *= 0.95
        })
        mv_pars = mv_pars.filter(function (p) { return p.age < 25 })
    }
    
    function updClkPars(deltatime) {
        clk_pars.forEach((p) => {
            ++p.age
            p.x += p.vx * deltatime
            p.y += p.vy * deltatime
            p.y += p.age * 0.005 * deltatime
            if (p.age % 10 == 0) {
                p.vx *= Range(0, 1.5)
                p.vy *= Range(0, 1.5)
                p.scale *= 0.4
            }
        })
        clk_pars = clk_pars.filter(function (p) { return p.age < 20 })
    }
    
    function updBackPars(deltatime) {
        back_pars.forEach((p) => {
            p.x += p.vx * deltatime
            p.y += p.vy * deltatime
            var frac = Math.sqrt(p.age / 4000)
            p.vy = (1 - frac) * p.startvy
            p.age += deltatime
            p.scale = frac * p.finalScale
        })
        back_pars = back_pars.filter(function (p) { return p.age < 4000 })
    }
    
    function drawParticles() {
        game.view.ctx.bp.clearRect(0, 0, window.innerWidth, window.innerHeight)
        game.view.ctx.t.clearRect(0, 0, window.innerWidth, window.innerHeight)
        drawMvPars()
        drawClkOars()
        drawBackPars()
    }
    
    function drawMvPars() {
        mv_pars.forEach((p) => {
            game.view.ctx.t.drawImage(par_sprites[0], p.x, p.y, p.scale * spriteSize, p.scale * spriteSize);
        })
    }
    
    function drawClkOars() {
        clk_pars.forEach((p) => {
            game.view.ctx.t.drawImage(par_sprites[2][p.color], p.x, p.y, p.scale * spriteSize, p.scale * spriteSize);
        })
    }
    
    function drawBackPars() {
        back_pars.forEach((p) => {
            game.view.ctx.bp.globalAlpha = (1 - Math.abs(1 - 2 * p.age / 4000)) / 8
            game.view.ctx.bp.drawImage(par_sprites[1], p.x, p.y, spriteSize * p.scale, spriteSize * p.scale);
        })
    }

    game.particle.build = buildParSprite;
    game.particle.update = updParticles;
    game.particle.draw = drawParticles;
    game.particle.add.move = addMvPars;
    game.particle.add.click = addClkPars;
    game.particle.add.back = addBackParts;
})();

