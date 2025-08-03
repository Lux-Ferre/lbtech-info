from flask import render_template
from app import app


@app.route("/morrisons")
def morrisons_landing():
    return render_template("morrisons/morrisons_landing.html")


@app.route("/morrisons/recs")
def morrisons_recs():
    return render_template("morrisons/recs.html")


@app.route("/morrisons/barrs")
def morrisons_barrs():
    return render_template("morrisons/barrs_order.html")


@app.route("/morrisons/mup")
def morrisons_mup():
    return render_template("morrisons/mup_calc.html")


@app.route("/morrisons/till")
def morrisons_till():
    return render_template("morrisons/till_calc.html")
