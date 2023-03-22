import {findDuplicates} from './utils.js';

const HASHTAG_REG_EXP = /#[\dа-яa-z]{1,19}\s/gi;

const pictureUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.img-upload__text .text__hashtags');

const checkHashtags = () => {
  const hashtagString = hashtagInput.value.trim();

  if (!hashtagInput.value) {
    return true;
  }

  if (`${hashtagString} `.replace(HASHTAG_REG_EXP, '') || hashtagString.split(' ').length > 5 || findDuplicates(hashtagString.toLowerCase().split(' ')).length !== 0) {
    return false;
  }

  return true;
};

const pristineSetup = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

pristineSetup.addValidator(hashtagInput, checkHashtags, 'Поле заполнено неверно');

const validateUploadPictureForm = () => pristineSetup.validate();

export {validateUploadPictureForm};
