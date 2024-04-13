/**
 * Represents an interaction handler for keyboard and touch events.
 */
class Interaction {
    KEY_RIGHT = 'ArrowRight';
    KEY_LEFT = 'ArrowLeft';
    KEY_UP = 'ArrowUp';
    KEY_SPACE = ' ';
    KEY_P = 'p';
    KEY_D = 'd';
    KEY_M = 'm';
    KEY_ENTER = 'Enter';
    KEY_ESC = 'Escape';

    Right = false;
    Left = false;
    Jump = false;
    Trow = false;
    Pause = false;
    Mute = false;
    Enter = false;
    MainMenu = false;

    /**
     * Array for mapping touch events to keys.
     */
    touchEventsArray = [
        { btn: 'btnLeft', key: this.KEY_LEFT },
        { btn: 'btnRight', key: this.KEY_RIGHT },
        { btn: 'btnJump', key: this.KEY_SPACE },
        { btn: 'btnTrow', key: this.KEY_D },
        { btn: 'btnPause', key: this.KEY_P },
        { btn: 'btnRestart', key: this.KEY_ENTER },
        { btn: 'btnMute', key: this.KEY_M },
        { btn: 'btnMenu', key: this.KEY_ESC },
        { btn: 'btnIGMenu', key: this.KEY_ESC },
    ];


    constructor() {
        this.addKeyEvents();
        this.addTouchEvents();
    }


    /**
     * Adds key event listeners to the window.
     */
    addKeyEvents() {
        window.addEventListener('keydown', (e) => { this.setKey(e.key, true); });
        window.addEventListener('keyup', (e) => { this.setKey(e.key, false); });
    }


    /**
     * Adds touch events to the specified buttons.
     */
    addTouchEvents() {
        this.touchEventsArray.forEach((event) => {
            let btn = document.getElementById(event.btn);
            if (btn) {

                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.setKey(event.key, true);
                });
                btn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.setKey(event.key, false);
                });
            }
        });
    }


    checkMainMenu() {
        if (this.MainMenu) {
            this.MainMenu = false;
            return true;
        }
        return false;
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


    checkTrow() {
        if (this.Trow) {
            this.Trow = false;
            return true;
        }
        return false;
    }


    /**
     * Sets the value of a specific key.
     *
     * @param {string} key - The key to set the value for.
     * @param {boolean} value - The value if the key is pressed or not.
     */
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
            case this.KEY_D:
                this.Trow = value;
                break;
            case this.KEY_ENTER:
                this.Enter = value;
                break;
            case this.KEY_ESC:
                this.MainMenu = value;
                break;
            default: return;
        }
    }
}