<?php
$conn=mysqli_connect("localhost","root","","pos");
$barcode=$_REQUEST['code'];

$sql1 = "SELECT * FROM products where code='$barcode'";
$result = $conn -> query($sql1);
if ($result -> num_rows > 0) 
{
	while ($row = $result -> fetch_assoc()) 
	{
		$code=$row["code"];
		$prod_name=$row["prod_name"];
		$desc=$row["description"];
		$category=$row["category"];
		$price=$row["price"];
		$unit=$row["unit"];
		$current_stocks=$row["current_stocks"];
		$max_stocks=$row["max_stocks"];
	}
}
$result1=array("$code","$prod_name","$desc","$category","$price","$unit","$current_stocks","$max_stocks");
$myJSON = json_encode($result1);
echo $myJSON;
$conn->close();
?>