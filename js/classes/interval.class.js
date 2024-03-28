class Interval extends DrawableObject {
    intervalObjects = {};


    constructor() {
        super();
    }


    start() { }


    stop() {
        this.removeIntervalAll();
    }


    addInterval(id, intervalFunction, interval) {
        let newInterval = setInterval(intervalFunction, interval);
        this.intervalObjects[id] = newInterval;
    }


    removeInterval(id) {
        clearInterval(this.intervalObjects[id]);
        delete this.intervalObjects[id];
    }


    removeIntervalAll() {
        for (let interval in this.intervalObjects) {
            clearInterval(this.intervalObjects[interval]);
            delete this.intervalObjects[interval];
        }
    }
}