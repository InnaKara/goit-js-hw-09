import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  startBtnEl: document.querySelector('button[data-start]'),
};

const timeNow = new Date();
elements.startBtnEl.disabled = true;
let userDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];

    if (timeNow > selectedDates[0]) {
      // window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future', 'Okay');
    } else {
      elements.startBtnEl.disabled = false;
    }
  },
};
flatpickr('input#datetime-picker', options);

elements.startBtnEl.addEventListener('click', handlerClick);
function handlerClick() {
  setInterval(() => {
    const currentDate = new Date();
    const leftTime = userDate - currentDate;
    elements.daysEl.textContent =
      convertMs(leftTime).days > 0
        ? addLeadingZero(convertMs(leftTime).days)
        : '00';
    elements.hoursEl.textContent =
      convertMs(leftTime).hours > 0
        ? addLeadingZero(convertMs(leftTime).hours)
        : '00';
    elements.minutesEl.textContent =
      convertMs(leftTime).minutes > 0
        ? addLeadingZero(convertMs(leftTime).minutes)
        : '00';
    elements.secondsEl.textContent =
      convertMs(leftTime).seconds > 0
        ? addLeadingZero(convertMs(leftTime).seconds)
        : '00';
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);

  // Remaining hours
  const hours = Math.floor((ms % day) / hour);

  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);

  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
