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
        type: 'chicken',
        count: 10,
        positionFrom: 1500,
        positionTo: 3200,
        speed: 0.3,
        damage: 10
    },
    {
        type: 'chicken_small',
        count: 15,
        positionFrom: 500,
        positionTo: 3000,
        speed: 0.3,
        damage: 5
    },
]


function addCollectables(gameObject) {
    gameObject.maxbottles = 10;
    gameObject.maxcoins = 20;
    placeCollectables(gameObject, gameObject.maxbottles, 500, 2000, (x) => new Bottle(x, 360));
    placeCollectables(gameObject, gameObject.maxcoins, 400, 2500, (x) => new Coin(x, Math.random() * 100 + 50));
}


function placeCollectables(gameObject, count, fromX, toX, pushCallback) {
    const areaX = (toX - fromX) / count;
    for (let index = 0; index < count; index++) {
        const x = fromX + areaX * index + Math.random() * areaX;
        gameObject.collectables.push(pushCallback(x, 400));
    }
}


function addUIElements(gameObject) {
    gameObject.uiItems.push(new Helth());
    gameObject.uiItems.push(new Coins());
    gameObject.uiItems.push(new Bottles());
    gameObject.scoreText = new Score(gameObject);
    gameObject.uiItems.push(gameObject.scoreText);
}


function addBackGrounds(gameObject) {
    BACKGROUNDS.forEach((background) => {
        gameObject.backgrounds.push(new BackgroundObject(background.src, background.z_index));
    });
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


function addBoss(gameObject) {
    gameObject.boss = new BossChicken();
}


function addEnemies(gameObject, enemiesArray) {
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