// В HTML есть кнопки «Start» и «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное 
// значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. 
// Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }

const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;
const DELAY = 1000;
btnStartEl.disabled = false;
btnStopEl.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

function newBackgroundColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}  

btnStartEl.addEventListener('click', onBtnStartClick);

function onBtnStartClick(){
    console.log(`Включен переключатель с периодичностью ${DELAY} сек`)

    timerId = setInterval(newBackgroundColor, DELAY);
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;
};

btnStopEl.addEventListener('click', onBtnStopClick);

function onBtnStopClick(){
    btnStartEl.disabled = false;
    btnStopEl.disabled = true;
    clearInterval(timerId);
    console.log(`Переключатель остановлен!`);
};

