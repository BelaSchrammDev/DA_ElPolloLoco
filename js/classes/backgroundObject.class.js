class BackgroundObject extends DrawableObject {
    constructor(imgpath, z) {
        super();
        this.setKoords(0, 0);
        this.setImageWithScaleToCanvasHeight(imgpath);
        this.z_index = z;
    }


    draw() {
        if (this.img == undefined) return;
        let ctx = this.gameObject.ctx;
        let currentX = this.x;
        while (currentX < this.gameObject.levelWidth) {
            let currentXCorrected = this.getX(currentX);
            if (currentXCorrected > this.gameObject.canvas.width) break;
            if (currentXCorrected + this.width > 0) {
                ctx.drawImage(this.img, currentXCorrected, this.y, this.width, this.height);
            }
            currentX += this.width - 1;
        }
    }

}