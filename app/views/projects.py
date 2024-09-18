from flask import render_template, jsonify
from app import app


@app.route("/projects/archive/map")
def map_route():
    return render_template("projects/archive/map.html")


@app.route("/projects/archive/map/seeds/")
def seeds():
    return render_template("projects/archive/seeds.html")


@app.route("/projects/archive/bingo")
def bingo():
    return render_template("projects/archive/bingo.html")


@app.route("/projects/archive/pokemon")
def pokemon():
    return render_template("projects/archive/pokemon.html")


@app.route("/projects")
def projects():
    return render_template("projects/projects.html")


@app.route("/gazetteer")
def gazetteer():
    return render_template("projects/gazetteer.html")


@app.route("/projects/sqmusic")
def sqmusic():
    return render_template("projects/sq-music.html")


@app.route("/projects/sqmusic/clientid")
def sqmusic_get_id():
    client_id = app.config["SPOTIFY_CLIENT_ID"]
    response = {
        "client_id": client_id,
    }
    return jsonify(response), 200


@app.route("/projects/external/two")
def two_people():
    return render_template("projects/external/two.html")
