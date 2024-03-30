class AnimationObject extends DrawableObject {
    currentAnimID = '';
    currentFrames = [];
    currentFrame = 0;

    constructor() {
        super();
    }

    startAnimation(animID, interval) {
        if (this.currentAnimID === animID) return;
        this.stopAnimation();
        this.currentAnimID = animID;
        this.currentFrames = animFrames[animID];
        this.currentFrame = 0;
        this.addInterval('animation', () => {
            this.currentFrame++;
            if (this.currentFrame >= this.currentFrames.length) {
                this.currentFrame = 0;
            }
            this.img = this.currentFrames[this.currentFrame];
        }, interval);
    }


    stopAnimation() {
        this.removeInterval('animation');
    }
}