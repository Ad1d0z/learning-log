// Milestone 3: your fetch() calls and DOM code go here
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
        li.textContent = `${note.title} — ${note.created_at}`;
        list.appendChild(li);
    }
}
loadNotes();
const form = document.getElementById("note-form")
form.addEventListener("submit",async(event)=>{
    event.preventDefault();
    const response = await fetch("/api/notes",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            title: document.getElementById("title-input").value,
            content:document.getElementById("content-input").value,
            category:document.getElementById("category-input").value
        }),
    });
    if(response.ok){
        form.reset();
        loadNotes();
    }else{
        const err = await response.json();
        alert(err.error);
    }
});