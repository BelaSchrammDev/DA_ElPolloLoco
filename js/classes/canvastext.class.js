const COLOR_RED = { r: 255, g: 0, b: 0 };
const COLOR_GREEN = { r: 65, g: 145, b: 41 };

class CanvasText {
    constructor(text, x, y, color = { r: 0, g: 0, b: 0 }, shadowcolor = { r: 255, g: 255, b: 255 }) {
        this.gameObject = game;
        this.text = text;
        this.x = x;
        this.y = y;
        this.color = color;
        this.shadowcolor = shadowcolor;
        this.opacity = 1;
        this.size = 30;
        this.remove = false;
    }

    draw() {
        let ctx = this.gameObject.ctx;
        ctx.save();
        ctx.font = this.size + 'px zabars';
        ctx.fillStyle = `rgba(${this.shadowcolor.r}, ${this.shadowcolor.g}, ${this.shadowcolor.b}, ${this.opacity} )`;
        ctx.fillText(this.text, this.x + 2, this.y + 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity} )`;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

class FlyingText extends CanvasText {
    constructor(text, x, y, color = { r: 0, g: 0, b: 0 }, shadowcolor = { r: 255, g: 255, b: 255 }) {
        super(text, x, y, color, shadowcolor);
    }

    update() {
        this.x += (this.gameObject.scoreText.x - this.x) / 20;
        this.y += (this.gameObject.scoreText.y + 20 - this.y) / 20;
        this.opacity -= 0.01;
        if (this.opacity <= 0) this.remove = true;
    }

}

class Text extends CanvasText {
    originalText = '';
    textcount = 0;
    constructor(text, y, size = 30) {
        super(text, 0, y);
        this.size = size;
        this.centerText();
        this.originalText = text;
        this.text = '';
    }

    centerText() {
        this.gameObject.ctx.font = this.size + 'px zabars';
        let textwidth = this.gameObject.ctx.measureText(this.text).width;
        this.x = (this.gameObject.canvas.width - textwidth) / 2;
    }

    update() {
        // add every execution one letter to the text }
        if (this.textcount < this.originalText.length) {
            this.text += this.originalText[this.textcount];
            this.textcount++;
        }
    }
}

class Score extends CanvasText {
    constructor() {
        super('Score: 0', 620, 30);
    }

    update() {
        this.text = 'Score: ' + this.gameObject.score;
    }
}

class CenterPopImage extends DrawableObject {
    pumping = 0;
    constructor(imgpath) {
        super();
        this.imageObj = new ImageObject(imgpath);
        this.imageObj.scaleImageToCanvasHeight(this.gameObject.canvas.height);
        this.width = this.gameObject.canvas.width;
        this.height = this.gameObject.canvas.height;
    }

    update() {
        this.pumping += 0.1;
        this.imageObj.height = 20 + this.gameObject.canvas.height + Math.sin(this.pumping) * 10;
        this.imageObj.width = 20 + this.gameObject.canvas.width + Math.sin(this.pumping) * 10;
        this.setImageToCenter();
    }

    draw() {
        let ctx = this.gameObject.ctx;
        ctx.drawImage(this.imageObj.img, this.x, this.y, this.imageObj.width, this.imageObj.height);
    }

}
