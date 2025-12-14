const boardChild = document.getElementById("board").children;
let draggedElement = null;

const dragEvent = (element) => {
  element.addEventListener("drop", (elem) => {
    elem.preventDefault();
    element.classList.remove("drag");
    // console.log(draggedElement, element);
    element.appendChild(draggedElement);
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

for (let i = 0; i < boardChild.length; i++) {
  const element = boardChild[i];
  dragEvent(element);
}

const columns = document.querySelectorAll(".board-child");

columns.forEach((col) => {
  col.addEventListener("drag", (e) => {
    draggedElement = e.target;
  });
});
