class BackgroundObject extends Interval {
    constructor(x, y, imgpath, z) {
        super();
        this.setKoords(x, y);
        this.setImageWithScaleToCanvasHeight(imgpath);
        this.z_index = z;
    }
}