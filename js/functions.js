//функция сравнения длины моей строки myString с заданной длиной
//возвращает true если выполняется условие

const checkLength = (myString, linghtNumber) => {
  return myString.length <= linghtNumber;
}
checkLength ('проверяемая строка', 18);


/*Функция для проверки, является ли строка палиндромом.
предусмотрите случай, когда в строке встречаются пробелы.
*/
const checkPoly = (poly) => {
  poly = poly.toString().toLowerCase().replace(/\s/g, '');
  /* приводим переменную poly к строковому виду маленькими буквами
  удаляем пробелы и знаки препинания */
  return poly === poly.split('').reverse().join('');
}
checkPoly ('Аргентина манит негра');

/* возвращаем true если выполняется полное равенство условию
  split разделяет строку на буквы reverse переворачивает фразу
  join склеивает те сравниваем poly как есть с poly наоборот */


/* Функция, которая принимает строку, извлекает содержащиеся
  в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
  Если в строке нет ни одной цифры, функция должна вернуть NaN.
  Предусмотреть случай, когда вместо строки приходит число.
  */

const extractNamb = (string) => {
  let result = '';
  for (let i=0; i<string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt (result, 10);
}
extractNamb ('подпдпр 1.5');
/* выполняем цикл и если результат не NaN склеиваем
  цифры в result. Выводим результат функции в десятичной
  системе счисления.
*/


/* стрелочная функция, которая принимает три параметра:
исходную строку, минимальную длину и строку с добавочными символами
Возвращает исходную строку, дополненную добавочными символами до заданной длины.
Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца.
*/
const leftPad = (text, minLength, addCharacters) => {
  const inputText = text.toString();
  // приводим text к строке  и пишем в переменную inputText
  const inputAddCharacters = addCharacters.toString();
  // приводим addCharacters к строке  и пишем в переменную inputAddCharacters
  if(inputText.length < minLength) {
    const outputAddCharaters = inputAddCharacters.repeat(minLength - inputText.length);
    // повторяем добавочную строку (minLength-inputText.length) раз
    return outputAddCharaters.slice(0, minLength - inputText.length) + inputText;
  /* возвращаем массив outputAddCharaters от 0 до (minLength-inputText.length)
  и добавляем введенный текст если текст меньше указанной длины
  */
  }
  return inputText;
  // возвращаем введенный текст если он больше указанной длины
};
leftPad ('q', 4, 'we');
