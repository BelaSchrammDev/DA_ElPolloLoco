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

const CLOUDS = [
    {
        type: 'cloud',
        init_x: 0,
        init_y: -50,
        scale: 0.5,
        speed: 0.30,
        src: './img_pollo_locco/img/5_background/layers/4_clouds/1.png'
    },
    {
        type: 'cloud',
        init_x: 400,
        init_y: -30,
        scale: 0.5,
        speed: 0.25,
        src: './img_pollo_locco/img/5_background/layers/4_clouds/2.png'
    },
    {
        type: 'cloud',
        init_x: 0,
        init_y: 150,
        scale: 0.2,
        speed: 0.15,
        src: './img_pollo_locco/img/5_background/layers/4_clouds/2.png'
    },
    {
        type: 'cloud',
        init_x: 350,
        init_y: 200,
        scale: 0.2,
        speed: 0.1,
        src: './img_pollo_locco/img/5_background/layers/4_clouds/1.png'
    },
]

function initLevel1(gameObject) {
    BACKGROUNDS.forEach((background) => {
        gameObject.backgrounds.push(new BackgroundObject(0, 0, background.src, background.z_index));
    });
    addClouds(gameObject);
}


function addClouds(gameObject) {
    let offsetX = [0, 800, 1600, 2400];
    for (let index = 0; index < offsetX.length; index++) {
        const currentXOffset = offsetX[index];
        CLOUDS.forEach((cloud) => {
            gameObject.clouds.push(new Cloud(cloud.init_x + currentXOffset, cloud.init_y + Math.random() * 50, cloud.scale + Math.random() * 0.05, cloud.src, cloud.speed));
        });
    }
    gameObject.clouds.sort((a, b) => a.speed - b.speed);
}