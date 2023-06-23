<?php
$conn=mysqli_connect("localhost","root","","pos");
$date=$_REQUEST['date'];

$sql="SELECT * FROM transaction WHERE `date`='$date'";
$result=mysqli_query($conn,$sql);

$total_sales=0.00;

if ($result -> num_rows > 0) 
{
	while ($row = $result -> fetch_assoc()) 
	{
		$total_sales=$total_sales+$row["total_price"];;
	}
}
$count1=mysqli_num_rows($result);

$sql1="SELECT * FROM products";
$result1=mysqli_query($conn,$sql1);

$count2=mysqli_num_rows($result1);



$result2=array("$total_sales","$count1","$count2");
$myJSON = json_encode($result2);
echo $myJSON;
?>