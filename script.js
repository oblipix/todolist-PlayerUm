// Selecionando elementos do DOM
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const toggleThemeBtn = document.getElementById("toggle-theme-btn");

// Carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        tasks.push({ text: task.querySelector("span").textContent, completed: task.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa ao DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement("li");
    li.classList.add("task");
    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = text;
    span.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => editTask(span));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.append(span, editBtn, deleteBtn);
    taskList.appendChild(li);
    saveTasks();
}

// Editar tarefa
function editTask(span) {
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null) {
        span.textContent = newText;
        saveTasks();
    }
}

// Adicionar nova tarefa
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        addTaskToDOM(taskInput.value.trim());
        taskInput.value = "";
    }
});

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && taskInput.value.trim() !== "") {
        addTaskToDOM(taskInput.value.trim());
        taskInput.value = "";
    }
});

// Alternar tema claro/escuro
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

toggleThemeBtn.addEventListener("click", toggleTheme);

// Aplicar tema salvo
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// Inicializar tarefas
loadTasks();
