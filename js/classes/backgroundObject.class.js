class BackgroundObject extends Interval {
    z_index;
    constructor(x, y, imgpath, z) {
        super();
        this.setKoords(x, y);
        this.setImageWithScaleToCanvasHeight(imgpath);
        this.z_index = z;
    }


    getX() {
        return this.x - this.gameObject.cameraX * this.z_index;
    }
}