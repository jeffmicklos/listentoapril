import os
from flask import Flask, render_template
from flask.ext.assets import Environment, Bundle

app = Flask(__name__)
assets = Environment(app)

@app.route('/')
def hello():
	return render_template('base.html')