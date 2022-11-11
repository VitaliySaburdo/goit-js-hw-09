import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  fistDelay: document.querySelector('input[name=delay]'),
  delayStep: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  submitBtn: document.querySelector('button'),
};

refs.submitBtn.addEventListener('click', onSubmitBtn);

function onSubmitBtn(evt) {
  evt.preventDefault();
  const delay = refs.fistDelay.value;
  const step = refs.delayStep.value;
  const amount = refs.amount.value;

  for (let i = 1; i < amount; i++) {
    createPromise(amount, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
