class FlyBottle extends AnimatedObject {

    bottlesplash = false;
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

    startCollisionCheck() {
        this.addInterval('checkCollision', () => {
            if (!this.bottlesplash && this.isCollidingWith(this.gameObject.boss)) {
                this.bottleSplash();
                this.removeGravityBehavior();
                this.flySpeedX = 0;
                this.gameObject.score += 100;
                this.gameObject.boss.addDamage(19);
            } else if (this.bottlesplash && this.animIdle) {
                this.imageObj = null;
                this.stopAnimation();
                if (this.particles.length === 0) this.remove = true;
            } else if (this.isOnGround()) {
                this.bottleSplash();
            } else {
                this.x += this.flySpeedX;
                if (!this.bottlesplash) this.addParticles(2, 6, 'rgba(256, 0, 0, 0.1)')
            }
        });
    }

    bottleSplash() {
        this.setNewAnimation('bottle_splash', 100, true);
        this.gameObject.sound.playSound('bottle_splash');
        this.bottlesplash = true;
    }

    pause() {
        super.pause();
        this.removeInterval('checkCollision');
    }

    restart() {
        super.restart();
        this.startCollisionCheck();
    }

}