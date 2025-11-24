import { generateID, randomHsl } from './helpers.js';

class Store {
    #shapeList = new Array();

    #subscribers = new Set();

    constructor() {
        this.#shapeList = JSON.parse(localStorage.getItem('listOfShapes'));
        if (!this.#shapeList) this.#shapeList = new Array();
    }

    subscribe(callback) {
        this.#subscribers.add(callback);
        callback(this.#shapeList);
        return () => this.#subscribers.delete(callback);
    }

    getshapelist() {
        return this.#shapeList;
    }

    addToList(_shapetype) {
        this.#shapeList.push({
            id: generateID(),
            color: randomHsl(),
            shape: _shapetype,
        });
        this.#notify();
    }

    removeFromList(_id) {
        for (const shp in this.#shapeList) {
            if (this.#shapeList[shp].id == _id) {
                this.#shapeList.splice(shp, 1);
            }
        }
        this.#notify();
    }

    clearList() {
        this.#shapeList = new Array();
        this.#notify();
    }

    recolorShapes(_shapetype) {
        for (const shp in this.#shapeList) {
            if (this.#shapeList[shp].shape == _shapetype) {
                this.#shapeList[shp].color = randomHsl();
            }
        }
        this.#notify();
    }

    #notify() {
        localStorage.setItem('listOfShapes', JSON.stringify(this.#shapeList));
        for (const cb of this.#subscribers) cb(this.#shapeList);
    }
}

export const store = new Store();
