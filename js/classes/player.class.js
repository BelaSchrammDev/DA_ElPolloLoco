class Player extends AnimatedObject {
    lastMovementTime = 0;
    invulnerable = 0;
    enemyDeadByJump = 0;
    scoreByJump = 0;
    jumping = false;

    health = 100;
    soundWalk = new Audio('./audio/walking.wav');
    soundJump = new Audio('./audio/jumping.wav');

    constructor(x, y) {
        super();
        this.setKoords(x, y);
        this.setHitBox(40, 120, 40, 15);
        this.setPositionOverGround(0);
        this.offsetGroundFromTopOfSprite = 285;
        this.fallingAnimationID = 'pepe_falling';
        this.landingAnimationID = 'pepe_landing';
    }

    start() {
        super.start();
        this.setNewAnimation('pepe_idle', 200);
        this.setLastMovementTime();
        this.startKeyTracking();
    }

    pause() {
        super.pause();
        this.removeInterval('keytracking');
    }

    restart() {
        super.restart();
        this.startKeyTracking();
    }

    startKeyTracking() {
        this.addInterval('keytracking', () => {
            let moveSpeed = this.isOnGround() ? 5 : 2.5;
            if (this.health <= 0) this.startDying();
            else if (this.isOnGround() && this.jumping) this.Landing();
            else if (this.invulnerable > 30) this.startHurtAnimation();
            else if (game.interaction.Jump && this.isOnGround()) this.Jump();
            else if (game.interaction.Right) this.moveRight(moveSpeed);
            else if (game.interaction.Left) this.moveLeft(moveSpeed);
            else if (this.isIdleState()) this.setIdleAnimation();
            if (this.invulnerable > 0) this.invulnerable--;
            if (this.isOnGround()) this.checkScoreByJump();
            else this.checkEnemyCollision();
            this.checkCollecting();
        });
    }


    isIdleState() {
        return !this.jumping && (this.animIdle || this.currentAnimationID === 'pepe_walk');
    }


    checkCollecting() {
        this.gameObject.collectables.forEach((collectable) => {
            if (collectable.isCollidingWith(this)) {
                collectable.collect();
            }
        });
    }

    checkEnemyCollision() {
        this.gameObject.enemies.forEach((enemy) => {
            if (!enemy.dead && this.isCollidingWith(enemy) && this.fallingSpeed > 0) {
                enemy.enemyDead();
                this.enemyDeadByJump++;
                this.scoreByJump += enemy.playerScore;
            }
        });
    }


    checkScoreByJump() {
        if (this.enemyDeadByJump > 0) {
            this.gameObject.uiItems.push(new FlyingText('+' + this.scoreByJump, this.getX(this.x) + this.imageObj.width / 2, this.y + this.hitBox.offsettop, COLOR_GREEN));
            let enemyByJumping = this.enemyDeadByJump;
            if (enemyByJumping > 1) {
                setTimeout(() => {
                    this.gameObject.uiItems.push(new FlyingText('*' + enemyByJumping, this.getX(this.x) + this.imageObj.width / 2, this.y + this.hitBox.offsettop, COLOR_RED));
                }, 100);
            }
            this.gameObject.score += this.enemyDeadByJump * this.scoreByJump;
            this.enemyDeadByJump = 0;
            this.scoreByJump = 0;
        }
    }

    startDying() {
        this.setNewAnimation('pepe_dead', 200, true);
        this.removeInterval('keytracking');
        this.removeInterval('falling');
        this.fallingSpeed = -14;
        this.addGroundParticles(50, 200);
        this.addInterval('dying', () => {
            if (this.y > this.gameObject.canvas.height) return;
            this.fallingSpeed += this.gravity;
            this.offsetFromGround -= this.fallingSpeed;
            this.y = this.gameObject.groundLevel - this.offsetGroundFromTopOfSprite - this.offsetFromGround;
            if (this.y > this.gameObject.canvas.height) this.gameObject.gameOver();
        });
    }

    startHurtAnimation() {
        this.setNewAnimation('pepe_hurt', 200, true);
        this.setLastMovementTime();
    }


    setPlayerDamage(damage) {
        if (this.invulnerable == 0) {
            this.invulnerable = 60;
            this.health -= damage;
        }
    }


    setIdleAnimation() {
        if (this.lastMovementTime + 5000 < Date.now()) this.setNewAnimation('pepe_longidle', 200);
        else this.setNewAnimation('pepe_idle', 200);
    }


    Jump() {
        this.soundJump.play();
        // this.soundJump.currentTime = 0.5;
        this.soundJump.playbackRate = 1.5;
        this.fallingSpeed = -16;
        this.setNewAnimation('pepe_jump', 50, true);
        this.addGroundParticles(15, 20);
        this.setLastMovementTime();
        this.jumping = true;
    }


    Landing() {
        this.jumping = false;
        this.addGroundParticles(40, 35);
    }


    moveLeft(moveSpeed) {
        this.x -= moveSpeed;
        if (this.x < 0) this.x = 0;
        if (this.getX(this.x) < 0) this.gameObject.moveCamera(-moveSpeed);
        this.setWalkAnimation(true);
    }


    moveRight(moveSpeed) {
        this.x += moveSpeed;
        if (this.x > this.gameObject.levelWidth - this.imageObj.width) this.x = this.gameObject.levelWidth - this.imageObj.width;
        if (this.getX(this.x) > this.gameObject.canvas.width / 2) this.gameObject.moveCamera(moveSpeed);
        this.setWalkAnimation(false);
    }


    setWalkAnimation(leftDirection) {
        this.flipdrawing = leftDirection;
        this.setLastMovementTime();
        if (this.isOnGround()) {
            this.soundWalk.playbackRate = 0.5 + Math.random();
            this.soundWalk.play();
            this.setNewAnimation('pepe_walk', 80);
            this.addGroundParticles(5, 10);
        }
    }


    setLastMovementTime() {
        this.lastMovementTime = Date.now();
    }
}
