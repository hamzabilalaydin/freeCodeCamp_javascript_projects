const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const checkValidNumber = (input) => {
  if (input === "") {
    alert("Please provide a phone number");
    return;
  }
  const countryCode = "^(1\\s?)?";
  const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})";
  const spaceAndDash = "(\\s|-)?";
  const phoneNumber = "[0-9]{3}[\\s\\-]?([0-9]{4}$)";
  const phoneRegex = new RegExp(
    `${countryCode}${areaCode}${spaceAndDash}${phoneNumber}`
  );

  console.log(phoneRegex);

  const pTag = document.createElement("p");
  pTag.className = "results-text";
  phoneRegex.test(input)
    ? (pTag.style.color = "#0a9419")
    : (pTag.style.color = "#940a0a");
  pTag.appendChild(
    document.createTextNode(
      `${phoneRegex.test(input) ? "Valid" : "Invalid"} US number: ${input}`
    )
  );

  resultsDiv.appendChild(pTag);
};

checkBtn.addEventListener("click", () => {
  checkValidNumber(userInput.value);
  userInput.value = "";
});

clearBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkValidNumber(userInput.value);
    userInput.value = "";
  }
});
