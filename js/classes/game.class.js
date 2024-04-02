class Game extends Interval {
    canvas;
    ctx;
    air;
    cameraX = 0;
    groundLevel = 420;
    levelWidth = 0;
    renderInterval = -1;

    backgrounds = [];
    clouds = [];
    enemies = [];

    player;
    score = 0;

    ui_elements = [];
    flytext = [];
    scoreText;

    movement;

    constructor() {
        super();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.movement = new Movement();
        this.scoreText = new Score(this);
        this.flytext.push(this.scoreText);
        this.getAir();
    }


    moveCamera(offset) {
        this.cameraX += offset;
        if (this.cameraX < 0) this.cameraX = 0;
        if (this.cameraX > (this.levelWidth - this.canvas.width)) this.cameraX = this.levelWidth - this.canvas.width;
    }


    start() {
        this.addInterval('render', () => this.drawFrame());
        this.addInterval('updateFlyItems', () => this.updateFlyItems());
        this.clouds.forEach((cloud) => cloud.start());
        this.enemies.forEach((enemy) => enemy.start());
        this.player.start();
    }


    stop() {
        this.clouds.forEach((cloud) => cloud.stop());
        this.enemies.forEach((enemy) => enemy.stop());
        this.player.stop();
        super.stop();
    }


    getAir() {
        this.air = new Image();
        this.air.src = './img_pollo_locco/img/5_background/layers/air.png';
    }


    renderAir() {
        this.ctx.drawImage(this.air, 0, 0, this.canvas.width, this.canvas.height);
    }


    updateFlyItems() {
        this.flytext.forEach((text, index) => {
            text.update();
            if (text.remove) this.flytext.splice(index, 1);
        });
    }


    drawFrame() {
        this.renderAir();
        this.clouds.forEach((cloud) => cloud.draw());
        this.backgrounds.forEach((background) => background.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.player.draw();
        this.ui_elements.forEach((ui_element) => ui_element.draw());
        this.flytext.forEach((text) => text.draw());
    }
}