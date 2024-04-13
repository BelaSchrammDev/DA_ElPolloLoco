const COLOR_RED = { r: 255, g: 0, b: 0 };
const COLOR_GREEN = { r: 65, g: 145, b: 41 };

/**
 * Represents a text element to be drawn on a canvas.
 */
class CanvasText {

    opacity = 1;
    size = 30;
    remove = false;

    /**
     * Creates a new instance of the CanvasText class.
     * @param {string} text - The text to be displayed.
     * @param {number} x - The x-coordinate of the text position.
     * @param {number} y - The y-coordinate of the text position.
     * @param {object} color - The color of the text (default: { r: 0, g: 0, b: 0 }).
     * @param {object} shadowcolor - The color of the text shadow (default: { r: 255, g: 255, b: 255 }).
     */
    constructor(text, x, y, color = { r: 0, g: 0, b: 0 }, shadowcolor = { r: 255, g: 255, b: 255 }) {
        this.gameObject = game;
        this.text = text;
        this.x = x;
        this.y = y;
        this.color = color;
        this.shadowcolor = shadowcolor;
    }

    /**
     * Draws the text on the canvas.
     */
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

/**
 * Represents a flying score text in a canvas.
 * The Text fly to the score text in the upper right corner and fades out.
 * @extends CanvasText
 */
class FlyingScoreText extends CanvasText {
    /**
     * Creates a new instance of the FlyingScoreText class.
     * @param {string} text - The text to display.
     * @param {number} x - The x-coordinate of the text.
     * @param {number} y - The y-coordinate of the text.
     * @param {object} color - The color of the text in RGB format.
     * @param {object} shadowcolor - The color of the text shadow in RGB format.
     */
    constructor(text, x, y, color = { r: 0, g: 0, b: 0 }, shadowcolor = { r: 255, g: 255, b: 255 }) {
        super(text, x, y, color, shadowcolor);
    }

    /**
     * Updates the position and opacity of the flying score text.
     */
    update() {
        this.x += (this.gameObject.scoreText.x - this.x) / 20;
        this.y += (this.gameObject.scoreText.y + 20 - this.y) / 20;
        this.opacity -= 0.01;
        if (this.opacity <= 0) this.remove = true;
    }
}


/**
 * Represents a text element on a canvas.
 * The text is displayed letter by letter and is X centered on the canvas.
 * @class
 * @extends CanvasText
 */
class Text extends CanvasText {
    originalText = '';
    textcount = 0;
    constructor(text, y, size = 30, color = { r: 0, g: 0, b: 0 }) {
        super(text, 0, y, color);
        this.size = size;
        this.centerText();
        this.originalText = text;
        this.text = '';
    }

    /**
     * Centers the text horizontally on the canvas.
     */
    centerText() {
        this.gameObject.ctx.font = this.size + 'px zabars';
        let textwidth = this.gameObject.ctx.measureText(this.text).width;
        this.x = (this.gameObject.canvas.width - textwidth) / 2;
    }

    /**
     * Updates the text by adding one letter to the text on each execution.
     */
    update() {
        if (this.textcount < this.originalText.length) {
            this.text += this.originalText[this.textcount];
            this.textcount++;
        }
    }
}


/**
 * Represents the score in the game.
 * @extends CanvasText
 */
class Score extends CanvasText {
    constructor() {
        super('Score: 0', 620, 30);
    }

    /**
     * Updates the score text based on the current score value.
     */
    update() {
        this.text = 'Score: ' + this.gameObject.score;
    }
}

