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
        this.drawCollisionBox();
        this.drawSpriteBox();
    }


    setHitBox(left, top, right, bottom) {
        this.hitBox.offsetleft = left;
        this.hitBox.offsettop = top;
        this.hitBox.offsetright = right;
        this.hitBox.offsetbottom = bottom;
    }


    getHitboxAbsolut() {
        return {
            left: this.x + this.hitBox.offsetleft,
            top: this.y + this.hitBox.offsettop,
            right: this.x + this.hitBox.offsetright,
            bottom: this.y + this.hitBox.offsetbottom,
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
        if (this.imageObj === null) return;
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
        if (this.imageObj === null) return;
        this.gameObject.ctx.fillStyle = 'blue';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.rect(
            this.getX(this.x) + this.hitBox.offsetleft,
            this.y + this.hitBox.offsettop,
            this.hitBox.offsetright - this.hitBox.offsetleft,
            this.hitBox.offsetbottom - this.hitBox.offsettop
        );
        this.gameObject.ctx.stroke();
    }


    drawGroundLine() {
        if (this.imageObj === null) return;
        this.gameObject.ctx.fillStyle = 'blue';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.rect(
            this.getX(this.x),
            this.y,
            this.imageObj.width,
            this.offsetSpriteGroundFromTop
        );
        this.gameObject.ctx.stroke();
    }

}