const taskInput = document.getElementById("task-title");
const button = document.querySelector("button");

taskInput.addEventListener("click", () => (taskInput.value = ""));

//Add
button.addEventListener("click", function () {
  const tskText = taskInput.value;

  const liElement = document.createElement("li");
  liElement.classList.add("li-element");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = tskText;
  liElement.appendChild(taskSpan);

  //Delete
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", "images/deleteIcon.svg");
  deleteIcon.setAttribute("alt", "delete icon");
  deleteIcon.setAttribute("width", "20");
  deleteIcon.setAttribute("height", "20");

  deleteBtn.classList.add("custom-btn");
  deleteBtn.appendChild(deleteIcon);

  deleteBtn.addEventListener("click", () => liElement.remove());

  liElement.appendChild(deleteBtn);

  // Edit
  const editBtn = document.createElement("button");
  const editIcon = document.createElement("img");
  editIcon.setAttribute("src", "images/edit-icon.svg");
  editIcon.setAttribute("alt", "Edit icon");
  editIcon.setAttribute("width", "20");
  editIcon.setAttribute("height", "20");

  editBtn.classList.add("custom-btn");
  editBtn.appendChild(editIcon);

  editBtn.addEventListener("click", function () {
    const currentText = taskSpan.textContent;
    const editedText = prompt("Edit Text :", currentText);
    if (editedText !== null && editedText.trim() !== "") {
      taskSpan.textContent = editedText;
    }
  });

  liElement.appendChild(editBtn);

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      taskSpan.classList.add("checked");
      // message using timeset
      const msg = document.getElementById("message");
      msg.textContent = "✅ تسک با موفقیت انجام شد";
      msg.classList.add("messageStyle");
      setTimeout(function () {
        msg.textContent = "";
        msg.classList.remove("messageStyle");
      }, 3000);
    } else {
      taskSpan.classList.remove("checked");
    }
  });

  liElement.prepend(checkbox);

  const ulElement = document.getElementById("showList");
  ulElement.appendChild(liElement);

  taskInput.value = "";
});

// handle filters
function showFilterTasks(condition) {
  const allTasks = document.querySelectorAll("li");
  allTasks.forEach((li) => {
    const checkbox = li.querySelector("input[type='checkbox']");
    const isChecked = checkbox.checked;
    if (condition === "showAll") {
      li.style.display = "flex";
    } else if (condition === "showDone" && isChecked) {
      li.style.display = "flex";
    } else if (condition === "showTodo" && !isChecked) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
}
const showAll = document.getElementById("showAllBtn");
const showDone = document.getElementById("showCheckedBtn");
const showTodo = document.getElementById("showUncheckedBtn");
showAll.addEventListener("click", () => showFilterTasks("showAll"));
showDone.addEventListener("click", () => showFilterTasks("showDone"));
showTodo.addEventListener("click", () => showFilterTasks("showTodo"));

//set alert per hour
setInterval(() => {
  const allTasks = document.querySelectorAll("li");
  let counter = 0;
  allTasks.forEach((li) => {
    const checkbox = li.querySelector("input[type='checkbox']");

    if (!checkbox.checked) {
      counter++;
    }
  });
  if (counter > 0) {
    alert(`You have still ${counter} task to do⚠️`);
  }
}, 60 * 60 * 1000);
