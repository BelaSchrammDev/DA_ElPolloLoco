class BackgroundObject extends Interval {
    z_index;
    constructor(x, y, imgpath, z) {
        super();
        this.setKoords(x, y);
        this.setImageWithScaleToCanvasHeight(imgpath);
        this.z_index = z;
    }
}