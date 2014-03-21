import os
import re
import requests
from flask import Flask, render_template, request, g, json
from flask.ext.assets import Environment, Bundle
from  werkzeug.debug import get_current_traceback

import newrelic.agent
newrelic.agent.initialize('newrelic.ini')

app = Flask(__name__, static_folder='static', static_url_path='')
app.config['DEBUG'] = True
assets = Environment(app)

@app.route('/')
def hello():
  MOBILE_REGEX = 'palm|blackberry|nokia|phone|mobi|symbian|ericsson|motorola|samsung|portable|sprint|android|vodafone|ipod|webos|pocket|iphone|mobileexplorer'
  g.is_mobile = bool(re.search(MOBILE_REGEX, request.user_agent.string, re.IGNORECASE))
  return render_template('base.html')

@app.route('/vine')
def vine():
  return render_template('vine.html')

@app.route('/photo-album')
@app.route('/photo-album/<service>/<username>')
def photo_album(service, username):
	g.service = service
	g.username = username
	return render_template('photo_album.html')

@app.route('/wanelo')
def wanelo():
  return render_template('wanelo.html')

@app.route('/pinterest')
def pinterest():
  return render_template('pinterest.html')

@app.route('/pinterest/<username>')
def boards(username):
	r = requests.get('http://pinterestapi.co.uk/'+username+'/boards')
	return json.dumps(r.content)

@app.route('/pinterest/<username>/<board>')
def pins(username, board):
	return ''
