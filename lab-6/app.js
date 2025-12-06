import { Ajax } from '../lib/ajaxlib.js';

const ContentDisplay = document.getElementById('getContent');
const Loader = document.getElementById('loader');
const QuestionLimiter = document.getElementById('getLimit');
const ErrContainer = document.getElementById('errList');

const ajax = new Ajax({
    BaseUrl: 'https://jsonplaceholder.typicode.com',
});

document.getElementById('getButton').addEventListener('click', async () => {
    try {
        Loader.style.visibility = 'visible';
        let limit = 20;
        if (QuestionLimiter.value > 0) limit = QuestionLimiter.value;
        let response = await ajax.get('', {}, limit);
        Loader.style.visibility = 'hidden';
        Display(response);
    } catch (err) {
        Loader.style.visibility = 'hidden';
        ErrContainer.innerHTML += '<h2>' + err + '</h2>';
    }
});

document.getElementById('errButton').addEventListener('click', async () => {
    try {
        Loader.style.visibility = 'visible';
        let limit = 20;
        if (QuestionLimiter.value > 0) limit = QuestionLimiter.value;
        let response = await ajax.get('/niepoprawne', {}, limit);
        Loader.style.visibility = 'hidden';
        Display(await response);
    } catch (err) {
        Loader.style.visibility = 'hidden';
        ErrContainer.innerHTML += '<h2>' + err + '</h2>';
    }
});

function Display(res) {
    const oList = document.createElement('ol');
    console.log(res);
    res.forEach((element) => {
        oList.innerHTML += '<li>' + JSON.stringify(element.body) + '</li>';
    });
    ContentDisplay.appendChild(oList);
}

document.getElementById('resetButton').addEventListener('click', () => {
    ContentDisplay.innerHTML = '';
});
document.getElementById('errResetButton').addEventListener('click', () => {
    ErrContainer.innerHTML = '';
});
