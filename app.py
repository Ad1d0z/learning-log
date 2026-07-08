import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)


# A temporary route just to prove the server works.
# You'll replace this with your real API routes (see the project brief, section 5).
def get_db_connection():
    conn = sqlite3.connect("learning-log.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/api/ping")
def ping():
    return {"message": "pong"}

@app.route("/api/notes")
def get_notes():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM notes ORDER BY created_at DESC").fetchall()
    conn.close()
    notes = [dict(row) for row in rows]
    return jsonify(notes)

@app.route("/api/notes", methods=["POST"])
def create_note():
    data = request.get_json()

    if not data or not data.get("title"):
        return jsonify({"error":"Must include a title"}),400
    conn = get_db_connection()
    cursor = conn.execute(
        "INSERT INTO notes (title,content,category) VALUES (?,?,?)",
        (data["title"],data.get("content"), data.get("category")),
    )
    conn.commit()

    new_note = conn.execute("SELECT * FROM notes WHERE id = ?", (cursor.lastrowid,)).fetchone()
    conn.close()
    return jsonify(dict(new_note)), 201

@app.route("/api/notes/<int:note_id>")
def get_note(note_id):
    conn = get_db_connection()
    note = conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
    conn.close()
    if note is None:
        return jsonify({"error":"Note not found"}), 404
    return jsonify(dict(note))

@app.route("/api/notes/<int:note_id>", methods=["PUT"])
def edit_note(note_id):
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"error": "Must include a title"}),400
    conn = get_db_connection()
    note =conn.execute("SELECT * FROM notes WHERE id = ?",(note_id,)).fetchone()
    if note is None:
        conn.close()
        return jsonify({"error":"Note not found"}), 404
    conn.execute(
    "UPDATE notes SET title = ?, content = ?, category = ? WHERE id = ?",
    (data["title"], data.get("content"), data.get("category"), note_id),
)
    conn.commit()
    new_note = conn.execute("SELECT * FROM notes WHERE id = ?",(note_id,)).fetchone()
    conn.close()
    return jsonify(dict(new_note))
    
# Main now uses index
@app.route("/")
def default():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(debug=True)
