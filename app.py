import sqlite3
from flask import Flask, jsonify

app = Flask(__name__)


# A temporary route just to prove the server works.
# You'll replace this with your real API routes (see the project brief, section 5).
@app.route("/api/ping")
def ping():
    return {"message": "pong"}

@app.route("/api/notes")
def get_notes():
    conn = sqlite3.connect("learning-log.db")
    conn.row_factory = sqlite3.Row

    rows = conn.execute("SELECT * FROM notes ORDER BY created_at DESC").fetchall()
    conn.close()

    notes = [dict(row) for row in rows]
    return jsonify(notes)

# A temporary route just to prove the server works.
# You'll replace this with your real API routes (see the project brief, section 5).
@app.route("/")
def default():
    return {"message": "Hello World"}


if __name__ == "__main__":
    app.run(debug=True)
