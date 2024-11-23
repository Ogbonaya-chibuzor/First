let listArray = [];
const inputEL = document.getElementById("input-el");
const addBtn = document.getElementById("add-btn");
const olEl = document.getElementById("ol-el");
let itemsFromLocalStorage = JSON.parse(localStorage.getItem("listArray"));

//to render list items stored in local storage when page is refreshed
if (itemsFromLocalStorage) {
  listArray = itemsFromLocalStorage;
  renderList(listArray);
}

// Add task when Add button is clicked
addBtn.addEventListener("click", function addToList() {
  const newTask = {
    text: inputEL.value.trim(),
    isDone: false, // New task starts as not done
  };
  listArray.push(newTask);
  storeData();
  inputEL.value = "";
  renderList(listArray);
});

//function to render list items
function renderList(arr) {
  olEl.innerHTML = ""; //clear the ulEl before running the code

  //create a loop to loop through the array  and follow the code and apply it to each element
  for (let i = 0; i < arr.length; i++) {
    const list = document.createElement("li");
    list.classList.add("list-el"); //gives the new list created a class

    const textspan = document.createElement("span");
    textspan.innerHTML += arr[i].text; //puts the  text from the new task object into the span
    list.appendChild(textspan);

    // Apply line-through styling if the task is marked as done
    if (arr[i].isDone) {
      textspan.style.textDecoration = "line-through";
    }

    const div = document.createElement("div");
    textspan.appendChild(div);

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "DONE";
    doneBtn.classList.add("done-el");
    div.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";
    deleteBtn.classList.add("delete-el");
    div.appendChild(deleteBtn);

    inputEL.value = "";

    //mark task as done by setting the isDone property to true
    doneBtn.addEventListener("click", function () {
      arr[i].isDone = true; // Update the task status
      textspan.style.textDecoration = "line-through";
      storeData();
    });

    // deletes items from localstorage and removes them from the list
    deleteBtn.addEventListener("click", function () {
      if (arr) {
        arr.splice(i, 1); // Removes the task from the array
        storeData();
      }
      list.remove();
    });

    //connect or append the list to the html ol element
    olEl.appendChild(list);
  }
}
// a fuction to save the array to the local storage
function storeData() {
  localStorage.setItem("listArray", JSON.stringify(listArray));
}
