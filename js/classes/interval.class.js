class Interval {
    intervalObjects = {};


    stop() {
        this.removeIntervalAll();
    }


    addInterval(id, intervalFunction, interval = 1000 / 60) {
        if (this.intervalObjects[id]) return;
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