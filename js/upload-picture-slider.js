const effectSetups = {
  CHROME: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  SEPIA: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  MARVIN: {
    range: {
      min: 0,
      max: 100
    },
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  PHOBOS: {
    range: {
      min: 0,
      max: 3
    },
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  HEAT: {
    range: {
      min: 1,
      max: 3
    },
    step: 0.1,
    filter: 'brightness',
    unit: ''
  }
};

const DEFAULT_EFFECT_VALUE = 100;

const pictureUploadPreview = document.querySelector('.img-upload__preview img');

const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const updateSlider = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    step: effect.step,
    start: DEFAULT_EFFECT_VALUE,
  });
};

const setupSlider = (effect) => {
  if (effect === 'none') {
    pictureUploadPreview.style.filter = null;
    effectLevelSlider.noUiSlider.off();
    effectLevelSliderContainer.classList.add('hidden');
  } else {
    updateSlider(effectSetups[effect.toUpperCase()]);

    effectLevelSlider.noUiSlider.off();
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelInput.value = effectLevelSlider.noUiSlider.get();
      pictureUploadPreview.style.filter = `${effectSetups[effect.toUpperCase()].filter}(${effectLevelInput.value + effectSetups[effect.toUpperCase()].unit})`;
    });

    effectLevelSliderContainer.classList.remove('hidden');
  }
};

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: DEFAULT_EFFECT_VALUE,
  });
};

const destroySlider = () => effectLevelSlider.noUiSlider.destroy();

export {createSlider, setupSlider, destroySlider};
