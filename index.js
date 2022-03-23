document
  .querySelector("#ewallet-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const type = document.querySelector(".add__type").value;
    const desc = document.querySelector(".add__description").value;
    const value = document.querySelector(".add__value").value;

    if (desc.length > 0 && value.length > 0) {
      addItems(type, desc, value);
      resetForm();
    }
  });

// UI functions

showItems();

function showItems() {
  let items = getItemsFromLS();
  const collection = document.querySelector(".collection");

  for (let item of items) {
    const newHTML = `
      <div class="item">
      <div class="item-description-time">
        <div class="item-description">
          <p>${item.desc}</p>
        </div>
        <div class="item-time">
          <p>${item.time}</p>
        </div>
      </div>
      <div class="item-amount ${
        item.type === "+" ? "income-amount" : "expense-amount"
      }">
        <p>${item.type}$${item.value}</p>
      </div>
    </div>
      `;
    collection.insertAdjacentHTML("afterbegin", newHTML);
  }
}

function addItems(type, desc, value) {
  const time = getFormattedTime();
  const newHTML = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${
      type === "+" ? "income-amount" : "expense-amount"
    }">
      <p>${type}$${value}</p>
    </div>
  </div>
    `;

  const collection = document.querySelector(".collection");
  collection.insertAdjacentHTML("afterbegin", newHTML);

  addItemsToLS(desc, time, type, value);
  showTotalIncome();
  showTotalExpense();
  showTotalBalance();
}

function resetForm() {
  document.querySelector(".add__type").value = "+";
  document.querySelector(".add__description").value = "";
  document.querySelector(".add__value").value = "";
}

// LS Functions

function getItemsFromLS() {
  let items = localStorage.getItem("items");

  return (items = items ? JSON.parse(items) : []);

  // if (items) {
  //   items = JSON.parse(items);
  // } else {
  //   items = [];
  // }

  //return items;
}

function addItemsToLS(desc, time, type, value) {
  let items = getItemsFromLS();
  items.push({ desc, time, type, value });

  localStorage.setItem("items", JSON.stringify(items));
}

// Calculator functions

function showTotalIncome() {
  let items = getItemsFromLS();
  let totalIncome = 0;

  for (item of items) {
    item.type === "+" ? (totalIncome += parseInt(item.value)) : totalIncome;
  }

  document.querySelector(".income__amount p").innerText = `$${totalIncome}`;
}

showTotalIncome();

function showTotalExpense() {
  let items = getItemsFromLS();
  let totalExpense = 0;

  for (item of items) {
    item.type === "-" ? (totalExpense += parseInt(item.value)) : totalExpense;
  }

  document.querySelector(".expense__amount p").innerText = `$${totalExpense}`;
}

showTotalExpense();

function showTotalBalance() {
  const items = getItemsFromLS();
  let balance = 0;

  for (item of items) {
    if (item.type === "+") {
      balance += parseInt(item.value);
    } else {
      balance -= parseInt(item.value);
    }
  }

  document.querySelector(".balance__amount p").innerText = balance;
  document.querySelector("header").className = balance >= 0 ? "green" : "red";
}

showTotalBalance();

// Utility Functions
function getFormattedTime() {
  const now = new Date().toLocaleTimeString("en-us", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now.split(",")[0].split(" ");
  const time = now.split(",")[1];

  return `${date[1]} ${date[0]},${time}`;
}
