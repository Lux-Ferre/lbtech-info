from flask import render_template
from app import app


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/map")
def map_route():
    return render_template("map.html")


@app.route("/map/seeds/")
def seeds():
    return render_template("seeds.html")
