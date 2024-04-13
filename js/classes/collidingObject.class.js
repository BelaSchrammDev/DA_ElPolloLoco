/**
 * Represents a colliding object that extends the DrawableObject class.
 * @extends DrawableObject
 * @class
 * @classdesc Represents a colliding object that extends the DrawableObject class.
 */
class CollidingObject extends DrawableObject {

    hitBox = {
        offsetleft: 0,
        offsettop: 0,
        offsetright: 0,
        offsetbottom: 0
    };


    /**
     * Sets the hit box offsets for the colliding object.
     * @param {number} left - The left offset of the hit box.
     * @param {number} top - The top offset of the hit box.
     * @param {number} right - The right offset of the hit box from left of the sprite.
     * @param {number} bottom - The bottom offset of the hit box from the top of the sprite.
     */
    setHitBox(left, top, right, bottom) {
        this.hitBox.offsetleft = left;
        this.hitBox.offsettop = top;
        this.hitBox.offsetright = right;
        this.hitBox.offsetbottom = bottom;
    }


    /**
     * Returns the absolute coordinates of the hit box.
     * @returns {Object} - The absolute coordinates of the hit box.
     */
    getHitboxAbsolut() {
        return {
            left: this.x + this.hitBox.offsetleft,
            top: this.y + this.hitBox.offsettop,
            right: this.x + this.hitBox.offsetright,
            bottom: this.y + this.hitBox.offsetbottom,
        };
    }


    /**
     * Checks if the colliding object is colliding with another object.
     * @param {CollidingObject} otherObject - The other object to check collision with.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isCollidingWith(otherObject) {
        let thisBox = this.getHitboxAbsolut();
        let otherBox = otherObject.getHitboxAbsolut();
        return thisBox.right > otherBox.left &&
            thisBox.left < otherBox.right &&
            thisBox.bottom > otherBox.top &&
            thisBox.top < otherBox.bottom;
    }


    /**
     * Draws the sprite box of the colliding object.
     */
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


    /**
     * Draws the collision box of the colliding object.
     */
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


    /**
     * Draws the ground line of the colliding object.
     */
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


    /**
     * Draws the colliding object.
     * First calls the draw method of the parent class, then draws the ground line, collision box and sprite box if debug mode is enabled.
     */
    draw() {
        super.draw();
        if (this.gameObject.debugMode) {
            this.drawGroundLine();
            this.drawCollisionBox();
            this.drawSpriteBox();
        }
    }
}