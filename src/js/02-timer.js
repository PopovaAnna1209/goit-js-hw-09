// Выполняй это задание в файлах 02-timer.html и 02-timer.js. Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. 
// Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.
// Выбор даты
// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. 
// Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
// Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс 
// таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.

// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
// НЕ БУДЕМ УСЛОЖНЯТЬ
// Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.
// Форматирование времени
// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. 
// Обрати внимание, что она не форматирует результат. То есть, если осталось 4 минуты или любой другой составляющей времени, 
// то функция вернет 4, а не 04. В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. 
// Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

// Библиотека уведомлений
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.


import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minEl = document.querySelector('span[data-minutes]');
const secEl = document.querySelector('span[data-seconds]');

btnEl.classList.add('disabled');
let userDate = null;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if(selectedDates[0] < Date.now()) {
            Notify.failure('Please choose a date in the future');
            userDate = new Date();
        } else { 
            btnEl.disabled = false;
            btnEl.classList.remove('disabled');
            userDate = selectedDates[0];
        }
    },
};

class Timer  {
    constructor() {
        this.isActive = false;
        this.timerId = null;
        btnEl.disabled = true;
    }
    timerStart() {
        if (this.isActive) {
            return;
        }
    this.isActive = true;
    this.timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userDate - currentTime;
        const components = convertMs(deltaTime);

        secEl.textContent = components.seconds;
        minEl.textContent = components.minutes;
        hoursEl.textContent = components.hours;
        daysEl.textContent = components.days;
        
        if (deltaTime <= 0) {
            this.timerStop();    
        } 

    }, 1000)}
    
    timerStop() {
        clearInterval(this.timerId);
        timerDiv.innerHTML = "Time is over!";
    }
}

const timer = new Timer();
flatpickr(inputEl, options);
btnEl.addEventListener('click', () => timer.timerStart());