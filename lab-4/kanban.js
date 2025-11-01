/*
    Do zrobienia:
    - localStorage (kolory, tytuły, id)
    - jak to ID ogarnąć by miało to sens?
*/

// stałe odnoszące się do elementów html
const ToDoColumn = document.getElementById('ToDo');
const DoingColumn = document.getElementById('Doing');
const DoneColumn = document.getElementById('Done');
const MainSection = document.getElementsByTagName('main')[0];

const ToDoBtn = document.getElementById('ToDoBtn');
const DoingBtn = document.getElementById('DoingBtn');
const DoneBtn = document.getElementById('DoneBtn');

const ToDoColCards = ToDoColumn.getElementsByTagName('div');
const DoingColCards = DoingColumn.getElementsByTagName('div');
const DoneColCards = DoneColumn.getElementsByTagName('div');

const ToDoCounter = document.getElementById('ToDoCounter');
const DoingCounter = document.getElementById('DoingCounter');
const DoneCounter = document.getElementById('DoneCounter');

const ToDoSort = document.getElementById('ToDoSort');
const DoingSort = document.getElementById('DoingSort');
const DoneSort = document.getElementById('DoneSort');

//do losowania HSL
function randomHsl() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 75%)`;
}

//losowe ID dla kart (jako div + jako localStorage)
function generateID() {
    let x = Math.random().toString(36).substring(2, 8);
    if (!Object.keys(localStorage).includes(x)) return x;
}

//wczytaj wszystko z localStorage

console.log(Object.keys(localStorage));

//wydobądź elementy z localstorage
Object.keys(localStorage).forEach((key) => {
    if (key != 'undefined') {
        const element = new DOMParser()
            .parseFromString(localStorage.getItem(key), 'text/html')
            .getElementsByTagName('div')[0];

        if (element.className == 'card_todo') ToDoColumn.appendChild(element);
        else if (element.className == 'card_doing')
            DoingColumn.appendChild(element);
        else if (element.className == 'card_done')
            DoneColumn.appendChild(element);
    }
});
//aktualizacja liczników po wczytaniu localstorage
ToDoCounter.innerText = ToDoColCards.length;
DoingCounter.innerText = DoingColCards.length;
DoneCounter.innerText = DoneColCards.length;

sort(ToDoColCards);
sort(DoingColCards);
sort(DoneColCards);

function createCard(column) {
    const card = document.createElement('div');
    card.id = generateID();

    if (column == ToDoColumn) card.className = 'card_todo';
    else if (column == DoingColumn) card.className = 'card_doing';
    else if (column == DoneColumn) card.className = 'card_done';

    const title = document.createElement('h4');
    title.innerText = 'Zadanie ';
    title.contentEditable = 'true';
    card.appendChild(title);

    const leftButton = document.createElement('button');
    leftButton.id = 'left';
    leftButton.innerText = '←';
    card.appendChild(leftButton);

    const exitButton = document.createElement('button');
    exitButton.id = 'exit';
    exitButton.innerText = 'X';
    card.appendChild(exitButton);

    const rightButton = document.createElement('button');
    rightButton.id = 'right';
    rightButton.innerText = '→';
    card.appendChild(rightButton);

    //pkt4 - malowanie pojedyńczej karty
    const repaintBtn = document.createElement('button');
    repaintBtn.id = 'repaintCard';
    repaintBtn.innerText = 'przemaluj';
    card.appendChild(repaintBtn);
    //~pkt4

    card.style.backgroundColor = randomHsl();
    localStorage.setItem(card.id, card.outerHTML);
    return card;
}

//Zdarzenia dodające karty do kolumn
ToDoBtn.addEventListener('click', (e) => {
    const newCard = createCard(ToDoColumn);
    ToDoColumn.appendChild(newCard);
});
DoingBtn.addEventListener('click', (e) => {
    const newCard = createCard(DoingColumn);
    DoingColumn.appendChild(newCard);
});
DoneBtn.addEventListener('click', (e) => {
    const newCard = createCard(DoneColumn);
    DoneColumn.appendChild(newCard);
});

//pkt3
//Zdarzenia przesuwające karty do kolumn obok
ToDoColumn.addEventListener('click', (e) => {
    if (e.target.id == 'right') {
        e.target.parentElement.className = 'card_doing';
        DoingColumn.appendChild(e.target.parentElement);
    }
});
DoneColumn.addEventListener('click', (e) => {
    if (e.target.id == 'left') {
        e.target.parentElement.className = 'card_doing';
        DoingColumn.appendChild(e.target.parentElement);
    }
});
DoingColumn.addEventListener('click', (e) => {
    if (e.target.id == 'left') {
        e.target.parentElement.className = 'card_todo';
        ToDoColumn.appendChild(e.target.parentElement);
    } else if (e.target.id == 'right') {
        e.target.parentElement.className = 'card_done';
        DoneColumn.appendChild(e.target.parentElement);
    }
});
//~pkt3

//pkt 4
//Zdarzenie do malowania kolumn
MainSection.addEventListener('click', (e) => {
    if (e.target.id == 'ColorCardBtn') {
        const columnCards = e.target.parentElement.getElementsByTagName('div');
        const hsl = randomHsl();
        for (const temp of columnCards) {
            temp.style.backgroundColor = hsl;
        }
    } else if (e.target.id == 'repaintCard') {
        const hsl = randomHsl();
        e.target.parentElement.style.backgroundColor = hsl;
    }
});
//~pkt4

//pkt 5
//aktualizacja liczników
MainSection.addEventListener('click', () => {
    ToDoCounter.innerText = ToDoColCards.length;
    DoingCounter.innerText = DoingColCards.length;
    DoneCounter.innerText = DoneColCards.length;
});

//sortowanie w kolumnach (po tytułach, bo po czym innym?)
ToDoSort.addEventListener('click', () => {
    sort(ToDoColCards);
});
DoingSort.addEventListener('click', () => {
    sort(DoingColCards);
});
DoneSort.addEventListener('click', () => {
    sort(DoneColCards);
});
function sort(column) {
    for (let j = 0; j < column.length; j++) {
        let i = 0;
        for (i; i < column.length - 1 - j; i++) {
            let card1 = column[i].getElementsByTagName('h4')[0];
            let card2 = column[i + 1].getElementsByTagName('h4')[0];
            if (card1.innerText > card2.innerText) {
                column[i + 1].after(column[i]);
            }
        } // da się pewnie mądrzej to zrobić, ale działa? Działa.
    }
}
//~pkt5

//zdarzenie aktualizujące localStorage przy dosłownie czymkolwiek
function updateLocalStorage() {
    let tempList = MainSection.getElementsByTagName('div');
    for (let element of tempList) {
        localStorage.removeItem(element.id);
        localStorage.setItem(element.id, element.outerHTML);
    }
    localStorage.removeItem('undefined');
}

MainSection.addEventListener('input', (e) => {
    updateLocalStorage();
});
MainSection.addEventListener('click', (e) => {
    updateLocalStorage();
});
//Zdarzenie usuwające kartkę z widoku i localstorage
MainSection.addEventListener('click', (e) => {
    if (e.target.id == 'exit') {
        localStorage.removeItem(e.target.parentElement.id);
        e.target.parentElement.remove();
    }
});
