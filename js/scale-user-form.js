const STEP_VALUE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const inputValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');

let currentValue = 0;

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

const resetScale = () => scalePhoto(DEFAULT_SCALE);

export {resetScale};
