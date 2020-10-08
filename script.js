const createNoteBtn = document.querySelector(".create-note");
const notesBoardEl = document.querySelector(".notes-board");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

createNoteBtn.addEventListener("click", function () {
  addNewNote();
});

function addNewNote(note = "") {
  const noteEl = document.createElement("div");
  noteEl.classList.add("notes");
  noteEl.innerHTML = `<div class="toolbar">
    <button class="save">Save</button>
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
  <div class="main hidden"></div>
  <textarea></textarea>
</div>`;
  notesBoardEl.appendChild(noteEl);

  const saveBtn = noteEl.querySelector(".save");
  const editBtn = noteEl.querySelector(".edit");
  const deleteBtn = noteEl.querySelector(".delete");
  const mainEl = noteEl.querySelector(".main");
  const textareaEl = noteEl.querySelector("textarea");
  textareaEl.value = note;

  editBtn.addEventListener("click", function () {
    mainEl.classList.add("hidden");
    textareaEl.classList.remove("hidden");
  });
  saveBtn.addEventListener("click", function () {
    mainEl.classList.remove("hidden");
    textareaEl.classList.add("hidden");
    mainEl.innerHTML = `<h2>${textareaEl.value}</h2>`;
    updateLS();
  });

  deleteBtn.addEventListener("click", function () {
    noteEl.remove();
    const indexOfNote = notes.indexOf(note);
    notes.splice(indexOfNote, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  });
}

function updateLS() {
  const noteText = document.querySelectorAll("textarea");

  const notes = [];

  noteText.forEach((note) => {
    if (note.value != "") {
      notes.push(note.value);
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
