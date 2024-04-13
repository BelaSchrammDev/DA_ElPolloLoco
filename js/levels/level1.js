/**
 * Level 1
 * Backgrounds
 */
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


/**
 * Level 1
 * Clouds
 */
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


/**
 * Level 1
 * Enemies
 */
const enemies_level_1 = [
    {
        type: 'chicken',
        count: 10,
        positionFrom: 1500,
        positionTo: 3200,
        speed: 0.3,
        damage: 25
    },
    {
        type: 'chicken_small',
        count: 15,
        positionFrom: 500,
        positionTo: 3000,
        speed: 0.3,
        damage: 10
    },
]


/**
 * Adds collectables to the game object.
 * @param {object} gameObject - The game object to add collectables to.
 */
function addCollectables(gameObject) {
    gameObject.maxbottles = 10;
    gameObject.maxcoins = 20;
    placeCollectables(gameObject, gameObject.maxbottles, 500, 2000, (x) => new Bottle(x, 360));
    placeCollectables(gameObject, gameObject.maxcoins, 400, 2500, (x) => new Coin(x, Math.random() * 100 + 50));
}


/**
 * Places collectables in a game object.
 *
 * @param {object} gameObject - The game object to place collectables in.
 * @param {number} count - The number of collectables to place.
 * @param {number} fromX - The starting x-coordinate for placing collectables.
 * @param {number} toX - The ending x-coordinate for placing collectables.
 * @param {function} pushCallback - The callback function to push collectables into the game object.
 */
function placeCollectables(gameObject, count, fromX, toX, pushCallback) {
    const areaX = (toX - fromX) / count;
    for (let index = 0; index < count; index++) {
        const x = fromX + areaX * index + Math.random() * areaX;
        gameObject.collectables.push(pushCallback(x, 400));
    }
}


/**
 * Adds UI elements to the game object.
 * @param {GameObject} gameObject - The game object to add UI elements to.
 */
function addUIElements(gameObject) {
    gameObject.uiItems.push(new Helth());
    gameObject.uiItems.push(new Coins());
    gameObject.uiItems.push(new Bottles());
    gameObject.scoreText = new Score(gameObject);
    gameObject.uiItems.push(gameObject.scoreText);
}


/**
 * Adds backgrounds to the game object.
 * @param {Object} gameObject - The game object to add backgrounds to.
 */
function addBackGrounds(gameObject) {
    BACKGROUNDS.forEach((background) => {
        gameObject.backgrounds.push(new BackgroundObject(background.src, background.z_index));
    });
}



/**
 * Adds clouds to the game object.
 * 
 * @param {object} gameObject - The game object to add clouds to.
 */
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


/**
 * Adds a player to the game object.
 * @param {object} gameObject - The game object to add the player to.
 */
function addPlayer(gameObject) {
    gameObject.player = new Player(0, 140);
}


/**
 * Adds a boss to the game object.
 * @param {Object} gameObject - The game object to add the boss to.
 */
function addBoss(gameObject) {
    gameObject.boss = new BossChicken();
}


/**
 * Adds enemies to the game object.
 * 
 * @param {Object} gameObject - The game object to add enemies to.
 * @param {Array} enemiesArray - An array of enemy properties.
 */
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


/**
 * Generates a random spawn position between the given minimum and maximum positions.
 *
 * @param {number} minPos - The minimum position.
 * @param {number} maxPos - The maximum position.
 * @returns {number} The random spawn position.
 */
function getSpawnPosition(minPos, maxPos) {
    return Math.random() * (maxPos - minPos) + minPos;
}