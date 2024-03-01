document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    taskForm.onsubmit = async (e) => {
      e.preventDefault();
      const description = taskInput.value;
      if (description) {
        await fetch('/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description }),
        });
        taskInput.value = ''; // Clear input field
        loadTasks();
      }
    };
  
    const loadTasks = async () => {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      displayTasks(tasks);
    };
  
    const displayTasks = (tasks) => {
      taskList.innerHTML = ''; // Clear existing tasks
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.description;
  
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task._id);
  
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(task._id, task.description);
  
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        taskList.appendChild(li);
      });
    };
  
    const deleteTask = async (taskId) => {
        await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
        loadTasks(); // Refresh the list of tasks
      };
      
  
    const editTask = async (index, currentDescription) => {
      const newDescription = prompt("Edit task:", currentDescription);
      if (newDescription !== null && newDescription !== currentDescription) {
        await fetch(`/tasks/${index}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: newDescription }),
        });
        loadTasks(); // Refresh the list
      }
    };
  
    loadTasks(); // Initial load of tasks
  });
  
  //
  const loadTasks = async () => {
    // Fetch the tasks from your server
    const response = await fetch('/tasks');
    const tasks = await response.json();
  
    // Clear existing tasks in the UI
    const tasksContainer = document.querySelector('#tasksContainer');
    tasksContainer.innerHTML = '';
  
    // Iterate over the tasks and create UI elements for each
    tasks.forEach((task) => {
      const taskElement = document.createElement('div');
      taskElement.textContent = task.description; // Example of adding task description
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteTask(task._id); // Attach delete functionality
      taskElement.appendChild(deleteButton);
  
      tasksContainer.appendChild(taskElement); // Add the task element to the container
    });
  };
  

  