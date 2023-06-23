<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Login | Point-of-Sale</title>

	<link rel="stylesheet" type="text/css" href="style/login.css">
	<link rel="stylesheet" type="text/css" href="style/input.scss">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">
	<link rel="icon" type="icon" href="media/logo.png">

	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" rel="stylesheet">
	
</head>

<body>
	<?php
	session_unset();
	session_start();
	$_SESSION["admin"] = false;
	$_SESSION["cashier"] = false;
	$conn = mysqli_connect("localhost", "root", "", "pos");

	if (isset($_POST['submit'])) {
		$username = $_POST['username'];
		$password = $_POST['password'];

		$success_msg = "";
		$position;
		$name;
		if (!empty($username) && !empty($password)) {
			$sql = "SELECT * FROM account WHERE username='$username' AND password='$password'";
			$result = mysqli_query($conn, $sql);
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$position = $row["position"];
					$name = $row["name"];
				}
			}

			$count = mysqli_num_rows($result);
			if ($count == 1 && $position == "admin") {

				$_SESSION["admin"] = true;
				$_SESSION["name"] = $name;

	?>
				<script>
					Swal.fire({
						icon: 'success',
						title: 'Great',
						text: 'You have successfully logged into the Dids Store POS',
						showConfirmButton: false,

						


					})
				
				</script>
			<?php
				header("refresh:1; url=pages/home");
			} else if ($count == 1 && $position == "cashier") {
				$_SESSION["cashier"] = true;
			?>
				<script>
					Swal.fire({
						icon: 'success',
						title: 'Great',
						text: 'You have successfully logged into the Dids Store POS',
						showConfirmButton: false,


					})

				</script>
			<?php
				header("refresh:1; url=pages/home/cashier.php?name=" . $name);
			} else {
				?>
				<script>
					Swal.fire({
						icon: 'error',
						title: 'Warning',
						text: 'Incorrect username or password !',
						confirmButtonColor: "#1f9fd1",
						showConfirmButton: true,
						allowOutsideClick: false,
	
	
					})
				</script>
		<?php

			}
		} 
		
	}
	
	?>


	<div class="container bg-red-500">
		<div class="container-flex">

			<div class="flex-left">
				<div class="flex-img">
					<img src="media/logo_dids.png">
				</div>

			</div>
			<div class="flex-right">
				<h1>Welcome to Did's Store POS</h1>
				<p>Lorem, ipsum dolor sit amet consectetur animimodi nemo?</p>
				<div class="form">
					<form method="POST" action="" autocomplete="off">

						<div class="form-control">
							<input type="text" id="username" name="username" required />
							<label>Username</label>
						</div>

						<div class="form-control">
							<input type="password" id="password" name="password" required />
							<label>Password</label>
						</div>
						<div class="div-remember">
						<input type="checkbox" value="lsRememberMe" id="rememberMe"> 
						<label  class="remeber"for="rememberMe">Remember me</label>

						</div>

					



						<div>

							<button type="submit" name="submit" value="Login" onclick="lsRememberMe() " class="button-65" role="button">Sign in</button>
						</div>

					</form>


				</div>
			</div>
		</div>

	</div>


</body>
<script type="text/javascript" src="./js/modal.js"></script>
<script type="text/javascript">
	const inputs = document.querySelectorAll('.form-control input');
	const labels = document.querySelectorAll('.form-control label');

	labels.forEach(label => {
		label.innerHTML = label.innerText
			.split('')
			.map((letter, idx) => `<span style="
        transition-delay: ${idx * 50}ms
      ">${letter}</span>`)
			.join('');
	});

	const rmCheck = document.getElementById("rememberMe"),
		emailInput = document.getElementById("username");

	if (localStorage.checkbox && localStorage.checkbox !== "") {
		rmCheck.setAttribute("checked", "checked");
		emailInput.value = localStorage.username;
	} else {
		rmCheck.removeAttribute("checked");
		emailInput.value = "";
	}

	function lsRememberMe() {
		if (rmCheck.checked && emailInput.value !== "") {
			localStorage.username = emailInput.value;
			localStorage.checkbox = rmCheck.value;
		} else {
			localStorage.username = "";
			localStorage.checkbox = "";
		}
	}
</script>

</html>