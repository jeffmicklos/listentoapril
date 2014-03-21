var xmlhttprequest=require('./xmlhttprequest')
if(!xmlhttprequest||typeof xmlhttprequest!=='object')
throw new Error('Could not find ./xmlhttprequest')
var XHR=xmlhttprequest.XMLHttpRequest
if(!XHR)
throw new Error('Bad xmlhttprequest.XMLHttpRequest')
if(!('_object'in(new XHR)))
throw new Error('This is not portable XMLHttpRequest')
module.exports=request
request.XMLHttpRequest=XHR
request.log=getLogger()
var DEFAULT_TIMEOUT=3*60*1000
function request(options,callback){if(typeof callback!=='function')
throw new Error('Bad callback given: '+callback)
if(!options)
throw new Error('No options given')
var options_onResponse=options.onResponse;if(typeof options==='string')
options={'uri':options};else
options=JSON.parse(JSON.stringify(options));options.onResponse=options_onResponse
if(options.url){options.uri=options.url;delete options.url;}
if(!options.uri&&options.uri!=="")
throw new Error("options.uri is a required argument");if(typeof options.uri!="string")
throw new Error("options.uri must be a string");var unsupported_options=['proxy','_redirectsFollowed','maxRedirects','followRedirect']
for(var i=0;i<unsupported_options.length;i++)
if(options[unsupported_options[i]])
throw new Error("options."+unsupported_options[i]+" is not supported")
options.callback=callback
options.method=options.method||'GET';options.headers=options.headers||{};options.body=options.body||null
options.timeout=options.timeout||request.DEFAULT_TIMEOUT
if(options.headers.host)
throw new Error("Options.headers.host is not supported");if(options.json){options.headers.accept=options.headers.accept||'application/json'
if(options.method!=='GET')
options.headers['content-type']='application/json'
if(typeof options.json!=='boolean')
options.body=JSON.stringify(options.json)
else if(typeof options.body!=='string')
options.body=JSON.stringify(options.body)}
options.onResponse=options.onResponse||noop
if(options.onResponse===true){options.onResponse=callback
options.callback=noop}
if(!options.headers.authorization&&options.auth)
options.headers.authorization='Basic '+b64_enc(options.auth.username+':'+options.auth.password);return run_xhr(options)}
var req_seq=0
function run_xhr(options){var xhr=new XHR,timed_out=false,is_cors=is_crossDomain(options.uri),supports_cors=('withCredentials'in xhr._object)
req_seq+=1
xhr.seq_id=req_seq
xhr.id=req_seq+': '+options.method+' '+options.uri
xhr._id=xhr.id
if(is_cors&&!supports_cors){var cors_err=new Error('Browser does not support cross-origin request: '+options.uri)
cors_err.cors='unsupported'
return options.callback(cors_err,xhr)}
xhr.timeoutTimer=setTimeout(too_late,options.timeout)
function too_late(){timed_out=true
var er=new Error('ETIMEDOUT')
er.code='ETIMEDOUT'
er.duration=options.timeout
request.log.error('Timeout',{'id':xhr._id,'milliseconds':options.timeout})
return options.callback(er,xhr)}
var did={'response':false,'loading':false,'end':false}
xhr.onreadystatechange=on_state_change
xhr.open(options.method,options.uri,true)
if(is_cors)
xhr._object.withCredentials=!!options.withCredentials
xhr.send(options.body)
return xhr
function on_state_change(event){if(timed_out)
return request.log.debug('Ignoring timed out state change',{'state':xhr.readyState,'id':xhr.id})
request.log.debug('State change',{'state':xhr.readyState,'id':xhr.id,'timed_out':timed_out})
if(xhr.readyState===XHR.OPENED){request.log.debug('Request started',{'id':xhr.id})
for(var key in options.headers)
xhr.setRequestHeader(key,options.headers[key])}
else if(xhr.readyState===XHR.HEADERS_RECEIVED)
on_response()
else if(xhr.readyState===XHR.LOADING){on_response()
on_loading()}
else if(xhr.readyState===XHR.DONE){on_response()
on_loading()
on_end()}}
function on_response(){if(did.response)
return
did.response=true
request.log.debug('Got response',{'id':xhr.id,'status':xhr.status})
clearTimeout(xhr.timeoutTimer)
xhr.statusCode=xhr.status
if(is_cors&&xhr.statusCode==0){var cors_err=new Error('CORS request rejected: '+options.uri)
cors_err.cors='rejected'
did.loading=true
did.end=true
return options.callback(cors_err,xhr)}
options.onResponse(null,xhr)}
function on_loading(){if(did.loading)
return
did.loading=true
request.log.debug('Response body loading',{'id':xhr.id})}
function on_end(){if(did.end)
return
did.end=true
request.log.debug('Request done',{'id':xhr.id})
xhr.body=xhr.responseText
if(options.json){try{xhr.body=JSON.parse(xhr.responseText)}
catch(er){return options.callback(er,xhr)}}
options.callback(null,xhr,xhr.body)}}
request.withCredentials=false;request.DEFAULT_TIMEOUT=DEFAULT_TIMEOUT;var shortcuts=['get','put','post','head'];shortcuts.forEach(function(shortcut){var method=shortcut.toUpperCase();var func=shortcut.toLowerCase();request[func]=function(opts){if(typeof opts==='string')
opts={'method':method,'uri':opts};else{opts=JSON.parse(JSON.stringify(opts));opts.method=method;}
var args=[opts].concat(Array.prototype.slice.apply(arguments,[1]));return request.apply(this,args);}})
request.couch=function(options,callback){if(typeof options==='string')
options={'uri':options}
options.json=true
if(options.body)
options.json=options.body
delete options.body
callback=callback||noop
var xhr=request(options,couch_handler)
return xhr
function couch_handler(er,resp,body){if(er)
return callback(er,resp,body)
if((resp.statusCode<200||resp.statusCode>299)&&body.error){er=new Error('CouchDB error: '+(body.error.reason||body.error.error))
for(var key in body)
er[key]=body[key]
return callback(er,resp,body);}
return callback(er,resp,body);}}
function noop(){}
function getLogger(){var logger={},levels=['trace','debug','info','warn','error'],level,i
for(i=0;i<levels.length;i++){level=levels[i]
logger[level]=noop
if(typeof console!=='undefined'&&console&&console[level])
logger[level]=formatted(console,level)}
return logger}
function formatted(obj,method){return formatted_logger
function formatted_logger(str,context){if(typeof context==='object')
str+=' '+JSON.stringify(context)
return obj[method].call(obj,str)}}
function is_crossDomain(url){var rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/var ajaxLocation
try{ajaxLocation=location.href}
catch(e){ajaxLocation=document.createElement("a");ajaxLocation.href="";ajaxLocation=ajaxLocation.href;}
var ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[],parts=rurl.exec(url.toLowerCase())
var result=!!(parts&&(parts[1]!=ajaxLocParts[1]||parts[2]!=ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?80:443))!=(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443))))
return result}
function b64_enc(data){var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o1,o2,o3,h1,h2,h3,h4,bits,i=0,ac=0,enc="",tmp_arr=[];if(!data){return data;}
do{o1=data.charCodeAt(i++);o2=data.charCodeAt(i++);o3=data.charCodeAt(i++);bits=o1<<16|o2<<8|o3;h1=bits>>18&0x3f;h2=bits>>12&0x3f;h3=bits>>6&0x3f;h4=bits&0x3f;tmp_arr[ac++]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);}while(i<data.length);enc=tmp_arr.join('');switch(data.length%3){case 1:enc=enc.slice(0,-2)+'==';break;case 2:enc=enc.slice(0,-1)+'=';break;}
return enc;}
var VINO_VERSION="0.0.1";var VINO_DEFAULT_OPTS={baseUrl:'https://api.vineapp.com/',debug:1,deviceToken:'Vino',userAgent:'com.vine.iphone/1.01 (unknown, iPhone OS 6.0, iPad, Scale/2.000000) (Vino.js/'+VINO_VERSION+')'};if(typeof request=='undefined'){var request=require('request');}
function Vino(options){options=options||{};this.opts=extend(VINO_DEFAULT_OPTS,options);this.debug(this.opts);}
Vino.prototype.debug=function(args){if(this.opts.debug)
console.log('vino',arguments);};Vino.prototype.homeFeed=function(callback){if(!('sessionId'in this))
throw new Error('must be logged in');var bu=this.opts.baseUrl,that=this;request({url:bu+'timelines/graph',method:'get',headers:{'vine-session-id':this.sessionId,'User-Agent':this.opts.userAgent}},function(err,resp,body){that.debug('homeFeed response',err,resp,body);if(err){callback(err,resp);return;}
body=JSON.parse(body);if(body.code){callback('homeFeed failure',body);}
callback(null,body.data);});};Vino.prototype.login=function(callback){if(!('username'in this.opts)||!('password'in this.opts))
throw new Error('username and password required to login');var bu=this.opts.baseUrl,that=this;request({url:bu+'users/authenticate',method:'post',form:{username:this.opts.username,deviceToken:this.opts.deviceToken,password:this.opts.password},headers:{'User-Agent':this.opts.userAgent}},function(err,resp,body){that.debug('login response',err,resp,body);if(err){callback(err,resp);return;}
body=JSON.parse(body);if(!body.success){callback('login failure',body);}
that.sessionId=body.data.key;that.userId=body.data.userId;that.debug('session id',that.sessionId);callback(null,that.sessionId,that.userId,that);});};Vino.prototype.tagSearch=function(tag,callback){if(!('sessionId'in this))
throw new Error('must be logged in');var bu=this.opts.baseUrl,that=this;request({url:bu+'timelines/tags/'+encodeURIComponent(tag),method:'get',headers:{'vine-session-id':this.sessionId,'User-Agent':this.opts.userAgent}},function(err,resp,body){that.debug('tagSearch response',err,resp,body);if(err){callback(err,resp);return;}
body=JSON.parse(body);if(body.code){callback('tagSearch failure',body);}
callback(null,body.data);});};function extend(target){for(var i=1;i<arguments.length;i++){var source=arguments[i],keys=Object.keys(source);for(var j=0;j<keys.length;j++){var name=keys[j];target[name]=source[name];}}
return target;}
if(typeof module=='undefined')
window.Vino=Vino;else
module.exports=Vino;