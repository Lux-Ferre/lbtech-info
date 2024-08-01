import os

from flask import Flask
from config import Config
from flask_mail import Mail

app = Flask(__name__)
app.config.from_object(Config)

SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY

mail = Mail(app)

from app.views import main, morrisons, projects, errors

if __name__ == "__main__":
    app.run(debug=False)
