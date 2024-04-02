class Enemy extends CollidingObject {
    lastMovementTime = 0;
    animationWalk = '';
    animationDead = '';
    particlesAtWalk = 1;
    particlesSize = 1;
    walkSpeed = 0.1;
    playerDamage = 1;
    dead = false;

    constructor(x, width, height, animWalk, animDead, particlesAtWalk) {
        super();
        this.setKoords(x, 500);
        this.setDimensions(width, height);
        this.offsetFromGround = 200;
        this.animationWalk = animWalk;
        this.animationDead = animDead;
        this.particlesAtWalk = particlesAtWalk;
    }

    start() {
        super.start();
        if (!this.dead) {
            this.startAnimation(this.animationWalk, 200);
            this.addInterval('walk', () => {
                this.x -= this.walkSpeed;
                if (this.x < -this.width) {
                    this.x = this.gameObject.levelWidth;
                }
                if (this.isOnGround()) this.addGroundParticles(this.particlesAtWalk, this.particlesSize);
                if (this.isCollidingWith(this.gameObject.player)) this.gameObject.player.setPlayerDamage(this.playerDamage);
            });
        }
    }


    enemyDead() {
        this.dead = true;
        this.removeInterval('walk');
        this.startAnimation(this.animationDead, 200, true);
    }
}


class ChickenSmall extends Enemy {

    constructor(x, speed, damage) {
        super(x, 50, 50, 'chicken_small_walk', 'chicken_small_dead', 1);
        this.setHitBox(5, 5, 5, 5);
        this.offsetGroundFromTopOfSprite = 45;
        this.walkSpeed = speed;
        this.playerDamage = damage;
        this.particlesAtWalk = 3;
        this.particlesSize = 5;
    }

}


class Chicken extends Enemy {

    constructor(x, speed, damage) {
        super(x, 80, 80, 'chicken_walk', 'chicken_dead', 2);
        this.setHitBox(5, 5, 5, 10);
        this.offsetGroundFromTopOfSprite = 70;
        this.walkSpeed = speed;
        this.playerDamage = damage;
        this.particlesAtWalk = 6;
        this.particlesSize = 8;
    }

}