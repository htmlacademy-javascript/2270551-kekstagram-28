/* модуль работы с формой */
import {isEscKey} from './utils.js';
import {resetScale} from './scale-user-form.js';
import {resetEffects} from './filters.js';
import {showErrorMessage} from './message.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};


const imgUploadForm = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const photoUploadButton = document.querySelector('#upload-file');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const inputValue = document.querySelector('.scale__control--value');
const submitButtonElement = imgUploadForm.querySelector('.img-upload__submit');
const fileChooserElement = document.querySelector('.img-upload__input');
const previewElement = document.querySelector('.img-upload__preview img');
const miniPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  inputValue.setAttribute('value', '100%');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  imgUploadForm.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', () => {
  closeModal();
});

/* обработчик запрета закрытия формы если есть фокус на хэтэг или текстовое поле */
const isInputsFocused = () => document.activeElement === hashtagInput ||
document.activeElement === descriptionInput;

/* рабочий вариант для закрытия формы при не наведении курсора
descriptionInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});
descriptionInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});
hashtagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});
hashtagInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
}); */

function onDocumentKeydown(evt) {
  if (isEscKey(evt) && !isInputsFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const getTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return tags;
};

/*function validateHashtagSpaces (value) {
  const hashArray = value.split(' ');
  return !hashArray.every((hashtag) => hashtag.includes('#', 1));
}*/

const validateLength = (value) => getTags(value).every((item) => item.length <= MAX_HASHTAG_LENGTH);

const validateCount = (value) => getTags(value).length <= MAX_HASHTAG_COUNT;

const validateFirstSymbol = (value) => getTags(value).every((item) => /^#/.test(item));


const validateSymbols = (value) => getTags(value).every((item) => /^#[a-zа-яё0-9]{1,19}$/i.test(item));

const validateUniqueness = (tags) => {
  const lowerCaseTags = getTags(tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const errors = new Map();
errors.set(validateFirstSymbol, 'Хэш-тег должен начинаться с символа # (решётка) !')
  .set(validateLength, 'Максимальная длина хэш-тега 20 символов !')
  .set(validateSymbols, 'Хэш-теги должны состоять из букв и чисел !')
  .set(validateCount, 'Нельзя указать больше пяти хэш-тегов !')
  .set(validateUniqueness, 'Хэш-теги не должны повторяться !');

errors.forEach((value, key) =>
  pristine.addValidator(
    hashtagInput,
    key,
    value
  )
);
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (cb) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(imgUploadForm));
      unblockSubmitButton();
    }
  });
};

const setOnUploadFormChange = () => {
  photoUploadButton.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      previewElement.src = URL.createObjectURL(file);
      for (const miniPreview of miniPreviews) {
        miniPreview.style.backgroundImage = `url(${previewElement.src})`;
      }
      openModal();
    } else {
      showErrorMessage();
    }
  });
};

export {setOnFormSubmit, setOnUploadFormChange, closeModal};
