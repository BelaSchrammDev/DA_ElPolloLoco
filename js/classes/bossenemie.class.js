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

    startAI() {
        this.addInterval('ai', () => { this.aiBehavior.handleInteractions(); });
    }

    stopAI() {
        this.removeInterval('ai');
    }

    setAI(aiID) {
        this.aiBehavior = this.aiBehaviorList[aiID];
        this.aiBehavior.entering();
        console.log('set ai', aiID);
    }

    startMoving() {
        this.addInterval('move', () => {
            this.x += this.walkSpeed;
            if (this.x < -this.imageObj.width) {
                this.remove = true;
            }
            if (this.isOnGround() && this.walkSpeed != 0) this.addGroundParticles(3, 15);
            if (this.isCollidingWith(this.gameObject.player)) this.gameObject.player.setPlayerDamage(this.playerDamage);
        });
    }

    stopMoving() {
        this.removeInterval('move');
    }

    addDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.setAI('dead');
        } else {
            this.setAI('hurt');
        }
    }
}

class BossAI {
    constructor(boss) {
        this.boss = boss;
    }
    entering() { }
    handleInteractions() { }
    ifPlayerLeft() {
        return this.boss.gameObject.player.x < this.boss.x;
    }
    ifOutOfCanvasRight() {
        return this.boss.getX(this.boss.x) + this.boss.hitBox.offsetright > this.boss.gameObject.canvas.width;
    }
    ifOutOfLevelRight() {
        return this.boss.x > this.boss.gameObject.levelWidth;
    }
    ifAtLevelEndRight() {
        return this.boss.x + this.boss.hitBox.offsetright > this.boss.gameObject.levelWidth;
    }
}

class BossAI_Wait extends BossAI {
    entering() {
        this.boss.walkSpeed = 0;
        this.boss.stopAnimation();
    }
    handleInteractions() {
        if (this.boss.getX(this.boss.x) < this.boss.gameObject.canvas.width - 20) {
            this.boss.gameObject.uiItems.push(new BossHealth());
            this.boss.gameObject.sound.startGameMusic('boss');
            this.boss.setAI('walk_left');
        }
    }
}

class BossAI_Hurt extends BossAI {
    entering() {
        this.boss.walkSpeed = 0;
        this.boss.setNewAnimation('boss_hurt', 300);
    }
    handleInteractions() {
        if (this.boss.animIdle) {
            if (this.health <= 0) this.boss.setAI('dead');
            else this.boss.setAI('walk_right');
        }
    }
}

class BossAI_Dead extends BossAI {
    entering() {
        this.boss.setNewAnimation('boss_dead', 300, true);
        this.boss.stopMoving();
    }
    handleInteractions() {
        if (this.boss.animIdle) {
            this.boss.gameObject.setGameState('win');
        }
    }
}

class BossAI_Walk_Left extends BossAI {
    entering() {
        this.boss.setNewAnimation('boss_walk', 200);
        this.boss.startAnimation();
        this.boss.walkSpeed = -0.1;
        this.boss.flipdrawing = false;
    }
    handleInteractions() {
        let player = this.boss.gameObject.player;
        if (player.x + player.hitBox.offsetright > this.boss.x + this.boss.hitBox.offsetleft - 200) {
            this.boss.setAI('attack');
        }
        else if (this.boss.walkSpeed > -0.5) this.boss.walkSpeed -= 0.05;
    }
}

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
    ifWalkEnd() {
        return this.boss.x > this.walkEnd;
    }
}

class BossAI_Attack extends BossAI {
    entering() {
        this.boss.setNewAnimation('boss_walk', 200);
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

