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
    PauseKeyCount = 0;
    gamePaused = false;

    constructor() {
        super();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.movement = new Movement();
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
        this.addInterval('checkPause', () => this.checkPauseState(), 50);
        this.clouds.forEach((cloud) => cloud.start());
        this.enemies.forEach((enemy) => enemy.start());
        this.player.start();
    }


    stop() {
        this.clouds.forEach((cloud) => cloud.stop());
        this.enemies.forEach((enemy) => enemy.stop());
        this.player.stop();
        this.removeInterval('render');
        this.removeInterval('updateFlyItems');
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


    setPauseState(state) {
        this.PauseKeyCount++;
        if (state) this.stop();
        else this.start();
        this.gamePaused = state;
    }


    checkPauseState() {
        switch (this.PauseKeyCount) {
            case 0:
                if (this.movement.Pause) this.setPauseState(true);
                break;
            case 1:
                if (!this.movement.Pause) this.PauseKeyCount++;
                break;
            case 2:
                if (this.movement.Pause) this.setPauseState(false);
                break;
            case 3:
                if (!this.movement.Pause) this.PauseKeyCount = 0;
                break;
        }
    }

    checkGameOver() {

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