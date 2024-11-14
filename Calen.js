const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Tasks are loaded here

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = `${months[month]} ${year}`;

    let days = "";

  
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

  
    for (let i = 1; i <= lastDate; i++) {
        const taskDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const hasTask = tasks.some(task => task.date === taskDate);

        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            days += `<div class="day today${hasTask ? ' event' : ''}" data-date="${taskDate}">${i}</div>`;
        } else {
            days += `<div class="day${hasTask ? ' event' : ''}" data-date="${taskDate}">${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;

    document.querySelectorAll(".day").forEach(day => {
        day.addEventListener("click", function () {
            const date = this.dataset.date;
            if (date) showTasksForDate(date);
        });
    });
}

function showTasksForDate(date) {
    const taskitemElement = document.querySelector(".task-item");
    const taskdesElement = document.querySelector(".task-des");
    const taskdateElement = document.querySelector(".task-date");
    const showdayElement = document.querySelector(".event-date");
    const showweekdElement = document.querySelector(".event-day");
    const infootElement = document.querySelector(".infootask");


    infootElement.innerHTML="";


     const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    });

    const weekd = new Date(date).toLocaleDateString("en-US", {
        weekday:"long"
    });
    showdayElement.innerHTML = `<div> ${formattedDate}</div>`;
    showweekdElement.innerHTML = `<div><b>${weekd}</b></div>`;

    const tasksForDate = tasks.filter(task => task.date === date);

    if (tasksForDate.length > 0) {
        tasksForDate.forEach(task => {
            infootElement.innerHTML+=`<div>
                                    <div class="task-item">${task.name}</div>
                                    <div class="task-des">${task.description}</div>
            </div>`;
        });
    } else {
        infootElement.innerHTML = "<div>No tasks for this day</div>";
    }
}

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
    }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid date");
}

document.addEventListener("DOMContentLoaded", initCalendar);
