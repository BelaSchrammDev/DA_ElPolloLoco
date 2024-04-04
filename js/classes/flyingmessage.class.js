class CenterPopImage extends DrawableObject {
    pumping = 0;
    constructor(imgpath) {
        super();
        this.imageObj = new ImageObject(imgpath);
        this.imageObj.scaleImageToCanvasHeight(this.gameObject.canvas.height);
        this.setKoords(0, 0);
        this.width = this.gameObject.canvas.width;
        this.height = this.gameObject.canvas.height;
    }

    update() {
        this.pumping += 0.1;
        this.imageObj.height = 20 + this.gameObject.canvas.height + Math.sin(this.pumping) * 10;
        this.imageObj.width = 20 + this.gameObject.canvas.width + Math.sin(this.pumping) * 10;
        this.setImageToCenter();
        if (this.gameObject.interaction.Enter) {
            this.gameObject.stop();
            initLevel1(this.gameObject);
            this.gameObject.start();
        }
    }

    draw() {
        let ctx = this.gameObject.ctx;
        ctx.drawImage(this.imageObj.img, this.x, this.y, this.imageObj.width, this.imageObj.height);
    }

}