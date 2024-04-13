/**
 * Represents a game state.
 * @class
 */
class GameState {
    /**
     * Creates a new instance of the GameState class.
     * @constructor
     * @param {GameObject} gameObject - The game object associated with the state.
     * @param {number} stateID - The ID of the state.
     */
    constructor(gameObject, stateID) {
        this.gameObject = gameObject;
        this.stateID = stateID;
    }
}

/**
 * Represents the menu state of the game.
 * @class
 * @extends GameState
 */
class GameStateMenu extends GameState {
    constructor(gameObject) {
        super(gameObject, 'menu_desktop');
    }

    /**
     * Method called when entering the game state.
     */
    entering() {
        this.gameObject.resetLevel(720);
        this.gameObject.backgrounds.push(new BackgroundImageObject('./img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png'));
        this.gameObject.sound.startGameMusic('normal');
        this.gameObject.startRendering();
        showElements(['menubar']);
    }

    /**
     * Handles the interaction with the game state.
     * @param {object} interactionObject - The interaction object.
     */
    handleInteraction(interactionObject) {
        if (interactionObject.Enter) {
            this.gameObject.setGameState('level_1');
        }
    }
}


/**
 * Represents the level 1 game state.
 * @extends GameState
 */
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
        this.gameObject.sound.startGameMusic('normal');
    }


    /**
     * Fills the level with game objects, enemies, player, UI elements, and collectables.
     */
    fillLevel() {
        this.gameObject.resetLevel(3400);
        this.gameObject.setBackgroundImage('./img_pollo_locco/img/5_background/layers/air.png');
        addBackGrounds(this.gameObject);
        addClouds(this.gameObject);
        addEnemies(this.gameObject, enemies_level_1);
        addPlayer(this.gameObject);
        addBoss(this.gameObject);
        addUIElements(this.gameObject);
        addCollectables(this.gameObject);
    }

    handleInteraction(interactionObject) {
        if (interactionObject.checkMainMenu()) {
            this.gameObject.setGameState('menu_desktop');
        }
        if (interactionObject.checkKeyPause()) {
            if (this.gameObject.gamePaused) {
                this.gameObject.restart();
            } else {
                this.gameObject.pause();
            }
        }
    }
}


/**
 * Represents the game state when the game is over.
 * @extends GameState
 */
class GameStateGameOver extends GameState {
    constructor(gameObject) {
        super(gameObject, '');
    }

    entering() {
        let gameoverImageIndex = Math.floor(Math.random() * 4);
        this.gameObject.uiItems.push(new CenterPopImage(GAMEOVER_IMAGES[gameoverImageIndex]));
        this.gameObject.sound.startGameMusic('fail');
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
            this.gameObject.setGameState('level_1');
        }
        if (interactionObject.MainMenu) {
            this.gameObject.setGameState('menu_desktop');
        }
    }
}


/**
 * Represents the game state when the player wins the game.
 * @extends GameState
 */
class GameStateWin extends GameState {
    constructor(gameObject) {
        super(gameObject, '');
    }

    entering() {
        this.gameObject.sound.startGameMusic('win2');
        this.gameObject.addXCenteredText('You win !!!', 250, 150, COLOR_GREEN);
        this.gameObject.player.stop();
        this.gameObject.boss.stop();
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
            this.gameObject.setGameState('level_1');
        }
        if (interactionObject.MainMenu) {
            this.gameObject.setGameState('menu_desktop');
        }
    }
}


