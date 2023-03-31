/* форма изменения масштаба большого фото */
const STEP_VALUE = 25; /* шаг масштабирования */
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100; /* масштаб по умолчанию */

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const inputValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');
/*const knopki = document.querySelector('.img-upload__scale');*/

let currentValue = 0;

/* функция изменения масштаба */
const scalePhoto = (value) => {
  photoPreview.style.transform = `scale(${value / 100})`;
  inputValue.value = `${value}%`;
};

const changeZoom = (factor = 1) => {
  currentValue = parseInt(inputValue.value, 10);
  let newValue = currentValue + (STEP_VALUE * factor);
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scalePhoto(newValue);
};
plusButton.addEventListener('click', () => {
  changeZoom(1);
});
minusButton.addEventListener('click', () => {
  changeZoom(-1);
});

/*knopki.addEventListener('click', () => {
  currentValue = parseInt(inputValue.value, 10);
  let newValue = currentValue + (STEP_VALUE * factor);
  if (knopki.matches('.scale__control--smaller')) {
    newValue = currentValue - STEP_VALUE;
    if (newValue < MIN_SCALE) {
      newValue = MIN_SCALE;
    }
  } if (knopki.matches('.scale__control--bigger')) {
    newValue = currentValue + STEP_VALUE;
    if (newValue > MAX_SCALE) {
      newValue = MAX_SCALE;
    }
  } scalePhoto(newValue);
}); */

/* клик по кнопке минус-масштаб
minusButton.addEventListener('click', () => {
  currentValue = parseInt(inputValue.value, 10);
  let newValue = currentValue - STEP_VALUE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scalePhoto(newValue);
});

/* клик по кнопке плюс-масштаб
plusButton.addEventListener('click', () => {
  currentValue = parseInt(inputValue.value, 10);
  let newValue = currentValue + STEP_VALUE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scalePhoto(newValue);
}); */

/* сброс масштаба по умолчанию */
const resetScale = () => scalePhoto(DEFAULT_SCALE);

export {resetScale};
