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
        if (this.deadSound != '') this.gameObject.sound.playSound(this.deadSoundID);
    }
}


class ChickenSmall extends Enemy {

    particlesAtWalk = 3;
    particlesSize = 5;
    playerScore = 2;
    offsetSpriteGroundFromTop = 48;
    deadSoundID = 'chicken_small_dead';

    constructor(x, speed, damage) {
        super(x, 'chicken_small_walk', 'chicken_small_dead', 1);
        this.setHitBox(5, 5, 54, 47.5);
        this.walkSpeed = speed;
        this.playerDamage = damage;
    }

}


class Chicken extends Enemy {

    offsetSpriteGroundFromTop = 65;
    particlesAtWalk = 6;
    particlesSize = 8;
    playerScore = 5;
    deadSoundID = 'chicken_dead';

    constructor(x, speed, damage) {
        super(x, 'chicken_walk', 'chicken_dead', 2);
        this.setHitBox(5, 5, 69.4, 63);
        this.walkSpeed = speed;
        this.playerDamage = damage;
    }

}
