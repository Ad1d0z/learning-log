from flask import Flask

app = Flask(__name__)


# A temporary route just to prove the server works.
# You'll replace this with your real API routes (see the project brief, section 5).
@app.route("/api/ping")
def ping():
    return {"message": "pong"}


if __name__ == "__main__":
    app.run(debug=True)
