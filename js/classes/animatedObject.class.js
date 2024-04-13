class AnimatedObject extends CollidingObject {
    currentAnimationID = '';
    currentAnimationInterval = 0;
    currentFrames = [];
    currentFrame = 0;
    playOnlyOne = false;

    fallingAnimationID = '';
    landingAnimationID = '';
    animIdle = true;
    offsetSpriteGroundFromTop = 0;
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


    stop() {
        super.stop();
    }


    pause() {
        this.removeGravityBehavior();
        this.stopAnimation();
        this.removeInterval('particles');
    }


    restart() {
        this.addGravityBehavior();
        this.addParticleAnimation();
        this.startAnimation();
    }


    removeGravityBehavior() {
        this.removeInterval('falling');
    }

    addGravityBehavior() {
        this.addInterval('falling', () => {
            if (this.isOnGround() && this.fallingSpeed === 0) return;
            this.fallingSpeed += this.gravity;
            this.offsetFromGround -= this.fallingSpeed;
            if (this.offsetFromGround < 10) this.setNewAnimation(this.landingAnimationID, 100, true);
            else if (this.fallingSpeed >= -2) this.setNewAnimation(this.fallingAnimationID, 200, true);
            if (this.offsetFromGround < 0) {
                this.offsetFromGround = 0;
                this.fallingSpeed = 0;
            }
            this.y = this.gameObject.groundLevel - this.offsetSpriteGroundFromTop - this.offsetFromGround;
        });
    }


    setPositionOverGround(position) {
        if (position > 0) this.offsetFromGround = position;
    }

    isOnGround() {
        return this.offsetFromGround == 0;
    }


    setNewAnimation(animationID, interval, playonlyone = false) {
        if (animationID === '' || this.currentAnimationID === animationID) return;
        this.stopAnimation();
        this.setCurrentAnimation(animationID, interval, playonlyone);
        this.startAnimation(interval);
    }


    startAnimation() {
        this.addInterval('animation', () => {
            this.currentFrame++;
            if (this.currentFrame >= this.currentFrames.length) {
                this.currentFrame = this.playOnlyOne ? this.currentFrames.length - 1 : 0;
                if (this.isNotGravityAnimation()) this.animIdle = true;
            }
            this.imageObj = this.currentFrames[this.currentFrame];
        }, this.currentAnimationInterval);
    }


    setCurrentAnimation(animationID, interval, playonlyone) {
        this.currentAnimationID = animationID;
        this.currentAnimationInterval = interval;
        this.currentFrames = animFrames[animationID];
        this.currentFrame = 0;
        this.imageObj = this.currentFrames[0];
        this.animIdle = false;
        this.playOnlyOne = playonlyone;
    }


    isNotGravityAnimation() {
        return this.currentAnimationID != this.fallingAnimationID;
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

    addParticles(count, init_size, particle_color) {
        for (let index = 0; index < count; index++) {
            this.particles.push({
                color: particle_color,
                size: init_size,
                posX: this.x + this.imageObj.width / 2 + (Math.random() * (2 * init_size) - init_size),
                posY: this.y + this.offsetSpriteGroundFromTop,
            });
        }
    }

    addGroundParticles(count, init_size) {
        this.addParticles(count, init_size, 'rgba(256, 200, 120, 0.05)');
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