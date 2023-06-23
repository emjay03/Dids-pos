<?php
$conn=mysqli_connect("localhost","root","","pos");
$barcode=$_REQUEST['barcode'];
$new_expiry=$_REQUEST['expiry'];
$new_stock=$_REQUEST['new_stock'];

$sql1 = "UPDATE products SET current_stocks = '$new_stock' ,expiration = '$new_expiry' WHERE code = '$barcode'";
$result1 = $conn -> query($sql1);

if ($result1) 
{
	echo "Success ".$barcode." Stock Added";
}
else
{
	echo "No CODE"."+".$barcode;
}








?>