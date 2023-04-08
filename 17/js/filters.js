
const FILTERS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  }
];

const RANDOM_PHOTO_COUNT = 10;

const Sorter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgFilters = document.querySelector('.img-filters');
let currentSorter = Sorter.DEFAULT;
let pictures = [];


const sortRandom = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;


const getSortedPhotos = () => {
  switch (currentSorter) {
    case Sorter.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, RANDOM_PHOTO_COUNT);
    case Sorter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnSorterClick = (cb) => {
  imgFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentSorter) {
      return;
    }
    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentSorter = clickedButton.id;
    cb(getSortedPhotos());
  });
};

const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const effectItem = document.querySelector('.effects');

const DEFAULT_FILTERS = FILTERS[0];
let currentFilter = DEFAULT_FILTERS;

const isDefault = () => currentFilter === FILTERS[0];

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_FILTERS.min,
    max: DEFAULT_FILTERS.max,
  },
  start: DEFAULT_FILTERS.max,
  step: DEFAULT_FILTERS.step,
  connect: 'lower'
});
hideSlider();

const updateFilter = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentFilter.min,
      max: currentFilter.max
    },
    start: currentFilter.max,
    step: currentFilter.step
  });
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

effectItem.addEventListener('change', (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentFilter = FILTERS.find((filter) => filter.name === evt.target.value);
  photoPreview.className = `effects__preview--${currentFilter.name}`;
  updateFilter();
});


const resetEffects = () => {
  currentFilter = FILTERS[0];
  updateFilter();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  photoPreview.style.filter = isDefault()
    ? FILTERS[0].style
    : `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  effectLevel.value = sliderValue;
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

const initSort = (loadedPictures, callback) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnSorterClick(callback);
};

export {initSort,getSortedPhotos,resetEffects};
