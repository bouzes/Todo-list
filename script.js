let addBtn = document.getElementById('add-task');
let taskList = document.getElementById('task-list');
let input = document.getElementById('input');
let arr = [];

arr = JSON.parse(localStorage.getItem('todos')) || [];
arr.forEach(task => displayTask(task));
checkTaskListVisibility();

function addTask() {
    let value = input.value.trim();
    if (value === '') {
        alert("write a valid task");
        return;
    }

    let randomId = Math.random().toString(16).slice(2, 8);
    let newTask = { id: randomId, value: value };

    displayTask(newTask);
    arr.push(newTask);
    addToLocalStorage(arr);

    input.value = '';
    checkTaskListVisibility();
}

function displayTask(task) {
    let li = document.createElement('li');
    li.classList.add('task');
    li.id = task.id;
    li.textContent = task.value;

    let btnremove = document.createElement('button');
    btnremove.innerHTML = 'Remove';
    btnremove.classList.add('remove');
    btnremove.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTask(task.id);
    });
    li.appendChild(btnremove);

    li.addEventListener('click', () => {
        li.classList.toggle('complete');
    });

    taskList.appendChild(li);
}

function addToLocalStorage(tasks) {
    localStorage.setItem('todos', JSON.stringify(tasks));
}

function removeTask(id) {
    document.getElementById(id).remove();
    arr = arr.filter(task => task.id !== id);
    addToLocalStorage(arr);
    checkTaskListVisibility();
}

addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

function checkTaskListVisibility() {
    taskList.style.display = arr.length === 0 ? 'none' : 'block';
}

// ✅ زر الوضع الليلي
let themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = 
        document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
