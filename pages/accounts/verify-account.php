<?php
$conn=mysqli_connect("localhost","root","","pos");
$username=$_POST["user"];
$password=$_POST["password"];
$position="admin";

$sql = "SELECT * FROM account WHERE username='$username' AND password='$password' AND position='$position'";
$result=mysqli_query($conn,$sql);

$count=mysqli_num_rows($result);

echo $count;

?>