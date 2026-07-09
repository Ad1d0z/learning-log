# The Learning Log — The Ultimate Note-Taking Sidekick!

Are you tired of scattered notes, forgotten ideas, and missed opportunities?
Do you dream of having a magical notebook that helps you stay organized and
focused?

Well, wish no more! Introducing The Learning Log — the note-taking app that's
got your back (and your notes).

A small full-stack web app: a **Flask REST API** with a **SQLite** database on
the back end, and a **vanilla HTML/CSS/JavaScript + Bootstrap** front end that
talks to it with `fetch()`.

## How it works

1. **Title**: give your note a title that sums up the awesomeness you're about
   to unleash (required).
2. **Content**: share your thoughts, ideas, and insights with the world (or
   not — we won't judge).
3. **Category**: tag your note so you can find what you need when you need it
   (optional).

Click a note to read it in full, edit it, or delete it — no regrets here.
Your notes live in a local SQLite database, so they survive restarts.

## Built with

| Layer     | Tech                                  |
|-----------|---------------------------------------|
| Back end  | Flask (Python) REST API               |
| Database  | SQLite                                |
| Front end | HTML, CSS, JavaScript, Bootstrap 5    |

## Running it locally

```
git clone https://github.com/Ad1d0z/learning-log
cd learning-log
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
py init_db.py        # creates the database (one-time setup)
py app.py            # starts the server
```

Then open http://127.0.0.1:5000 and start logging.

## API

| Method | Endpoint          | What it does      |
|--------|-------------------|-------------------|
| GET    | `/api/notes`      | List all notes    |
| GET    | `/api/notes/<id>` | Get one note      |
| POST   | `/api/notes`      | Create a note     |
| PUT    | `/api/notes/<id>` | Update a note     |
| DELETE | `/api/notes/<id>` | Delete a note     |

All requests and responses are JSON. Missing title → `400`. Unknown id → `404`.
