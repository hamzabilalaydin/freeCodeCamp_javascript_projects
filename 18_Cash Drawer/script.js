let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashDrawer = document.getElementById("cash-drawer-display");
const priceScreen = document.getElementById("price-screen");
const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");

const formatResults = (status, change) => {
  changeDue.innerHTML = "";
  changeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    (money) => (changeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

const purchase = () => {
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }

  if (Number(cash.value) === price) {
    changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    cash.value = "";
    return;
  }

  let changer = Number(cash.value) - price;
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: "OPEN", change: [] };
  let totalCid = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((a, b) => a + b)
      .toFixed(2)
  );

  if (totalCid < changer) {
    return (changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }

  if (totalCid === changer) {
    formatResults("CLOSED", cid);
  }

  for (let i = 0; i < reversedCid.length; i++) {
    if (changer > denominations[i] && changer > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && changer >= denominations[i]) {
        total -= denominations[i];
        changer = parseFloat((changer - denominations[i]).toFixed(2));
        count++;
      }
      result.change.push([reversedCid[i][0], count * denominations[i]]);
    }
  }
  if (changer > 0) {
    return (changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  purchase();
};

const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };

  if (change) {
    change.forEach((changeArr) => {
      const targetArr = cid.find((cidArr) => cidArr[0] === changeArr[0]);
      if (targetArr) {
        targetArr[1] = parseFloat(
          (targetArr[1] - changeArr[1]).toFixed(2)
        );
      }
    });
  }
  cash.value = "";
  priceScreen.textContent = `Total: $${price}`;
  cashDrawer.innerHTML = `<p><strong>Change in drawer:</strong></p>
  ${cid
    .map((money) => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
    .join("")}  
    `;
};

purchaseBtn.addEventListener("click", checkResults);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkResults();
  }
});

updateUI();
