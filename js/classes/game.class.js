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

    uiItems = [];
    scoreText;

    interaction;
    PauseKeyCount = 0;
    gamePaused = false;

    constructor() {
        super();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.interaction = new Interaction();
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

    pause() {
        this.player.pause();
        this.enemies.forEach((enemy) => enemy.pause());
    }

    restart() {
        this.player.restart();
        this.enemies.forEach((enemy) => enemy.restart());
    }


    stop() {
        this.clouds.forEach((cloud) => cloud.stop());
        this.enemies.forEach((enemy) => enemy.stop());
        this.player.stop();
        this.removeInterval('render');
        this.removeInterval('updateFlyItems');
    }

    gameOver() {
        let gameoverImageIndex = Math.floor(Math.random() * 4);
        this.uiItems.push(new CenterPopImage(GAMEOVER_IMAGES[gameoverImageIndex]));
        this.uiItems.push(new Text('Press Enter to restart', 200, 450));
    }

    getAir() {
        this.air = new Image();
        this.air.src = './img_pollo_locco/img/5_background/layers/air.png';
    }


    renderAir() {
        this.ctx.drawImage(this.air, 0, 0, this.canvas.width, this.canvas.height);
    }


    updateFlyItems() {
        this.uiItems.forEach((text, index) => {
            text.update();
            if (text.remove) this.uiItems.splice(index, 1);
        });
    }


    setPauseState(state) {
        this.PauseKeyCount++;
        if (state) this.pause();
        else this.restart();
        this.gamePaused = state;
    }


    checkPauseState() {
        switch (this.PauseKeyCount) {
            case 0:
                if (this.interaction.Pause) this.setPauseState(true);
                break;
            case 1:
                if (!this.interaction.Pause) this.PauseKeyCount++;
                break;
            case 2:
                if (this.interaction.Pause) this.setPauseState(false);
                break;
            case 3:
                if (!this.interaction.Pause) this.PauseKeyCount = 0;
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
        this.uiItems.forEach((text) => text.draw());
    }
}