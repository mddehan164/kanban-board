const boardChild = document.getElementById("board").children;
let draggedElement = null;
let tasks = [];
// make local storage to store tasks
const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// load from local storage
const loadFromLocalStorage = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
  }
};
loadFromLocalStorage();

// drag and drop event listeners
const dragEvent = (element) => {
  element.addEventListener("drop", (elem) => {
    elem.preventDefault();
    element.classList.remove("drag");
    // console.log(draggedElement, element);
    element.appendChild(draggedElement);
    console.log(element);
  });

  element.addEventListener("dragover", (elem) => {
    elem.preventDefault();
  });
  element.addEventListener("dragenter", () => {
    element.classList.add("drag");
  });
  element.addEventListener("dragleave", () => {
    element.classList.remove("drag");
  });
};

// applying drag and drop event listeners to all columns
for (let i = 0; i < boardChild.length; i++) {
  const element = boardChild[i];
  dragEvent(element);
}

// getting all the cards
const columns = document.querySelectorAll(".board-child");

columns.forEach((col) => {
  col.addEventListener("drag", (e) => {
    draggedElement = e.target;
  });
});

// modal functionality
const modal = document.getElementById("modal");
const addBtn = document.getElementById("add-task");
addBtn.addEventListener("click", () => {
  modal.classList.toggle("vanish");
});

modal.addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    modal.classList.toggle("vanish");
  }
});

// adding new task functionality
const taskAddBtn = document.getElementById("btn-task-add");

taskAddBtn.addEventListener("click", () => {
  const taskName = document.getElementById("task-name").value;
  const taskDes = document.getElementById("task-des").value;
  const task = {
    name: taskName,
    des: taskDes,
    type: "tasks",
  };
  createTask(task);

  // delete task functionality
  // deleteCard();
});

// create task

const createTask = (task) => {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute("draggable", "true");
  newCard.innerHTML = `<h2>${task.name}</h2> <p>${task.des}</p> <button class="delete btn btn-danger ${task.type}" onclick = "deleteCard(this)">Remove</button>`;

  // adding drag and drop functionality to new card
  newCard.addEventListener("drag", (e) => {
    draggedElement = e.target;
  });

  // appending new card to todo column
  if (task.name === "") {
    alert("Task cannot be empty");
  } else {
    boardChild[0].appendChild(newCard);
    tasks.push(task);
    console.log(tasks);
    saveToLocalStorage();
    // clearing input fields

    document.getElementById("task-name").value = "";
    document.getElementById("task-des").value = "";
    modal.classList.toggle("vanish");
  }
};

// delete task functionality
const deleteCard = (id) => {
  console.log(id);
  id.parentNode.remove();
};

// deleteCard();
