
const showNoteFormBtn = document.getElementById('show-note-form-btn');
const noteForm = document.getElementById('note-form');
const addNoteBtn = document.getElementById('add-note-btn');
const noteTitleInput = document.getElementById('note-title');
const noteDetailsInput = document.getElementById('note-details');
const notesList = document.getElementById('notes-list');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupDetails = document.getElementById('popup-details');
const popupClose = document.querySelector('.popup-close');

function createNoteItem(title, details) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    noteItem.innerHTML = `
        <div>
            <h4>${title}</h4>
            <p>${details}</p>
        </div>
        <button class="delete-note-btn">Delete</button>
    `;
    notesList.appendChild(noteItem);

    const deleteBtn = noteItem.querySelector('.delete-note-btn');
    deleteBtn.addEventListener('click', () => {
        notesList.removeChild(noteItem);
    });

    noteItem.addEventListener('click', () => {
        popup.style.display = 'flex';
        popupTitle.textContent = title;
        popupDetails.textContent = details;
    });
}

showNoteFormBtn.addEventListener('click', () => {
    noteForm.style.display = 'block';
    showNoteFormBtn.style.display = 'none'; 
});

addNoteBtn.addEventListener('click', () => {
    const title = noteTitleInput.value.trim();
    const details = noteDetailsInput.value.trim();

    if (title && details) {
        createNoteItem(title, details);
        noteTitleInput.value = '';
        noteDetailsInput.value = '';
        noteForm.style.display = 'none'; 
        showNoteFormBtn.style.display = 'inline-block'; 
    } else {
        alert('Please enter both title and details for the note.');
    }
});

popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
