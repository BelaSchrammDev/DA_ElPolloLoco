let game;
let currentOverlayID = '';

function init() {
    addLandScapeListener();
    loadAnimations();
    game = new Game();
    game.setGameState('menu_desktop');
}


function ifMobile() {
    return (/Mobi|Android/i.test(navigator.userAgent));
}


function addLandScapeListener() {
    window.addEventListener('orientationchange', function () {
    });
}


function showOverlayInfo(infoID) {
    currentOverlayID = infoID;
    document.getElementById(infoID).style.display = 'block';
    showOverlay(true);
    document.getElementById('overlay').addEventListener('click', closeOverlayInfo);
}

function closeCurrentOverlay() {
    if (currentOverlayID === '') return;
    document.getElementById(currentOverlayID).style.display = 'none';
    showOverlay(false);
    document.getElementById('overlay').removeEventListener('click', closeOverlayInfo);
    currentOverlayID = '';
}

function closeOverlayInfo(event) {
    if (event.target.id === 'overlay') {
        closeCurrentOverlay();
    }
}

function showOverlay(view) {
    let overlay = document.getElementById('overlay');
    overlay.style.display = view ? 'flex' : 'none';
}


function startGame() {
    game.setGameState('level_1');
}


function showElements(btnIDArray) {
    let elements = document.querySelectorAll('[show_control]');
    for (let index = 0; index < elements.length; index++) {
        let element = elements[index];
        element.style.display = btnIDArray.includes(element.id) ? 'flex' : 'none';
    }
}