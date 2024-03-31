class Enemy extends MovingObject {
    lastMovementTime = 0;
    fallingState = 'grounded';

    constructor(x, width, height) {
        super();
        this.setKoords(x, 500);
        this.setDimensions(width, height);
        this.offsetFromGround = 200;
    }


}


class ChickenSmall extends Enemy {
    walkSpeed = 0.1;

    constructor(x, speed) {
        super(x, 50, 50);
        this.offsetGroundFromTopOfSprite = 45;
        this.walkSpeed = speed;
    }

    start() {
        super.start();
        this.startAnimation('chicken_small_walk', 200);
        this.addInterval('walk', () => {
            this.x -= this.walkSpeed;
            if (this.x < -this.width) {
                this.x = this.gameObject.levelWidth;
            }
            this.addGroundParticles(1);
        });
    }
}


class Chicken extends Enemy {
    walkSpeed = 0.1;

    constructor(x, speed) {
        super(x, 80, 80);
        this.offsetGroundFromTopOfSprite = 70;
        this.walkSpeed = speed;
    }

    start() {
        super.start();
        this.startAnimation('chicken_walk', 200);
        this.addInterval('walk', () => {
            this.x -= this.walkSpeed;
            if (this.x < -this.width) {
                this.x = this.gameObject.levelWidth;
            }
            this.addGroundParticles(2);
        });
    }
}