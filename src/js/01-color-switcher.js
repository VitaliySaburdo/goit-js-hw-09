const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtn);
stoptBtn.addEventListener('click', onStopBtn);

let timerId = null;

function onStartBtn() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', true);
  stoptBtn.removeAttribute('disabled');
}

function onStopBtn() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stoptBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
