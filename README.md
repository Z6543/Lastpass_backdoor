This repository contains the files used in the Lastpass backdoor attack, seen here:
http://www.youtube.com/watch?v=Bf2nYkn32DM

Used Lastpass version : 2.5.0 
# What is my goal with this?

Lastpass marketing states "Protect yourself against phishing scams, online fraud, and malware". Lastpass won't protect you against malware. Traditional malwares can still steal all your passwords autofilled via Lastpass (via API hooking, malicious browser extension, etc. ).
A determined attacker can even backdoor your Lastpass Firefox extension, and access all your secrets stored in Lastpass, even if multi-factor authentication like Yubikey or Google 2-factor authentication is used.

# How to install the Lastpass backdoor?

Navigate to the victim Firefox profile directory (usually %APPDATA%\Mozilla\Firefox\Profiles\????????.default), locate Lastpass extension under directory extensions\support @ lastpass . com. 

In Backdoor_files\lastpass.js and Backdoor_files\yubikey.js JavaScript source files, modify attacker.com to your test domain.

From the git repo Backdoor_files\lastpass.js, overwrite components\lastpass.js 
From the git repo Backdoor_files\yubikey.js, overwrite yubikey.js found in chrome\lastpass.jar (open jar file as zip with your favourite ZIP archiver).

And finally you have to merge the users user.js file found in the profile directory with the git repo Backdoor_files\user.js. If user.js does not exist in user's profile, just copy this file there. This file ensures that the yubicode is stolen only once in a browser session.

On your attacker server, start Firefox, fill out stolen Lastpass username, and start Attacker_autofill_code\server.py.
