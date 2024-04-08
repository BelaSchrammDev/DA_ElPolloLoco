let game;

function init() {
    addLandScapeListener();
    loadAnimations();
    game = new Game();
    initLevel1(game);
    game.start();
}


function restartGame() {
    game.stop();
    initLevel1(game);
    game.start();
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


function setDisplayNone(elementID, none) {
    let element = document.getElementById(elementID);
    if (element) element.style.display = none ? 'none' : 'flex';
}