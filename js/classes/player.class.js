/**
 * Represents a player in the game.
 * @extends AnimatedObject
 */
class Player extends AnimatedObject {
    lastMovementTime = 0;
    lastBottleTrow = 0;
    trowBottleInterval = 800;
    invulnerable = 0;
    enemyDeadByJump = 0;
    scoreByJump = 0;
    jumping = false;

    health = 100;

    constructor(x, y) {
        super();
        this.setKoords(x, y);
        this.setHitBox(40, 120, 112.5, 285);
        this.setPositionOverGround(0);
        this.offsetSpriteGroundFromTop = 285;
        this.fallingAnimationID = 'pepe_falling';
        this.landingAnimationID = 'pepe_landing';
    }

    /**
     * Starts the player.
     */
    start() {
        if (this.health <= 0) return;
        super.start();
        this.setNewAnimation('pepe_idle', 200);
        this.setLastMovementTime();
        this.startKeyTracking();
    }

    /**
     * Pauses the player.
     * Overrides the base class's pause method and removes the 'keytracking' interval.
     */
    pause() {
        super.pause();
        this.removeInterval('keytracking');
    }

    /**
     * Restarts the player.
     * Overrides the base class's restart method and starts the key tracking interval.
     */
    restart() {
        if (this.health <= 0) return;
        super.restart();
        this.startKeyTracking();
    }

    /**
     * Starts key tracking for the player.
     */
    startKeyTracking() {
        this.addInterval('keytracking', () => {
            let moveSpeed = this.isOnGround() ? 5 : 2.5;
            if (!this.gameObject.gameOver && this.health <= 0) this.startDying();
            else if (this.gameObject.interaction.checkTrow()) this.trowBottle();
            else if (this.isOnGround() && this.jumping) this.Landing();
            else if (this.invulnerable > 30) this.startHurtAnimation();
            else if (this.gameObject.interaction.Jump && this.isOnGround()) this.Jump();
            else if (this.gameObject.interaction.Right) this.moveRight(moveSpeed);
            else if (this.gameObject.interaction.Left) this.moveLeft(moveSpeed);
            else if (this.isIdleState()) this.setIdleAnimation();
            if (this.invulnerable > 0) this.invulnerable--;
            if (this.isOnGround()) this.checkScoreByJump();
            else this.checkEnemyCollision();
            this.checkCollecting();
        });
    }

    /**
     * Throws a bottle.
     * Sets the last movement time and adds a new FlyBottle object to the game.
     * @returns {void}
     */
    trowBottle() {
        this.setLastMovementTime();
        if (new Date().getTime() - this.lastBottleTrow > this.trowBottleInterval && this.gameObject.bottles > 0) {
            this.gameObject.bottles--;
            this.lastBottleTrow = new Date().getTime();
            this.gameObject.flybottles.push(new FlyBottle(this));
        }
    }


    /**
     * Checks if the player is in the idle state.
     * @returns {boolean} Returns true if the player is in the idle state, false otherwise.
     */
    isIdleState() {
        return !this.jumping && (this.animIdle || this.currentAnimationID === 'pepe_walk');
    }


    /**
     * Checks if the player is colliding with any collectables and collects them if so.
     */
    checkCollecting() {
        this.gameObject.collectables.forEach((collectable) => {
            if (collectable.isCollidingWith(this)) {
                collectable.collect();
            }
        });
    }


    /**
     * Checks for collision between the player and enemies, and performs actions accordingly.
     * If the player is falling and collides with an enemy, the enemy is killed and the player's score is increased.
     */
    checkEnemyCollision() {
        this.gameObject.enemies.forEach((enemy) => {
            if (!enemy.dead && this.isCollidingWith(enemy) && this.fallingSpeed > 0) {
                enemy.enemyDead();
                this.enemyDeadByJump++;
                this.scoreByJump += enemy.playerScore;
            }
        });
    }


    /**
     * Checks the score earned by jumping on enemies and updates the game state accordingly.
     * If the player has killed enemies by jumping, the score is updated and flying text is displayed.
     */
    checkScoreByJump() {
        if (this.enemyDeadByJump > 0) {
            this.gameObject.uiItems.push(new FlyingScoreText('+' + this.scoreByJump, this.getX(this.x) + this.imageObj.width / 2, this.y + this.hitBox.offsettop, COLOR_GREEN));
            let enemyByJumping = this.enemyDeadByJump;
            if (enemyByJumping > 1) {
                setTimeout(() => {
                    this.gameObject.uiItems.push(new FlyingScoreText('*' + enemyByJumping, this.getX(this.x) + this.imageObj.width / 2, this.y + this.hitBox.offsettop, COLOR_RED));
                }, 100);
            }
            this.gameObject.score += this.enemyDeadByJump * this.scoreByJump;
            this.enemyDeadByJump = 0;
            this.scoreByJump = 0;
        }
    }


    /**
     * Starts the dying animation for the player.
     * The player falls to the ground and the game state is set to 'game_over'.
     */
    startDying() {
        this.setNewAnimation('pepe_dead', 200, true);
        this.removeInterval('keytracking');
        this.removeInterval('falling');
        this.fallingSpeed = -14;
        this.addGroundParticles(50, 200);
        this.addInterval('dying', () => {
            this.fallingSpeed += this.gravity;
            this.offsetFromGround -= this.fallingSpeed;
            this.y = this.gameObject.groundLevel - this.offsetSpriteGroundFromTop - this.offsetFromGround;
            if (this.y > this.gameObject.canvas.height) {
                this.gameObject.setGameState('game_over');
                this.stop();
            }
        });
    }


    /**
     * Starts the hurt animation for the player.
     */
    startHurtAnimation() {
        this.setNewAnimation('pepe_hurt', 200, true);
        this.setLastMovementTime();
    }


    /**
     * Sets the damage to the player.
     * @param {number} damage - The amount of damage to be applied to the player.
     */
    setPlayerDamage(damage) {
        if (this.invulnerable == 0) {
            this.invulnerable = 60;
            this.health -= damage;
            this.gameObject.sound.stopSound('pepe_snore');
            this.gameObject.sound.playSound('pepe_hurt');
        }
    }


    /**
     * Sets the idle animation for the player.
     * If the player has been idle for more than 5 seconds, it sets the 'pepe_longidle' animation and plays the 'pepe_snore' sound.
     * Otherwise, it sets the 'pepe_idle' animation.
     */
    setIdleAnimation() {
        if (this.lastMovementTime + 5000 < Date.now()) {
            if (this.currentAnimationID != 'pepe_longidle') this.setNewAnimation('pepe_longidle', 200);
            this.gameObject.sound.playSound('pepe_snore');
        }
        else this.setNewAnimation('pepe_idle', 200);
    }


    /**
     * Makes the player character jump.
     * Sets the falling speed and the jumping animation.
     */
    Jump() {
        this.gameObject.sound.stopSound('pepe_snore');
        this.gameObject.sound.playSound('pepe_jump');
        this.fallingSpeed = -13;
        this.setNewAnimation('pepe_jump', 40, true);
        this.addGroundParticles(15, 20);
        this.setLastMovementTime();
        this.jumping = true;
    }


    /**
     * Handles the landing logic for the player.
     * Stops the jumping animation, plays a landing sound, and adds ground particles.
     */
    Landing() {
        this.jumping = false;
        this.gameObject.sound.playSound('pepe_landing');
        this.addGroundParticles(40, 35);
    }


    /**
     * Moves the player to the left by the specified move speed.
     * If the player reaches the left edge of the screen, the camera is moved to the left.
     * @param {number} moveSpeed - The speed at which the player moves.
     */
    moveLeft(moveSpeed) {
        this.x -= moveSpeed;
        if (this.x < 0) this.x = 0;
        if (this.getX(this.x) < 0) this.gameObject.moveCamera(-moveSpeed);
        this.setWalkAnimation(true);
    }


    /**
     * Moves the player to the right by the specified move speed.
     * If the player reaches the right edge of the screen, the camera is moved to the right.
     * @param {number} moveSpeed - The speed at which the player moves to the right.
     */
    moveRight(moveSpeed) {
        this.x += moveSpeed;
        if (this.x > this.gameObject.levelWidth - this.imageObj.width) this.x = this.gameObject.levelWidth - this.imageObj.width;
        if (this.getX(this.x) > this.gameObject.canvas.width / 2) this.gameObject.moveCamera(moveSpeed);
        this.setWalkAnimation(false);
    }


    /**
     * Sets the walk animation for the player.
     * 
     * @param {boolean} leftDirection - Indicates whether the player is moving left.
     * @returns {void}
     */
    setWalkAnimation(leftDirection) {
        this.flipdrawing = leftDirection;
        this.setLastMovementTime();
        if (this.isOnGround()) {
            this.playWalkSound();
            this.setNewAnimation('pepe_walk', 80);
            this.addGroundParticles(5, 10);
        }
    }


    /**
     * Plays the walk sound for the player.
     * Stops the 'pepe_snore' sound and plays the 'pepe_walk' sound.
     */
    playWalkSound() {
        this.gameObject.sound.stopSound('pepe_snore');
        this.gameObject.sound.playSound('pepe_walk');
    }


    /**
     * Sets the last movement time to the current timestamp.
     */
    setLastMovementTime() {
        this.lastMovementTime = Date.now();
    }
}
