import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  formEl: document.querySelector('form'),
  delayEl: document.querySelector('input[name = delay]'),
  stepEl: document.querySelector('input[name=step]'),
  amountEl: document.querySelector('input[name=amount]'),
  createBtn: document.querySelector('button[type=submit]'),
};

elements.formEl.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  let delayFirst = Number(elements.delayEl.value);
  const step = Number(elements.stepEl.value);
  const amount = Number(elements.amountEl.value);

  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delayFirst)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayFirst += step;
  }
  elements.formEl.reset();
}
