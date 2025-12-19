const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");

document.addEventListener("DOMContentLoaded", loadNotes);

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(text => createNote(text));
}

function addNote() {
  const text = noteInput.value.trim();
  if (!text) return;

  createNote(text);
  saveNote(text);
  noteInput.value = "";
}

function createNote(text) {
  const note = document.createElement("div");
  note.className = "note";

  note.innerHTML = `
    <span class="delete" onclick="deleteNote(this)">✖</span>
    <p>${text}</p>
  `;

  notesContainer.appendChild(note);
}

function saveNote(text) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(text);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote(el) {
  const noteText = el.nextElementSibling.innerText;
  el.parentElement.remove();

  let notes = JSON.parse(localStorage.getItem("notes"));
  notes = notes.filter(note => note !== noteText);
  localStorage.setItem("notes", JSON.stringify(notes));
}
