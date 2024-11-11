from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, Length


class ContactForm(FlaskForm):
    email = StringField('Your email', validators=[DataRequired(), Email()])
    name = StringField('Your name', validators=[DataRequired(), Length(min=2, max=50)])
    subject = StringField('Your subject', validators=[DataRequired(), Length(min=2, max=50)])
    message = TextAreaField('Say something', validators=[DataRequired(), Length(min=1, max=420)])
    submit = SubmitField('Submit')
