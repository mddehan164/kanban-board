const boardChild = document.getElementById("board").children;
let draggedElement = null;
let tasks = [];
const modal = document.getElementById("modal");
const addBtn = document.getElementById("add-task");
// make local storage to store tasks
const saveToLocalStorage = (item) => {
  localStorage.setItem("tasks", JSON.stringify(item));
};

// create task card
const createTask = (task) => {
  const newCard = document.createElement("div");
  newCard.dataset.index = task.id;
  newCard.classList.add("card");
  newCard.setAttribute("draggable", "true");
  newCard.innerHTML = `<h2 class="task-name">${task.name}</h2> <p>${task.des}</p> <button class="delete btn btn-danger" onclick = "deleteCard(this)">Remove</button>`;

  // adding drag and drop functionality to new card
  newCard.addEventListener("drag", (e) => {
    draggedElement = e.target;
  });

  // appending new card to todo column

  if (task.type === "tasks") {
    boardChild[0].appendChild(newCard);
  } else if (task.type === "progress") {
    boardChild[1].appendChild(newCard);
  } else if (task.type === "status") {
    boardChild[2].appendChild(newCard);
  }
};

// count logic

const counter = (tasks) => {
  const taskNum = tasks.filter((t) => t.type === "tasks");
  const progressNum = tasks.filter((t) => t.type === "progress");
  const statusNum = tasks.filter((t) => t.type === "status");
  document.getElementById("task-count").innerText = taskNum.length;
  document.getElementById("progress-count").innerText = progressNum.length;
  document.getElementById("status-count").innerText = statusNum.length;
};

// load from local storage
const loadFromLocalStorage = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
    counter(tasks);

    tasks.forEach((t) => {
      createTask(t);
    });
  }
};

// drag and drop events
const dragEvent = (element) => {
  element.addEventListener("drop", (elem) => {
    elem.preventDefault();
    element.classList.remove("drag");

    element.appendChild(draggedElement);
    const cardId = Number(draggedElement.dataset.index);
    const task = tasks.find((t) => t.id === cardId);

    if (task) {
      task.type = element.id;
      saveToLocalStorage(tasks);
      counter(tasks);
    }
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

  element.addEventListener("drag", (e) => {
    draggedElement = e.target;
  });
};

// applying drag and drop event listeners to all columns
for (let i = 0; i < boardChild.length; i++) {
  const element = boardChild[i];
  dragEvent(element);
}

// modal functionality

addBtn.addEventListener("click", () => {
  modal.classList.remove("vanish");
});

modal.addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    modal.classList.toggle("vanish");
  }
});

// adding new task functionality
const taskAddBtn = document.getElementById("btn-task-add");

taskAddBtn.addEventListener("click", () => {
  let taskName = document.getElementById("task-name");
  let taskDes = document.getElementById("task-des");

  if (taskName.value === "") {
    alert("Task cannot be empty");
  } else {
    const task = {
      id: Date.now(),
      name: taskName.value,
      des: taskDes.value,
      type: "tasks",
    };
    tasks.push(task);
    saveToLocalStorage(tasks);
    createTask(task);
    counter(tasks);
    modal.classList.add("vanish");

    // clearing input fields
    taskName.value = "";
    taskDes.value = "";
  }
});

// delete task functionality
const deleteCard = (btn) => {
  const card = btn.parentNode;
  const cardId = Number(card.dataset.index);

  // remove from tasks array
  tasks = tasks.filter((t) => t.id !== cardId);
  // update storage & UI
  saveToLocalStorage(tasks);
  counter(tasks);

  // remove from DOM
  card.remove();
};

document.onload = loadFromLocalStorage();
