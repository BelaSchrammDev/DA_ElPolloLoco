class SoundEngine extends Interval {
    soundEffectsArray = {
        pepe_jump: { audio: new Audio('./audio/jump.wav'), volume: 1, playbackrate: 1.5, },
        pepe_landing: { audio: new Audio('./audio/landing_pepe.wav'), volume: 1, playbackrate: 1, },
        pepe_hurt: { audio: new Audio('./audio/pepe-hurt.mp3'), volume: 1, playbackrate: 2, },
        pepe_snore: { audio: new Audio('./audio/pepe-snore.wav'), volume: 1, playbackrate: 1, },
        pepe_walk: { audio: new Audio('./audio/footsteps1.wav'), volume: 0.2, playbackrate: 1, },
        chicken_dead: { audio: new Audio('./audio/chicken-dead.wav'), volume: 1, playbackrate: 1, },
        chicken_small_dead: { audio: new Audio('./audio/chicken-small-dead.wav'), volume: 1, playbackrate: 1, },
        coin: { audio: new Audio('./audio/coin.mp3'), volume: 1, playbackrate: 1, },
        bottle_wiff: { audio: new Audio('./audio/bottle_wiff.wav'), volume: 1, playbackrate: 1.5, },
        bottle_splash: { audio: new Audio('./audio/bottle_splash.wav'), volume: 1, playbackrate: 1, },
        bottle: { audio: new Audio('./audio/bottle_ground.mp3'), volume: 1, playbackrate: 1, },
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
        win: {
            audio: new Audio('./audio/win.mp3'),
            volume: 0.3,
            playbackrate: 1,
            loop: false,
        },
    };

    currentMusicID = '';

    constructor() {
        super();
        this.initSound();
    }

    initSound() {
        for (let soundKey in this.soundEffectsArray) {
            let sound = this.soundEffectsArray[soundKey];
            sound.audio.playbackRate = sound.playbackrate;
            sound.audio.volume = sound.volume;
        }
    }

    toggleSoundMute() {
        this.fadeCurrentMusicOut();
        this.soundMute = !this.soundMute;
    }


    startGameMusic(newSoundID) {
        if (this.soundMute) return;
        this.fadeCurrentMusicOut();
        this.currentMusicID = newSoundID;
        let newSound = this.soundMusicArray[newSoundID];
        newSound.audio.volume = newSound.volume;
        newSound.audio.loop = newSound.loop;
        newSound.audio.currentTime = 0;
        newSound.audio.playbackRate = newSound.playbackrate;
        newSound.audio.play();
    }


    fadeCurrentMusicOut() {
        if (this.currentMusicID === '') return;
        let sound = this.soundMusicArray[this.currentMusicID].audio;
        let fadeoutID = 'fadeout' + this.currentMusicID;
        this.addInterval(fadeoutID, () => {
            let volume = sound.volume;
            if (volume <= 0.011) {
                sound.pause();
                this.removeInterval(fadeoutID);
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

}