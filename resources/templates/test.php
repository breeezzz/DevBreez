<?php

if(!empty($email) && !empty($password)) {

    $email = mysql_real_escape_string($_POST['email']);
    $password = mysql_real_escape_string($_POST['password']);

    $query = "SELECT * FROM login_system WHERE email = '$email' AND password = '$password'";
    $data = mysql_query($query);

    if($data) {
        if (mysql_num_rows($data) == 1 ) {
            $row = mysql_fetch_assoc($data);
            $_SESSION['id'] = $row['id'];
            $_SESSION['name'] = $row['name'];
            $_SESSION['message'] = "Welcome,&nbsp;" . $_SESSION['name'];
            exit();
        }
        else {
            $_SESSION['message'] = "Please enter a valid username or password";
            header('Location: error.php');
            exit();
        }

    }
    else {
        die("Query failed");
    }

}
else {
    $_SESSION['message'] = "Please enter a username or password";
    header('Location: error.php');
    exit();
}

?>