from flask_mail import Message
from threading import Thread
from flask import render_template

from app import app, mail


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_contact_email(contact, input_message):
    subject = "Contact Request"
    sender = app.config['MAIL_USERNAME']
    recipients = [app.config['PERSONAL_EMAIL']]

    msg = Message(subject, sender=sender, recipients=recipients)

    text_body = render_template('email/contact.txt',
                                contact=contact, message=input_message)
    html_body = render_template('email/contact.html',
                                contact=contact, message=input_message)

    msg.body = text_body
    msg.html = html_body

    Thread(target=send_async_email, args=(app, msg)).start()
