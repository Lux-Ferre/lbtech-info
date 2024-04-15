from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, Length


class ContactForm(FlaskForm):
    email = StringField('Your email', validators=[DataRequired(), Email()])
    message = TextAreaField('Say something', validators=[DataRequired(), Length(min=1, max=420)])
    submit = SubmitField('Submit')
