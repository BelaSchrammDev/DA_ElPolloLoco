class UIElement extends DrawableObject {
    lastValue = 0; // between 0 and 100
    currentFadeValue = 100;
    imgIcon;
    imgIconUpdateScale = 1;
    imgBar;
    imgFillBar;
    barWidth = 561;
    barScale = 0.3;
    barHeight = 59;
    barLeftOffset = 34;
    barTopOffset = 49;

    constructor(iconImgPath, x, y) {
        super();
        this.imgIcon = this.setImageWithScale(iconImgPath, 0.3);
        this.imgBar = this.setImageWithScale('./img_pollo_locco/img/7_statusbars/4_bar_elements/statusbar_empty.png', this.barScale);
        this.imgFillBar = this.setImageWithScale('./img_pollo_locco/img/7_statusbars/4_bar_elements/statusbar_blue.png', this.barScale);
        this.setKoords(x, y);
        this.lastValue = this.getValue();
    }

    getValue() { return 100; }

    draw() {
        let ctx = this.gameObject.ctx;
        let newValue = this.getValue();
        if (this.imgIconUpdateScale == 1 && newValue != this.lastValue) {
            this.imgIconUpdateScale = 1.2
        }
        else {
            this.imgIconUpdateScale -= 0.015;
            if (this.imgIconUpdateScale < 1) this.imgIconUpdateScale = 1;
        }
        this.lastValue = newValue;
        let xValue = this.barWidth * (this.getValue() / 100);
        ctx.drawImage(this.imgBar.img, this.barLeftOffset, this.barTopOffset, this.barWidth, this.barHeight, this.x, this.y, this.barWidth * this.barScale, this.barHeight * this.barScale);
        ctx.drawImage(this.imgFillBar.img, this.barLeftOffset + this.barWidth - xValue, this.barTopOffset, xValue, this.barHeight, this.x, this.y, xValue * this.barScale, this.barHeight * this.barScale);
        ctx.drawImage(this.imgIcon.img, this.x - 22, this.y - 22, this.imgIcon.width * this.imgIconUpdateScale, this.imgIcon.height * this.imgIconUpdateScale);
    }
}

class Helth extends UIElement {
    constructor() {
        super('./img_pollo_locco/img/7_statusbars/3_icons/icon_health.png', 100, 15);
    }
    getValue() { return this.gameObject.player.health; }
}

class Coins extends UIElement {
    constructor() {
        super('./img_pollo_locco/img/7_statusbars/3_icons/icon_coin.png', 60, 40);
    }
    getValue() { return 20; }
}

class Bottles extends UIElement {
    constructor() {
        super('./img_pollo_locco/img/7_statusbars/3_icons/icon_salsa_bottle.png', 20, 65);
    }
    getValue() { return 45; }
}



// gameObject.ui_elements.push(new UIElement('./img_pollo_locco/img/7_statusbars/3_icons/icon_health.png', 100, 10));
// gameObject.ui_elements.push(new UIElement('./img_pollo_locco/img/7_statusbars/3_icons/icon_coin.png', 60, 35));
// gameObject.ui_elements.push(new UIElement('./img_pollo_locco/img/7_statusbars/3_icons/icon_salsa_bottle.png', 20, 60));
