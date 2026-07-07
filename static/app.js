// Milestone 3: your fetch() calls and DOM code go here
async function loadNotes() {
    const response = await fetch("/api/notes");
    const notes = await response.json();
    const list = document.getElementById("notes-list");
    if (notes.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nothing logged yet";
        list.appendChild(li);
    }
    for (const note of notes) {
        const li = document.createElement("li");
        li.textContent = `${note.title} — ${note.created_at}`;
        list.appendChild(li);
    }
}
loadNotes();