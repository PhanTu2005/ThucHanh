let tasks = [];

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Thêm công việc
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Vui lòng nhập công việc.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    isDone: false,
  };

  tasks.push(task);
  input.value = "";
  saveTasksToLocalStorage();
  renderTasks();
}

addBtn.addEventListener("click", addTask);
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.isDone ? "completed" : "";
    li.innerHTML = `
      <span class="task-text" data-id="${task.id}">${task.text}</span>
      <button class="delete-btn" data-id="${task.id}">X</button>
    `;
    taskList.appendChild(li);
  });
}

// Đánh dấu / Xóa
taskList.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("task-text")) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
  } else if (e.target.classList.contains("delete-btn")) {
    tasks = tasks.filter((task) => task.id !== id);
  }

  saveTasksToLocalStorage();
  renderTasks();
});
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
  renderTasks();
}

// Gọi khi trang tải
loadTasksFromLocalStorage();
const filterSelect = document.getElementById("filter");
filterSelect.addEventListener("change", renderTasks);

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  const filter = filterSelect.value;
  if (filter === "done") {
    filteredTasks = tasks.filter((t) => t.isDone);
  } else if (filter === "notdone") {
    filteredTasks = tasks.filter((t) => !t.isDone);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.isDone ? "completed" : "";
    li.innerHTML = `
      <span class="task-text" data-id="${task.id}">${task.text}</span>
      <button class="delete-btn" data-id="${task.id}">X</button>
    `;
    taskList.appendChild(li);
  });
}
