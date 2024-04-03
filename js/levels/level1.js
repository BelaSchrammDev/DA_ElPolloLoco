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
        init_x: 0,
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


const enemies_level_1 = [
    {
        type: 'chicken_small',
        count: 15,
        positionFrom: 500,
        positionTo: 3000,
        speed: 0.3,
        damage: 5
    },
    {
        type: 'chicken',
        count: 3,
        positionFrom: 1500,
        positionTo: 3200,
        speed: 0.3,
        damage: 10
    }
]

const enemies_level_2 = [
    {
        type: 'chicken_small',
        count: 10,
        positionFrom: 500,
        positionTo: 2000,
        speed: 0.7,
        damage: 10
    },
    {
        type: 'chicken',
        count: 12,
        positionFrom: 1000,
        positionTo: 3200,
        speed: 0.5,
        damage: 20
    }
]


function initLevel1(gameObject) {
    gameObject.levelWidth = 3400;
    gameObject.cameraX = 0;
    gameObject.score = 0;
    addBackGrounds(gameObject);
    addClouds(gameObject);
    addEnemies(gameObject, enemies_level_1);
    addPlayer(gameObject);
    addUIElements(gameObject);
}


function addUIElements(gameObject) {
    gameObject.ui_elements = [];
    gameObject.flytext = [];
    gameObject.ui_elements.push(new Helth());
    gameObject.ui_elements.push(new Coins());
    gameObject.ui_elements.push(new Bottles());
    gameObject.scoreText = new Score(gameObject);
    gameObject.flytext.push(gameObject.scoreText);
}


function addBackGrounds(gameObject) {
    gameObject.backgrounds = [];
    BACKGROUNDS.forEach((background) => {
        gameObject.backgrounds.push(new BackgroundObject(background.src, background.z_index));
    });
}



function addClouds(gameObject) {
    gameObject.clouds = [];
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


function addEnemies(gameObject, enemiesArray) {
    gameObject.enemies = [];
    for (let index = 0; index < enemiesArray.length; index++) {
        const enemyPropertys = enemiesArray[index];
        switch (enemyPropertys.type) {
            case 'chicken_small':
                for (let index = 0; index < enemyPropertys.count; index++) {
                    gameObject.enemies.push(new ChickenSmall(getSpawnPosition(enemyPropertys.positionFrom, enemyPropertys.positionTo), Math.random() * 0.5 + enemyPropertys.speed, enemyPropertys.damage));
                }
                break;
            case 'chicken':
                for (let index = 0; index < enemyPropertys.count; index++) {
                    gameObject.enemies.push(new Chicken(getSpawnPosition(enemyPropertys.positionFrom, enemyPropertys.positionTo), Math.random() * 0.5 + enemyPropertys.speed, enemyPropertys.damage));
                }
                break;
        }
    }
}


function getSpawnPosition(minPos, maxPos) {
    return Math.random() * (maxPos - minPos) + minPos;
}