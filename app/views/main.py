from flask import render_template, redirect, url_for
from app import app

from app.forms import ContactForm
from app.email import send_contact_email


@app.route("/")
def index():
    return render_template("main/index.html")


@app.route("/about")
def about():
    return render_template("main/about.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        send_contact_email(contact=form.email.data, input_message=form.message.data)
        return redirect(url_for('contact_success'))
    return render_template("main/contact.html", form=form)


@app.route("/contact/success")
def contact_success():
    return render_template("main/contact_success.html")


@app.route("/books")
def books():
    return render_template("main/books.html")
