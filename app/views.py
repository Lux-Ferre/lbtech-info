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


@app.route("/bingo")
def bingo():
    return render_template("bingo.html")


@app.route("/pokemon")
def pokemon():
    return render_template("pokemon.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/projects/recs")
def recs():
    return render_template("recs.html")


@app.route("/projects/two")
def two_people():
    return render_template("two.html")

@app.route("/projects/git-projects")
def git_projects():
    return render_template("git-projects.html")
