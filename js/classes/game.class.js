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

    coins = 0;
    maxcoins = 0;

    bottles = 0;
    maxbottles = 0;

    collectables = [];

    uiItems = [];
    scoreText;

    soundMusicArray = {
        normal: {
            audio: new Audio('./audio/latin-summer.mp3'),
            volume: 0.1,
            playbackrate: 1,
            loop: true,
        },
        boss: {
            audio: new Audio('./audio/fun-punk.mp3'),
            volume: 0.1,
            playbackrate: 1,
            loop: true,
        },
        fail: {
            audio: new Audio('./audio/fail.mp3'),
            volume: 0.1,
            playbackrate: 2,
            loop: false,
        },
    };
    currentSoundID = '';
    soundMute = false;

    interaction;
    PauseKeyCount = 0;
    gamePaused = false;

    constructor() {
        super();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.interaction = new Interaction();
        this.air = new ImageObject('./img_pollo_locco/img/5_background/layers/air.png');
    }


    moveCamera(offset) {
        this.cameraX += offset;
        if (this.cameraX < 0) this.cameraX = 0;
        if (this.cameraX > (this.levelWidth - this.canvas.width)) this.cameraX = this.levelWidth - this.canvas.width;
    }


    start() {
        this.addInterval('render', () => this.drawFrame());
        this.addInterval('updateFlyItems', () => this.updateUIItems());
        this.addInterval('checkPause', () => this.checkPauseState(), 50);
        this.clouds.forEach((cloud) => cloud.start());
        this.enemies.forEach((enemy) => enemy.start());
        this.collectables.forEach((collectable) => collectable.start());
        this.player.start();
        this.startGameMusic('normal');
    }


    pause() {
        this.player.pause();
        this.enemies.forEach((enemy) => enemy.pause());
        this.pauseText = new Text('PAUSE', 200, 100);
        this.uiItems.push(this.pauseText);
    }


    restart() {
        this.player.restart();
        this.enemies.forEach((enemy) => enemy.restart());
        this.uiItems = this.uiItems.filter((item) => item !== this.pauseText);
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
        this.uiItems.push(new Text('Press Enter to restart', 450));
        this.startGameMusic('fail');
    }


    startGameMusic(newSoundID) {
        if (this.soundMute) return;
        if (this.currentSoundID != '') this.fadeGameMusicOut(this.currentSoundID);
        this.currentSoundID = newSoundID;
        let newSound = this.soundMusicArray[newSoundID];
        newSound.audio.volume = newSound.volume;
        newSound.audio.loop = newSound.loop;
        newSound.audio.playbackRate = newSound.playbackrate;
        newSound.audio.play();
    }


    fadeGameMusicOut(soundID) {
        let sound = this.soundMusicArray[soundID].audio;
        this.addInterval('fadeout', () => {
            let volume = sound.volume;
            if (volume <= 0) {
                this.removeInterval('fadeout');
                sound.pause();
            }
            else if (sound.volume > 0.01) sound.volume -= 0.01;
        }, 100);
    }

    playSound(sound) {
        if (!this.soundMute) sound.play();
    }


    removeCollectable(collectable) {
        this.collectables = this.collectables.filter((item) => item !== collectable);
    }


    renderAir() {
        if (this.air.imageLoaded) this.ctx.drawImage(this.air.img, 0, 0, this.canvas.width, this.canvas.height);
    }


    updateUIItems() {
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


    drawFrame() {
        this.renderAir();
        this.clouds.forEach((cloud) => cloud.draw());
        this.backgrounds.forEach((background) => background.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.player.draw();
        this.collectables.forEach((collectable) => collectable.draw());
        this.uiItems.forEach((text) => text.draw());
    }
}