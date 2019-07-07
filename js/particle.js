function particleStart() {
    const canvas = document.getElementById('backParticleCanvas');
    const sprite = document.createElement('canvas');
    const ctx = sprite.getContext('2d');
    const spriteSize = 100;
    const imageData = ctx.createImageData(spriteSize, spriteSize);


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particles = []

    sprite.height = 100
    sprite.width = 100
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
        else if (l < spriteSize / 2 - 30)
            imageData.data[i + 3] = 200;
        else
            imageData.data[i + 3] = 255;
    }

    // Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0);



    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;



    function addParticle() {
        function Range(start, end) {
            return start + Math.random() * (end - start)
        }

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

        particles.push(particle)
    }


    function updateParticle(deltatime) {
        particles.forEach((p) => {
            p.x += p.vx * deltatime
            p.y += p.vy * deltatime
            var frac = Math.sqrt(p.age / 4000)
            p.vy = (1 - frac) * p.startvy
            p.age += deltatime
            p.scale = frac * p.finalScale
        })
        particles = particles.filter(function (p) { return p.age < 4000 })
    }

    function drawParticle() {
        canvas.getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight)
        particles.forEach((p) => {
            canvas.getContext('2d').globalAlpha = (1 - Math.abs(1 - 2 * p.age / 4000)) / 8
            canvas.getContext('2d').drawImage(sprite, p.x, p.y, spriteSize * p.scale, spriteSize * p.scale);
        })
    }

    var lastframe = performance.now()
    var time = 0
    const newParticleTime = 5
    function loop(timestamp) {
        var dt = timestamp - lastframe
        lastframe = timestamp;
        if (++time > newParticleTime) {
            time = 0
            addParticle()
        }
        updateParticle(dt)
        drawParticle()
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}