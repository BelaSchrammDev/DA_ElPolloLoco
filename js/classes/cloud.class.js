class Cloud extends Interval {
    speed;
    constructor(x, y, scale, imgpath, speed) {
        super();
        this.speed = speed;
        this.setKoords(x, y);
        this.setImageWithScale(imgpath, scale);
    }

    getX() {
        return this.x - this.gameObject.cameraX * (this.speed / 4);
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