<?php
$conn=mysqli_connect("localhost","root","","pos");

$id=$_POST['id'];
$edit_name=$_POST['edit_name'];
$edit_company_name=$_POST['edit_company_name'];
$edit_tell=$_POST['edit_tell'];
$edit_email=$_POST['edit_email'];
$edit_address=$_POST['edit_address'];

$sql1 = "UPDATE supplier SET name = '$edit_name' ,company_name = '$edit_company_name', address='$edit_address', email='$edit_email', 
	contact='$edit_tell' WHERE id = '$id'";

	$result = $conn -> query($sql1);
	if ($result) 
	{
		echo "Successfully Edited";
	}
	else
	{
		echo "Error: Edit not complete";
	}

?>