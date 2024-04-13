/**
 * Represents an Interval object that can be used to add and remove intervals.
 * @class
 */
class Interval {
    intervalObjects = {};


    /**
     * Stop all intervals.
     */
    stop() {
        this.removeIntervalAll();
    }


    /**
     * Adds an interval to the intervalObjects.
     * @param {string} id - The ID of the interval.
     * @param {function} intervalFunction - The function to be executed at each interval.
     * @param {number} [interval=1000/60] - The interval duration in milliseconds.
     */
    addInterval(id, intervalFunction, interval = 1000 / 60) {
        if (this.intervalObjects[id]) return;
        let newInterval = setInterval(intervalFunction, interval);
        this.intervalObjects[id] = newInterval;
    }


    /**
     * Removes an interval from the intervalObjects.
     * @param {string} id - The ID of the interval to be removed.
     */
    removeInterval(id) {
        clearInterval(this.intervalObjects[id]);
        delete this.intervalObjects[id];
    }


    /**
     * Removes all intervals from the intervalObjects.
     */
    removeIntervalAll() {
        for (let interval in this.intervalObjects) {
            clearInterval(this.intervalObjects[interval]);
            delete this.intervalObjects[interval];
        }
    }
}