class Interaction {
    KEY_RIGHT = 'ArrowRight';
    KEY_LEFT = 'ArrowLeft';
    KEY_UP = 'ArrowUp';
    KEY_SPACE = ' ';
    KEY_P = 'p';
    KEY_D = 'd';
    KEY_M = 'm';
    KEY_ENTER = 'Enter';

    Right = false;
    Left = false;
    Jump = false;
    Trow = false;
    Pause = false;
    Mute = false;
    Enter = false;

    // Array for mapping touch events to keys
    touchEventsArray = [
        { btn: 'btnLeft', key: this.KEY_LEFT },
        { btn: 'btnRight', key: this.KEY_RIGHT },
        { btn: 'btnJump', key: this.KEY_SPACE },
        { btn: 'btnTrow', key: this.KEY_D },
        { btn: 'btnPause', key: this.KEY_P },
        { btn: 'btnRestart', key: this.KEY_ENTER },
        { btn: 'btnStartgame', key: this.KEY_ENTER },
        { btn: 'btnMute', key: this.KEY_M },
    ];


    constructor() {
        this.addKeyEvents();
        this.addTouchEvents();
    }


    addKeyEvents() {
        window.addEventListener('keydown', (e) => { this.setKey(e.key, true); });
        window.addEventListener('keyup', (e) => { this.setKey(e.key, false); });
    }


    addTouchEvents() {
        this.touchEventsArray.forEach((event) => {
            let btn = document.getElementById(event.btn);
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.setKey(event.key, true);
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.setKey(event.key, false);
            });
        });
    }


    checkKeyPause() {
        if (this.Pause) {
            this.Pause = false;
            return true;
        }
        return false;
    }


    checkKeyMute() {
        if (this.Mute) {
            this.Mute = false;
            return true;
        }
        return false;
    }


    setKey(key, value) {
        switch (key) {
            case this.KEY_RIGHT:
                this.Right = value;
                break;
            case this.KEY_LEFT:
                this.Left = value;
                break;
            case this.KEY_SPACE:
            case this.KEY_UP:
                this.Jump = value;
                break;
            case this.KEY_M:
                this.Mute = value;
                break;
            case this.KEY_P:
                this.Pause = value;
                break;
            case this.KEY_ENTER:
                this.Enter = value;
                break;
            default: return;
        }
        // console.log('setKey - ' + key + ' - ' + value);
    }
}