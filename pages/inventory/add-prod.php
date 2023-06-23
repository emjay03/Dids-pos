<?php
$conn=mysqli_connect("localhost","root","","pos");
$barcode=$_POST['barcode'];
$prodname=$_POST['prodname'];
$category=$_POST['category'];
$desc=$_POST['desc'];
$price=$_POST['price'];
$unit=$_POST['unit'];
$stocks=$_POST['stocks'];
$maxstocks=$_POST['max_stocks'];
$expiry=$_POST['expiry'];
$supplier=$_POST['supplier'];

$sql2="SELECT * FROM products WHERE code='$barcode'";
$result2=mysqli_query($conn,$sql2);
if ($result2 -> num_rows === 0) 
{
	$sql ="INSERT INTO `products`(`code`, `prod_name`, `description`, `category`, `price`, `unit`, `current_stocks`, `max_stocks`, `expiration`,`supplier`) VALUES ('$barcode','$prodname','$desc','$category','$price','$unit','$stocks','$maxstocks','$expiry','$supplier')";
	$conn->query($sql);


	$sql1 = "SELECT * FROM products where code='$barcode'";
	$result = $conn -> query($sql1);
}
else
{
	echo "Product Already Exist";
}



/*$result=array("$code","$prod_name","$desc","$category","$price","$unit","$current_stocks","$max_stocks");
$myJSON = json_encode($result);
echo $myJSON;*/

?>