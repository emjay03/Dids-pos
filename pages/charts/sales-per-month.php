<?php
$conn=mysqli_connect("localhost","root","","pos");
$year=$_REQUEST['year'];

$sample; 

$array=array();

for ($i=0; $i < 12; $i++) 
{
	$total_sales=0.00;
	$temp=$i+1;

	$sql="SELECT * FROM transaction WHERE MONTH(`date`)=$temp AND YEAR(`date`)=$year";
	$result=mysqli_query($conn,$sql);
	
	if ($result -> num_rows > 0) 
	{
		while ($row = $result -> fetch_assoc()) 
		{
			$total_sales=$total_sales+$row['total_price'];	
		}
		array_push($array,$total_sales);
	}
	else
	{
		array_push($array,0);
	}
	
	
}


//$result=array("$total_sales");
$myJSON = json_encode($array);
print_r($myJSON);
?>