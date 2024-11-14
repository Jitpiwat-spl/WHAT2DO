
const openPopupBtn = document.getElementById("opentask");
const closePopupBtn = document.getElementById("closetask");
const taskmodal = document.getElementById("taskmodal");
const submit = document.getElementById("submit");

openPopupBtn.addEventListener("click", function() {
    taskmodal.style.display = "flex"; 
});


closePopupBtn.addEventListener("click", function() {
    taskmodal.style.display = "none"; 
});


window.addEventListener("click", function(event) {
    if (event.target === taskmodal) {
        taskmodal.style.display = "none"; 
    }
});

submit.addEventListener("click", function() {
    if (!taskName || !taskDescription || !taskDate) {
        alert("Please fill in all the fields!"); 
        return; }
    taskmodal.style.display = "none"; 
});

