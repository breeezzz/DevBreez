<?php
session_start();
if(!isset($_SESSION['email']) || $_SESSION['password']=="")
{
echo "Please login to see this page.....";
}
else
{
content();
}
?>