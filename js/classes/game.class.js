/**
 * Represents a game instance.
 * @class
 * @extends Interval
 */
class Game extends Interval {
    canvas;
    ctx;
    bg_ImageObject;
    cameraX = 0;
    groundLevel = 420;
    levelWidth = 0;

    gameStateObject;
    gameStatesObjectsArray = {
        'level_1': new GameStateLevel1(this),
        'menu_desktop': new GameStateMenu(this),
        'game_over': new GameStateGameOver(this),
        'win': new GameStateWin(this),
    };

    gamePaused = false;
    gameOver = false;
    soundMute = false;

    backgrounds = [];
    clouds = [];
    enemies = [];
    boss;
    collectables = [];
    uiItems = [];
    flybottles = [];
    scoreText;

    player;
    score = 0;
    coins = 0;
    maxcoins = 0;
    bottles = 0;
    maxbottles = 0;

    sound = new SoundEngine();
    interaction = new Interaction();

    constructor() {
        super();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Sets the background image of the game.
     * @param {string} imagePath - The path to the image file.
     */
    setBackgroundImage(imagePath) {
        this.bg_ImageObject = new ImageObject(imagePath);
    }


    /**
     * Moves the camera by the specified offset.
     * @param {number} offset - The amount to move the camera by.
     */
    moveCamera(offset) {
        this.cameraX += offset;
        if (this.cameraX < 0) this.cameraX = 0;
        if (this.cameraX > (this.levelWidth - this.canvas.width)) this.cameraX = this.levelWidth - this.canvas.width;
    }


    /**
     * Sets the game to the specified state.
     * Calls the entering method of the game state object.
     * @param {string} state - The state to set the game to.
     */
    setGameState(state) {
        this.gameStateObject = this.gameStatesObjectsArray[state];
        this.gameStateObject.entering();
    }


    /**
     * Resets the level with the specified width.
     * @param {number} width - The width of the level.
     */
    resetLevel(width) {
        this.levelWidth = width;
        this.gameOver = false;
        this.bg_ImageObject = null;
        this.cameraX = 0;
        this.resetAssets();
        this.resetScores();
        this.resetCanvas('rgba(256, 200, 120, 1)');
    }


    /**
     * Resets the canvas by filling it with the specified color.
     * Stops the rendering and clears the canvas.
     * @param {string} color - The color to fill the canvas with.
     */
    resetCanvas(color) {
        this.stopRendering();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Resets the scores of the game.
     */
    resetScores() {
        this.score = 0;
        this.coins = 0;
        this.bottles = 0;
    }


    /**
     * Stops all assets.
     * Resets all assets in the game.
     * Clears the arrays and sets player and boss to null.
     */
    resetAssets() {
        this.stopAssets();
        this.backgrounds = [];
        this.clouds = [];
        this.enemies = [];
        this.collectables = [];
        this.uiItems = [];
        this.flybottles = [];
        this.player = null;
        this.boss = null;
    }


    /**
     * Starts the rendering process by adding intervals for drawing frames and updating interactions.
     */
    startRendering() {
        this.addInterval('render', () => this.drawFrame());
        this.addInterval('update_interaction', () => this.updateInteraction());
    }


    /**
     * Stops the rendering of the game.
     * This method removes the intervals for rendering and updating interactions.
     */
    stopRendering() {
        this.removeInterval('render');
        this.removeInterval('update_interaction');
    }


    /**
     * Starts the assets in the game.
     */
    startAssets() {
        this.clouds.forEach((cloud) => cloud.start());
        this.enemies.forEach((enemy) => enemy.start());
        this.collectables.forEach((collectable) => collectable.start());
        if (this.player) this.player.start();
        if (this.boss) this.boss.start();
    }


    /**
     * Stops all assets in the game.
     */
    stopAssets() {
        this.clouds.forEach((cloud) => cloud.stop());
        this.enemies.forEach((enemy) => enemy.stop());
        this.collectables.forEach((collectable) => collectable.stop());
        if (this.player) this.player.stop();
        if (this.boss) this.boss.stop();
    }


    /**
     * Pauses the game.
     */
    pause() {
        if (this.gamePaused || this.gameOver) return;
        if (this.player) this.player.pause();
        if (this.boss) this.boss.pause();
        this.enemies.forEach((enemy) => enemy.pause());
        this.flybottles.forEach((bottle) => bottle.pause());
        this.pauseText = new Text('PAUSE', 200, 100);
        this.uiItems.push(this.pauseText);
        this.gamePaused = true;
    }


    /**
     * Restarts the game.
     * If the game is not paused or already over, the method does nothing.
     * Restarts the player, boss, flybottles, and enemies.
     * Removes the pause text from the UI items.
     * Sets the gamePaused flag to false.
     */
    restart() {
        if (!this.gamePaused || this.gameOver) return;
        if (this.player) this.player.restart();
        if (this.boss) this.boss.restart();
        this.flybottles.forEach((bottle) => bottle.restart());
        this.enemies.forEach((enemy) => enemy.restart());
        this.uiItems = this.uiItems.filter((item) => item !== this.pauseText);
        this.gamePaused = false;
    }


    /**
     * Adds a centered text element to the game's UI.
     * 
     * @param {string} text - The text to be displayed.
     * @param {number} x - The x-coordinate of the text's center.
     * @param {number} [size=30] - The font size of the text (default is 30).
     * @param {{ r: number, g: number, b: number }} [color={ r: 0, g: 0, b: 0 }] - The color of the text (default is black).
     */
    addXCenteredText(text, x, size = 30, color = { r: 0, g: 0, b: 0 }) {
        this.uiItems.push(new Text(text, x, size, color));
    }


    /**
     * Updates the interaction in the game.
     * Calls the handleInteraction method of the game state object.
     * Toggles the sound mute if the key is pressed.
     * Removes enemies, flybottles, and collectables that are set to be removed.
     * Updates the UI items and removes them if they are set to be removed.
     */
    updateInteraction() {
        this.gameStateObject.handleInteraction(this.interaction);
        if (this.interaction.checkKeyMute()) this.sound.toggleSoundMute();
        this.enemies = this.enemies.filter((enemy) => enemy.remove == false);
        this.flybottles = this.flybottles.filter((bottle) => bottle.remove == false);
        this.collectables = this.collectables.filter((item) => item.remove == false);
        this.uiItems.forEach((text, index) => {
            text.update();
            if (text.remove) this.uiItems.splice(index, 1);
        });
    }


    /**
     * Draws a frame of the game on the canvas.
     */
    drawFrame() {
        if (this.bg_ImageObject && this.bg_ImageObject.imageLoaded) this.ctx.drawImage(this.bg_ImageObject.img, 0, 0, this.canvas.width, this.canvas.height);
        this.clouds.forEach((cloud) => cloud.draw());
        this.backgrounds.forEach((background) => background.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.flybottles.forEach((bottle) => bottle.draw());
        if (this.player) this.player.draw();
        if (this.boss) this.boss.draw();
        this.collectables.forEach((collectable) => collectable.draw());
        this.uiItems.forEach((text) => text.draw());
    }
}