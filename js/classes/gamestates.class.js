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
        // this.gameObject.uiItems.push(new Text('Press Enter to Start', 100, 30));
        this.gameObject.startRendering();
        showElements(['menubar']);
    }

    handleInteraction(interactionObject) {
        if (interactionObject.Enter) {
            this.gameObject.setGameState('level_1');
        }
    }
}

class GameStateLevel1 extends GameState {

    constructor(gameObject) {
        super(gameObject, "level_1");
    }


    entering() {
        let showbar = ifMobile() ? 'movebar' : 'helpbar';
        this.fillLevel();
        showElements([showbar]);
        this.gameObject.startRendering();
        this.gameObject.startAssets();
        this.gameObject.startGameMusic('normal');
    }


    fillLevel() {
        this.gameObject.resetLevel(3400);
        this.gameObject.setBackgroundImage('./img_pollo_locco/img/5_background/layers/air.png');
        addBackGrounds(this.gameObject);
        addClouds(this.gameObject);
        // addEnemies(this.gameObject, enemies_level_1);
        addPlayer(this.gameObject);
        addBoss(this.gameObject);
        addUIElements(this.gameObject);
        // addCollectables(this.gameObject);
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
        this.gameObject.startGameMusic('fail');
        if (ifMobile()) showElements(['gameoverbar']);
        else {
            this.gameObject.addXCenteredText('Press ESC to MainMenu', 420);
            this.gameObject.addXCenteredText('Press Enter to Restart', 460);
            showElements([]);
        }
        this.gameObject.gameOver = true;
    }

    handleInteraction(interactionObject) {
        if (interactionObject.Enter) {
            this.gameObject.stopAssets();
            this.gameObject.stopRendering();
            this.gameObject.setGameState('level_1');
        }
        if (interactionObject.MainMenu) {
            this.gameObject.stopAssets();
            this.gameObject.stopRendering();
            this.gameObject.setGameState('menu_desktop');
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

