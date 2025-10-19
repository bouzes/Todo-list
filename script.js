let addBtn = document.getElementById('add-task');
let taskList = document.getElementById('task-list');
let input = document.getElementById('input');
let arr = [];

// ✅ تحميل المهام من localStorage عند بداية السكريبت
arr = JSON.parse(localStorage.getItem('todos')) || [];

// ✅ عرض المهام المحفوظة عند التحديث
arr.forEach(task => {
    displayTask(task);
});

checkTaskListVisibility(); // ✅ إخفاء أو إظهار القائمة عند البداية

// Function to add task
function addTask() {
    let value = input.value.trim();
    if (value === '') {
        alert("write a valid task");
    } else {
        let randomId = Math.random().toString(16).slice(2, 8);
        let newTask = { id: randomId, value: value };

        // عرض في الصفحة
        displayTask(newTask);

        // تخزين في المصفوفة
        arr.push(newTask);

        // تحديث localStorage
        addToLocalStorage(arr);

        input.value = '';
        checkTaskListVisibility(); // ✅ تحديث العرض
    }
}

// ✅ دالة لعرض المهمة في الـ DOM (لإعادة الاستخدام)
function displayTask(task) {
    let li = document.createElement('li');
    li.classList.add('task');
    li.id = task.id;
    li.textContent = task.value;

    let btncomplete = document.createElement('button');
    btncomplete.innerHTML = 'complete';
    li.appendChild(btncomplete);

    btncomplete.addEventListener('click', () => {
        removeTask(task.id);
    });

    taskList.appendChild(li);
}

// Function to add to local storage
function addToLocalStorage(tasks) {
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Function to remove task
function removeTask(id) {
    // Remove from DOM
    document.getElementById(id).remove();

    // Update array
    arr = arr.filter(task => task.id !== id);

    // Update localStorage
    addToLocalStorage(arr);
    checkTaskListVisibility(); // ✅ تحديث العرض بعد الحذف
}

// ✅ إضافة بواسطة الزر
addBtn.addEventListener('click', addTask);

// ✅ إضافة عند الضغط على Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// ✅ دالة إخفاء أو إظهار القائمة حسب المحتوى
function checkTaskListVisibility() {
    if (arr.length === 0) {
        taskList.style.display = 'none';
    } else {
        taskList.style.display = 'block';
    }
}
