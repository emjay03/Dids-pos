<?php
$conn=mysqli_connect("localhost","root","","pos");

$transaction_no=$_POST['transaction'];
$date=$_POST['date'];
$cashier_name=$_POST['cashier_name'];
$total_price=$_POST['total_price'];


$sql1="INSERT INTO `transaction` ( `transaction_no`, `date`, `cashier_name`, `total_price`) VALUES ( '$transaction_no', '$date', '$cashier_name', '$total_price')";

$result = $conn -> query($sql1);

	if ($result) 
	{
		echo "Transaction Added";
	}
	else
	{
		echo "Error: Edit not complete";
	}

?>