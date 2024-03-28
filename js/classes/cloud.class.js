class Cloud extends Interval {
    speed;
    constructor(x, y, scale, imgpath, speed) {
        super();
        this.speed = speed;
        this.setKoords(x, y);
        this.setImageWithScale(imgpath, scale);
    }


    start() {
        this.addInterval('cloudanim', () => {
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x = this.gameObject.levelwidth;
            }
        }, 1000 / 60);
    }
}