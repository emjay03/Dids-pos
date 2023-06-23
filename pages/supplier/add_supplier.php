<?php
$conn=mysqli_connect("localhost","root","","pos");
$name=$_POST['name'];
$company_name=$_POST['company_name'];
$tell=$_POST['tell'];
$email=$_POST['email'];
$address=$_POST['address'];

$sql ="INSERT INTO `supplier`(`name`, `company_name`, `address`, `email`, `contact`) VALUES ('$name','$company_name','$address','$email','$tell')";
$result = $conn -> query($sql);
if ($result) 
{
	echo "Supplier Added Successfully";
}
else
{
	echo "Error Supplier add failed";
}
?>