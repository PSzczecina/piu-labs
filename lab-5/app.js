import { store } from './store.js';
import { randomHsl, generateID } from './helpers.js';
import { addShape } from './ui.js';

const addCircle = document.getElementById('addCircle');
const addSquare = document.getElementById('addSquare');
const paintCircles = document.getElementById('paintCircles');
const paintSquares = document.getElementById('paintSquares');
const clearAll = document.getElementById('clearAll');
const board = document.getElementById('board');

addCircle.addEventListener('click', () => {
    store.addToList('circle');
});
addSquare.addEventListener('click', () => {
    store.addToList('square');
});

paintCircles.addEventListener('click', () => {
    store.recolorShapes('circle');
});
paintSquares.addEventListener('click', () => {
    store.recolorShapes('square');
});
clearAll.addEventListener('click', () => {
    store.clearList();
});
