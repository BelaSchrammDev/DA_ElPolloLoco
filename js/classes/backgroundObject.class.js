/**
 * Represents a background object in the game.
 * @class
 * @extends DrawableObject
 */
class BackgroundObject extends DrawableObject {
    /**
     * Creates a new BackgroundObject instance.
     * @constructor
     * @param {string} imgpath - The path to the image file.
     * @param {number} z - The z-index of the background object.
     */
    constructor(imgpath, z) {
        super();
        this.imageObj = new ImageObject(imgpath);
        this.imageObj.scaleImageToCanvasHeight(this.gameObject.canvas.height);
        this.z_index = z;
    }


    /**
     * Draws the background object on the canvas.
     * According to the z-index, the background object is drawning for parallax effect.
     */
    draw() {
        if (!this.imageObj.imageLoaded) return;
        let ctx = this.gameObject.ctx;
        let currentX = this.x;
        while (currentX < this.gameObject.levelWidth) {
            let currentXCorrected = this.getCanvasX(currentX);
            if (currentXCorrected > this.gameObject.canvas.width) break;
            if (currentXCorrected + this.imageObj.width > 0) {
                ctx.drawImage(this.imageObj.img, currentXCorrected, this.y, this.imageObj.width, this.imageObj.height);
            }
            currentX += this.imageObj.width - 1;
        }
    }
}


/**
 * Represents a background image object.
 * @extends DrawableObject
 */
class BackgroundImageObject extends DrawableObject {
    /**
     * Creates a new BackgroundImageObject.
     * @param {string} imgpath - The path to the image file.
     */
    constructor(imgpath) {
        super();
        this.imageObj = new ImageObject(imgpath);
        this.imageObj.scaleImageToCanvasWidth(this.gameObject.canvas.width);
    }
}


/**
 * Represents a drawable object with a center-popping image effect.
 * @extends DrawableObject
 */
class CenterPopImage extends DrawableObject {
    pumping = 0;
    constructor(imgpath) {
        super();
        this.imageObj = new ImageObject(imgpath);
        this.imageObj.scaleImageToCanvasHeight(this.gameObject.canvas.height);
        this.width = this.gameObject.canvas.width;
        this.height = this.gameObject.canvas.height;
    }

    update() {
        this.pumping += 0.1;
        this.imageObj.height = 20 + this.gameObject.canvas.height + Math.sin(this.pumping) * 10;
        this.imageObj.width = 20 + this.gameObject.canvas.width + Math.sin(this.pumping) * 10;
        this.setImageToCenter();
    }

    draw() {
        let ctx = this.gameObject.ctx;
        ctx.drawImage(this.imageObj.img, this.x, this.y, this.imageObj.width, this.imageObj.height);
    }

}
