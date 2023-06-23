<?php
$conn=mysqli_connect("localhost","root","","pos");
$id=$_POST['id'];
$sql="DELETE FROM supplier WHERE id = '$id'";
$result=$conn->query($sql);
if ($result) 
{
	echo "Supplier Deleted Successfully";
}

?>