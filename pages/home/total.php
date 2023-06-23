<?php
$conn=mysqli_connect("localhost","root","","pos");
$code=$_REQUEST['code'];
if ($code!=="") 
{
	$query=mysqli_query($conn,"SELECT * from products where code='$code'");	
	$row = mysqli_fetch_array($query);
	if ($row!=null) 
	{
		$bar_code=$row["code"];
		$name=$row["prod_name"];
		$description=$row["description"];
		$price=$row["price"];
	}
}
$result=array("$price");
$myJSON = json_encode($result);
echo $myJSON;
?>