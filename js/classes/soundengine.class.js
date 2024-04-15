/**
 * Represents a sound engine that handles sound effects and music in the game.
 * @class
 * @extends Interval
 */
class SoundEngine extends Interval {


    /**
     * Array for storing sound effects.
     */
    soundEffectsArray = {
        pepe_jump: { audio: new Audio('./audio/jump.wav'), volume: 1, playbackrate: 1.5, },
        pepe_landing: { audio: new Audio('./audio/landing_pepe.wav'), volume: 1, playbackrate: 1, },
        pepe_hurt: { audio: new Audio('./audio/pepe-hurt.mp3'), volume: 1, playbackrate: 2, },
        pepe_snore: { audio: new Audio('./audio/pepe-snore.wav'), volume: 1, playbackrate: 1, },
        pepe_walk: { audio: new Audio('./audio/footsteps1.wav'), volume: 0.2, playbackrate: 1, },
        boss_walk: { audio: new Audio('./audio/boss-walk.wav'), volume: 0.3, playbackrate: 2, },
        boss_attack: { audio: new Audio('./audio/boss-attack.wav'), volume: 1, playbackrate: 1, },
        boss_hurt: { audio: new Audio('./audio/boss-hurt.wav'), volume: 1, playbackrate: 1, },
        boss_dead: { audio: new Audio('./audio/boss-dead.wav'), volume: 1, playbackrate: 1, },
        chicken_dead: { audio: new Audio('./audio/chicken-dead.wav'), volume: 1, playbackrate: 1, },
        chicken_small_dead: { audio: new Audio('./audio/chicken-small-dead.wav'), volume: 1, playbackrate: 1, },
        coin: { audio: new Audio('./audio/coin.mp3'), volume: 1, playbackrate: 1, },
        bottle_wiff: { audio: new Audio('./audio/bottle_wiff.wav'), volume: 1, playbackrate: 1.5, },
        bottle_splash: { audio: new Audio('./audio/bottle_splash.wav'), volume: 1, playbackrate: 1, },
        bottle: { audio: new Audio('./audio/bottle_ground.mp3'), volume: 1, playbackrate: 1, },
    }


    /**
     * Array for storing music sounds and their properties.
     */
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
        win2: {
            audio: new Audio('./audio/win2.mp3'),
            volume: 0.2,
            playbackrate: 1,
            loop: false,
        },
    };

    currentMusicID = '';

    constructor() {
        super();
        this.initSound();
    }

    /**
     * Initializes the sound effects by setting the playback rate and volume for each sound.
     */
    initSound() {
        for (let soundKey in this.soundEffectsArray) {
            let sound = this.soundEffectsArray[soundKey];
            sound.audio.playbackRate = sound.playbackrate;
            sound.audio.volume = sound.volume;
        }
    }

    /**
     * Toggles the sound mute state.
     * If the sound is muted, the current music is faded out.
     */
    toggleSoundMute() {
        this.fadeCurrentMusicOut();
        this.soundMute = !this.soundMute;
    }


    /**
     * Starts the game music with the specified sound ID.
     * If the sound is muted, the music is not played.
     * The current music is faded out before the new music is started.
     * @param {number} newSoundID - The ID of the new sound to play.
     */
    startGameMusic(newSoundID) {
        if (this.soundMute || this.currentMusicID === newSoundID) return;
        this.fadeCurrentMusicOut();
        this.currentMusicID = newSoundID;
        let newSound = this.soundMusicArray[newSoundID];
        newSound.audio.volume = newSound.volume;
        newSound.audio.loop = newSound.loop;
        newSound.audio.currentTime = 0;
        newSound.audio.playbackRate = newSound.playbackrate;
        newSound.audio.play();
    }


    /**
     * Fades out the current music.
     */
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


    /**
     * Plays a sound effect based on the provided sound ID.
     * If the sound is muted, the sound is not played.
     * The sound is played from the beginning if it is not already playing.
     * @param {number} soundID - The ID of the sound effect to be played.
     */
    playSound(soundID) {
        if (this.soundMute) return;
        let sound = this.soundEffectsArray[soundID].audio;
        if (sound.paused) {
            sound.currentTime = 0;
            sound.play();
        }
    }


    /**
     * Stops the specified sound by pausing it and resetting its current time to 0.
     * @param {string} soundID - The ID of the sound to stop.
     */
    stopSound(soundID) {
        this.soundEffectsArray[soundID].audio.pause();
        this.soundEffectsArray[soundID].audio.currentTime = 0;
    }

}