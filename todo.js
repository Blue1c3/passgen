const addBtn = document.getElementById("add-task");
const input = document.getElementById("new-task");
const list = document.getElementById("task-list");

function createTask(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", () => li.classList.toggle("completed"));

  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.addEventListener("click", () => li.remove());

  li.appendChild(span);
  li.appendChild(delBtn);

  list.appendChild(li);
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    createTask(text);
    input.value = "";
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});
