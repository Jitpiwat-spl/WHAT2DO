
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function renderTasks() {
    const infobarElement = document.querySelector(".infobar");
    infobarElement.innerHTML = ""; 
    tasks.forEach((task, index) => {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");
        taskContainer.innerHTML = `
            <div class="task-item">${task.name}</div>
            <div class="task-des">${task.description}</div>
            <div class="task-date">${task.date}</div>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(index);x
        });

        taskContainer.appendChild(deleteButton);

        infobarElement.appendChild(taskContainer);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.querySelector("form").addEventListener("submit", function(event) { 

    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDate = document.getElementById("datetask").value;

        
    const newTask = {
        name: taskName,
        description: taskDescription,
        date: taskDate
    };
    
    tasks.push(newTask);

    saveTasks();
    renderTasks();
    document.querySelector("form").reset();
});

document.addEventListener("DOMContentLoaded", renderTasks);
