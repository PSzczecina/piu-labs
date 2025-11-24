import { generateID, randomHsl } from './helpers.js';
import { store } from './store.js';

const board = document.getElementById('board');
const circleCounterDisplay = document.getElementById('circleCountDisplay');
const squareCounterDisplay = document.getElementById('squareCountDisplay');
const fullCounterDisplay = document.getElementById('fullCountDisplay');

export function addShape(_shapetype, _color, _id) {
    if (!_shapetype || !_color || !_id) return;
    const shp = document.createElement('div');
    shp.dataset.id = _id;
    shp.className = _shapetype;
    shp.style.backgroundColor = _color;
    board.append(shp);
}

board.addEventListener('click', (e) => {
    if (e.target.dataset.id);
    store.removeFromList(e.target.dataset.id);
});

//nie tylko subskrybuje, ale od razu definiuje co ma zrobić bo dostaniu update'a
store.subscribe((value) => {
    if (!value) {
        return;
    }
    let cirCount = 0,
        squCount = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i].shape == 'square') squCount++;
        if (value[i].shape == 'circle') cirCount++;
    }
    fullCounterDisplay.innerHTML = 'Łącznie: ' + value.length;
    circleCounterDisplay.innerHTML = 'Kółek: ' + cirCount;
    squareCounterDisplay.innerHTML = 'Kwadratów: ' + squCount;

    //jak jest na stronie ale nie ma w value > usuń
    let temp1 = [];

    for (let j = 0; j < board.children.length; j++) {
        temp1.push(board.children.item(j).dataset.id);
    }
    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < temp1.length; j++) {
            if (value[i].id == temp1[j]) {
                temp1.splice(j, 1);
            }
        }
    }
    for (let i = 0; i < temp1.length; i++) {
        for (let j = 0; j < board.children.length; j++) {
            if (temp1[i] == board.children.item(j).dataset.id) {
                board.children.item(j).remove();
            }
        }
    }

    //na podstawie id przemaluj co się zmieniło
    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < board.children.length; j++) {
            if (value[i].id == board.children.item(j).dataset.id) {
                board.children.item(j).style.backgroundColor = value[i].color;
            }
        }
    }
    //jak jest w value ale nie ma na stronie > dodaj nowe elementy
    let temp2 = [...value];
    for (let i = 0; i < board.children.length; i++) {
        for (let j = 0; j < temp2.length; j++) {
            if (temp2[j].id == board.children.item(i).dataset.id) {
                temp2.splice(j, 1);
            }
        }
    }

    for (let i = 0; i < temp2.length; i++) {
        addShape(temp2[i].shape, temp2[i].color, temp2[i].id);
    }
});
