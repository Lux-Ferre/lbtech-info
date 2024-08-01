from flask import render_template
from app import app


@app.errorhandler(404)
def not_found(e):
    return render_template("errors/404.html")
