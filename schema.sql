-- YOUR TASK (Milestone 1):
-- Write a CREATE TABLE statement for the notes table here.
-- The data model is in section 6 of the project brief:
--   id, title, content, category, created_at
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);