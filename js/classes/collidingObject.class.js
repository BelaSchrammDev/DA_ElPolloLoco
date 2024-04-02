class CollidingObject extends MovingObject {

    hitBox = {
        offsetleft: 0,
        offsettop: 0,
        offsetright: 0,
        offsetbottom: 0
    };

    draw() {
        super.draw();
        this.drawCollisionBox();
    }

    setHitBox(left, top, right, bottom) {
        this.hitBox.offsetleft = left;
        this.hitBox.offsettop = top;
        this.hitBox.offsetright = right;
        this.hitBox.offsetbottom = bottom;
    }

    isCollidingWith(otherObject) {
        return this.x < otherObject.x + otherObject.width - otherObject.hitBox.offsetright &&
            this.x + this.width - this.hitBox.offsetright > otherObject.x &&
            this.y < otherObject.y + otherObject.height - otherObject.hitBox.offsetbottom &&
            this.y + this.height - this.hitBox.offsetbottom > otherObject.y + otherObject.hitBox.offsettop;
    }

    drawCollisionBox() {
        this.gameObject.ctx.fillStyle = 'black';
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