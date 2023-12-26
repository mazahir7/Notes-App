"use strict";

const body = document.querySelector("body");
const addNote = document.getElementById("add");



const loadPreviousNotes = function () {
  const savedNotes = JSON.parse(localStorage.getItem("notes"));

  if (savedNotes) {
    savedNotes.forEach(note => { createNewNote(note) });
  }
}


addNote.addEventListener("click", function () {

  createNewNote();
});


function createNewNote(text = "") {

  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">
      <button class="edit"> <i class="fas fa-edit"></i> </button>
      <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
  `;

  const deleteBtn = note.querySelector(".delete");
  const editBtn = note.querySelector(".edit");
  const mainNote = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  mainNote.innerHTML = marked(text);

  deleteBtn.addEventListener("click", () => {
    note.remove()
    updateLocalStorage();
  });


  textArea.addEventListener("input", function (e) {
    // const { content } = e.target.value;
    mainNote.innerHTML = marked(e.target.value);

    updateLocalStorage();
  });

  editBtn.addEventListener("click", function () {
    mainNote.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  body.appendChild(note);
}

const updateLocalStorage = function () {

  const notes = document.querySelectorAll("textarea");
  const notesText = [];

  notes.forEach(note => { notesText.push(note.value) });

  localStorage.setItem("notes", JSON.stringify(notesText));
}


loadPreviousNotes();