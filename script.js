const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const STORAGE_KEY = 'todoAppTasks';

// Retrieve the tasks array from Local Storage.
function getTasks() {
    const tasksJSON = localStorage.getItem(STORAGE_KEY);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

 // Save the current tasks array to Local Storage.
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Create / Add Task 
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const description = taskInput.value.trim();
    if (description === '') return; 
    
    const tasks = getTasks();
    
    // Create new task object
    const newTask = {
        id: Date.now(), 
        description: description,
        completed: false 
    };

    tasks.push(newTask);
    
    saveTasks(tasks); 
    renderTasks();    
    taskInput.value = ''; 
});

// Update & Delete 
function toggleTaskCompleted(id) {
    let tasks = getTasks();
    
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });

    saveTasks(tasks); 
    renderTasks();    
}

//Remove a task by ID. (DELETE)
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    
    saveTasks(tasks); 
    renderTasks();   
}

// Display all tasks currently loaded in the list.
function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.description;
        listItem.dataset.id = task.id; 

        // Apply styling for completed tasks
        if (task.completed) {
            listItem.classList.add('completed');
        }

        //  Action Buttons
        const buttonDiv = document.createElement('div');

        // Complete/Undo Button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.classList.add('complete-btn');
        // Attach the UPDATE function
        completeBtn.addEventListener('click', () => toggleTaskCompleted(task.id));
        
        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        // Attach the DELETE function
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        // Assemble the list item
        buttonDiv.appendChild(completeBtn);
        buttonDiv.appendChild(deleteBtn);
        listItem.appendChild(buttonDiv);
        taskList.appendChild(listItem);
    });
}

renderTasks();