document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const tasks = getTasks();
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleComplete(${index})">✔️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
