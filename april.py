import os
import re
from flask import Flask, render_template, request, g
from flask.ext.assets import Environment, Bundle
from  werkzeug.debug import get_current_traceback

app = Flask(__name__)
app.config['DEBUG'] = True
assets = Environment(app)

@app.route('/')
def hello():

  MOBILE_REGEX = 'palm|blackberry|nokia|phone|mobi|symbian|ericsson|motorola|samsung|portable|sprint|android|vodafone|ipod|webos|pocket|iphone|mobileexplorer'
  g.is_mobile = bool(re.search(MOBILE_REGEX, request.user_agent.string, re.IGNORECASE))
  
  return render_template('base.html')