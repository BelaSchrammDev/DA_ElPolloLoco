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

    touchEventsArray = [
        { btn: 'btnLeft', key: this.KEY_LEFT },
        { btn: 'btnRight', key: this.KEY_RIGHT },
        { btn: 'btnJump', key: this.KEY_SPACE },
        { btn: 'btnTrow', key: this.KEY_D },
        { btn: 'btnPause', key: this.KEY_P },
        { btn: 'btnRestart', key: this.KEY_ENTER },
        { btn: 'btnMute', key: this.KEY_M },
    ];


    constructor() {
        window.addEventListener('keydown', (e) => {
            this.setKey(e.key, true);
        });

        window.addEventListener('keyup', (e) => {
            this.setKey(e.key, false);
        });

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
                if (value) game.toggleSoundMute();
                this.Mute = value;
                break;
            case this.KEY_P:
                if (value) game.togglePause();
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