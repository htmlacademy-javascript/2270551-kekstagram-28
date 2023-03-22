const getRandomInteger = (firstValue, secondValue) => {
  const min = Math.ceil(Math.min(Math.abs(firstValue), Math.abs(secondValue)));
  const max = Math.floor(Math.max(Math.abs(firstValue), Math.abs(secondValue)));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getUniqNumberFromRange = (min, max) => {
  const previousValues = [];
  return function() {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while(previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createNumberGenerator = () => {
  let firstGeneratedNumber = 0;

  return function() {
    firstGeneratedNumber += 1;
    return firstGeneratedNumber;
  };
};

const uniqValue = createNumberGenerator();

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {
  getRandomInteger,
  getUniqNumberFromRange,
  uniqValue,
  getRandomElement,
};
