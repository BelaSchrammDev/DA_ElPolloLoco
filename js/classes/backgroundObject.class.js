class BackgroundObject extends DrawableObject {
    z_index;
    constructor(x, y, img, z) {
        super();
        this.setKoords(x, y);
        this.setImageWithScaleToHeight(img);
        this.z_index = z;
    }
}