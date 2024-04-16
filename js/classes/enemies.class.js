/**
 * Represents an normal enemy in the game.
 * @extends AnimatedObject
 */
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
        this.offsetFromGround = 1;
        this.animationWalk = animWalk;
        this.animationDead = animDead;
        this.particlesAtWalk = particlesAtWalk;
    }

    /**
     * Starts the enemy.
     */
    start() {
        super.start();
        this.startWalking();
    }

    /**
     * Pauses the enemy by calling the parent's pause method and stopping walking.
     */
    pause() {
        super.pause();
        this.stopWalking();
    }

    /**
     * Restarts the enemy by calling the parent class's restart method and then starts walking.
     */
    restart() {
        super.restart();
        this.startWalking();
    }

    /**
     * Starts the walking movment for the enemy.
     */
    startWalking() {
        if (!this.dead) {
            this.setNewAnimation(this.animationWalk, 200);
            this.addInterval('walk', () => {
                this.x -= this.walkSpeed;
                if (this.x < -this.imageObj.width) this.setToRemove();
                if (this.isOnGround()) this.addGroundParticles(this.particlesAtWalk, this.particlesSize);
                if (this.isCollidingWith(this.gameObject.player)) this.gameObject.player.setPlayerDamage(this.playerDamage);
            });
        }
    }


    /**
     * Sets the enemy to be removed after a certain interval.
     * Stops all intervals and sets the remove flag to true.
     */
    setToRemove() {
        this.removeInterval('walk');
        this.addInterval('remove', () => {
            this.stop();
            this.remove = true;
        }, 2000);
    }


    /**
     * Stops the enemy moving.
     */
    stopWalking() {
        this.removeInterval('walk');
    }

    /**
     * Marks the enemy as dead.
     * Stops walking, sets the dead animation and plays the dead sound.
     */
    enemyDead() {
        this.setToRemove();
        this.dead = true;
        this.setNewAnimation(this.animationDead, 200, true);
        if (this.deadSound != '') this.gameObject.sound.playSound(this.deadSoundID);
    }
}


/**
 * Represents a small chicken enemy.
 * @extends Enemy
 */
class ChickenSmall extends Enemy {

    particlesAtWalk = 3;
    particlesSize = 5;
    playerScore = 2;
    offsetSpriteGroundFromTop = 48;
    deadSoundID = 'chicken_small_dead';

    /**
     * Creates a new instance of the ChickenSmall class.
     * @param {number} x - The x-coordinate of the chicken's position.
     * @param {number} speed - The walking speed of the chicken.
     * @param {number} damage - The damage inflicted by the chicken on the player.
     */
    constructor(x, speed, damage) {
        super(x, 'chicken_small_walk', 'chicken_small_dead', 1);
        this.setHitBox(5, 5, 54, 47.5);
        this.walkSpeed = speed;
        this.playerDamage = damage;
    }

}


/**
 * Represents a Chicken enemy.
 * @extends Enemy
 */
class Chicken extends Enemy {

    offsetSpriteGroundFromTop = 65;
    particlesAtWalk = 6;
    particlesSize = 8;
    playerScore = 5;
    deadSoundID = 'chicken_dead';

    /**
     * Creates a new instance of the Chicken class.
     * @param {number} x - The x-coordinate of the chicken's position.
     * @param {number} speed - The speed at which the chicken walks.
     * @param {number} damage - The amount of damage the chicken inflicts on the player.
     */
    constructor(x, speed, damage) {
        super(x, 'chicken_walk', 'chicken_dead', 2);
        this.setHitBox(5, 5, 69.4, 63);
        this.walkSpeed = speed;
        this.playerDamage = damage;
    }

}
