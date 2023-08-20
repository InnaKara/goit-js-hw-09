const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', handleClick);

function handleClick() {
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
}

stopBtn.addEventListener('click', () => {
  // startBtn.setAttribute('disabled', false);
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
});
