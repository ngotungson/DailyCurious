var sematextTrackingCookieName = "smtuc";
var googleAdwordsTrackingCookieTemplate = "src:adw_._clts:X_._clcid:X_._u:X_._c:X_._g:X_._l:X_._m:X_._n:X_._d:X_._dm:X_._cr:X_._k:X|";
var genericWwwTrackingCookieTemplate = "src:X_._clts:X_._u:X_._cr:X_._r:X|";

function smtuc() {
  // URL format: http://sematext.com/logsene/index.html?t=c:307458666,g:19345928106,l:,m:,n:g,d:c,dm:,cr:74405135346,k:
  // Cookie format = someCookieUuid|src:adw_._clts:1452241895_._clcid:12345678_._u:http://sematext.com/logsene/index.html_._c:307458666_._g:19345928106_._l:_._m:_._n:g_._d:c_._dm:_._cr:74405135346_._k:|src:tw_._clts:1452241898_._clcid:8765_._u:http://sematext.com/spm/index.html_._c:30745_._g:19345_._l:_._m:_._n:t_._d:c_._dm:_._cr:1234_._k:abc|
  
  var source = null;
  
  if (getParameterByName("gclid") != null && getParameterByName("gclid") != '') {
    source = "adw";
  } else if (getParameterByName("utm_medium") != null && getParameterByName("utm_medium") == 'PH') {
    source = "smp";
  } else if (getParameterByName("utm_medium") != null && getParameterByName("utm_medium") == 'social' &&
      getParameterByName("utm_source") != null && getParameterByName("utm_source") == 'FBPage') {
    source = "fbp";
  } else if (getParameterByName("smph") != null && getParameterByName("smph") != '') {
    source = "smp";
  } else {
    var url = window.location.href;
    
    if (url.toLowerCase().indexOf('sematext.com/blog/') != -1) {
      var refererUrl = document.referrer;
      if (refererUrl && refererUrl.indexOf('marketing.sematext.com/acton') != -1) {
        source = "sba";        
      } else {
        source = "smb";        
      }
    } else if (url.toLowerCase().indexOf('sematext.com') != -1) {
      source = "smw";
    }
  }
  // over time we'll add logic for other sources here
  
  if (source == null) {
    return;
  }
  
  var cookieStr = readCookie(sematextTrackingCookieName);
  
  if (cookieStr == null) {
    cookieStr = guid() + "|";
  } else {
    // before anything else, clear all other entries for the same source
    cookieStr = removePreviousFromSameSource(source, cookieStr);
  }

  var creativeId = getCreativeId(source);
  if (creativeAlreadyExists(cookieStr, source, creativeId)) {
    // entry for this same ad already exists
    return;
  }

  if (source == "adw") {
    cookieStr = addGoogleAdwordsClick(cookieStr);
  } else if (source == "smb" || source == "sba" || source == "smw" || source == "smp" || source == "fbp") {
    cookieStr = addGenericWebVisit(cookieStr, source, creativeId);
  }
  // over time we'll add logic for other sources here

  
  createCookie(sematextTrackingCookieName, cookieStr, 180);
}

function creativeAlreadyExists(cookieStr, source, creativeId) {
  if (!cookieStr) {
    return false;
  }
  
  var sources = getSources(cookieStr, source);
  for (var i = 0; i < sources.length; i++) {
    if (sources[i].indexOf("_._cr:" + creativeId + "_._") != -1) {
      return true;
    }
  }
  return false;
}

function getCreativeId(source) {
  if (source == "adw") {
    var t = getParameterByName("t");
    return getTrackingParameterByName(t, "cr");
  } else if(source == "smp" || source == "smb" || source == "sba" || source == "smw" || source == "fbp") {
    var url = '';
  
    if (source == "smp" || source == "fbp") {
      url = document.referrer;
    } else if (source == "smb" || source == "sba" || source == "smw") {
      url = window.location.href;
    }
    
    if (url.indexOf('?') != -1) {
      url = url.substring(0, url.indexOf('?'));
      
      if (url.charAt(url.length - 1) == '/') {
        url = url.substring(0, url.length - 1);
      }
    }
    
    if (url.lenght > 200) {
      return url.substring(0, 200);
    }
    
    return url;
  } else {
    // over time we'll add logic for other sources here
    return null;
  }
}

function removePreviousFromSameSource(source, cookieStr) {
  if (cookieStr == null) {
    return cookieStr;
  }
  while (true) {
    var indexOfSame = cookieStr.indexOf("|src:" + source + "_._");
    
    if (indexOfSame == -1) {
      break;
    }

    var str1 = cookieStr.substring(0, indexOfSame);
    var strTmp = cookieStr.substring(indexOfSame + 1);
    var indexOfEnd = strTmp.indexOf("|");
    var str2 = "|";
    if (indexOfEnd != -1) {
      str2 = strTmp.substring(indexOfEnd);
    }
    cookieStr = str1 + str2;
  }
  return cookieStr;
}

function addGenericWebVisit(cookieStr, source, creativeId) {
  var genericWebCookie = genericWwwTrackingCookieTemplate;
  genericWebCookie = genericWebCookie.replace("src:X_._", "src:" + source + "_._");
  
  // replace the placeholders
  genericWebCookie = genericWebCookie.replace("_._clts:X", "_._clts:" + new Date().getTime());
  genericWebCookie = genericWebCookie.replace("_._u:X", "_._u:" + decodeURIComponent(getWebPageAddress()));
  genericWebCookie = genericWebCookie.replace("_._r:X", "_._r:" + decodeURIComponent(getReferrerAddress()));
  genericWebCookie = genericWebCookie.replace("_._cr:X", "_._cr:" + decodeURIComponent(creativeId));

  return cookieStr + genericWebCookie;
}

function addGoogleAdwordsClick(cookieStr) {
  // check if google adwords data already exists
  var googleAdwordsCookie = googleAdwordsTrackingCookieTemplate;
  
  var t = getParameterByName("t");
  
  // replace the placeholders
  googleAdwordsCookie = googleAdwordsCookie.replace("_._clts:X", "_._clts:" + new Date().getTime());
  googleAdwordsCookie = googleAdwordsCookie.replace("_._clcid:X", "_._clcid:" + getParameterByName("gclid"));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._u:X", "_._u:" + decodeURIComponent(getWebPageAddress()));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._c:X", "_._c:" + decodeURIComponent(getTrackingParameterByName(t, "c")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._g:X", "_._g:" + decodeURIComponent(getTrackingParameterByName(t, "g")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._l:X", "_._l:" + decodeURIComponent(getTrackingParameterByName(t, "l")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._m:X", "_._m:" + decodeURIComponent(getTrackingParameterByName(t, "m")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._n:X", "_._n:" + decodeURIComponent(getTrackingParameterByName(t, "n")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._d:X", "_._d:" + decodeURIComponent(getTrackingParameterByName(t, "d")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._dm:X", "_._dm:" + decodeURIComponent(getTrackingParameterByName(t, "dm")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._cr:X", "_._cr:" + decodeURIComponent(getTrackingParameterByName(t, "cr")));
  googleAdwordsCookie = googleAdwordsCookie.replace("_._k:X", "_._k:" + decodeURIComponent(getTrackingParameterByName(t, "k")));
  
  return cookieStr + googleAdwordsCookie;
}

function getWebPageAddress() {
  return normalizeWebAddress(window.location.href);
}

function getReferrerAddress() {
  return normalizeWebAddress(document.referrer);
}

function normalizeWebAddress(str) {
  if (str == null) {
    return '';
  }
  
  if (str.indexOf('?') != -1) {
    return str.substring(0, str.indexOf('?'));
  } else {
    return str;
  }
}

function getSources(cookieStr, src) {
  var srcRes = [];
  var sources = cookieStr.split("|");
  for (var i = 0; i < sources.length; i++) {
    if (sources[i].indexOf("src:" + src) == 0) {
      srcRes.push(sources[i]);
    }
  }
  return srcRes;
}

function getTrackingParameterByName(t, name) {
  if (t.indexOf(name + ":") != 0 && t.indexOf("," + name + ":") == -1) {
    return "";
  }
  if (t.indexOf(name + ":") == 0) {
    return t.substring(t.indexOf(":") + 1, t.indexOf(","));
  }
  if (t.indexOf("," + name + ":") != -1) {
    var tmp = t.substring(t.indexOf("," + name + ":") + 1);
    tmp = tmp.substring(tmp.indexOf(":") + 1);
    if (tmp.indexOf(",") == -1) {
      return tmp;
    } else {
      return tmp.substring(0, tmp.indexOf(","));
    }
  }
  return "";
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  
  var domain = "; domain= .sematext.com";
  document.cookie = name + "=" + value + domain + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

smtuc();