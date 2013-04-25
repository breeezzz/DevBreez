<?php
//#
//*	Login Functions
//#

//### [Registration Messsages]

//# Registration/Validation error
function registration_error() {
echo <<<EOT
<h1>Well, this is embarassing...</h1>
<p>Sorry, something went wrong.</p>
<p>Most likely causes: <b>Duplicate Name, Duplicate email, Incorrect password, Incorrect URL, or Database error.</b></p>
<p>To fix most issues, simply hit back, refresh the page, and try again.</p>
<p><a href="/internal/login/">Back to login page</a></p>
EOT;
}

//# Registration/Validation success
function registration_success() {
echo <<<EOT
<h1>Successfully Registered. Thank you!</h1>
<p><a href="/webapp/resources/library/login/login.html">Back to login page</a></p>
EOT;
}

?>