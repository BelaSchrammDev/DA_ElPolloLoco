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

const GAMEOVER_IMAGES = [
    './img_pollo_locco/img/9_intro_outro_screens/game_over/game over!.png',
    './img_pollo_locco/img/9_intro_outro_screens/game_over/game over.png',
    './img_pollo_locco/img/9_intro_outro_screens/game_over/oh no you lost!.png',
    './img_pollo_locco/img/9_intro_outro_screens/game_over/you lost.png',
]

let imageOffsets = {
    pepe_jump: { x: -12, y: 0 },
    pepe_falling: { x: -12, y: 0 },
    pepe_landing: { x: -12, y: 0 },
    chicken_dead: { x: 0, y: 10 },
};

let imageScales = {
    pepe_walk: 0.25,
    pepe_jump: 0.25,
    pepe_falling: 0.25,
    pepe_landing: 0.25,
    pepe_idle: 0.25,
    pepe_longidle: 0.25,
    pepe_hurt: 0.25,
    pepe_dead: 0.25,
    chicken_small_walk: 0.25,
    chicken_small_dead: 0.25,
    chicken_walk: 0.3,
    chicken_dead: 0.3,
}


const animFrames = {
    'pepe_walk': PEPE_WORKS,
    'pepe_jump': PEPE_JUMP,
    'pepe_falling': PEPE_FALLING,
    'pepe_landing': PEPE_LANDING,
    'pepe_idle': PEPE_IDLE,
    'pepe_longidle': PEPE_LONGIDLE,
    'pepe_hurt': PEPE_HURT,
    'pepe_dead': PEPE_DEAD,
    'chicken_small_walk': CHICKEN_SMALL_WALK,
    'chicken_small_dead': CHICKEN_SMALL_DEAD,
    'chicken_walk': CHICKEN_WALK,
    'chicken_dead': CHICKEN_DEAD,
}


function loadAnimations() {
    for (let animationID in animFrames) {
        let images = getImages(animFrames[animationID], animationID);
        animFrames[animationID] = images;
    }
}

function getImages(imagepathArray, animationID) {
    let images = [];
    let imageScale = imageScales[animationID];
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
