/**
 * Represents a drawable object on the canvas.
 * @class
 * @classdesc Represents a drawable object on the canvas.
 * 
 */
class DrawableObject extends Interval {
    gameObject;
    x;
    y;
    z_index = 1;
    flipdrawing = false;
    imageObj = undefined;

    constructor() {
        super();
        this.gameObject = game;
    }


    /**
     * Sets the image of the drawable object and scales it.
     * Return it as an object for later use.
     * @param {string} imgPath - The path to the image.
     * @param {number} scale - The scale factor to apply to the image.
     */
    setImageWithScale(imgPath, scale) {
        this.imageObj = new ImageObject(imgPath, scale);
        return this.imageObj;
    }


    /**
     * Sets the coordinates of the object.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    setKoords(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the image position to the center of the canvas.
     */
    setImageToCenter() {
        this.x = this.gameObject.canvas.width / 2 - this.imageObj.width / 2;
        this.y = this.gameObject.canvas.height / 2 - this.imageObj.height / 2;
    }

    /**
     * Draws the object on the canvas.
     * Flip the drawing if flipdrawing is true.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw() {
        if (this.imageObj == undefined || !this.imageObj.imageLoaded) return;
        let ctx = this.gameObject.ctx;
        if (this.flipdrawing) {
            ctx.save();
            ctx.translate(this.imageObj.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.imageObj.img, -this.getX(this.x) + this.imageObj.diffX, this.y + this.imageObj.diffY, this.imageObj.width, this.imageObj.height);
            ctx.restore();
        }
        else ctx.drawImage(this.imageObj.img, this.getX(this.x) + this.imageObj.diffX, this.y + this.imageObj.diffY, this.imageObj.width, this.imageObj.height);
    }


    /**
     * Get the x-coordinate for this object adjusted for the camera and z-index.
     * @returns {number} The adjusted x-coordinate.
     */
    getX(x) {
        return x - this.gameObject.cameraX * this.z_index;
    }
}