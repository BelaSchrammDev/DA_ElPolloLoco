let game;

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