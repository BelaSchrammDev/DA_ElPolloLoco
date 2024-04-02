class Player extends CollidingObject {
    lastMovementTime = 0;
    invulnerable = 0;

    health = 100;

    constructor(x, y) {
        super();
        this.setKoords(x, y);
        this.setDimensions(150, 300);
        this.setHitBox(40, 120, 40, 15);
        this.offsetFromGround = 200;
        this.offsetGroundFromTopOfSprite = 285;
        this.fallingAnimationID = 'pepe_falling';
        this.landingAnimationID = 'pepe_landing';
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
            if (this.invulnerable > 30) {
                this.startAnimation('pepe_hurt', 200, true);
                this.setLastMovementTime();
            }
            else if (game.movement.Jump && this.isOnGround()) this.Jump();
            else if (game.movement.Right) this.moveRight(moveSpeed);
            else if (game.movement.Left) this.moveLeft(moveSpeed);
            else if (this.animIdle || this.currentAnimationID === 'pepe_walk') {
                if (this.lastMovementTime + 5000 < Date.now()) {
                    this.startAnimation('pepe_longidle', 200);
                } else {
                    this.startAnimation('pepe_idle', 200);
                }
            }
            this.checkEnemyCollision();
        });
    }

    checkEnemyCollision() {
        if (this.invulnerable > 0) this.invulnerable--;
        this.gameObject.enemies.forEach((enemy) => {
            if (!enemy.dead && this.isCollidingWith(enemy)) {
                if (!this.isOnGround() && this.fallingSpeed > 0) {
                    enemy.enemyDead();
                }
                else {
                    // if (this.invulnerable == 0) {
                    //     this.invulnerable = 60;
                    //     this.health -= enemy.playerDamage;
                    // }
                }
            }
        });
    }


    setPlayerDamage(damage) {
        if (this.invulnerable == 0) {
            this.invulnerable = 60;
            this.health -= damage;
        }
    }


    Jump() {
        this.fallingSpeed = -16;
        this.startAnimation('pepe_jump', 50, true);
        this.setLastMovementTime();
    }


    moveLeft(moveSpeed) {
        this.x -= moveSpeed;
        if (this.x < 0) this.x = 0;
        if (this.getX(this.x) < 0) this.gameObject.moveCamera(-moveSpeed);
        this.setWalkAnimation(true);
    }


    moveRight(moveSpeed) {
        this.x += moveSpeed;
        if (this.x > this.gameObject.levelWidth - this.width) this.x = this.gameObject.levelWidth - this.width;
        if (this.getX(this.x) > this.gameObject.canvas.width / 2) this.gameObject.moveCamera(moveSpeed);
        this.setWalkAnimation(false);
    }


    setWalkAnimation(leftDirection) {
        this.flipdrawing = leftDirection;
        this.setLastMovementTime();
        if (this.isOnGround()) {
            this.startAnimation('pepe_walk', 80);
            this.addGroundParticles(5, 10);
        }
    }


    setLastMovementTime() {
        this.lastMovementTime = Date.now();
    }
}
