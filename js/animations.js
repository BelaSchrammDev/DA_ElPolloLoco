let animFrames = [];


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
    './img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
    './img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
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


function getImages(imagepathArray) {
    let images = [];
    imagepathArray.forEach((path) => {
        let img = new Image();
        img.src = path;
        images.push(img);
    });
    return images;
}


function initAnimationFrames() {
    animFrames.pepe_walk = getImages(PEPE_WORKS);
    animFrames.pepe_jump = getImages(PEPE_JUMP);
    animFrames.pepe_idle = getImages(PEPE_IDLE);
    animFrames.pepe_longidle = getImages(PEPE_LONGIDLE);
}