const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

function addTask() {
  const taskName = taskInput.value.trim();

  if (taskName) {
    createHTMLElement({ name: taskName, completed: false });
    taskInput.value = '';
    saveTasks();
  } else {
    alert('The name of the task cannot be empty!');
  }
}

addTaskButton.addEventListener('click', addTask);

function createHTMLElement(task) {
  const listItem = document.createElement('li');
  listItem.setAttribute('class', 'list-group-item d-flex justify-content-between');

  listItem.innerHTML = `
    <div>
      <input class="form-check-input me-1" type="checkbox" value="" id="checkbox_${task.name}">
      <label class="form-check-label" for="checkbox_${task.name}">${task.name}</label>
    </div>
  `;

  const deleteTaskButton = document.createElement('button');
  deleteTaskButton.setAttribute('class', 'badge btn btn-danger');
  deleteTaskButton.setAttribute('id', 'deleteTaskButton');
  deleteTaskButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>
  `;

  deleteTaskButton.addEventListener('click', function () {
    taskList.removeChild(listItem);
    saveTasks();
  });

  const checkbox = listItem.querySelector('input[type="checkbox"]');
  const label = listItem.querySelector('label');
  checkbox.checked = task.completed;
  if (task.completed) {
    label.classList.add('text-decoration-line-through');
  }
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      label.classList.add('text-decoration-line-through');
    } else {
      label.classList.remove('text-decoration-line-through');
    }
    saveTasks();
  });

  listItem.appendChild(deleteTaskButton);
  taskList.appendChild(listItem);
}

function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll('li').forEach(function (item) {
    const label = item.querySelector('label');
    const checkbox = item.querySelector('input[type="checkbox"]');
    tasks.push({
      name: label.textContent.trim(),
      completed: checkbox.checked,
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(createHTMLElement);
}
