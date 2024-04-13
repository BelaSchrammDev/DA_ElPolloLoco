/**
 * Represents a flying hot salsa bottle in the game.
 * @class
 * @extends AnimatedObject
 */
class FlyBottle extends AnimatedObject {

    broken = false;
    remove = false;
    fallingSpeed = -12;
    offsetSpriteGroundFromTop = 48;

    constructor(player) {
        super();
        this.offsetFromGround = player.y + player.hitBox.offsettop;
        this.x = player.x + (player.flipdrawing ? player.hitBox.offsetleft : player.hitBox.offsetright);
        this.flySpeedX = player.flipdrawing ? -5 : 5;
        this.setHitBox(15, 15, 70, 70);
        this.setNewAnimation('bottle_rotate', 100);
        this.gameObject.sound.playSound('bottle_wiff');
        this.startCollisionCheck();
        super.start();
    }

    /**
     * Starts the collision check for the fly bottles.
     */
    startCollisionCheck() {
        this.addInterval('checkCollision', () => {
            if (!this.broken && this.isCollidingWith(this.gameObject.boss)) {
                this.bottleHitsBoss();
            } else if (this.broken && this.animIdle) {
                this.removeImageObj();
                this.removeIfParticlesEmpty();
            } else if (this.isOnGround()) {
                this.bottleSplash();
            } else {
                this.moveBottle();
            }
        });
    }


    /**
     * Moves the bottle horizontally based on the fly speed.
     */
    moveBottle() {
        this.x += this.flySpeedX;
        if (!this.broken) this.addParticles(2, 6, 'rgba(256, 0, 0, 0.1)')
    }


    /**
     * Removes the image object associated with the fly bottle.
     * Stops the animation if it is currently running.
     */
    removeImageObj() {
        if (this.imageObj) {
            this.imageObj = null;
            this.stopAnimation();
        }
    }


    /**
     * Removes the fly bottle if the particles are empty.
     */
    removeIfParticlesEmpty() {
        if (this.particles.length === 0) this.remove = true;
    }


    /**
     * Plays the splash sound, removes the gravity behavior, and increases the score.
     * The boss also takes damage from the bottle.
     * The bottle is set as broken.
     */
    bottleHitsBoss() {
        this.bottleSplash();
        this.removeGravityBehavior();
        this.flySpeedX = 0;
        this.gameObject.score += 100;
        this.gameObject.boss.addDamage(19);
    }


    /**
     * Plays the splash sound and sets the bottle as broken.
     */
    bottleSplash() {
        this.setNewAnimation('bottle_splash', 100, true);
        this.gameObject.sound.playSound('bottle_splash');
        this.broken = true;
    }


    /**
     * Call the super class stop method and removes the collision checking interval.
     * @override
     */
    pause() {
        super.pause();
        this.removeInterval('checkCollision');
    }


    /**
     * Call the super class restart method and starts the collision checking interval.
     * @returns {void}
     */
    restart() {
        super.restart();
        this.startCollisionCheck();
    }

}