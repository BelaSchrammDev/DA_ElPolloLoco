class Player extends AnimationObject {
    lastMovementTime = 0;
    constructor(x, y) {
        super();
        this.setKoords(x, y);
        this.setDimensions(150, 300);
    }

    start() {
        this.startAnimation('pepe_idle', 200);
        this.setLastMovementTime();
        this.startKeyTracking();
    }

    startKeyTracking() {
        this.addInterval('keytracking', () => {
            if (game.movement.Right) this.moveRight();
            else if (game.movement.Left) this.moveLeft();
            else if (game.movement.Jump) this.Jump();
            else if (this.lastMovementTime + 2000 < Date.now()) {
                this.startAnimation('pepe_longidle', 200);
            }
            else {
                this.startAnimation('pepe_idle', 200);
            }
        });
    }


    Jump() {
        this.startAnimation('pepe_jump', 200);
        this.setLastMovementTime();
    }


    moveLeft() {
        this.x -= 5;
        if (this.x < 0) this.x = 0;
        if (this.getX() < 0) this.gameObject.moveCamera(-5);
        this.flipdrawing = true;
        this.startAnimation('pepe_walk', 100);
        this.setLastMovementTime();
    }


    moveRight() {
        this.x += 5;
        if (this.x > this.gameObject.levelWidth - this.width) this.x = this.gameObject.levelWidth - this.width;
        if (this.getX() > this.gameObject.canvas.width / 2) this.gameObject.moveCamera(5);
        this.flipdrawing = false;
        this.startAnimation('pepe_walk', 100);
        this.setLastMovementTime();
    }


    setLastMovementTime() {
        this.lastMovementTime = Date.now();
    }
}
