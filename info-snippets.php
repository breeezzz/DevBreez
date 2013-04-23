<?php
/***
// Name: [BreezDev] - Information Snippets
// Description: Little functions for calling handy information. Just include this file, and call the functions!
// Version: 1.0
***/
// Displays users IP address
	// 
	function ip_address() {
		if ( isset($_SERVER["REMOTE_ADDR"]) )    { 
			echo '' . $_SERVER["REMOTE_ADDR"] . ' '; 
		} if ( isset($_SERVER["HTTP_CLIENT_IP"]) )    { 
			echo '' . $_SERVER["HTTP_CLIENT_IP"] . ' '; 
		}
	}
	
// Displays the date
	//
	function the_date() {
		echo date('M d');
	}

// Displays the time
	//
	function the_time() {
		echo date('g:i a');
	}
?>