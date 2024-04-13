/**
 * Represents a cloud object that moves across the screen.
 * @extends DrawableObject
 */
class Cloud extends DrawableObject {
    speed;
    constructor(x, y, scale, imgpath, speed) {
        super();
        this.speed = speed;
        this.z_index = this.speed / 6;
        this.setKoords(x, y);
        this.setImageWithScale(imgpath, scale);
    }

    /**
     * Starts the animation for the cloud object.
     * Moves the cloud object to the left and resets its position when it moves off the screen.
     */
    start() {
        this.addInterval('cloudanim', () => {
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x = this.gameObject.levelWidth;
            }
        });
    }
}