class GameState {
    constructor(gameObject, stateID) {
        this.gameObject = gameObject;
        this.stateID = stateID;
    }
}

class GameStateMenuDesktop extends GameState {
    constructor(gameObject) {
        super(gameObject, 'menu_desktop');
    }

    entering() {
        this.gameObject.resetLevel(720);
        this.gameObject.backgrounds.push(new BackgroundImageObject('./img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png'));
        this.gameObject.uiItems.push(new Text('Press Enter to Start', 100, 30));
        this.gameObject.startRendering();
        showButtons(['btnStartgame']);
    }

    handleInteraction(interactionObject) {
        if (interactionObject.Enter) {
            this.gameObject.setGameState('level_1');
        }
    }
}

class GameStateLevel1 extends GameState {

    buttonShow = ['btnLeft', 'btnRight', 'btnJump', 'btnPause', 'btnTrow'];

    constructor(gameObject) {
        super(gameObject, "level_1");
    }


    entering() {
        this.fillLevel();
        showButtons(this.buttonShow);
        this.gameObject.startRendering();
        this.gameObject.startAssets();
        this.gameObject.startGameMusic('normal');
    }


    fillLevel() {
        this.gameObject.resetLevel(3400);
        addBackGrounds(this.gameObject);
        addClouds(this.gameObject);
        addEnemies(this.gameObject, enemies_level_1);
        addPlayer(this.gameObject);
        addUIElements(this.gameObject);
        addCollectables(this.gameObject);
    }

    handleInteraction(interactionObject) {
        if (interactionObject.checkKeyPause()) {
            if (this.gameObject.gamePaused) {
                this.gameObject.restart();
            } else {
                this.gameObject.pause();
            }
        }
    }
}

class GameStateGameOverDesktop extends GameState {
    constructor(gameObject) {
        super(gameObject, '');
    }

    entering() {
        let gameoverImageIndex = Math.floor(Math.random() * 4);
        this.gameObject.uiItems.push(new CenterPopImage(GAMEOVER_IMAGES[gameoverImageIndex]));
        this.gameObject.restartsMessage();
        this.gameObject.startGameMusic('fail');
        showButtons(['btnRestart']);
        this.gameObject.gameOver = true;
    }

    handleInteraction(interactionObject) {
        if (interactionObject.Enter) {
            this.gameObject.stopAssets();
            this.gameObject.stopRendering();
            this.gameObject.setGameState('level_1');
        }
    }
}

class GameState_ extends GameState {
    constructor(gameObject) {
        super(gameObject, '');
    }

    entering() {

    }

    handleInteraction(interactionObject) {
    }
}

