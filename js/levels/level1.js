const BACKGROUNDS = [
    {
        type: 'background',
        init_x: 0,
        src: './img_pollo_locco/img/5_background/layers/3_third_layer/full.png',
        z_index: 0.15
    },
    {
        type: 'background',
        init_x: 0,
        src: './img_pollo_locco/img/5_background/layers/2_second_layer/full.png',
        z_index: 0.4
    },
    {
        type: 'background',
        init_x: 1706,
        src: './img_pollo_locco/img/5_background/layers/2_second_layer/full.png',
        z_index: 0.4
    },
    {
        type: 'background',
        init_x: 0,
        src: './img_pollo_locco/img/5_background/layers/1_first_layer/full.png',
        z_index: 1
    },
    {
        type: 'background',
        init_x: 1706,
        src: './img_pollo_locco/img/5_background/layers/1_first_layer/full.png',
        z_index: 1
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
    gameObject.levelWidth = 3400;
    BACKGROUNDS.forEach((background) => {
        gameObject.backgrounds.push(new BackgroundObject(background.init_x, 0, background.src, background.z_index));
    });
    addClouds(gameObject);
    addEnemies(gameObject);
    addPlayer(gameObject);
}


function addClouds(gameObject) {
    let offsetX = [0, 800, 1600, 2400, 3200];
    for (let index = 0; index < offsetX.length; index++) {
        const currentXOffset = offsetX[index];
        CLOUDS.forEach((cloud) => {
            gameObject.clouds.push(new Cloud(cloud.init_x + currentXOffset, cloud.init_y + Math.random() * 50, cloud.scale + Math.random() * 0.05, cloud.src, cloud.speed));
        });
    }
    gameObject.clouds.sort((a, b) => a.speed - b.speed);
}


function addPlayer(gameObject) {
    gameObject.player = new Player(0, 140);
}


function addEnemies(gameObject) {
    for (let index = 0; index < 10; index++) {
        gameObject.enemies.push(new ChickenSmall(500 + Math.random() * 3000, Math.random() * 0.5 + 0.5));
    }
    for (let index = 0; index < 5; index++) {
        gameObject.enemies.push(new Chicken(500 + Math.random() * 3000, Math.random() * 0.5 + 0.5));
    }
}