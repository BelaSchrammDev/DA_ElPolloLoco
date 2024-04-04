class ImageObject {
    imagePath = '';
    img = new Image();
    imageLoaded = false;
    diffX = 0;
    diffY = 0;
    width = 0;
    height = 0;
    scale = 1;
    sourceWidth = 0;
    sourceHeight = 0;
    constructor(imagePath, scale = 1, diffX = 0, diffY = 0) {
        this.scale = scale;
        this.imagePath = imagePath;
        this.img.src = imagePath;
        this.diffX = diffX;
        this.diffY = diffY;
        this.img.onload = () => {
            this.sourceWidth = this.img.width;
            this.sourceHeight = this.img.height;
            if (this.canvasHeight) {
                this.scale = this.canvasHeight / this.img.height;
            }
            this.width = this.img.width * this.scale;
            this.height = this.img.height * this.scale;
            this.imageLoaded = true;
        };
    }

    scaleImage(scale) {
        this.width = this.sourceWidth * scale;
        this.height = this.sourceHeight * scale;
    }

    scaleImageToCanvasHeight(canvasHeight) {
        this.canvasHeight = canvasHeight;
    }
}