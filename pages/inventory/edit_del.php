<?php
$conn=mysqli_connect("localhost","root","","pos");
if (isset($_POST['editcode'])) 
{
	$id=$_POST['id'];
	$edit_code=$_POST['editcode'];
	$edit_name=$_POST['edit_name'];
	$edit_desc=$_POST['edit_desc'];
	$edit_cat=$_POST['edit_cat'];
	$edit_unit=$_POST['edit_unit'];
	$edit_price=$_POST['edit_price'];
	$edit_max=$_POST['edit_max'];

	$sql1 = "UPDATE products SET code = '$edit_code' ,prod_name = '$edit_name', description='$edit_desc', category='$edit_cat', 
	price='$edit_price',unit='$edit_unit' , max_stocks='$edit_max' WHERE code = '$id'";
	$result1 = $conn -> query($sql1);

	if ($result1) 
	{
		echo "Successfully Edited";
	}
	else
	{
		echo "Error: Edit not complete";
	}
}

if (isset($_POST['delcode'])) {
	$delcode=$_POST['delcode'];
	$sqldel="DELETE FROM products WHERE code = '$delcode'";
	$conn->query($sqldel);
	echo "Success Delete";
}



?>