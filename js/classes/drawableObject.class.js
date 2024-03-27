/**
 * Represents a drawable object on the canvas.
 */
class DrawableObject {
    gameObject = null;
    x;
    y;
    width;
    height;
    flipdrawing = false;
    img = undefined;

    constructor() {
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
     * Sets the image of the drawable object and scales it to the canvas height.
     * @param {string} imgPath - The path to the image file.
     */
    setImageWithScaleToHeight(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
        this.img.onload = () => {
            const scale = this.gameObject.canvas.height / this.img.height;
            this.width = this.img.width * scale;
            this.height = this.img.height * scale;
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
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        if (this.img == undefined) return;
        if (this.flipdrawing) {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
            ctx.restore();
        }
        else ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}