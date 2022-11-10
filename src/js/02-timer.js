// Custom datetime picker
import flatpickr from 'flatpickr';
// Datetime picker styles
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDate: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onBtnStart);
refs.startBtn.setAttribute('disabled', true);

let selectedTime = null;
let idInterval = null;

flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedTime < new Date()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
      return;
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
});

function onBtnStart() {
  refs.startBtn.setAttribute('disabled', true);
  idInterval = setInterval(() => {
    const deltaTime = selectedTime - new Date().getTime();
    if (deltaTime <= 0) {
      clearTimeout(idInterval);
      refs.startBtn.removeAttribute('disabled');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    upDateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

function upDateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
function pad(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
