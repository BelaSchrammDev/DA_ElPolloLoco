class CollidingObject extends MovingObject {

    hitBox = {
        offsetleft: 0,
        offsettop: 0,
        offsetright: 0,
        offsetbottom: 0
    };

    draw() {
        super.draw();
        // this.drawCollisionBox();
        // this.drawSpriteBox();
    }

    setHitBox(left, top, right, bottom) {
        this.hitBox.offsetleft = left;
        this.hitBox.offsettop = top;
        this.hitBox.offsetright = right;
        this.hitBox.offsetbottom = bottom;
    }

    isCollidingWith(otherObject) {
        return this.x + this.hitBox.offsetleft < otherObject.x + otherObject.width - otherObject.hitBox.offsetright &&
            this.x + this.width - this.hitBox.offsetright > otherObject.x + otherObject.hitBox.offsetright &&
            this.y + this.hitBox.offsettop < otherObject.y + otherObject.height - otherObject.hitBox.offsetbottom &&
            this.y + this.height - this.hitBox.offsetbottom > otherObject.y + otherObject.hitBox.offsettop;
    }

    drawSpriteBox() {
        this.gameObject.ctx.fillStyle = 'red';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.rect(
            this.getX(this.x),
            this.y,
            this.width,
            this.height
        );
        this.gameObject.ctx.stroke();
    }

    drawCollisionBox() {
        this.gameObject.ctx.fillStyle = 'blue';
        this.gameObject.ctx.beginPath();
        this.gameObject.ctx.rect(
            this.getX(this.x) + this.hitBox.offsetleft,
            this.y + this.hitBox.offsettop,
            this.width - this.hitBox.offsetright - this.hitBox.offsetleft,
            this.height - this.hitBox.offsettop - this.hitBox.offsetbottom
        );
        this.gameObject.ctx.stroke();
    }
}