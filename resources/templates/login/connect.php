<?php
/***
// Name: [BreezDev] - Login Application - Database Connection
// Description: Connects to database to access to our client database
// Version: 1.0
***/

// Database host; normally localhost
$dbhost = "localhost";

// Database name; normally prefix_suffix
$dbname = "breeezzz_internal";

// mySQL database username; normally root, if so, change it!
$dbuser = "root";

// mySQL database password; normally root, if so, change it!
$dbpass = "3484534845";

// Actually connecting to the database so we can write data to tables
mysql_connect ( $dbhost, $dbuser, $dbpass)or die("Could not connect to MySQL: ".mysql_error());

// After logging in, we select the specifc database, or disconnect
mysql_select_db($dbname) or die("Could not connect to Database:".mysql_error());
?>

