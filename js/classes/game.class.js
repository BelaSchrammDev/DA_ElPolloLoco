class Game {
    canvas;
    ctx;
    air;
    cameraX = 0;
    levelWidth = 720;
    renderInterval = -1;

    backgrounds = [];
    clouds = [];

    player;

    movement;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.movement = new Movement();
        this.getAir();
    }


    startCameraTest() {
        setInterval(() => {
            if (this.movement.Left) {
                this.cameraX -= 10;
                if (this.cameraX < 0) this.cameraX = 0;
            } else if (this.movement.Right) {
                this.cameraX += 10;
                if (this.cameraX > (this.levelWidth - this.canvas.width)) this.cameraX = this.levelWidth - this.canvas.width;
            } else return;
        }, 1000 / 60);
    }


    moveCamera(offset) {
        this.cameraX += offset;
        if (this.cameraX < 0) this.cameraX = 0;
        if (this.cameraX > (this.levelWidth - this.canvas.width)) this.cameraX = this.levelWidth - this.canvas.width;
    }


    start() {
        this.renderInterval = setInterval(() => {
            this.drawFrame();
        }, 1000 / 60);
        this.clouds.forEach((cloud) => {
            cloud.start();
        });
        this.player.start();
        // this.startCameraTest();
    }


    stop() {
        this.clouds.forEach((cloud) => {
            cloud.stop();
        });
        clearInterval(this.renderInterval);
    }


    getAir() {
        this.air = new Image();
        this.air.src = './img_pollo_locco/img/5_background/layers/air.png';
    }


    renderAir() {
        this.ctx.drawImage(this.air, 0, 0, this.canvas.width, this.canvas.height);
    }


    drawFrame() {
        this.renderAir();
        this.clouds.forEach((cloud) => cloud.draw());
        this.backgrounds.forEach((background) => background.draw());
        this.player.draw();
    }
}