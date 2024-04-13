/**
 * Represents an animated object that extends the `CollidingObject` class.
 * @extends CollidingObject
 * @class
 * @classdesc Represents an animated object that extends the `CollidingObject` class.
 */
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


    /**
     * Starts the animated object by adding gravity behavior and particle animation.
     */
    start() {
        this.addGravityBehavior();
        this.addParticleAnimation();
    }


    /**
     * Pauses the animated object by removing gravity behavior, particle animation, and stopping the animation.
     */
    pause() {
        this.removeGravityBehavior();
        this.removeParticleAnimation();
        this.stopAnimation();
    }


    /**
     * Restarts the animated object by adding gravity behavior, particle animation, and starting the animation.
     */
    restart() {
        this.addGravityBehavior();
        this.addParticleAnimation();
        this.startAnimation();
    }


    /**
     * Adds gravity behavior to the animated object.
     * The object will fall down due to gravity and update its position accordingly.
     */
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


    /**
     * Removes the gravity behavior from the animated object.
     */
    removeGravityBehavior() {
        this.removeInterval('falling');
    }


    /**
     * Sets the position of the object above the ground.
     * @param {number} [position=0] - The position of the object above the ground.
     */
    setPositionOverGround(position = 0) {
        if (position > 0) this.offsetFromGround = position;
    }


    /**
     * Checks if the object is on the ground.
     * @returns {boolean} - Returns true if the object is on the ground, otherwise false.
     */
    isOnGround() {
        return this.offsetFromGround == 0;
    }


    /**
     * Sets a new animation for the object.
     * Stops the current animation and starts the new animation.
     * If the new animation ID is empty or the same as the current animation ID, it does nothing.
     *
     * @param {string} animationID - The ID of the new animation.
     * @param {number} interval - The interval between animation frames.
     * @param {boolean} [playonlyone=false] - Whether to play only one animation.
     */
    setNewAnimation(animationID, interval, playonlyone = false) {
        if (animationID === '' || this.currentAnimationID === animationID) return;
        this.stopAnimation();
        this.setCurrentAnimation(animationID, interval, playonlyone);
        this.startAnimation(interval);
    }


    /**
     * Sets the current animation for the object.
     *
     * @param {string} animationID - The ID of the animation.
     * @param {number} interval - The interval between frames in milliseconds.
     * @param {boolean} playonlyone - Indicates whether to play only one frame of the animation.
     * @returns {void}
     */
    setCurrentAnimation(animationID, interval, playonlyone) {
        this.currentAnimationID = animationID;
        this.currentAnimationInterval = interval;
        this.currentFrames = animFrames[animationID];
        this.currentFrame = 0;
        this.imageObj = this.currentFrames[0];
        this.animIdle = false;
        this.playOnlyOne = playonlyone;
    }


    /**
     * Starts the animation of the object.
     * Increments the current frame and updates the image object accordingly.
     * If the current frame exceeds the number of frames, it resets the frame index based on the playOnlyOne flag.
     * If the animation is not a falling animation, it sets the animIdle flag to true.
     * @returns {void}
     */
    startAnimation() {
        this.addInterval('animation', () => {
            this.currentFrame++;
            if (this.currentFrame >= this.currentFrames.length) {
                this.currentFrame = this.playOnlyOne ? this.currentFrames.length - 1 : 0;
                if (this.isNotFallingAnimation()) this.animIdle = true;
            }
            this.imageObj = this.currentFrames[this.currentFrame];
        }, this.currentAnimationInterval);
    }


    /**
     * Stops the animation of the object.
     */
    stopAnimation() {
        this.removeInterval('animation');
    }


    /**
     * Checks if the current animation is not the falling animation.
     * @returns {boolean} Returns true if the current animation is not the falling animation, otherwise returns false.
     */
    isNotFallingAnimation() {
        return this.currentAnimationID != this.fallingAnimationID;
    }


    /**
     * Adds a particle animation to the object.
     */
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


    /**
     * Removes the particle animation from the object.
     */
    removeParticleAnimation() {
        this.removeInterval('particles');
    }


    /**
     * Adds particles to the animated object.
     * @param {number} count - The number of particles to add.
     * @param {number} init_size - The initial size of the particles.
     * @param {string} particle_color - The color of the particles.
     */
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


    /**
     * Adds ground particles to the animated object.
     * @param {number} count - The number of particles to add.
     * @param {number} init_size - The initial size of the particles.
     * @returns {void}
     */
    addGroundParticles(count, init_size) {
        this.addParticles(count, init_size, 'rgba(256, 200, 120, 0.05)');
    }


    /**
     * Draws the particles of the animated object on the canvas.
     */
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


    /**
     * Draws the animated object on the canvas.
     * This method calls the base class's draw method and then draws particles.
     * @override
     */
    draw() {
        super.draw();
        this.drawParticles();
    }

}