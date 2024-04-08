class CollectableObject extends AnimatedObject {
    collected = false;
    soundID;

    constructor(x, y, animationID) {
        super();
        this.setKoords(x, y);
        this.setNewAnimation(animationID, 500);
    }
    collect() {
        this.stop();
        this.gameObject.playSound(this.soundID);
        this.addCollectablesToGame();
        this.gameObject.removeCollectable(this);
    }

}

class Coin extends CollectableObject {
    constructor(x, y) {
        super(x, y, 'coins');
        this.setHitBox(30, 30, 60, 60.3);
        this.soundID = 'coin';
    }
    addCollectablesToGame() {
        this.gameObject.coins++;
    }
}

class Bottle extends CollectableObject {
    constructor(x, y) {
        super(x, y, 'bottles_ground');
        this.setHitBox(25, 15, 65, 70);
        this.soundID = 'bottle';
    }
    addCollectablesToGame() {
        this.gameObject.bottles++;
    }

}