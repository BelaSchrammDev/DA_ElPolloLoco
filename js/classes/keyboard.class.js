class KeyBoard {
    KEY_RIGHT = 'ArrowRight';
    KEY_LEFT = 'ArrowLeft';
    KEY_SPACE = ' ';

    Right = false;
    Left = false;
    Space = false;

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
                this.Space = value;
                break;
            default: return;
        }
        // console.log('setKey - ' + key + ' - ' + value);
    }
}