// Obtener los elementos del DOM
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');

// Cargar tareas desde el almacenamiento local al inicio
document.addEventListener('DOMContentLoaded', loadTasks);

// Función para cargar tareas desde el almacenamiento local
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Función para crear un elemento de tarea
function createTaskElement(text, completed = false) {
    const li = document.createElement('li');

    // Checkbox para completar la tarea
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed');
        updateTaskStorage();
    });

    // Texto de la tarea
    const span = document.createElement('span');
    span.textContent = text;

    // Botón para eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.style.backgroundColor = 'aqua';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li);
        updateTaskStorage();
    });

    // Añadir elementos al li y luego al ul
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    if (completed) {
        li.classList.add('completed');
    }
    taskList.appendChild(li);
}

// Función para añadir una nueva tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    createTaskElement(taskText);
    updateTaskStorage();
    taskInput.value = '';
}

// Actualizar el almacenamiento local con las tareas actuales
function updateTaskStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const text = li.querySelector('span').textContent;
        const completed = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Añadir evento al botón para añadir tarea
addTaskButton.addEventListener('click', addTask);

// Permitir añadir tarea con la tecla Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});
