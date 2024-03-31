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


    constructor() {
        super();
    }


    start() {
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
}