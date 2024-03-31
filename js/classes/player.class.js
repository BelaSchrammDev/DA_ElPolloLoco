class Player extends MovingObject {
    lastMovementTime = 0;
    fallingState = 'grounded';

    constructor(x, y) {
        super();
        this.setKoords(x, y);
        this.setDimensions(150, 300);
        this.offsetFromGround = 200;
        this.offsetGroundFromTopOfSprite = 285;
        this.fallingAnimID = 'pepe_falling';
        this.landingAnimID = 'pepe_landing';
    }

    start() {
        super.start();
        this.startAnimation('pepe_idle', 200);
        this.setLastMovementTime();
        this.startKeyTracking();
    }

    startKeyTracking() {
        this.addInterval('keytracking', () => {
            let moveSpeed = this.isOnGround() ? 5 : 2.5;
            if (game.movement.Jump && this.isOnGround()) this.Jump();
            else if (game.movement.Right) this.moveRight(moveSpeed);
            else if (game.movement.Left) this.moveLeft(moveSpeed);
            else if (!this.isOnGround()) return;
            else if (this.animIdle || this.currentAnimID === 'pepe_walk') {
                if (this.lastMovementTime + 2000 < Date.now()) {
                    this.startAnimation('pepe_longidle', 200);
                } else {
                    this.startAnimation('pepe_idle', 200);
                }
            }
        });
    }


    Jump() {
        this.fallingSpeed = -16;
        this.startAnimation('pepe_jump', 50, true);
        this.setLastMovementTime();
    }


    moveLeft(moveSpeed) {
        this.x -= moveSpeed;
        if (this.x < 0) this.x = 0;
        if (this.getX() < 0) this.gameObject.moveCamera(-moveSpeed);
        this.setWalkAnimation(true);
    }


    moveRight(moveSpeed) {
        this.x += moveSpeed;
        if (this.x > this.gameObject.levelWidth - this.width) this.x = this.gameObject.levelWidth - this.width;
        if (this.getX() > this.gameObject.canvas.width / 2) this.gameObject.moveCamera(moveSpeed);
        this.setWalkAnimation(false);
    }


    setWalkAnimation(leftDirection) {
        this.flipdrawing = leftDirection;
        this.setLastMovementTime();
        if (this.isOnGround()) {
            this.startAnimation('pepe_walk', 80);
            this.addGroundParticles(5);
        }
    }


    setLastMovementTime() {
        this.lastMovementTime = Date.now();
    }
}
