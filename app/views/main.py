from flask import render_template, redirect, url_for, request, jsonify

from app import app

from app.forms import ContactForm
from app.email import send_contact_email


@app.route("/")
def index():
    form = ContactForm()
    return render_template("main/index.html", form=form)


@app.route("/about")
def about():
    return render_template("main/about.html")


@app.route("/draw")
def draw():
    return render_template("main/draw.html")


@app.route("/work")
def work():
    return render_template("main/work.html")


@app.route("/submit", methods=["POST"])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        send_contact_email(
            contact=form.email.data,
            input_name=form.name.data,
            input_subject=form.subject.data,
            input_message=form.message.data
        )
        return jsonify({"result": "Success", "errors": []}), 202
    else:
        return jsonify({"result": "error", "errors": form.errors}), 400


@app.route("/contact/success")
def contact_success():
    return render_template("main/contact_success.html")


@app.route("/idlepixel/tcg")
def ip_tcg():
    username = request.args.get('user', None)
    return render_template("main/ip_tcg.html", username=username)
