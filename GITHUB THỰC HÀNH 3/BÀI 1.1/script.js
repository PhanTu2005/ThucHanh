// Biến lưu trữ danh sách công việc
let tasks = [];
let currentFilter = 'all'; // all, active, completed

// Tải công việc từ localStorage khi mở trang
window.onload = function() {
    loadTasksFromLocalStorage();
    renderTasks();
}

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function(e){
    if (e.key === 'Enter') addTask();
});

// Lọc công việc
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Thêm công việc mới
function addTask() {
    const input = document.getElementById('task-input');
    const title = input.value.trim();
    if (!title) {
        alert("Vui lòng nhập nội dung công việc!");
        return;
    }
    const newTask = {
        id: Date.now(),
        title: title,
        isDone: false
    };
    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTasks();
    input.value = "";
    input.focus();
}

// Hiển thị danh sách công việc
function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = "";
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone);
    }
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.className = 'task-title' + (task.isDone ? ' completed' : '');
        span.textContent = task.title;
        span.addEventListener('click', () => toggleTask(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Xóa';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

// Đánh dấu hoàn thành
function toggleTask(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx > -1) {
        tasks[idx].isDone = !tasks[idx].isDone;
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Xóa công việc
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToLocalStorage();
    renderTasks();
}

// Lưu vào localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Tải từ localStorage
function loadTasksFromLocalStorage() {
    try {
        const data = localStorage.getItem('tasks');
        if (data) {
            tasks = JSON.parse(data);
        }
    } catch (e) {
        tasks = [];
    }
}
function deleteTask(id) {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa công việc này không?");
    if (isConfirmed) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasksToLocalStorage();
        renderTasks();
    }
}