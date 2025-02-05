const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const toggleThemeBtn = document.getElementById('toggleTheme');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="buttons">
        <button class="editBtn">✏️</button>
        <button class="completeBtn">${task.completed ? '✔️' : '✅'}</button>
        <button class="deleteBtn">❌</button>
      </div>
    `;

    li.querySelector('.editBtn').addEventListener('click', () => editTask(index));
    li.querySelector('.completeBtn').addEventListener('click', () => markAsCompleted(index));
    li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));

    taskList.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function markAsCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edite a tarefa:', tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    renderTasks();
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

addTaskBtn.addEventListener('click', addTask);
toggleThemeBtn.addEventListener('click', toggleTheme);

renderTasks();
