from flask import render_template
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


@app.route("/projects/sqmusic")
def sqmusic():
    return render_template("projects/sq-music.html")


@app.route("/projects/external/two")
def two_people():
    return render_template("projects/external/two.html")


@app.route("/projects/git-projects")
def git_projects():
    posts = [
        {"number": "One", "title": "lbtech-info", "body": "The repo that contains this website. Changes are pushed to the repo from whichever device I'm using. The repo is then used to update the VPS hosting the site.", "link":"https://github.com/Lux-Ferre/lbtech-info"},
        {"number": "Two", "title": "Aberdeen Python User Group", "body": "The Aberdeen Python User Group repo. This is a monthly meetup involving a presentation followed by code challenges. Solutions to said challenges are submitted via PR.", "link":"https://github.com/PythonAberdeen/user_group"},
        {"number": "Three", "title": "Galaxy Builder", "body": "A software project that's part of a larger project. The galaxy builder is designed to assist in the world building for a table top RPG universe. The core feature is the ability to create celestial bodies with either randomized, or user created inputs. As part of the randomization feature, there is a sub-script that accesses the ESA's Gaia API to make some of the randomization more statistically accurate.", "link":"https://github.com/Lux-Ferre/galaxy-builder"},
        {"number": "Four", "title": "the_od_bods", "body": "An open-source, automated directory of Scotland's open data available at <a href='opendata.scot'>OpenData.scot</a>. This fantastic project brings together Scotland's disparate and inconveniently located data sets into a single, clean, searchable location. My contribution here was to resolve an issue involving the inclusion of National Library of Scotland data. Since they didn't have an API, the solution was to build a scraper.", "link":"https://github.com/OpenDataScotland/the_od_bods"},
        {"number": "Five", "title": "Wall Map", "body": "An experiment in procedural generation and sister project to the galaxy-builder. Uses Perlin noise layers to create a procedural topographical map. CUDA GPU acceleration brought the time down from an hour to seconds per run.", "link":"https://github.com/Lux-Ferre/wall-map"},
        {"number": "Six", "title": "CTC21 - Nautical Wrecks", "body": "Another open source project. Here, I worked with 2 others to find a data source of wrecks off the coasts of Scotland and incorporate the information into WikiData. I took the lead on writing the scraping and cleaning software while my collegues navigated the issue of finding a source with an open license. Together, we looked through the data to decide how to clean it before it was automatically uploaded to WikiData with the help of Ian.", "link":"https://github.com/CodeTheCity/ctc21_nautical_wrecks"}
    ]
    return render_template("projects/git-projects.html", posts=posts)
