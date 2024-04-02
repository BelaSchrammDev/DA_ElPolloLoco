const COLOR_RED = { r: 255, g: 0, b: 0 };
const COLOR_GREEN = { r: 65, g: 145, b: 41 };

class FlyingText extends DrawableObject {
    constructor(text, x, y, color = { r: 0, g: 0, b: 0 }, shadowcolor = { r: 255, g: 255, b: 255 }) {
        super();
        this.text = text;
        this.x = x;
        this.y = y;
        this.opacity = 1;
        this.color = color;
        this.shadowcolor = shadowcolor;
    }

    update() {
        this.x += (this.gameObject.scoreText.x - this.x) / 20;
        this.y += (this.gameObject.scoreText.y + 20 - this.y) / 20;
        this.opacity -= 0.01;
        if (this.opacity <= 0) this.remove = true;
    }

    draw() {
        let ctx = this.gameObject.ctx;
        ctx.save();
        ctx.font = '30px zabars';
        ctx.fillStyle = `rgba(${this.shadowcolor.r}, ${this.shadowcolor.g}, ${this.shadowcolor.b}, ${this.opacity} )`;
        ctx.fillText(this.text, this.x + 2, this.y + 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity} )`;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

class Score extends FlyingText {
    constructor(gameObject) {
        super('Score:', 620, 30);
        this.gameObject = gameObject;
        this.remove = false;
    }

    update() {
        this.text = 'Score: ' + this.gameObject.score;
    }
}