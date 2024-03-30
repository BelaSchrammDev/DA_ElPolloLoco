class Cloud extends DrawableObject {
    speed;
    constructor(x, y, scale, imgpath, speed) {
        super();
        this.speed = speed;
        this.z_index = this.speed / 6;
        this.setKoords(x, y);
        this.setImageWithScale(imgpath, scale);
    }


    start() {
        this.addInterval('cloudanim', () => {
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x = this.gameObject.levelWidth;
            }
        });
    }
}