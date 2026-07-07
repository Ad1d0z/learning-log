# YOUR TASK (Milestone 1):
# Write a small script that:
#   1. opens a connection to notes.db (the sqlite3 module creates the file if missing)
#   2. reads schema.sql and executes it
#   3. commits and closes the connection
#
# Hints: sqlite3.connect(), open()/read(), connection.executescript()
import sqlite3

conn = sqlite3.connect("learning-log.db")          # the database filename you chose

with open("schema.sql") as f:                 # the file your CREATE TABLE lives in
    sql = f.read()
conn.executescript(sql)                                       # (it was in the hints — starts with "execute")
conn.commit()
conn.close()
