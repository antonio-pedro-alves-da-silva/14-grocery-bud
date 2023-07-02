// variables in the global scope
let editID;

// selecting items

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const input = document.querySelector("#grocery");
const submit = document.querySelector(".submit-btn");
const groceryList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// displaying the items from the local storage property items
(function displayItemsInLocalStorage() {
  groceryList.innerHTML = localStorage.getItem("items");
})();

// function to display alert

function displayAlert(state, message) {
  alert.classList.add(`alert-${state}`);
  alert.textContent = message;
  setTimeout(function () {
    alert.classList.remove(`alert-${state}`);
    alert.textContent = "";
  }, 1000);
}

// some options for the button
submit.addEventListener("click", function (e) {
  e.preventDefault();
  let opt1 = "submit";
  let opt2 = "edit";

  if (submit.textContent == opt1) {
    addItem(e);
  } else if (submit.textContent == opt2) {
    editItem(editID, input.value);
  }
});

// creating item to the list

function createItem(id, title) {
  return `<div class="grocery-item" data-id="${id}">
  <p class="title">${title}</p>
  <span>
    <i class="fa fa-edit edit-btn"></i>
    <i class="fa fa-trash delete-btn"></i>
  </span>
</div>`;
}

// adding the item in the list

function addItem(e) {
  if (!/^\s*$/.test(input.value)) {
    // creating item
    const id = new Date().getTime();
    const item = createItem(id, input.value);

    groceryList.innerHTML += item;
    input.value = "";
    // setting the items property to the local storage

    setLocalItems(groceryList);
    // displaying alert
    displayAlert("success", "the item was sucessfully added");
  }
}

// deleting item in the list
groceryList.addEventListener("click", deleteItem);

function deleteItem(e) {
  // using event delegation
  if (e.target.matches(".delete-btn")) {
    groceryList.removeChild(e.target.parentElement.parentElement);
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    // setting the items property in the local storage
    setLocalItems(groceryList);

    // displaying alert
    displayAlert("danger", "the item was removed");
  }
  // setting back to default
  submit.textContent = "submit";
}

// clearing all items

clearBtn.addEventListener("click", clearAllItems);

function clearAllItems() {
  groceryList.innerHTML = "";
  // clearing from the local storage
  localStorage.removeItem("items");
  // displaying alert
  displayAlert("danger", "all items was cleared");
}

// edit the item
groceryList.addEventListener("click", getEditID);

function getEditID(e) {
  // using event delegation itemN itemName
  if (e.target.matches(".edit-btn")) {
    editID = e.target.parentElement.parentElement.getAttribute("data-id");
    submit.textContent = "edit";
  }
}

function editItem(id, itemName) {
  const item = groceryList.querySelector(`[data-id="${id}"]`);
  item.firstElementChild.textContent = itemName;
  // setting the items property to the local storage
  setLocalItems(groceryList)

  // displaying alert
  displayAlert("success", "the item was edited");
  // setting back to default
  submit.textContent = "submit";
}

// setting items in local storage
function setLocalItems(groceryList) {
  localStorage.setItem("items", `${groceryList.innerHTML}`);
}
