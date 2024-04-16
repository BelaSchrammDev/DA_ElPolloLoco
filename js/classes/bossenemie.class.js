/**
 * Represents a boss chicken enemy.
 * @extends AnimatedObject
 */
class BossChicken extends AnimatedObject {
    offsetFromGround = 200;
    offsetSpriteGroundFromTop = 330;
    walkSpeed = 0;
    playerDamage = 40;
    health = 100;
    dead = false;

    aiBehavior = null;
    aiBehaviorList = {
        'wait': new BossAI_Wait(this),
        'walk_left': new BossAI_Walk_Left(this),
        'walk_right': new BossAI_Walk_Right(this),
        'attack': new BossAI_Attack(this),
        'hurt': new BossAI_Hurt(this),
        'dead': new BossAI_Dead(this),
    };

    constructor() {
        super();
        this.setKoords(3000, 100);
        this.setHitBox(30, 70, 300, 350);
        this.setNewAnimation('boss_walk', 200);
        this.setAI('wait');
    }

    start() {
        super.start();
        this.startMoving();
        this.startAI();
    }

    pause() {
        super.pause();
        this.stopMoving();
        this.stopAI();
    }

    restart() {
        super.restart();
        this.startMoving();
        this.startAI();
    }

    /**
     * Starts the AI behavior for the boss enemy.
     */
    startAI() {
        this.addInterval('ai', () => { this.aiBehavior.handleInteractions(); });
    }

    /**
     * Stops the AI behavior of the boss enemy.
     */
    stopAI() {
        this.removeInterval('ai');
    }


    /**
     * Sets the AI behavior for the boss enemy.
     * @param {number} aiID - The ID of the AI behavior to set.
     */
    setAI(aiID) {
        this.aiBehavior = this.aiBehaviorList[aiID];
        this.aiBehavior.entering();
    }


    /**
     * Starts the movement of the boss enemy.
     * The boss enemy moves horizontally with a specified walk speed.
     * If the boss enemy is on the ground and the walk speed is not zero, ground particles are added.
     * If the boss enemy collides with the player, the player's damage is set to the specified player damage value.
     */
    startMoving() {
        this.addInterval('move', () => {
            this.x += this.walkSpeed;
            if (this.isOnGround() && this.walkSpeed != 0) {
                this.addGroundParticles(3, 15);
                if (!this.gameObject.gameOver) this.gameObject.sound.playSound('boss_walk');
            }
            if (this.isCollidingWith(this.gameObject.player)) this.gameObject.player.setPlayerDamage(this.playerDamage);
        });
    }


    /**
     * Stops the movement of the boss enemy.
     */
    stopMoving() {
        this.removeInterval('move');
    }


    /**
     * Reduces the health of the boss enemy by the specified amount of damage.
     * If the health reaches 0 or below, the AI state is set to 'dead', otherwise it is set to 'hurt'.
     * @param {number} damage - The amount of damage to be inflicted on the boss enemy.
     */
    addDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) this.setAI('dead');
        else this.setAI('hurt');
    }
}


/**
 * Represents the AI behavior for a boss enemy.
 */
class BossAI {
    /**
     * Creates a new instance of the BossAI class.
     * @param {Boss} boss - The boss enemy object.
     */
    constructor(boss) {
        this.boss = boss;
    }

    /**
     * Handles the entering behavior of the boss.
     */
    entering() { }

    /**
     * Handles the interactions of the boss with other game objects.
     */
    handleInteractions() { }

    /**
     * Checks if the player has moved to the left of the boss.
     * @returns {boolean} - True if the player is to the left of the boss, false otherwise.
     */
    ifPlayerLeft() {
        return this.boss.gameObject.player.x < this.boss.x;
    }

    /**
     * Checks if the boss is out of the canvas on the right side.
     * @returns {boolean} - True if the boss is out of the canvas on the right side, false otherwise.
     */
    ifOutOfCanvasRight() {
        return this.boss.getCanvasX(this.boss.x) + this.boss.hitBox.offsetright > this.boss.gameObject.canvas.width;
    }

    /**
     * Checks if the boss is out of the level on the right side.
     * @returns {boolean} - True if the boss is out of the level on the right side, false otherwise.
     */
    ifOutOfLevelRight() {
        return this.boss.x > this.boss.gameObject.levelWidth;
    }

    /**
     * Checks if the boss has reached the end of the level on the right side.
     * @returns {boolean} - True if the boss has reached the end of the level on the right side, false otherwise.
     */
    ifAtLevelEndRight() {
        return this.boss.x + this.boss.hitBox.offsetright > this.boss.gameObject.levelWidth;
    }
}

/**
 * Represents the waiting behavior of a boss enemy.
 * @extends BossAI
 */
class BossAI_Wait extends BossAI {

    entering() {
        this.boss.walkSpeed = 0;
        this.boss.stopAnimation();
    }
    handleInteractions() {
        if (this.boss.getCanvasX(this.boss.x) < this.boss.gameObject.canvas.width - 20) {
            this.boss.gameObject.uiItems.push(new BossHealth());
            this.boss.gameObject.sound.startGameMusic('boss');
            this.boss.setAI('walk_left');
        }
    }
}

/**
 * Represents the AI behavior for a hurt boss enemy.
 * @extends BossAI
 */
class BossAI_Hurt extends BossAI {

    entering() {
        this.boss.walkSpeed = 0;
        this.boss.setNewAnimation('boss_hurt', 300);
        this.boss.gameObject.sound.playSound('boss_hurt');
    }

    handleInteractions() {
        if (this.boss.animIdle) {
            if (this.health <= 0) this.boss.setAI('dead');
            else this.boss.setAI('walk_right');
        }
    }
}

/**
 * Represents the AI behavior for a dead boss enemy.
 * @extends BossAI
 */
class BossAI_Dead extends BossAI {

    entering() {
        this.boss.setNewAnimation('boss_dead', 300, true);
        this.boss.gameObject.sound.stopSound('boss_hurt');
        this.boss.gameObject.sound.playSound('boss_dead');
        this.boss.stopMoving();
    }

    handleInteractions() {
        if (this.boss.animIdle) {
            this.boss.gameObject.setGameState('win');
        }
    }
}

/**
 * Represents the AI behavior for the boss when walking left.
 * @extends BossAI
 */
class BossAI_Walk_Left extends BossAI {

    entering() {
        this.boss.setNewAnimation('boss_walk', 200);
        this.boss.startAnimation();
        this.boss.walkSpeed = -0.1;
        this.boss.flipdrawing = false;
    }

    handleInteractions() {
        if (this.boss.gameObject.gameOver) return;
        let player = this.boss.gameObject.player;
        if (player.x + player.hitBox.offsetright > this.boss.x + this.boss.hitBox.offsetleft - 200) {
            this.boss.setAI('attack');
        } else if (this.boss.walkSpeed > -0.5) {
            this.boss.walkSpeed -= 0.05;
        }
    }
}

/**
 * Represents the AI behavior for the boss enemy when walking to the right.
 * @extends BossAI
 */
class BossAI_Walk_Right extends BossAI {

    entering() {
        this.boss.setNewAnimation('boss_walk', 200);
        this.boss.startAnimation();
        this.boss.walkSpeed = 3;
        this.boss.flipdrawing = true;
        this.walkEnd = this.boss.x + 200;
    }

    handleInteractions() {
        if (this.ifOutOfCanvasRight() || (this.ifWalkEnd() && this.ifPlayerLeft() && this.boss.x > 1000)) {
            this.boss.setAI('walk_left');
        }
    }

    /**
     * Checks if the boss has reached the end of its walk to the right.
     * @returns {boolean} True if the boss has reached the end of its walk, false otherwise.
     */
    ifWalkEnd() {
        return this.boss.x > this.walkEnd;
    }
}

/**
 * Represents the Boss AI for attacking behavior.
 * @extends BossAI
 */
class BossAI_Attack extends BossAI {

    entering() {
        this.boss.setNewAnimation('boss_walk', 200);
        this.boss.gameObject.sound.playSound('boss_attack');
        this.boss.walkSpeed = -6;
        this.attackXEnd = this.boss.gameObject.player.x;
        this.attackAnimation = false;
    }

    handleInteractions() {
        if (!this.attackAnimation && this.boss.x <= this.attackXEnd) {
            this.boss.walkSpeed = 0;
            this.boss.setNewAnimation('boss_attack', 100, true);
            this.attackAnimation = true;
        } else if (this.attackAnimation && this.boss.animIdle) {
            this.boss.setAI('walk_right');
        }
    }
}

