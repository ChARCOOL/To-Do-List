//get DOM
const textLi = document.querySelector(".container__add--input");
const addLi = document.querySelector(".container__add--submit");
const listOl = document.querySelector(".container__list--items");
const clearBtn = document.getElementById("clear");
const emptyBtn = document.getElementById("empty");
const saveBtn = document.getElementById("save");
let listOlLi = document.querySelectorAll(".container__list--items li");

addList();
markDone();

clearBtn.addEventListener("click", clearButton);
emptyBtn.addEventListener("click", emptyButton);
saveBtn.addEventListener("click", saveList);

//enter or click for input
textLi.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    newLi();
  } else {
    addLi.addEventListener("click", newLi);
  }
});

function newLi() {
  //check if textbox is empty
  if (textLi.value === "") {
    alert("Enter something!");
  } else {
    //create list item
    const li = document.createElement("LI");

    //create list item content and appent to list item
    const liContent = document.createTextNode(textLi.value);
    li.appendChild(liContent);

    //add list item content to ordered list
    listOl.appendChild(li);

    //clear textbox after use
    textLi.value = "";

    listOlLi = document.querySelectorAll(".container__list--items li");
    markDone();
  }
}

function emptyButton() {
  listOlLi = document.querySelectorAll(".container__list--items li");
  for (item of listOlLi) {
    item.parentNode.removeChild(item);
  }
}

function clearButton() {
  listOlLi = document.querySelectorAll(".container__list--items li");
  for (item of listOlLi) {
    //check if item has "line-throught" if delete
    if (item.style.textDecoration === "line-through") {
      item.parentNode.removeChild(item);
    }
  }
}

function markDone() {
  listOlLi = document.querySelectorAll(".container__list--items li");
  for (item of listOlLi) {
    item.addEventListener("dblclick", function () {
      //check if item has "line-through" if not add
      if (this.style.textDecoration !== "line-through") {
        this.style.textDecoration = "line-through";
      }
    });
  }
}

//saving and reading listOlLi object inside JSON
function saveList() {
  //create empty array
  var listOlLiArr = [];
  listOlLi = document.querySelectorAll(".container__list--items li");
  for (item of listOlLi) {
    listOlLiArr.push(item.innerHTML);
  }
  //add to local storage
  if (!listOlLiArr.length < 1) {
    localStorage.setItem("list", JSON.stringify(listOlLiArr));
  }
}

function addList() {
  //clear old
  for (item of listOlLi) {
    item.parentNode.removeChild(item);
  }

  if (!JSON.parse(localStorage.getItem("list")) < 1) {
    for (item of JSON.parse(localStorage.getItem("list"))) {
      //create list item
      const li = document.createElement("LI");

      //create list item content and appent to list item
      const liContent = document.createTextNode(item);
      li.appendChild(liContent);

      //add list item content to ordered list
      listOl.appendChild(li);
    }
  }
}
