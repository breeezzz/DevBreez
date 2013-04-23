<?php
// Log out script
session_start();
session_unset();
session_destroy();
header("location:/internal/index.php");
exit();
?>