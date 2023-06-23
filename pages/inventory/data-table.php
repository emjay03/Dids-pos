<?php
$conn=mysqli_connect("localhost","root","","pos");
$sql = "SELECT * FROM products";
$result = $conn -> query($sql);


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

		?>

		<tr id="<?php echo $row["code"];?>">
			<td><span><?php echo $row["code"]; ?></span></td>
			<td><span><?php echo $row["prod_name"]; ?></span></td>
			<td><span><?php echo $row["description"]; ?></span></td>
			<td><span><?php echo $row["category"]; ?></span></td>
			<td>Php <span><?php echo $row["price"]; ?></span></td>
			<td><span><?php echo $row["unit"]; ?></span></td>
			<td><span><?php echo $row["current_stocks"]; ?></span></td>
			<td><span><?php echo $row["max_stocks"]; ?></span></td>
			<td><button id="edit" class="btn btn-info"><i style="font-size: 15px;" class='fas fa-pen'></i></button>
				<button id="delete" type="button" class="btn btn-danger"><i style="font-size: 15px;" class='far fa-trash-alt'></i></button>
			</td>
		</tr>
		<?php
	}
}
$result=array("$code","$prod_name","$desc","$category","$price","$unit","$current_stocks","$max_stocks");
$myJSON = json_encode($result);
echo $myJSON;
?>