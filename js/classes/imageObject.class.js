/**
 * Represents an image object.
 * @class
 */
class ImageObject {
    imagePath = '';
    img = new Image();
    imageLoaded = false;

    diffX = 0;
    diffY = 0;
    width = 0;
    height = 0;
    scale = 1;

    /**
     * Creates an instance of ImageObject.
     * @param {string} imagePath - The path to the image.
     * @param {number} [scale=1] - The scale factor of the image.
     * @param {number} [diffX=0] - The X-axis offset of the image.
     * @param {number} [diffY=0] - The Y-axis offset of the image.
     */
    constructor(imagePath, scale = 1, diffX = 0, diffY = 0) {
        this.scale = scale;
        this.imagePath = imagePath;
        this.img.src = imagePath;
        this.diffX = diffX;
        this.diffY = diffY;
        this.img.onload = () => {
            if (this.canvasHeight) this.scale = this.canvasHeight / this.img.height;
            else if (this.canvasWidth) this.scale = this.canvasWidth / this.img.width;
            this.scaleImage(this.scale);
            this.imageLoaded = true;
        };
    }

    /**
     * Scales the image by the given scale factor.
     * @param {number} scale - The scale factor.
     */
    scaleImage(scale) {
        this.scale = scale;
        this.width = this.img.width * this.scale;
        this.height = this.img.height * this.scale;
    }

    /**
     * Scales the image to fit the given canvas height while maintaining the aspect ratio.
     * @param {number} canvasHeight - The height of the canvas.
     */
    scaleImageToCanvasHeight(canvasHeight) {
        if (this.imageLoaded) {
            this.scale = canvasHeight / this.img.height;
            this.scaleImage(this.scale);
        } else {
            this.canvasHeight = canvasHeight;
        }
    }

    /**
     * Scales the image to fit the given canvas width while maintaining the aspect ratio.
     * @param {number} canvasWidth - The width of the canvas.
     */
    scaleImageToCanvasWidth(canvasWidth) {
        if (this.imageLoaded) {
            this.scale = canvasWidth / this.img.width;
            this.scaleImage(this.scale);
        } else {
            this.canvasWidth = canvasWidth;
        }
    }
}