<?php
$conn=mysqli_connect("localhost","root","","pos");
if (isset($_POST['del_cas_id']) ) 
{
	$id=$_POST["del_cas_id"];

	$sql="DELETE FROM account WHERE id = '$id'";
	$result=$conn->query($sql);
	if ($result) 
	{
		echo "Account Deleted Successfully";
	}


}

if (isset($_POST['edit_id']) ) 
{
	$id=$_POST["edit_id"];
	$name=$_POST["name"];
	$username=$_POST["username"];
	$password=$_POST["pass"];
	$sql1 = "UPDATE account SET username = '$username' ,password = '$password', name='$name' WHERE id = '$id'";
	$result = $conn -> query($sql1);
	if ($result) 
	{
		echo "Successfully Edited";
	}
	else
	{
		echo "Error: Edit not complete";
	}
}



?>