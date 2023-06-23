<?php
$conn=mysqli_connect("localhost","root","","pos");
$trans_no=$_REQUEST['trans_no'];

$sql = "SELECT * FROM transaction WHERE transaction_no='$trans_no'";
$result = $conn -> query($sql);

$count=mysqli_num_rows($result);

echo $count;

?>