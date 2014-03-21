import os
import re
import requests
from flask import Flask, render_template, request, g, json
from flask.ext.assets import Environment, Bundle
from  werkzeug.debug import get_current_traceback

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
	#return json.dumps("{\"body\":[{\"name\":\"apartment\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/apartment\\/\",\"src\":\"http:\\/\\/media-cache-ak0.pinimg.com\\/216x146\\/79\\/ac\\/13\\/79ac13f5a88a7d7c3c19082effe45427.jpg\"},{\"name\":\"photography\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/photography\\/\",\"src\":\"http:\\/\\/media-cache-ak0.pinimg.com\\/custom_covers\\/216x146\\/34973403295349776_1361488285.jpg\"},{\"name\":\"mens wear \\u2013 dressing down\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/mens-wear-dressing-down\\/\",\"src\":\"http:\\/\\/media-cache-ak0.pinimg.com\\/custom_covers\\/216x146\\/34973403295296280_1345615783.jpg\"},{\"name\":\"womens wear \\u2013 dessing down\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/womens-wear-dessing-down\\/\",\"src\":\"http:\\/\\/media-cache-ec0.pinimg.com\\/custom_covers\\/216x146\\/34973403295296290_1361488441.jpg\"},{\"name\":\"Collaborative Board\\n                                            \\n                            \\n\\n\\n\\n\\n\\n\\n\\n\\n                    \\n                        \\n\\n                                \\n                \\n                                                \\n                    \\n        \\n                                    Everlane Office 2.0\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/everlane-office-20\\/\",\"src\":\"http:\\/\\/media-cache-ec0.pinimg.com\\/custom_covers\\/216x146\\/34973403295360721_1370457901.jpg\"},{\"name\":\"womens wear\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/womens-wear\\/\",\"src\":\"http:\\/\\/media-cache-ec0.pinimg.com\\/custom_covers\\/216x146\\/34973403295295543_1361488353.jpg\"},{\"name\":\"mens wear\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/mens-wear\\/\",\"src\":\"http:\\/\\/media-cache-ec0.pinimg.com\\/custom_covers\\/216x146\\/34973403295295542_1361488382.jpg\"},{\"name\":\"I am going to buy art\\n                            Jeff Micklos\",\"href\":\"\\/jeffmicklos\\/i-am-going-to-buy-art\\/\",\"src\":\"http:\\/\\/media-cache-cd0.pinimg.com\\/216x146\\/ae\\/13\\/3f\\/ae133f3b5e278c355aedfa37c6ba4350.jpg\"}],\"meta\":{\"count\":8}}")

@app.route('/pinterest/<username>/<board>')
def pins(username, board):
	return ''
