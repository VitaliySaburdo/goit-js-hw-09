// Custom datetime picker
import flatpickr from 'flatpickr';
// Datetime picker styles
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

flatpickr('#datetime-picker', options);
