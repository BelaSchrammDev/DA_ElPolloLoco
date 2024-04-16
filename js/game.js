let game;
let currentOverlayID = '';


/**
 * Initializes the game.
 */
function init() {
    loadAnimations();
    game = new Game();
    game.setGameState('menu_desktop');
}


/**
 * Displays overlay information with the given ID.
 * @param {string} infoID - The ID of the overlay information element.
 */
function showOverlayInfo(infoID) {
    closeCurrentOverlay();
    currentOverlayID = infoID;
    document.getElementById(infoID).style.display = 'block';
    showOverlay(true);
    document.getElementById('overlay').addEventListener('click', closeOverlayInfo);
}


/**
 * Closes the current overlay.
 */
function closeCurrentOverlay() {
    if (currentOverlayID === '') return;
    document.getElementById(currentOverlayID).style.display = 'none';
    showOverlay(false);
    document.getElementById('overlay').removeEventListener('click', closeOverlayInfo);
    currentOverlayID = '';
}


/**
 * Closes the overlay if the event target has an id of 'overlay'.
 * @param {Event} event - The event object.
 */
function closeOverlayInfo(event) {
    if (event.target.id === 'overlay') {
        closeCurrentOverlay();
    }
}


/**
 * Shows or hides the overlay based on the given view parameter.
 * @param {boolean} view - Determines whether to show or hide the overlay.
 */
function showOverlay(view) {
    let overlay = document.getElementById('overlay');
    overlay.style.display = view ? 'flex' : 'none';
}


/**
 * Starts the game by setting the game state to 'level_1'.
 */
function startGame() {
    game.setGameState('level_1');
}


/**
 * Shows or hides elements based on the provided array of button IDs.
 * @param {Array} btnIDArray - An array of button IDs.
 */
function showElements(btnIDArray) {
    let elements = document.querySelectorAll('[show_control]');
    for (let index = 0; index < elements.length; index++) {
        let element = elements[index];
        element.style.display = btnIDArray.includes(element.id) ? 'flex' : 'none';
    }
}


function showMuteButtonImage(name) {
    let muteImg = document.getElementById('btnMute').querySelector('img');
    muteImg.setAttribute('src', './img_pollo_locco/buttons/' + name + '.svg');
}