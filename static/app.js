// Milestone 3: your fetch() calls and DOM code go here
let currentNoteId = null;
let editingNoteId = null;
async function loadNotes() {
    const response = await fetch("/api/notes");
    const notes = await response.json();
    const list = document.getElementById("notes-list");
    list.innerHTML = "";
    if (notes.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nothing logged yet — add your first note!";
        list.appendChild(li);
    }
    for (const note of notes) {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = `${note.title} — ${note.created_at}`;
        list.appendChild(li);
        li.addEventListener("click", () => showNote(note.id));
    }
    const datalist = document.getElementById("category-options");
    datalist.innerHTML = "";
    const categories = new Set();
    for (const note of notes) {
        if (note.category) categories.add(note.category);
    }
    for (const category of categories) {
        const option = document.createElement("option");
        option.value = category;
        datalist.appendChild(option);
    }

}
function showListView() {
    document.getElementById("list-view").hidden = false;
    document.getElementById("note-view").hidden = true;
    currentNoteId = null;
}
function showNoteView() {
    document.getElementById("list-view").hidden = true;
    document.getElementById("note-view").hidden = false;
}
async function showNote(id) {
    if (id === currentNoteId) return;
    const response = await fetch(`/api/notes/${id}`);
    const note = await response.json();
    const detail = document.getElementById("note-detail");
    detail.innerHTML = "";
    detail.classList.add("card");
    const body = document.createElement("div");
    body.classList.add("card-body");

    const heading = document.createElement("h2");
    heading.classList.add("card-title");
    heading.textContent = note.title;

    const content = document.createElement("p");
    content.textContent = note.content;
    content.classList.add("card-text");

    const meta = document.createElement("p");
    meta.textContent = `${note.category || "No category"} — ${note.created_at}`;
    meta.classList.add("card-text");

    body.appendChild(heading);
    body.appendChild(content);
    body.appendChild(meta);
    detail.appendChild(body);
    currentNoteId = id;
    showNoteView();


}
loadNotes();
const form = document.getElementById("note-form")
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url;
    let method;
    if (editingNoteId === null) {
        url = "/api/notes";
        method = "POST";
    } else {
        url = `/api/notes/${editingNoteId}`;
        method = "PUT";
    }
    const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: document.getElementById("title-input").value,
            content: document.getElementById("content-input").value,
            category: document.getElementById("category-input").value
        }),
    });
    if (response.ok) {
        form.reset();
        editingNoteId = null;
        loadNotes();
    } else {
        const err = await response.json();
        alert(err.error);
    }
});
document.getElementById("back-button").addEventListener("click", () => {
    showListView();
});
document.getElementById("delete-button").addEventListener("click", async () => {
    if (!confirm("Delete this note?")) return;
    const response = await fetch(`/api/notes/${currentNoteId}`, { method: "DELETE" });
    if (response.ok) { loadNotes(); showListView(); };
});
document.getElementById("edit-button").addEventListener("click", async () => {
    const response = await fetch(`/api/notes/${currentNoteId}`);
    const note = await response.json();
    document.getElementById("title-input").value = note.title;
    document.getElementById("content-input").value = note.content ?? "";
    document.getElementById("category-input").value = note.category ?? "";
    editingNoteId = currentNoteId;
    showListView();
});
document.addEventListener("keydown", (event) => {
    if (event.key !== "Backspace" && event.key !== "Escape") return;
    const tag = event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (!document.getElementById("note-view").hidden) {
        showListView();
    }
});
