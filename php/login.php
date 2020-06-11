<?php
include "conn.php";

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $result = $conn->query("select * from hmalluser where username='$username' and password='$password'");
    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}
