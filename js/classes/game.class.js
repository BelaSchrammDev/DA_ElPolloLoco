class Game extends Interval {
    canvas;
    ctx;
    bg_ImageObject;
    cameraX = 0;
    groundLevel = 420;
    levelWidth = 0;

    gameStateObject;
    gameStatesObjectsArray = {
        'level_1': new GameStateLevel1(this),
        'menu_desktop': new GameStateMenuDesktop(this),
        'game_over': new GameStateGameOverDesktop(this),
        'win': new GameStateWin(this),
    };
    gamePaused = false;
    gameOver = false;
    soundMute = false;

    backgrounds = [];
    clouds = [];
    enemies = [];
    boss;
    collectables = [];
    uiItems = [];
    flybottles = [];
    scoreText;

    player;
    score = 0;
    coins = 0;
    maxcoins = 0;
    bottles = 0;
    maxbottles = 0;

    sound = new SoundEngine();

    constructor() {
        super();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.interaction = new Interaction();
    }

    setBackgroundImage(imagePath) {
        this.bg_ImageObject = new ImageObject(imagePath);
    }

    moveCamera(offset) {
        this.cameraX += offset;
        if (this.cameraX < 0) this.cameraX = 0;
        if (this.cameraX > (this.levelWidth - this.canvas.width)) this.cameraX = this.levelWidth - this.canvas.width;
    }

    setGameState(state) {
        this.gameStateObject = this.gameStatesObjectsArray[state];
        this.gameStateObject.entering();
    }

    resetLevel(width) {
        this.levelWidth = width;
        this.gameOver = false;
        this.bg_ImageObject = null;
        this.cameraX = 0;
        this.player = null;
        this.boss = null;
        this.resetAssets();
        this.resetScores();
        this.fillCanvas('rgba(256, 200, 120, 1)');
    }


    fillCanvas(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    resetScores() {
        this.score = 0;
        this.coins = 0;
        this.bottles = 0;
    }

    resetAssets() {
        this.backgrounds = [];
        this.clouds = [];
        this.enemies = [];
        this.collectables = [];
        this.uiItems = [];
        this.flybottles = [];
    }

    startRendering() {
        this.addInterval('render', () => this.drawFrame());
        this.addInterval('update_interaction', () => this.updateInteraction());
    }


    stopRendering() {
        this.removeInterval('render');
        this.removeInterval('update_interaction');
    }


    startAssets() {
        this.clouds.forEach((cloud) => cloud.start());
        this.enemies.forEach((enemy) => enemy.start());
        this.collectables.forEach((collectable) => collectable.start());
        if (this.player) this.player.start();
        if (this.boss) this.boss.start();
    }


    stopAssets() {
        this.clouds.forEach((cloud) => cloud.stop());
        this.enemies.forEach((enemy) => enemy.stop());
        this.collectables.forEach((collectable) => collectable.stop());
        if (this.player) this.player.stop();
        if (this.boss) this.boss.stop();
    }


    pause() {
        if (this.gamePaused || this.gameOver) return;
        if (this.player) this.player.pause();
        if (this.boss) this.boss.pause();
        this.enemies.forEach((enemy) => enemy.pause());
        this.flybottles.forEach((bottle) => bottle.pause());
        this.pauseText = new Text('PAUSE', 200, 100);
        this.uiItems.push(this.pauseText);
        this.gamePaused = true;
    }


    restart() {
        if (!this.gamePaused || this.gameOver) return;
        if (this.player) this.player.restart();
        if (this.boss) this.boss.restart();
        this.flybottles.forEach((bottle) => bottle.restart());
        this.enemies.forEach((enemy) => enemy.restart());
        this.uiItems = this.uiItems.filter((item) => item !== this.pauseText);
        this.gamePaused = false;
    }


    addXCenteredText(text, x) {
        this.uiItems.push(new Text(text, x));
    }


    updateInteraction() {
        this.gameStateObject.handleInteraction(this.interaction);
        if (this.interaction.checkKeyMute()) this.sound.toggleSoundMute();
        this.enemies = this.enemies.filter((enemy) => enemy.remove == false);
        this.flybottles = this.flybottles.filter((bottle) => bottle.remove == false);
        this.collectables = this.collectables.filter((item) => item.remove == false);
        this.uiItems.forEach((text, index) => {
            text.update();
            if (text.remove) this.uiItems.splice(index, 1);
        });
    }


    drawFrame() {
        if (this.bg_ImageObject && this.bg_ImageObject.imageLoaded) this.ctx.drawImage(this.bg_ImageObject.img, 0, 0, this.canvas.width, this.canvas.height);
        this.clouds.forEach((cloud) => cloud.draw());
        this.backgrounds.forEach((background) => background.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.flybottles.forEach((bottle) => bottle.draw());
        if (this.player) this.player.draw();
        if (this.boss) this.boss.draw();
        this.collectables.forEach((collectable) => collectable.draw());
        this.uiItems.forEach((text) => text.draw());
    }
}