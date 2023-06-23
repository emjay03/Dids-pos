<?php
$conn=mysqli_connect("localhost","root","","pos");
$code=$_REQUEST['code'];
$qty=(int)$_REQUEST['qty'];
$total_stock;

	$sql=mysqli_query($conn,"SELECT * FROM products WHERE code='$code'");
	$row = mysqli_fetch_array($sql);
	if ($row!=null) 
	{
		$stock=(int)$row["current_stocks"];
		$total_stock=$stock-$qty;
		$sq2="UPDATE products SET current_stocks = '$total_stock' WHERE code='$code'";
		$conn->query($sq2);
	}
echo $total_stock;
?>