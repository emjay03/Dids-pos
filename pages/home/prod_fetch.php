<?php
$conn=mysqli_connect("localhost","root","","pos");
$code=$_REQUEST['code'];

if ($code!=="") 
{
	$query=mysqli_query($conn,"SELECT * from products where code='$code'");
	
	if (!$query) {
		exit();
	}
	$row = mysqli_fetch_array($query);

	if ($row!=null) 
	{
		$bar_code=$row["code"];
		$name=$row["prod_name"];
		$description=$row["description"];
		$price=$row["price"];

		echo "<tr name=".$code." id=".$code.">";

		echo "<td>";
		echo "<label>";
		echo "<button id=\"minus\" class=\"btn-minus minus\"><i class='fa fa-minus'></i></button>";
		echo "<span id='qty-number' class=\"qty-number\">";
		echo "1";
		echo "</span>";
		echo "<button id=\"add\" class=\"btn-add\"><i class='fa fa-plus'></i></button>";
		echo "</label>";
		echo "</td>";

		echo "<td>";
		echo "<label>";
		echo $name." ".$description;
		echo "</label>";
		echo "</td>";

		echo "<td>";
		echo "<label id='price'>";
		echo $price;
		echo "</label>";
		echo "</td>";

		echo "<td>";
		echo "<label class=\"total-val\">";
		echo $price;
		echo "</label>";
		echo "</td>";

		echo "<td>";
		echo "<label>";
		echo "<button id=\"delete\" class=\"delete\"><i class=\"fa fa-trash-o\" style=\"font-size:18px\"></i></button>";
		echo "</label>";
		echo "</td>";

		echo "</tr>";
	}


	
	/*else
	{
		echo "<tr>";
		echo "<td colspan='6'  style=\"color:rgba(244, 66, 32, 1.0)\">";
		echo "<label>";
		echo "Product Not Found";
		echo "</label>";
		echo "</td>";
		echo "</tr>";
	}*/
	


}

?>