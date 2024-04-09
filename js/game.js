let game;

function init() {
    addLandScapeListener();
    loadAnimations();
    game = new Game();
    game.setGameState('menu_desktop');
}


function checkMobile() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        console.log('Mobile device detected');
    }
}


function addLandScapeListener() {
    window.addEventListener('orientationchange', function () {
    });
}


function showButtons(btnIDArray) {
    let buttons = document.getElementsByClassName('btnMobile');
    for (let index = 0; index < buttons.length; index++) {
        let button = buttons[index];
        button.style.display = btnIDArray.includes(button.id) ? 'block' : 'none';
    }
}