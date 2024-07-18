import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT'))
    MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL') == "True"
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') == "True"
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    PERSONAL_EMAIL = os.environ.get('PERSONAL_EMAIL')
