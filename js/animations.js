/**
 * This file contains the animations for the game.
 */


/**
 * The arrays of images for the animations.
 */
const PEPE_WORKS = [
    './img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
    './img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
    './img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
    './img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
    './img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
    './img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
]

const PEPE_JUMP = [
    './img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
    './img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
    './img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
    './img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
]

const PEPE_FALLING = [
    './img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
    './img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
]

const PEPE_LANDING = [
    './img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
    './img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
    './img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
]

const PEPE_IDLE = [
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
]

const PEPE_LONGIDLE = [
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
]

const PEPE_HURT = [
    './img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
    './img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
    './img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
]

const PEPE_DEAD = [
    './img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
    './img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
    './img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
    './img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
    './img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
    './img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
    './img_pollo_locco/img/2_character_pepe/5_dead/D-57.png',
]

const COINS = [
    './img_pollo_locco/img/8_coin/coin_1.png',
    './img_pollo_locco/img/8_coin/coin_2.png',
]

const BOTTLES_GROUND = [
    './img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
]

const BOTTLE_ROTATE = [
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
]

const BOTTLE_SPLASH = [
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
]

const CHICKEN_SMALL_WALK = [
    './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
]

const CHICKEN_SMALL_DEAD = [
    'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
]

const CHICKEN_WALK = [
    './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
]

const CHICKEN_DEAD = [
    './img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
]

const BOSS_WALK = [
    './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
]

const BOSS_ALERT = [
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',
]

const BOSS_ATTACK = [
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
]

const BOSS_HURT = [
    './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png',
]

const BOSS_DEAD = [
    './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
    './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
]


const GAMEOVER_IMAGES = [
    './img_pollo_locco/img/9_intro_outro_screens/game_over/game over!.png',
    './img_pollo_locco/img/9_intro_outro_screens/game_over/game over.png',
    './img_pollo_locco/img/9_intro_outro_screens/game_over/oh no you lost!.png',
    './img_pollo_locco/img/9_intro_outro_screens/game_over/you lost.png',
]

/**
 * The animation ID arrays.
 */
const animationIDArrays = {
    'pepe_walk': PEPE_WORKS,
    'pepe_jump': PEPE_JUMP,
    'pepe_falling': PEPE_FALLING,
    'pepe_landing': PEPE_LANDING,
    'pepe_idle': PEPE_IDLE,
    'pepe_longidle': PEPE_LONGIDLE,
    'pepe_hurt': PEPE_HURT,
    'pepe_dead': PEPE_DEAD,
    'coins': COINS,
    'bottles_ground': BOTTLES_GROUND,
    'bottle_rotate': BOTTLE_ROTATE,
    'bottle_splash': BOTTLE_SPLASH,
    'chicken_small_walk': CHICKEN_SMALL_WALK,
    'chicken_small_dead': CHICKEN_SMALL_DEAD,
    'chicken_walk': CHICKEN_WALK,
    'chicken_dead': CHICKEN_DEAD,
    'boss_walk': BOSS_WALK,
    'boss_alert': BOSS_ALERT,
    'boss_attack': BOSS_ATTACK,
    'boss_hurt': BOSS_HURT,
    'boss_dead': BOSS_DEAD,
}

const animFrames = {}


/**
 * The image offsets for the animations, if needed.
 */
const imageOffsets = {
    pepe_jump: { x: -12, y: 0 },
    pepe_falling: { x: -12, y: 0 },
    pepe_landing: { x: -12, y: 0 },
    chicken_dead: { x: 0, y: 10 },
};


/**
 * Loads animations by populating the animFrames object with images.
 */
function loadAnimations() {
    for (let animationID in animationIDArrays) {
        let images = getImages(animationIDArrays[animationID], animationID);
        animFrames[animationID] = images;
    }
}


/**
 * Retrieves an array of ImageObjects based on the given image paths and animation ID.
 *
 * @param {string[]} imagepathArray - An array of image paths.
 * @param {string} animationID - The ID of the animation.
 * @returns {ImageObject[]} An array of ImageObjects.
 */
function getImages(imagepathArray, animationID) {
    let images = [];
    let imageScale = getImageScale(animationID);
    let offsetX = 0;
    let offsetY = 0;
    if (imageOffsets[animationID]) {
        offsetX = imageOffsets[animationID].x;
        offsetY = imageOffsets[animationID].y;
    }
    imagepathArray.forEach((path) => {
        images.push(new ImageObject(path, imageScale, offsetX, offsetY));
    });
    return images;
}


/**
 * Returns the scale value for a given animation ID.
 *
 * @param {string} animationID - The ID of the animation.
 * @returns {number} The scale value for the animation.
 */
function getImageScale(animationID) {
    if (animationID.startsWith('boss_')) return 0.3;
    if (animationID.startsWith('pepe_')) return 0.25;
    if (animationID.startsWith('chicken_small_')) return 0.25;
    if (animationID.startsWith('bottle')) return 0.2;
    if (animationID === 'coins') return 0.30;
    if (animationID === 'chicken_walk') return 0.3;
    if (animationID === 'chicken_dead') return 0.3;
    return 1;
}

