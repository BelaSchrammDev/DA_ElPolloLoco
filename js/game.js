let game;
let currentOverlayID = '';


/**
 * Initializes the game.
 */
function init() {
    addLandScapeListener();
    loadAnimations();
    game = new Game();
    game.setGameState('menu_desktop');
}


/**
 * Checks if the user is accessing the website from a mobile device.
 * @returns {boolean} Returns true if the user is accessing from a mobile device, otherwise false.
 */
function ifMobile() {
    return (/Mobi|Android/i.test(navigator.userAgent));
}


/**
 * Adds a listener for the 'orientationchange' event.
 */
function addLandScapeListener() {
    window.addEventListener('orientationchange', function () {
    });
}


/**
 * Displays overlay information with the given ID.
 * @param {string} infoID - The ID of the overlay information element.
 */
function showOverlayInfo(infoID) {
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