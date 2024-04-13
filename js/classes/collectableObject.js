/**
 * Represents a collectable object in the game.
 * @class
 * @extends AnimatedObject
 */
class CollectableObject extends AnimatedObject {
    collected = false;
    soundID;
    remove = false;

    constructor(x, y, animationID) {
        super();
        this.setKoords(x, y);
        this.setNewAnimation(animationID, 500);
    }

    /**
     * Collects the object.
     * Stops the animation, plays the sound, adds collectables to the game, and marks the object for removal.
     */
    collect() {
        this.stop();
        this.gameObject.sound.playSound(this.soundID);
        this.addCollectablesToGame();
        this.remove = true;
    }
}


/**
 * Represents a coin collectable object.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
    /**
     * Creates a new instance of the Coin class.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super(x, y, 'coins');
        this.setHitBox(30, 30, 60, 60.3);
        this.soundID = 'coin';
    }

    /**
     * Adds the coin to the game's collectables.
     */
    addCollectablesToGame() {
        this.gameObject.coins++;
    }
}


/**
 * Represents a bottle collectable object.
 * @extends CollectableObject
 */
class Bottle extends CollectableObject {
    constructor(x, y) {
        super(x, y, 'bottles_ground');
        this.setHitBox(25, 15, 65, 70);
        this.soundID = 'bottle';
    }

    /**
     * Adds the bottle collectable to the game.
     */
    addCollectablesToGame() {
        this.gameObject.bottles++;
    }
}