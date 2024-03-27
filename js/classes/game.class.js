class Game {
    canvas;
    ctx;
    air;
    renderInterval = -1;

    backgrounds = [];

    keyBoard;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.keyBoard = new KeyBoard();
        this.getAir();
    }


    start() {
        this.renderInterval = setInterval(() => {
            this.drawFrame();
        }, 1000 / 60);
    }


    stop() {
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
        this.backgrounds.forEach((background) => {
            background.draw(this.ctx);
        });
    }
}