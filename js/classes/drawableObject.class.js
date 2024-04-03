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
    diffX = 0;
    diffY = 0;
    width;
    height;
    z_index = 1;
    flipdrawing = false;
    img = undefined;

    constructor() {
        super();
        this.gameObject = game;
    }


    /**
     * Init the image for the drawable object.
     * @param {string} imgPath - The path to the image file.
     */
    setImage(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
    }


    /**
     * Sets the image of the drawable object and scales it.
     * Return it as an object for later use.
     * @param {string} imgPath - The path to the image.
     * @param {number} scale - The scale factor to apply to the image.
     */
    setImageWithScale(imgPath, scale) {
        this.setImage(imgPath);
        let imgJSON = { img: this.img, width: this.width, height: this.height }
        this.img.onload = () => {
            this.setDimensions(this.img.width * scale, this.img.height * scale);
            imgJSON.width = imgJSON.img.width * scale;
            imgJSON.height = imgJSON.img.height * scale;
        };
        return imgJSON;
    }


    /**
     * Sets the image of the drawable object and scales it to the canvas height.
     * special for background images.
     * @param {string} imgPath - The path to the image file.
     */
    setImageWithScaleToCanvasHeight(imgPath) {
        this.setImage(imgPath);
        this.img.onload = () => {
            const scale = this.gameObject.canvas.height / this.img.height;
            this.setDimensions(this.img.width * scale, this.img.height * scale);
        };
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
     * Sets the dimensions of the object.
     * @param {number} width - The width of the object.
     * @param {number} height - The height of the object.
     */
    setDimensions(width, height) {
        this.width = width;
        this.height = height;
    }


    /**
     * Sets the image position to the center of the canvas.
     */
    setImageToCenter() {
        this.x = this.gameObject.canvas.width / 2 - this.width / 2;
        this.y = this.gameObject.canvas.height / 2 - this.height / 2;
    }

    /**
     * Draws the object on the canvas.
     * Flip the drawing if flipdrawing is true.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw() {
        if (this.img == undefined) return;
        let ctx = this.gameObject.ctx;
        if (this.flipdrawing) {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.getX(this.x) + this.diffX, this.y + this.diffY, this.width, this.height);
            ctx.restore();
        }
        else ctx.drawImage(this.img, this.getX(this.x) + this.diffX, this.y + this.diffY, this.width, this.height);
    }


    /**
     * Get the x-coordinate for this object adjusted for the camera and z-index.
     * @returns {number} The adjusted x-coordinate.
     */
    getX(x) {
        return x - this.gameObject.cameraX * this.z_index;
    }
}