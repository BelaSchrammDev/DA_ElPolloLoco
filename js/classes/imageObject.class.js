class ImageObject {
    imagePath = '';
    img = new Image();
    imageLoaded = false;

    diffX = 0;
    diffY = 0;
    width = 0;
    height = 0;
    scale = 1;

    constructor(imagePath, scale = 1, diffX = 0, diffY = 0) {
        this.scale = scale;
        this.imagePath = imagePath;
        this.img.src = imagePath;
        this.diffX = diffX;
        this.diffY = diffY;
        this.img.onload = () => {
            if (this.canvasHeight) this.scale = this.canvasHeight / this.img.height;
            this.scaleImage(this.scale);
            this.imageLoaded = true;
        };
    }

    scaleImage(scale) {
        this.scale = scale;
        this.width = this.img.width * this.scale;
        this.height = this.img.height * this.scale;
    }

    scaleImageToCanvasHeight(canvasHeight) {
        if (this.imageLoaded) {
            this.scale = canvasHeight / this.img.height;
            this.scaleImage(this.scale);
        } else {
            this.canvasHeight = canvasHeight;
        }
    }
}