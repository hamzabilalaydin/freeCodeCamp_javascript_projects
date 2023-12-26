function getVal() {
  getInput();
}

const getInput = () => {
  const input = document.getElementById("text-input");
  if (input.value.length <= 0) {
    alert("Please input a value");
  } else {
    checkInput(input.value);
  }
  input.value = "";
};
let newArr = [];
const checkInput = (input) => {
  const inputArr = input.split(/^\w/i);
  const newInputArr = [];
  let newInputStr = "";
  for (const el of inputArr) {
    if (el.length > 0) {
      let lowerCaseEl = el.toLowerCase();
      newInputArr.push(lowerCaseEl);
      console.log(newInputArr);
      newInputStr += lowerCaseEl;
    }
  }
  checkInputStr(newInputStr, newInputArr);
};

const checkInputStr = (str, arr) => {
  let newStr = arr.join(" ");
  console.log(newStr);

  const input = document.getElementById("text-input");
  let result = document.getElementById("result");
  newStr = input.value;
  let len = str.length;
  if (len === 1) {
    console.log(`${str} is a palindrome`);
    result.innerHTML = `<p>${newStr} is a palindrome<p>`;
    return;
  } else if (len % 2 == 0) {
    let lenHalf = len / 2;
    for (let i = 0; i < lenHalf; i++) {
      if (str[i] === str[len - (i + 1)]) {
        if (i === lenHalf - 1) {
          console.log(`${newStr} is a palindrome`);
          result.innerHTML = `<p>${newStr} is a palindrome<p>`;
          return;
        }
      } else {
        console.log(`${newStr} is not a palindrome`);
        result.innerHTML = `<p>${newStr} is not a palindrome<p>`;
        return;
      }
    }
  } else if (len % 2 === 1) {
    len += 1;
    let lenHalf = len / 2;
    for (let i = 0; i < lenHalf; i++) {
      if (str[i] === str[len - (i + 2)]) {
        if (i === lenHalf - 1) {
          console.log(`${newStr} is a palindrome`);
          result.innerHTML = `<p>${newStr} is a palindrome<p>`;
          return;
        }
      } else {
        console.log(`${newStr} is not a palindrome`);
        result.textContent = `${newStr} is not a palindrome`;
        return;
      }
    }
  }
};
