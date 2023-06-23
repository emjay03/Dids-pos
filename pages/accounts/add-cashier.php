<?php
$conn=mysqli_connect("localhost","root","","pos");
$name=$_POST['name'];
$username=$_POST['username'];
$pass=$_POST['pass'];
$position=$_POST['position'];

$sql ="INSERT INTO `account`(`username`, `password`, `name`, `position`) VALUES ('$username','$pass','$name','$position')";

$result = $conn -> query($sql);
if ($result) 
{
	echo "Account Added Successfully";
}
else
{
	echo "Error Account add failed";
}
?>