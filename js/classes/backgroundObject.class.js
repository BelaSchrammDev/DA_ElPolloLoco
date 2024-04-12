class BackgroundObject extends DrawableObject {
    constructor(imgpath, z) {
        super();
        this.imageObj = new ImageObject(imgpath);
        this.imageObj.scaleImageToCanvasHeight(this.gameObject.canvas.height);
        this.z_index = z;
    }


    draw() {
        if (!this.imageObj.imageLoaded) return;
        let ctx = this.gameObject.ctx;
        let currentX = this.x;
        while (currentX < this.gameObject.levelWidth) {
            let currentXCorrected = this.getX(currentX);
            if (currentXCorrected > this.gameObject.canvas.width) break;
            if (currentXCorrected + this.imageObj.width > 0) {
                ctx.drawImage(this.imageObj.img, currentXCorrected, this.y, this.imageObj.width, this.imageObj.height);
            }
            currentX += this.imageObj.width - 1;
        }
    }
}


class BackgroundImageObject extends DrawableObject {
    constructor(imgpath) {
        super();
        this.imageObj = new ImageObject(imgpath);
        this.imageObj.scaleImageToCanvasWidth(this.gameObject.canvas.width);
    }
}