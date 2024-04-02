class MovingObject extends DrawableObject {
    currentAnimationID = '';
    currentFrames = [];
    currentFrame = 0;
    fallingAnimationID = '';
    landingAnimationID = '';
    animIdle = true;
    playOnlyOne = false;
    offsetGroundFromTopOfSprite = 0;
    offsetFromGround = 0;
    fallingSpeed = 0;
    gravity = 0.5;

    particles = [];
    maxParticles = 150;
    particleShrinkSpeed = 0.95;


    constructor() {
        super();
    }


    start() {
        this.addParticleAnimation();
        this.addGravityBehavior();
    }


    addGravityBehavior() {
        this.addInterval('falling', () => {
            if (this.isOnGround() && this.fallingSpeed === 0) return;
            this.fallingSpeed += this.gravity;
            this.offsetFromGround -= this.fallingSpeed;
            if (this.offsetFromGround < 10) this.startAnimation(this.landingAnimationID, 100, true);
            else if (this.fallingSpeed >= -2) this.startAnimation(this.fallingAnimationID, 200, true);
            if (this.offsetFromGround < 0) {
                this.offsetFromGround = 0;
                this.fallingSpeed = 0;
            }
            this.y = this.gameObject.groundLevel - this.offsetGroundFromTopOfSprite - this.offsetFromGround;
        });
    }

    isOnGround() {
        return this.offsetFromGround == 0;
    }


    startAnimation(animationID, interval, playonlyone = false) {
        if (animationID === '' || this.currentAnimationID === animationID) return;
        // console.log('start animation = ', animationID);
        this.stopAnimation();
        this.currentAnimationID = animationID;
        this.currentFrames = animFrames[animationID];
        this.currentFrame = 0;
        this.setFramesKordsOffset(animationID);
        this.animIdle = false;
        this.playOnlyOne = playonlyone;
        this.addInterval('animation', () => {
            this.currentFrame++;
            if (this.currentFrame >= this.currentFrames.length) {
                this.currentFrame = this.playOnlyOne ? this.currentFrames.length - 1 : 0;
                if (this.isNotGravityAnimation()) this.animIdle = true;
            }
            this.img = this.currentFrames[this.currentFrame];
        }, interval);
    }


    isNotGravityAnimation() {
        return this.currentAnimationID != this.fallingAnimationID && this.currentAnimationID != this.landingAnimationID;
    }


    setFramesKordsOffset(animationID) {
        if (animFramesKordsOffset[animationID]) {
            this.diffX = animFramesKordsOffset[this.currentAnimationID].x;
            this.diffY = animFramesKordsOffset[this.currentAnimationID].y;
        } else {
            this.diffX = 0;
            this.diffY = 0;
        }
    }


    stopAnimation() {
        this.removeInterval('animation');
    }

    draw() {
        super.draw();
        this.drawParticles();
    }


    addParticleAnimation() {
        this.addInterval('particles', () => {
            if (this.particles.length > this.maxParticles) {
                this.particles.splice(0, this.particles.length - this.maxParticles);
            }
            this.particles.forEach((particle, index) => {
                particle.posX += Math.random() * 2 - 1;
                particle.posY += Math.random() * 2 - 2;
                particle.size *= this.particleShrinkSpeed;
                if (particle.size < 1) this.particles.splice(index, 1);
            });
        }, 50);
    }


    addGroundParticles(count, init_size) {
        for (let index = 0; index < count; index++) {
            this.particles.push({
                color: 'rgba(256, 200, 120, 0.05)',
                size: init_size,
                posX: this.x + this.width / 2 + (Math.random() * 20 - 10),
                posY: this.y + this.offsetGroundFromTopOfSprite,
            });
        }
    }

    drawParticles() {
        const ctx = this.gameObject.ctx;
        const cameraX = this.gameObject.cameraX;
        this.particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.posX - cameraX, particle.posY, particle.size, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}