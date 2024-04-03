class Movement {
    KEY_RIGHT = 'ArrowRight';
    KEY_LEFT = 'ArrowLeft';
    KEY_UP = 'ArrowUp';
    KEY_SPACE = ' ';
    KEY_P = 'p';
    KEY_ENTER = 'Enter';

    Right = false;
    Left = false;
    Jump = false;
    Pause = false;

    constructor() {
        window.addEventListener('keydown', (e) => {
            this.setKey(e.key, true);
        });

        window.addEventListener('keyup', (e) => {
            this.setKey(e.key, false);
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
            case this.KEY_P:
                this.Pause = value;
                break;
            default: return;
        }
        // console.log('setKey - ' + key + ' - ' + value);
    }
}