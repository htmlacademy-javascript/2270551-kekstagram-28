import {validateUploadPictureForm} from './upload-picture-validation.js';
import {createSlider, setupSlider, destroySlider} from './upload-picture-slider.js';

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureEdit = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const effectsList = document.querySelector('.effects__list');
const checkedEffectInput = document.querySelector('.effects__radio[checked]');

const pictureScaleInput = document.querySelector('.scale__control--value');
const pictureScaleDownButton = document.querySelector('.scale__control--smaller');
const pictureScaleUpButton = document.querySelector('.scale__control--bigger');

const onScaleDownButtonClick = () => {
  if (parseInt(pictureScaleInput.value, 10) > 25) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, 10) - 25}%`;
    pictureUploadPreview.style.transform = `scale(${parseInt(pictureScaleInput.value, 10) / 100})`;
  }
};

const onScaleUpButtonClick = () => {
  if (parseInt(pictureScaleInput.value, 10) < 100) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, 10) + 25}%`;
    pictureUploadPreview.style.transform = `scale(${parseInt(pictureScaleInput.value, 10) / 100})`;
  }
};

const onUploadPictureFormSubmit = (evt) => {
  if (!validateUploadPictureForm()) {
    evt.preventDefault();
  }
};

const onEffectInputClick = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    pictureUploadPreview.className = '';
    pictureUploadPreview.classList.add(`effects__preview--${evt.target.value}`);

    setupSlider(evt.target.value);
  }
};

const onCloseButtonClick = () => closePictureUpload();

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closePictureUpload();
  }
};

const addListeners = () => {
  pictureUploadForm.addEventListener('submit', onUploadPictureFormSubmit);
  pictureScaleDownButton.addEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.addEventListener('click', onScaleUpButtonClick);
  effectsList.addEventListener('change', onEffectInputClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeListeners = () => {
  pictureUploadForm.removeEventListener('submit', onUploadPictureFormSubmit);
  pictureScaleDownButton.removeEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.removeEventListener('click', onScaleUpButtonClick);
  effectsList.removeEventListener('change', onEffectInputClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const defaultSetupPictureUpload = () => {
  pictureUploadForm.reset();
  pictureUploadPreview.style = null;
  pictureUploadPreview.className = 'effects__preview--none';
};

function openPictureUpload () {
  addListeners();
  createSlider();
  setupSlider(checkedEffectInput.value);

  pictureScaleInput.value = '100%';

  document.body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
}

function closePictureUpload () {
  removeListeners();
  destroySlider();
  defaultSetupPictureUpload();

  document.body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
}

const initUploadPictureModule = () => {
  pictureUploadInput.addEventListener('change', openPictureUpload);
};

export {initUploadPictureModule};
