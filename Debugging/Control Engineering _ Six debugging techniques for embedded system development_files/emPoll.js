var objectplanet;if(!objectplanet){objectplanet={}}if(!objectplanet.polls){objectplanet.polls={}}objectplanet.polls.JQUERY_VERSION="1.10.2";
var $opj;objectplanet.polls.getParamOPP=function(a,c){c=c.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b="[\\?&]"+c+"=([^&#]*)";
var e=new RegExp(b);var d=e.exec(a);if(d==null){return""}else{return d[1]}};objectplanet.polls.addScript=function(b,f){var d=document.getElementsByTagName("script");
for(i=0;i<d.length;i++){var c=d[i].src.indexOf(b);if(0<=c){return}}var a=document.getElementsByTagName("head")[0];var e=document.createElement("script");
e.type="text/javascript";e.src=b;if(f){e.onload=f}e.onreadystatechange=function(){if(f&&(this.readyState=="complete"||this.readyState=="loaded")){f()
}};a.appendChild(e)};objectplanet.polls.loadJQ=function(b){if(window.jQuery===undefined||window.jQuery.fn.jquery!==objectplanet.polls.JQUERY_VERSION){var a="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
objectplanet.polls.addScript(a,function(){$opj=window.jQuery.noConflict();b()})}else{$opj=window.jQuery;b()}};objectplanet.polls.loadJS=function(a){objectplanet.polls.addScript(objectplanet.polls.emPollURL+"/poll.js",a)
};objectplanet.polls.doPollOPP=function(){var a=["http://www.objectplanet.com/opinio/","http://www.easypolls.net/","https://www.murvey.com","https://www.easypolls.net/"];
$opj(".OPP-EM").each(function(){var g=$opj(this).text();var d=$opj(this).hasClass("OPP-C");if(d){var e=$opj(this).parent().next().attr("href");
if(!(e==a[0]||e==a[1]||e==a[2]||e==a[3])){$opj(this).show().text("You can not remove the poll link");return}}$opj(this).remove();
var c=objectplanet.polls.emPollURL.substring(0,objectplanet.polls.emPollURL.indexOf("ext/"))+"poll?jsoncallback=?";var b=$opj("#OPP-poll-id-"+g);
b.data("OPP_BASEURL",c);var f={command:"getPoll",pollId:(d?"":g),containerId:(d?g:"")};$opj.getJSON(c,f,function(h){if(h.resultCode=="0"){h.style=$opj.parseJSON(h.styleString);
b.pollOPP("init",{poll:h})}else{b.html("<span style='font-family: arial;'>Poll is not available.<br><a href='www.easypolls.net'>www.easypolls.net</a><span>")
}})})};objectplanet.polls.scriptArray=document.getElementsByTagName("script");objectplanet.polls.emPollURL="";objectplanet.polls.emPollFullURL="";
for(i=0;i<objectplanet.polls.scriptArray.length;i++){var URLIndex=objectplanet.polls.scriptArray[i].src.indexOf("/emPoll.js?");
if(0<URLIndex){objectplanet.polls.emPollFullURL=objectplanet.polls.scriptArray[i].src;objectplanet.polls.emPollURL=objectplanet.polls.emPollFullURL.substring(0,URLIndex)
}}objectplanet.polls.emPollPollId=objectplanet.polls.getParamOPP(objectplanet.polls.emPollFullURL,"p");objectplanet.polls.emContainerId=objectplanet.polls.getParamOPP(objectplanet.polls.emPollFullURL,"c");
var isContainer=objectplanet.polls.emContainerId?true:false;document.write('<div align="center" id="OPP-poll-id-'+(isContainer?objectplanet.polls.emContainerId:objectplanet.polls.emPollPollId)+'"><div style="display: none;" class="OPP-EM '+(isContainer?"OPP-C":"")+'">'+(isContainer?objectplanet.polls.emContainerId:objectplanet.polls.emPollPollId)+"</div></div>");
objectplanet.polls.loadJQ(function(){objectplanet.polls.loadJS(function(){$opj(function(){objectplanet.polls.doPollOPP()})
})});