const checkPalindrome = (string) => {
  string = String(string).toLowerCase().replaceAll(' ', '');
  return string === string.split('').reverse().join('');
};

const getInteger = (string) => parseInt(String(string).replace(/\D/g, ''), 10);

const addSymbols = (string, length, extension) => {
  string = String(string);

  while (string.length < length) {
    string = extension.slice(0, length - string.length) + string;
  }

  return string;
};

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const checkStringLength = (string, length) => String(string).length <= length;

const findDuplicates = (elements) => elements.filter((item, index) => elements.indexOf(item) !== index);

export {
  checkPalindrome,
  getInteger,
  getRandomInteger,
  addSymbols,
  checkStringLength,
  findDuplicates
};
