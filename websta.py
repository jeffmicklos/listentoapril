#!/usr/bin/python

'''
Cranklin's Instagram Bot v.1.0
 
Repaired By: Jeff Henry
Repairs:
	- Updated Login Request
	- Updated Like Requests
	- Updated Next Page Search
=================================================================================
	MULTIPLE ACCOUNTS? EDIT THE ARRAYS BELOW USING THE FORMAT SPECIFIED
=================================================================================

This bot gets you more likes and followers on your Instagram account.

Requirements:
- python > 2.6 but < 3.0
- pycurl library
- web.stagram.com login prior to using the bot

Instructions:
- make sure you have the correct version of Python installed
- make sure you have the pycurl library installed
- log into web.stagram.com with your instagram account and approve the app
- edit between lines 52 and 62
- from the command line, run "python InstaBot.py"
- enjoy!

v1.0 updates:
- added browser agent randomizer
- added optional hashtag limiter
- added a couple extra additions for some people experiencing SSL errors. (thanks Charlie)

v1.1 updates:
- added random sleep time between image likes
- added random tag selection out of list of hashtags
- added multiple account functions
- added rate-limited handling based on single or multiple accounts
'''

import os
import sys
import pycurl
import cStringIO
import re
import random
import time
import datetime

#if datetime.datetime.now().time().hour % 4 == 0:
#	print 'on a fourth hour of the day... run script!'
#else:
#	sys.exit(0)

##### EDIT THESE BELOW

# your instagram username and password

'''
FORMAT: usernames = ['username1','username2','username3',...,'username#']
	passwords = ['password1','password2','password3',...,'password#']
'''
usernames = [os.environ['INSTAGRAM_USERNAME']]
passwords = [os.environ['INSTAGRAM_PASSWORD']]

# keeps track of current account to use:
x = 0

#set a like limit per hashtag. Set value to 0 if you don't want a limit
hashtaglikelimit = 20

#your list of hashtags
hashtags = ['thiswilldestroyyou', 'reverb', 'sigurros', 'strymon', 'explosionsinthesky']
#random.shuffle(hashtags)



##### NO NEED TO EDIT BELOW THIS LINE

browsers = ["IE ","Mozilla/","Gecko/","Opera/","Chrome/","Safari/"]
operatingsystems = ["Windows","Linux","OS X","compatible","Macintosh","Intel"]
useragent = random.choice(browsers) + str(random.randrange(1,9)) + "." + str(random.randrange(0,50)) + " (" + random.choice(operatingsystems) + "; " + random.choice(operatingsystems) + "; rv:" + str(random.randrange(1,9)) + "." + str(random.randrange(1,9)) + "." + str(random.randrange(1,9)) + "." + str(random.randrange(1,9)) + ")"

def login():
	try:
		os.remove("pycookie.txt")
	except:
		pass
	
	buf = cStringIO.StringIO()
	c = pycurl.Curl()
	c.setopt(pycurl.URL, 'https://api.instagram.com/oauth/authorize/?client_id=9d836570317f4c18bca0db6d2ac38e29&redirect_uri=http://web.stagram.com/&response_type=code&scope=comments+relationships+likes')
	c.setopt(pycurl.COOKIEFILE, "pycookie.txt")
	c.setopt(pycurl.COOKIEJAR, "pycookie.txt")
	c.setopt(pycurl.WRITEFUNCTION, buf.write)
	c.setopt(pycurl.FOLLOWLOCATION, 1)
	c.setopt(pycurl.ENCODING, "")
	c.setopt(pycurl.SSL_VERIFYPEER, 0)
	c.setopt(pycurl.SSL_VERIFYHOST, 0)
	#c.setopt(pycurl.VERBOSE, True)
	c.setopt(pycurl.USERAGENT, useragent)
	c.perform()
	curlData = buf.getvalue()
	buf.close()
	
	'''								IMPORTANT INFORMATION										'''
	clientid = '9d836570317f4c18bca0db6d2ac38e29'
	postaction = re.findall(ur"action=\"([^\"]*)\"",curlData)
	token = re.findall('<input type="hidden" name="csrfmiddlewaretoken" value="(.*?)"/>', curlData)
	postdata = 'csrfmiddlewaretoken='+token[0]+'&username='+usernames[x]+'&password='+passwords[x]
	
	buf = cStringIO.StringIO()
	c = pycurl.Curl()
	c.setopt(pycurl.URL, "https://instagram.com"+postaction[0])
	c.setopt(pycurl.COOKIEFILE, "pycookie.txt")
	c.setopt(pycurl.COOKIEJAR, "pycookie.txt")
	c.setopt(pycurl.WRITEFUNCTION, buf.write)
	c.setopt(pycurl.FOLLOWLOCATION, 1)
	c.setopt(pycurl.ENCODING, "")
	c.setopt(pycurl.SSL_VERIFYPEER, 0)
	c.setopt(pycurl.SSL_VERIFYHOST, 0)
	c.setopt(pycurl.REFERER, "https://instagram.com/accounts/login/?next=/oauth/authorize/%3Fclient_id%3D"+clientid+"%26redirect_uri%3Dhttp%3A//web.stagram.com/%26response_type%3Dcode%26scope%3Dlikes%2Bcomments%2Brelationships")
	c.setopt(pycurl.USERAGENT, useragent)
	c.setopt(pycurl.POST, 1)
	c.setopt(pycurl.POSTFIELDS, postdata)
	c.setopt(pycurl.POSTFIELDSIZE, len(postdata))
	c.perform()
	curlData = buf.getvalue()
	buf.close()

	if '<a href="/logout">LOG OUT</a>' in curlData:
		print "Logged into " + usernames[x]
	else:
		print "Unable to log into " + usernames[x] + " with password " + passwords[x]
		sys.exit(0)

def like():
	likecount = 0
	global x
	while(True):
		current_tag = random.randrange(0,len(hashtags)) 
		print "Current Tag: " + hashtags[current_tag]
		hashtaglikes = 0
		nextpage = "http://web.stagram.com/tag/"+hashtags[current_tag]+"/?vm=list"
		
		while nextpage != False and (hashtaglikelimit == 0 or (hashtaglikelimit > 0 and hashtaglikes < hashtaglikelimit)):
			buf = cStringIO.StringIO()
			c = pycurl.Curl()
			c.setopt(pycurl.URL, nextpage)
			c.setopt(pycurl.COOKIEFILE, "pycookie.txt")
			c.setopt(pycurl.COOKIEJAR, "pycookie.txt")
			c.setopt(pycurl.WRITEFUNCTION, buf.write)
			c.setopt(pycurl.FOLLOWLOCATION, 1)
			c.setopt(pycurl.ENCODING, "")
			c.setopt(pycurl.SSL_VERIFYPEER, 0)
			c.setopt(pycurl.SSL_VERIFYHOST, 0)
			c.setopt(pycurl.USERAGENT, useragent)
			c.perform()
			curlData = buf.getvalue()
			buf.close()	
			
			nextpagelink = re.findall(ur'<li><a href="(.*?)" rel="next"><i class="fa fa-chevron-down"></i> Earlier</a></li>',curlData)
			if len(nextpagelink)>0:
				nextpage = "http://web.stagram.com"+nextpagelink[0]
			else:
				nextpage = False
				break;
				
			regex = '<li><button type="button" class="btn btn-default btn-xs likeButton" data-target="(.*?)"><i class="fa fa-heart"></i> Like</button></li>'
			likedata = re.findall(regex,curlData)
			
			if len(likedata)>0:
				for imageid in likedata:
					if hashtaglikelimit > 0 and hashtaglikes >= hashtaglikelimit:
						break
					repeat = True
					while repeat:
						url = 'http://web.stagram.com/api/like/'+imageid
						buf = cStringIO.StringIO()
						c = pycurl.Curl()
						c.setopt(pycurl.URL, url)
						c.setopt(pycurl.COOKIEFILE, "pycookie.txt")
						c.setopt(pycurl.COOKIEJAR, "pycookie.txt")
						c.setopt(pycurl.WRITEFUNCTION, buf.write)
						c.setopt(pycurl.FOLLOWLOCATION, 1)
						c.setopt(pycurl.ENCODING, "")
						c.setopt(pycurl.SSL_VERIFYPEER, 0)
						c.setopt(pycurl.SSL_VERIFYHOST, 0)
						c.setopt(pycurl.USERAGENT, useragent)
						c.perform()
						postData = buf.getvalue()
						buf.close()
						
						if postData == '''{"status":"OK","message":"LIKED"}''':
							likecount += 1
							hashtaglikes += 1
							print "You liked image "+imageid+"! \t Like count: "+str(likecount)
							repeat = False
							time.sleep(random.randrange(1,7))
						else:
							### If the user has multiple accounts, lets just switch to a new one.
							if(len(usernames)>1):
								print "Your account has been rate limited. Switching to backup account."
								### If we reached the end of the list, well start over.
								if x == (len(usernames)-1):
									x = 0
								### Otherwise we go to the next username and password.
								else:
									x += 1
								#print "Next account to use is " + usernames[x]
								login()
								like()
							### Otherwise let's switch tags:
							else:
								print "Your account has been rate limited. Sleeping for 10 minute(s). Liked "+str(likecount)+" photo(s)..."
								sys.exit(0)
								#time.sleep(600)
								#like()
								
def main():
	login()
	like()
	

if __name__ == "__main__":
    main()
