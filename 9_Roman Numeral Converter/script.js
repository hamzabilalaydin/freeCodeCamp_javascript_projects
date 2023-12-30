const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const numbers = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

let numberValues = Object.values(numbers);
let numberKeys = Object.keys(numbers);
let newValArr = [];
let newKeyArr = [];

const decimalToRoman = (input) => {
  let currNum = numberValues[0];
  let currKey = numberKeys[0];
  currNum = numberValues[0];
  currKey = numberKeys[0];
  const remainder = input % currNum;
  const quotient = parseInt(input / currNum);

  if (remainder === 0 && quotient > 0) {
    numberValues = Object.values(numbers);
    numberKeys = Object.keys(numbers);
    console.log(quotient);
    console.log(currKey);
    return currKey.repeat(quotient);
  } else if (remainder > 0) {
    newValArr.push(numberValues.shift());
    newKeyArr.push(numberKeys.shift());
    return currKey.repeat(quotient) + decimalToRoman(remainder);
  } else if (remainder === 0 && quotient > 0) {
    return currKey;
  } else {
    newValArr.push(numberValues.shift());
    newKeyArr.push(numberKeys.shift());
    return currKey.repeat(quotient) + decimalToRoman(remainder);
  }
};

const checkUserInput = (input) => {
  const inputInt = parseInt(numberInput.value);

  if (!inputInt) {
    result.textContent = "Please enter a valid number";
    return;
  } else if (inputInt <= 0) {
    result.textContent =
      "Please enter a number greater than or equal to 1";
    return;
  } else if (inputInt >= 4000) {
    result.textContent =
      "Please enter a number less than or equal to 3999";
    return;
  }

  result.textContent = decimalToRoman(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});

console.log(Object.values(numbers)[0]);
