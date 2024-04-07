class CollidingObject extends DrawableObject {

    hitBox = {
        offsetleft: 0,
        offsettop: 0,
        offsetright: 0,
        offsetbottom: 0
    };

    draw() {
        super.draw();
        // this.drawGroundLine();
        // this.drawCollisionBox();
        // this.drawSpriteBox();
    }

    setHitBox(left, top, right, bottom) {
        this.hitBox.offsetleft = left;
        this.hitBox.offsettop = top;
        this.hitBox.offsetright = right;
        this.hitBox.offsetbottom = bottom;
    }

    getHitboxAbsolut() {
        if (this.imageObj.imageLoaded && !this.hitBox.offsetrightFromleft) {
            this.hitBox.offsetrightFromleft = this.imageObj.width - this.hitBox.offsetright;
            this.hitBox.offsetbottomFromtop = this.imageObj.height - this.hitBox.offsetbottom;
        }
        return {
            left: this.x + this.hitBox.offsetleft,
            top: this.y + this.hitBox.offsettop,
            right: this.x + this.hitBox.offsetrightFromleft,
            bottom: this.y + this.hitBox.offsetbottomFromtop,
        };
    }


    isCollidingWith(otherObject) {
        let thisBox = this.getHitboxAbsolut();
        let otherBox = otherObject.getHitboxAbsolut();
        return thisBox.right > otherBox.left &&
            thisBox.left < otherBox.right &&
            thisBox.bottom > otherBox.top &&
            thisBox.top < otherBox.bottom;
    }

    drawSpriteBox() {
        this.gameObject.ctx.fillStyle = 'black';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.rect(
            this.getX(this.x),
            this.y,
            this.imageObj.width,
            this.imageObj.height
        );
        this.gameObject.ctx.stroke();
    }

    drawCollisionBox() {
        this.gameObject.ctx.fillStyle = 'blue';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.rect(
            this.getX(this.x) + this.hitBox.offsetleft,
            this.y + this.hitBox.offsettop,
            this.imageObj.width - this.hitBox.offsetright - this.hitBox.offsetleft,
            this.imageObj.height - this.hitBox.offsettop - this.hitBox.offsetbottom
        );
        this.gameObject.ctx.stroke();
    }

    drawGroundLine() {
        this.gameObject.ctx.fillStyle = 'blue';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.rect(
            this.getX(this.x),
            this.y,
            this.imageObj.width,
            this.offsetGroundFromTopOfSprite
        );
        this.gameObject.ctx.stroke();
    }

}