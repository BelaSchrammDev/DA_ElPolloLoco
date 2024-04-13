/**
 * Represents a UI element that can be drawn on the screen.
 * @extends DrawableObject
 */
class UIElement extends DrawableObject {
    lastValue = 0; // between 0 and 100
    currentFadeValue = 100;
    currentFadeOffset = 0;
    imgIcon;
    imgIconUpdateScale = 1;
    imgBar;
    imgFillBar;
    barWidth = 561;
    barWidthPX = 561;
    barScale = 0.3;
    barHeight = 59;
    barHeightPX = 59;
    barLeftOffset = 34;
    barTopOffset = 49;

    /**
     * Creates a new UIElement instance.
     * @param {string} iconImgPath - The path to the icon image.
     * @param {number} x - The x-coordinate of the UI element.
     * @param {number} y - The y-coordinate of the UI element.
     */
    constructor(iconImgPath, x, y) {
        super();
        this.imgIcon = this.setImageWithScale(iconImgPath, this.barScale);
        this.imgBar = this.setImageWithScale('./img_pollo_locco/img/7_statusbars/4_bar_elements/statusbar_empty.png', this.barScale);
        this.imgFillBar = this.setImageWithScale('./img_pollo_locco/img/7_statusbars/4_bar_elements/statusbar_blue.png', this.barScale);
        this.barWidthPX = this.barWidth * this.barScale;
        this.barHeightPX = this.barHeight * this.barScale;
        this.setKoords(x, y);
        this.lastValue = this.getValue();
        this.currentFadeValue = this.lastValue;
    }


    /**
     * Updates the UI element.
     */
    update() {
        let newValue = this.getValue();
        if (newValue == NaN) newValue = 0;
        if (this.imgIconUpdateScale == 1 && newValue != this.lastValue) {
            this.imgIconUpdateScale = 1.2;
            this.currentFadeValue = this.lastValue;
            this.currentFadeOffset = newValue > this.lastValue ? 0.5 : -0.5;
        } else {
            this.imgIconUpdateScale -= 0.01;
            if (this.imgIconUpdateScale < 1) this.imgIconUpdateScale = 1;
        }
        if (newValue == this.currentFadeValue) this.currentFadeOffset = 0;
        else this.currentFadeValue += this.currentFadeOffset;
        this.lastValue = newValue;
    }


    /**
     * Draws the UI element on the canvas.
     */
    draw() {
        let ctx = this.gameObject.ctx;
        let xValue = this.barWidth * (this.currentFadeValue / 100);
        ctx.drawImage(this.imgBar.img, this.barLeftOffset, this.barTopOffset, this.barWidth, this.barHeight, this.x, this.y, this.barWidthPX, this.barHeightPX);
        ctx.drawImage(this.imgFillBar.img, this.barLeftOffset + this.barWidth - xValue, this.barTopOffset, xValue, this.barHeight, this.x, this.y, xValue * this.barScale, this.barHeightPX);
        ctx.drawImage(this.imgIcon.img, this.x - 22, this.y - 22, this.imgIcon.width * this.imgIconUpdateScale, this.imgIcon.height * this.imgIconUpdateScale);
    }
}


/**
 * Represents the player health UI element.
 * @extends UIElement
 */
class Helth extends UIElement {
    constructor() {
        super('./img_pollo_locco/img/7_statusbars/3_icons/icon_health.png', 100, 15);
    }


    /**
     * Get the value of the player's health.
     * @returns {number} The player's health value.
     */
    getValue() {
        return this.gameObject.player.health;
    }
}


/**
 * Represents the boss health UI element.
 * @extends UIElement
 */
class BossHealth extends UIElement {
    constructor() {
        super('./img_pollo_locco/img/7_statusbars/3_icons/icon_health_endboss.png', 540, 40);
    }


    /**
     * Gets the current health value of the boss.
     * @returns {number} The boss health value.
     */
    getValue() {
        return this.gameObject.boss.health;
    }
}


/**
 * Represents a Coins UI element.
 * @extends UIElement
 */
class Coins extends UIElement {
    constructor() {
        super('./img_pollo_locco/img/7_statusbars/3_icons/icon_coin.png', 60, 40);
    }

    /**
     * Gets the value of the coins.
     * 100 / maxcoins * coins
     * @returns {number} The value of the coins.
     */
    getValue() {
        if (this.gameObject.coins == 0 && this.gameObject.maxcoins == 0) return 0;
        return 100 / this.gameObject.maxcoins * this.gameObject.coins;
    }
}


/**
 * Represents a Bottles UI element.
 * @extends UIElement
 */
class Bottles extends UIElement {
    constructor() {
        super('./img_pollo_locco/img/7_statusbars/3_icons/icon_salsa_bottle.png', 20, 65);
    }

    /**
     * Get the value of the bottles.
     * 100 / maxbottles * bottles
     * @returns {number} The value of the bottles.
     */
    getValue() {
        if (this.gameObject.bottles == 0 && this.gameObject.maxbottles == 0) return 0;
        return 100 / this.gameObject.maxbottles * this.gameObject.bottles;
    }
}


