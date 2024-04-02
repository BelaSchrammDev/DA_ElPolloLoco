class FlyingText extends DrawableObject {
    constructor(text, x, y) {
        super();
        this.text = text;
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.opacity = 1;
    }

    update() {
        this.y -= this.speed;
        this.opacity -= 0.01;
        if (this.opacity <= 0) this.remove = true;
    }

    draw() {
        let ctx = this.gameObject.ctx;
        ctx.save();
        ctx.font = '30px zabars';
        ctx.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        ctx.fillText(this.text, this.x + 2, this.y + 2);
        ctx.fillStyle = 'rgba(65, 145, 41, ' + this.opacity + ')';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}