// UI
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
}

function resetForm() {
  document.querySelector(".add__type").value = "+";
  document.querySelector(".add__description").value = "";
  document.querySelector(".add__value").value = "";
}

function getItemsFromLS() {
  let items = localStorage.getItem("items");

  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }

  return items;
}

function addItemsToLS(desc, time, type, value) {
  let items = getItemsFromLS();
  items.push({ desc, time, type, value });

  localStorage.setItem("items", JSON.stringify(items));
}

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
