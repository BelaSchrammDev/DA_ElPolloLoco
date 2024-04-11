class Enemy extends AnimatedObject {
    lastMovementTime = 0;
    animationWalk = '';
    animationDead = '';
    particlesAtWalk = 1;
    particlesSize = 1;
    walkSpeed = 0.1;
    playerDamage = 1;
    playerScore = 1;
    dead = false;
    remove = false;

    walkSoundID = '';
    deadSoundID = '';

    constructor(x, animWalk, animDead, particlesAtWalk) {
        super();
        this.setKoords(x, 500);
        this.offsetFromGround = 200;
        this.animationWalk = animWalk;
        this.animationDead = animDead;
        this.particlesAtWalk = particlesAtWalk;
    }

    start() {
        super.start();
        this.startWalking();
    }

    pause() {
        super.pause();
        this.removeInterval('walk');
    }

    restart() {
        super.restart();
        this.startWalking();
    }

    startWalking() {
        if (!this.dead) {
            this.setNewAnimation(this.animationWalk, 200);
            this.addInterval('walk', () => {
                this.x -= this.walkSpeed;
                if (this.x < -this.imageObj.width) {
                    this.remove = true;
                }
                if (this.isOnGround()) this.addGroundParticles(this.particlesAtWalk, this.particlesSize);
                if (this.isCollidingWith(this.gameObject.player)) this.gameObject.player.setPlayerDamage(this.playerDamage);
            });
        }
    }

    enemyDead() {
        this.dead = true;
        this.removeInterval('walk');
        this.setNewAnimation(this.animationDead, 200, true);
        if (this.deadSound != '') this.gameObject.playSound(this.deadSoundID);
    }
}


class ChickenSmall extends Enemy {

    constructor(x, speed, damage) {
        super(x, 'chicken_small_walk', 'chicken_small_dead', 1);
        this.setHitBox(5, 5, 54, 47.5);
        this.offsetSpriteGroundFromTop = 48;
        this.walkSpeed = speed;
        this.playerDamage = damage;
        this.particlesAtWalk = 3;
        this.particlesSize = 5;
        this.playerScore = 2;
        this.deadSoundID = 'chicken_small_dead';
    }

}


class Chicken extends Enemy {

    constructor(x, speed, damage) {
        super(x, 'chicken_walk', 'chicken_dead', 2);
        this.setHitBox(5, 5, 69.4, 63);
        this.offsetSpriteGroundFromTop = 65;
        this.walkSpeed = speed;
        this.playerDamage = damage;
        this.particlesAtWalk = 6;
        this.particlesSize = 8;
        this.playerScore = 5;
        this.deadSoundID = 'chicken_dead';
    }

}
