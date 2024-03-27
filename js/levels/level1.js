const BACKGROUNDS = [
    {
        type: 'background',
        src: './img_pollo_locco/img/5_background/layers/3_third_layer/full.png',
        z_index: 100
    },
    {
        type: 'background',
        src: './img_pollo_locco/img/5_background/layers/2_second_layer/full.png',
        z_index: 50
    },
    {
        type: 'background',
        src: './img_pollo_locco/img/5_background/layers/1_first_layer/full.png',
        z_index: 30
    },
]

function initLevel1(gameObject) {
    BACKGROUNDS.forEach((background) => {
        gameObject.backgrounds.push(new BackgroundObject(0, 0, background.src, background.z_index));
    });
}