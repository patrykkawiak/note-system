let time
let webDate
let createBtn
let shadow
let createBox
let confirmBox
let editBox
let cancelBtn
let addBtn

let confirmBtn
let declineBtn

let title
let text
let noteDate
let priority
let newTitle
let newText
let newNoteDate
let newPriority
let wrap

let acceptBtn
let editBtn
let delBtn

let newEditBtn
let newCancelBtn

let note
let helpNote
let secondHelpNote;

let id = localStorage.length;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    time = document.querySelector('.time');
    webDate = document.querySelector('.date');
    createBtn = document.querySelector('.create-note');
    shadow = document.querySelector('.shadow');
    cancelBtn = document.querySelector('.cancel-btn');
    addBtn = document.querySelector('.add-btn');
    title = document.querySelector('.title')
    text = document.querySelector('.text')
    noteDate = document.querySelector('.note-date')
    priority = document.querySelector('.priority')
    newTitle = document.querySelector('.new-title')
    newText = document.querySelector('.new-text')
    newNoteDate = document.querySelector('.new-note-date')
    newPriority = document.querySelector('.new-priority')
    wrap = document.querySelector('.wrap');
    createBox = document.querySelector('.create-box');
    editBox = document.querySelector('.edit-box');
    confirmBox = document.querySelector('.confirm-box');
    confirmBtn = document.querySelector('.confirm');
    declineBtn = document.querySelector('.decline');
    newEditBtn = document.querySelector('.new-edit-btn');
    newCancelBtn = document.querySelector('.new-cancel-btn');
    note = document.querySelectorAll('.note');
}


const prepareDOMEvents = () => {
    setInterval(checkTime, 100);
    createBtn.addEventListener('click', createNewNote);
    cancelBtn.addEventListener('click', cancelNote);
    addBtn.addEventListener('click', addNewNote);
    declineBtn.addEventListener('click', declineDelete);
    confirmBtn.addEventListener('click', confirmDelete);
    newCancelBtn.addEventListener('click', cancelEdit)
    newEditBtn.addEventListener('click', applyEdit);
}

const functionalButtons = () => {
    acceptBtn = document.querySelectorAll('.accept');
    editBtn = document.querySelectorAll('.edit');
    delBtn = document.querySelectorAll('.delete');

    acceptBtn.forEach(btn => btn.addEventListener('click', finishNote))
    editBtn.forEach(btn => btn.addEventListener('click', editNote))
    delBtn.forEach(btn => btn.addEventListener('click', deleteNote))
}

const createNewNote = () => {
    shadow.classList.add('active');
    text.value = '';
    noteDate.value = '';
    title.value = '';
    priority.value = 'Casual';
}


const addNewNote = () => {



    if (title.value !== '' && noteDate.value !== '' && priority.value !== '') {





        shadow.classList.remove('active');
        let newNote = document.createElement('section');
        newNote.classList.add('note');
        newNote.setAttribute("id", id);
        newNote.innerHTML = `
                        <h2 class="note-title">${title.value}</h2>
                        <p>Note text:</p>
                        <p class="text">${text.value}</p>
                       <div class="note-info">
                        <div class="info-box-1 box">
                            <p>Dead-Line:</p>
                            <p class="note-date value">
                                <i class="fa-regular fa-calendar"></i> 
                                <span class="span-date">${noteDate.value}</span>
                            </p>
        
                        </div>
        
                        <div class="info-box-2 box">
        
                            <p>Priority:</p>
                            <p class="priority value">${priority.value}</p>
                           </div>
        
                        </div>
        
                        <div class="note-info">
                       
                        <div class="info-box-3 box">
                        <p>Placeholder:</p>
                        <p class="value">Just do it!</p>
                        </div>
                        <div class="info-box-4 box">
                            <p>Status:</p>
                            <p class="status value">In progress</p>
                        </div>
                    </div>
        
                        <div class="note-buttons">
                            <button class="accept"><i class="fa-sharp fa-solid fa-circle-check"></i></button>
                            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="delete"><i class="fa-sharp fa-solid fa-circle-xmark"></i></button>
                        </div>
            `;
        wrap.append(newNote);



        acceptBtn = document.querySelectorAll('.accept');
        editBtn = document.querySelectorAll('.edit');
        delBtn = document.querySelectorAll('.delete');

        acceptBtn.forEach(btn => btn.addEventListener('click', finishNote))
        editBtn.forEach(btn => btn.addEventListener('click', editNote))
        delBtn.forEach(btn => btn.addEventListener('click', deleteNote))



        class note {
            constructor(title, noteDate, text, priority) {
                this.title = title
                this.noteDate = noteDate
                this.text = text;
                this.priority = priority;
            }
        }

        const noteId = new note(title.value, noteDate.value, text.value, priority.value)

        localStorage.setItem(id++, JSON.stringify(noteId));





    } else {
        alert('Enter Values');
    }

}


const cancelNote = () => {
    shadow.classList.remove('active');
}

const deleteNote = (note) => {
    shadow.classList.add('active');
    createBox.classList.add('deactive');
    confirmBox.classList.remove('deactive');
    helpNote = note;

}

const confirmDelete = () => {
    helpNote.target.closest('section').remove();
    shadow.classList.remove('active');
    createBox.classList.remove('deactive');
    confirmBox.classList.add('deactive');
    let noti = helpNote.target.closest('section');
    window.localStorage.removeItem(parseInt(noti.id));



}

const declineDelete = () => {
    shadow.classList.remove('active');
    createBox.classList.remove('deactive');
    confirmBox.classList.add('deactive');
}



const editNote = (note) => {
    shadow.classList.add('active');
    createBox.classList.add('deactive');
    editBox.classList.remove('deactive');
    secondHelpNote = note.target.closest('section');
    let title = secondHelpNote.querySelector('.note-title');
    let text = secondHelpNote.querySelector('.text');
    let noteDate = secondHelpNote.querySelector('.span-date');
    let priority = secondHelpNote.querySelector('.priority');
    newTitle.value = title.textContent;
    newNoteDate.value = noteDate.textContent;
    newText.value = text.textContent;
    newPriority.value = priority.textContent;



}

const cancelEdit = () => {
    shadow.classList.remove('active');
    createBox.classList.remove('deactive');
    editBox.classList.add('deactive');
}

const applyEdit = () => {

    let title = secondHelpNote.querySelector('.note-title');
    let text = secondHelpNote.querySelector('.text');
    let noteDate = secondHelpNote.querySelector('.span-date');
    let priority = secondHelpNote.querySelector('.priority');


    title.textContent = newTitle.value;
    text.textContent = newText.value;
    noteDate.textContent = newNoteDate.value;
    priority.textContent = newPriority.value;


    shadow.classList.remove('active');
    createBox.classList.remove('deactive');
    editBox.classList.add('deactive');
    let noti = secondHelpNote;

    class note {
        constructor(title, noteDate, text, priority) {
            this.title = title
            this.noteDate = noteDate
            this.text = text;
            this.priority = priority;
        }
    }

    const noteId = new note(newTitle.value, newNoteDate.value, newText.value, newPriority.value)

    localStorage.setItem(parseInt(noti.id), JSON.stringify(noteId));

}


const finishNote = (note) => {
    let finNote = note.target.closest('section');
    let status = finNote.querySelector('.status');
    let finButton = note.target.closest('button');

    if (status.matches('.done')) {
        status.classList.remove('done');
        status.textContent = 'In progress';
        finButton.style.color = '#89E3D7';
        status.style.color = '#C5D4EB';
    } else {
        status.textContent = 'Task Done';
        status.classList.add('done');
        finButton.style.color = 'gray';
        status.style.color = '#89E3D7';
    }


}



const checkTime = () => {

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();


    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    time.textContent = `${hours}:${minutes}:${seconds}`;
    webDate.textContent = `${day}.${month}.${year}`;
}



const createAllNotes = () => {

    for (let a = 0; a < 1000; a++) {



        let item = JSON.parse(localStorage.getItem(a));

        if (item != undefined) {

            let title = item.title;
            let noteDate = item.noteDate;
            let priority = item.priority;
            let text = item.text;
            let newNote = document.createElement('section');
            newNote.setAttribute("id", a);
            newNote.classList.add('note');
            newNote.innerHTML = `
                                <h2 class="note-title">${title}</h2>
                                <p>Note text:</p>
                                <p class="text">${text}</p>
                               <div class="note-info">
                                <div class="info-box-1 box">
                                    <p>Dead-Line:</p>
                                    <p class="note-date value">
                                        <i class="fa-regular fa-calendar"></i> 
                                        <span class="span-date">${noteDate}</span>
                                    </p>
        
                                </div>
        
                                <div class="info-box-2 box">
        
                                    <p>Priority:</p>
                                    <p class="priority value">${priority}</p>
                                   </div>
        
                                </div>
        
                                <div class="note-info">
                                <div class="info-box-3 box">
                                <p>Placeholder:</p>
                                    <p class="value">Just do it!</p>
                                </div>
                                <div class="info-box-4 box">
                                    <p>Status:</p>
                                    <p class="status value">In progress</p>
                                </div>
                            </div>
        
                                <div class="note-buttons">
                                    <button class="accept"><i class="fa-sharp fa-solid fa-circle-check"></i></button>
                                    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button class="delete"><i class="fa-sharp fa-solid fa-circle-xmark"></i></button>
                                </div>
                    `;
            wrap.append(newNote);

            functionalButtons();
        }

    }






}



window.addEventListener('DOMContentLoaded', () => {
    main();
    createAllNotes();
})