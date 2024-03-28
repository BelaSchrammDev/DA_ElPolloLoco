class Game {
    canvas;
    ctx;
    air;
    levelWidth = 2500;
    renderInterval = -1;

    backgrounds = [];
    clouds = [];

    movement;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.movement = new Movement();
        this.getAir();
    }


    start() {
        this.renderInterval = setInterval(() => {
            this.drawFrame();
        }, 1000 / 60);
        this.clouds.forEach((cloud) => {
            cloud.start();
        });
        this.backgrounds.forEach((background) => {
            background.start();
        });
    }


    stop() {
        this.clouds.forEach((cloud) => {
            cloud.stop();
        });
        this.backgrounds.forEach((background) => {
            background.stop();
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
        this.clouds.forEach((cloud) => {
            cloud.draw(this.ctx);
        });
        this.backgrounds.forEach((background) => {
            background.draw(this.ctx);
        });
    }
}