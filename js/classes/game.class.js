class Game extends Interval {
    canvas;
    ctx;
    air;
    cameraX = 0;
    groundLevel = 420;
    levelWidth = 0;

    gameStateObject;
    gameStatesObjectsArray = {
        'level_1': new GameStateLevel1(this),
        'menu_desktop': new GameStateMenuDesktop(this),
    };
    gamePaused = false;
    gameOver = false;
    soundMute = true;

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


    soundEffectsArray = {
        pepe_jump: { audio: new Audio('./audio/jump.wav'), playbackrate: 1.5, },
        pepe_landing: { audio: new Audio('./audio/landing_pepe.wav'), playbackrate: 1, },
        pepe_hurt: { audio: new Audio('./audio/pepe-hurt.mp3'), playbackrate: 2, },
        pepe_snore: { audio: new Audio('./audio/pepe-snore.wav'), playbackrate: 1, },
        pepe_walk: { audio: new Audio('./audio/footsteps1.wav'), playbackrate: 1, },
        chicken_dead: { audio: new Audio('./audio/chicken-dead.wav'), playbackrate: 1, },
        chicken_small_dead: { audio: new Audio('./audio/chicken-small-dead.wav'), playbackrate: 1, },
        coin: { audio: new Audio('./audio/coin.mp3'), playbackrate: 1, },
        bottle: { audio: new Audio('./audio/bottle_ground.mp3'), playbackrate: 1, },
    }

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
    currentMusicID = '';

    constructor() {
        super();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.interaction = new Interaction();
        this.air = new ImageObject('./img_pollo_locco/img/5_background/layers/air.png');
        this.initSound();
    }


    initSound() {
        for (let soundKey in this.soundEffectsArray) {
            let sound = this.soundEffectsArray[soundKey];
            sound.audio.playbackRate = sound.playbackrate;
        }
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
        this.cameraX = 0;
        this.score = 0;
        this.backgrounds = [];
        this.clouds = [];
        this.enemies = [];
        this.collectables = [];
        this.uiItems = [];
    }

    start() {
        this.startRendering();
        this.startAssets();
        this.startGameMusic('normal');
    }


    startRendering() {
        this.addInterval('render', () => this.drawFrame());
        this.addInterval('update_interaction', () => this.updateInteraction());
    }


    startAssets() {
        this.clouds.forEach((cloud) => cloud.start());
        this.enemies.forEach((enemy) => enemy.start());
        this.collectables.forEach((collectable) => collectable.start());
        if (this.player) this.player.start();
    }


    pause() {
        if (this.gamePaused || this.gameOver) return;
        this.player.pause();
        this.enemies.forEach((enemy) => enemy.pause());
        this.pauseText = new Text('PAUSE', 200, 100);
        this.uiItems.push(this.pauseText);
        this.gamePaused = true;
    }


    restart() {
        if (!this.gamePaused || this.gameOver) return;
        this.player.restart();
        this.enemies.forEach((enemy) => enemy.restart());
        this.uiItems = this.uiItems.filter((item) => item !== this.pauseText);
        this.gamePaused = false;
    }


    stop() {
        this.clouds.forEach((cloud) => cloud.stop());
        this.enemies.forEach((enemy) => enemy.stop());
        this.player.stop();
        this.removeInterval('render');
        this.removeInterval('update_interaction');
    }


    ifLandscape() {
        return window.screen.orientation.type.includes('landscape');
    }

    ifMobile() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    setGameOver() {
        let gameoverImageIndex = Math.floor(Math.random() * 4);
        this.uiItems.push(new CenterPopImage(GAMEOVER_IMAGES[gameoverImageIndex]));
        this.restartsMessage();
        this.startGameMusic('fail');
        setDisplayNone('btnsMove', true);
        setDisplayNone('btnsRestart', false);
        this.gameOver = true;
    }


    restartsMessage() {
        if (this.ifMobile()) {
            // view restartbutton
        } else this.uiItems.push(new Text('Press Enter to restart', 450));
    }


    toggleSoundMute() {
        this.fadeCurrentMusicOut();
        this.soundMute = !this.soundMute;
    }


    togglePause() {
        if (this.gameOver) return;
        if (this.gamePaused) this.restart();
        else this.pause();
    }

    startGameMusic(newSoundID) {
        if (this.soundMute) return;
        this.fadeCurrentMusicOut();
        this.currentMusicID = newSoundID;
        let newSound = this.soundMusicArray[newSoundID];
        newSound.audio.volume = newSound.volume;
        newSound.audio.loop = newSound.loop;
        newSound.audio.playbackRate = newSound.playbackrate;
        newSound.audio.play();
    }


    fadeCurrentMusicOut() {
        if (this.currentMusicID === '') return;
        let sound = this.soundMusicArray[currentMusicID].audio;
        this.addInterval('fadeout', () => {
            let volume = sound.volume;
            if (volume <= 0) {
                sound.pause();
                this.removeInterval('fadeout');
            }
            else if (sound.volume > 0.01) sound.volume -= 0.01;
        }, 100);
    }


    playSound(soundID) {
        if (this.soundMute) return;
        let sound = this.soundEffectsArray[soundID].audio;
        if (sound.paused) {
            sound.currentTime = 0;
            sound.play();
        }
    }


    stopSound(soundID) {
        this.soundEffectsArray[soundID].audio.pause();
        this.soundEffectsArray[soundID].audio.currentTime = 0;
    }


    removeCollectable(collectable) {
        this.collectables = this.collectables.filter((item) => item !== collectable);
    }


    renderAir() {
        if (this.air.imageLoaded) this.ctx.drawImage(this.air.img, 0, 0, this.canvas.width, this.canvas.height);
    }


    updateInteraction() {
        this.gameStateObject.handleInteraction(this.interaction);
        if (this.interaction.checkKeyMute()) this.toggleSoundMute();
        this.uiItems.forEach((text, index) => {
            text.update();
            if (text.remove) this.uiItems.splice(index, 1);
        });
    }


    setPauseState(state) {
        this.PauseKeyCount++;
        if (state) this.pause();
        else this.restart();
    }


    drawFrame() {
        this.renderAir();
        this.clouds.forEach((cloud) => cloud.draw());
        this.backgrounds.forEach((background) => background.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        if (this.player) this.player.draw();
        this.collectables.forEach((collectable) => collectable.draw());
        this.uiItems.forEach((text) => text.draw());
    }
}