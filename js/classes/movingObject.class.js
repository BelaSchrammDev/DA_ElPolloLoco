class MovingObject extends DrawableObject {
    currentAnimID = '';
    currentFrames = [];
    currentFrame = 0;
    fallingAnimID = '';
    landingAnimID = '';
    animIdle = true;
    playOnlyOne = false;
    offsetGroundFromTopOfSprite = 0;
    offsetFromGround = 0;
    fallingSpeed = 0;
    gravity = 0.5;

    particles = [];
    maxParticles = 100;
    particleShrinkSpeed = 0.85;


    constructor() {
        super();
    }


    start() {
        // start particles animation
        this.animateParticles();
        // start falling behavior
        this.addInterval('falling', () => {
            if (this.isOnGround() && this.fallingSpeed === 0) return;
            this.fallingSpeed += this.gravity;
            this.offsetFromGround -= this.fallingSpeed;
            if (this.offsetFromGround < 5) this.startAnimation(this.landingAnimID, 100, true);
            else if (this.fallingSpeed >= -2) this.startAnimation(this.fallingAnimID, 200, true);
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


    startAnimation(animID, interval, playonlyone = false) {
        if (animID === '' || this.currentAnimID === animID) return;
        // console.log('start animation = ', animID);
        this.stopAnimation();
        this.currentAnimID = animID;
        this.currentFrames = animFrames[animID];
        this.currentFrame = 0;
        this.animIdle = false;
        this.playOnlyOne = playonlyone;
        this.addInterval('animation', () => {
            this.currentFrame++;
            if (this.currentFrame >= this.currentFrames.length) {
                this.currentFrame = this.playOnlyOne ? this.currentFrames.length - 1 : 0;
                this.animIdle = true;
            }
            this.setFramesKordsOffset();
            this.img = this.currentFrames[this.currentFrame];
        }, interval);
    }


    setFramesKordsOffset(animID) {
        if (animFramesKordsOffset[this.currentAnimID]) {
            this.diffX = animFramesKordsOffset[this.currentAnimID].x;
            this.diffY = animFramesKordsOffset[this.currentAnimID].y;
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
        // this.drawGroundLine();
        this.drawParticles();
    }


    drawGroundLine() {
        this.gameObject.ctx.fillStyle = 'black';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.moveTo(this.getX(), this.y + this.offsetGroundFromTopOfSprite);
        this.gameObject.ctx.lineTo(this.getX() + this.width, this.y + this.offsetGroundFromTopOfSprite);
        this.gameObject.ctx.stroke();
    }


    animateParticles() {
        this.addInterval('particles', () => {
            this.particles.forEach((particle, index) => {
                particle.posX += Math.random() * 2 - 1;
                particle.posY += Math.random() * 2 - 2;
                particle.size *= this.particleShrinkSpeed;
                if (particle.size < 0.5) this.particles.splice(index, 1);
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.splice(this.maxParticles, this.particles.length - this.maxParticles);
            }
        }, 50);
    }


    addGroundParticles(count) {
        for (let index = 0; index < count; index++) {
            this.particles.push({
                color: 'rgba(0, 0, 0, 0.02)',
                size: 8,
                posX: this.x + this.width / 2 + (Math.random() * 20 - 10),
                posY: this.y + this.offsetGroundFromTopOfSprite,
            });
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.gameObject.ctx.fillStyle = particle.color;
            this.gameObject.ctx.beginPath();
            this.gameObject.ctx.arc(this.getRealXPosition(particle.posX), particle.posY, particle.size, 0, 2 * Math.PI);
            this.gameObject.ctx.fill();
        });
    }
}