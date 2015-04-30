#------------------------------------------------------------------------------------------------------------------------#
# 													InstaCrawler V1.0
# Originally Developed by: Marc Laventure
# Modified by: Jeff Henry
# V 1.0:
#			- Removed need for external profile.yml  and yaml library
#			- Ip address is determined through socket functions - If using Linux or Ubuntu, manually must enter IP
#			- Changed custom hashtag list to be user-specified array vs. a file
#			- Generates a random User-Agen
#------------------------------------------------------------------------------------------------------------------------#
import os
import mechanize, re, time, sys, pycurl, hmac, random, socket
from hashlib import sha256

websta_url = "http://websta.me/"
top_tags_url = websta_url + "hot"
API = "https://api.instagram.com/v1/media/"
browsers = ["IE ","Mozilla/","Gecko/","Opera/","Chrome/","Safari/"]
operatingsystems = ["Windows","Linux","OS X","compatible","Macintosh","Intel"]

# Generate a random User Agent
# useragent = random.choice(browsers) + str(random.randrange(1,9)) + "." + str(random.randrange(0,50)) + " (" + random.choice(operatingsystems) + "; " + random.choice(operatingsystems) + "; rv:" + str(random.randrange(1,9)) + "." + str(random.randrange(1,9)) + "." + str(random.randrange(1,9)) + "." + str(random.randrange(1,9)) + ")"
useragent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53'

#-------------------------------------------------MODIFY THE BELOW SETTINGS----------------------------------------------#
# Client ID 		-	Register APP on Instagram API developers page
# IP address		- 	Run Ipconfig.exe and use your IP address if using OS other than Windows
# Access Token		-	Perform a query using Instagram user name on API developers page
# Max Likes			- 	Number of likes to perform before closing the program
# Likes Per Hashtag	-	Number of likes to perform on each individual hashtag
# Popular Tags		- 	1 to use the popular tags, 0 to use your specified hashtag array
# Custom Hashtags	- 	Fill in any hashtags you want to use in this format: ['tag1','tag2','tag3, ... 'tagN']
#-------------------------------------------------------------------------------------------------------------------------
client_id = '1ccbffba4d3946a18b2bb6b3b3264dc6'#os.environ['INSTAGRAM_CLIENT_ID']
#IP = socket.gethostbyname(socket.gethostname())		
IP = '24.23.191.185'										 
access_token = '609464179.1fb234f.43011b5d7e764f7880aef7cd8d4f7a83' #os.environ['INSTAGRAM_ACCESS_TOKEN']
max_likes = 23
likes_per_hashtag = 10
popular_tags = 0		
custom_hashtags = [
	'postrock',
	'sigurros',
	'strymon',
	'thiswilldestroyyou',
	'eluvium',
	'nilsfrahm',
	'ambientnotes',
	'riceboysleeps'
]						
#------------------------------------------------------------------------------------------------------------------------#





def perform_request(id):
	curl = pycurl.Curl()
	signature = hmac.new(client_id,IP,sha256).hexdigest()
	header = '|'.join([IP, signature])
	header = ["X-Insta-Forwarded-For " + header]

	post_data = "access_token="+access_token
	
	url = API + id + "/likes"
	curl.setopt(curl.URL, url)
	curl.setopt(curl.POSTFIELDS, post_data)
	curl.setopt(pycurl.HTTPHEADER, header)
	curl.perform()
	
	response = str(curl.getinfo(curl.HTTP_CODE))

	print response
	curl.close()
	
	return response
	
def obtain_hashtags(br):
	br.open(top_tags_url)
	pop_hashtags = re.findall('\"\>#(.*)\<\/a\>\<\/strong\>', br.response().read())
	
	return pop_hashtags
	
def like(br, hashtags):
	current_likes = 0
	hashtag_likes = 0
	
	media_id = []
	if popular_tags == 1:
		current_tag = random.randrange(0, len(hashtags))
		response = br.open(websta_url + "tag/" + str(hashtags[current_tag]))
		print "Liking #" + str(hashtags[current_tag])
	else:
		print 'okay, about to ask websta'
		current_tag = random.randrange(0, len(custom_hashtags))
		response = br.open(websta_url + "tag/" + str(custom_hashtags[current_tag]), timeout=600.0)

		print websta_url + "tag/" + str(custom_hashtags[current_tag])

		print "Liking #" + str(custom_hashtags[current_tag]) + "(" + str(current_likes) + " thus far)"
	
	media_id = re.findall("span id=\"like_count_(.*)\"", response.read())

	print media_id

	for id in media_id:
		if current_likes >= max_likes:
			print "Max likes reached. Exiting"
			sys.exit()
		
		elif hashtag_likes >= likes_per_hashtag:
			print "Max likes per hashtag reached. Moving to next hashtag"
			hashtag_likes = 0
			like(br, hashtags)
		else:
			response = perform_request(id)

			print current_likes > max_likes
			print hashtag_likes > likes_per_hashtag

			#print response
		
			if bool(re.search("200", response)):
				print "\tLiked " + str(id)
				current_likes += 1
				hashtag_likes += 1
				time.sleep(random.randrange(120,130))
				
			elif bool(re.search("429", response)):
				#print response
				print "Sleeping for an hour..."
				time.sleep(3600)
			
	print "Liked " + str(current_likes) + " photos"
	
if __name__ == "__main__":
	print "==================================================================="
	print "                        InstaCrawler v1.0		                  "
	print "                  Developed by: Marc Laventure                     "  
	print "                     Modified: by Jeff Henry		                  "
	print "==================================================================="
	print "                            SETTINGS		                          "
	print " User Agent:\t" + useragent        
	print " IP:\t\t" + IP
	print " Max Likes:\t" + str(max_likes)
	print " Per Tag:\t" + str(likes_per_hashtag)
	print "==================================================================="
	br = mechanize.Browser()
	br.set_handle_robots(False)
	br.set_handle_equiv(False)
	br.addheaders = [('User-Agent', useragent),('Accept', '*/*')]
	
	#hashtags = obtain_hashtags(br)
	like(br, [])
	
