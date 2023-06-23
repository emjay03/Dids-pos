<?php
$conn=mysqli_connect("localhost","root","","pos");
$invoice_no=$_POST["invoiceNo"];

$sql="DELETE FROM transaction WHERE transaction_no = '$invoice_no'";
$result=$conn->query($sql);
if ($result) 
{
	echo "Transaction Deleted Successfully";
}



?>