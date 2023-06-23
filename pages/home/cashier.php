<?php
session_start();
if ($_SESSION["cashier"]!=true) 
{
	header("location:../../");
}
$name=$_GET['name'];
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>POS | Cashier: <?php echo $name; ?></title>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="../../style/home.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">
	<link rel="icon" type="icon" href="../../media/logo.png">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
	<script src="https://cdn.tutorialjinni.com/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
	<script type="text/javascript" src="../../js/time.js"></script>
	<script src="print.js" type="text/javascript"></script>
	<script type="text/javascript" src="script.js"></script>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	
</head>
<body>
	<nav>
		<header>
		<div class="nav1">
			<div>
				<img id="logo" class="logo" src="../../media/logo_dids.png">
			</div>	
		</div>
		<div class="nav2" id="nav2">
			<script>
				document.write(new Date().toDateString()); 
			</script>

			<div id="time"></div>
		</div>
		</header>
		<input type="checkbox" id="check" />
    <label for="check" class="menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>
    </label>

    <div class="nav-items nav-items2">
      <ul class="overview">

     
			<li >Cashier Name: <span id="cashier-name"><?php echo $name; ?></span></li>
			<li><a class="logout" href="#"><i class="fa fa-power-off"></i> Logout</a></li>
		
      </ul>
    </div>
	</nav>
	<script>
		var phpSession="<?php echo $_SESSION["name"]; ?>";
	</script>
<div class="div-container">
    <div class="child1">

      <div class="sales-table">
        <div class="sub-sale-table" id="sub-sale-table">
          <table id="main-table">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="sales-tab-ajax">
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div class="child2">

      <div class="total-table">
        <div class="sub-total-table">
          <div>
            <table class="table2">
              <tr>
                <img id="barcode">

                <td>Invoice No.:</td>
                <td id="trans-no">-------</td>
              </tr>
            </table>
            <hr>
            <table class="table1">
              <tr>
                <td>Sub Total:</td>
                <td>Php&nbsp;<span id="sub-total">0.00</span></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="search-bar">
          <div class="barcode-bar">
            <input autofocus id="code" type="number" name="barcode-number" placeholder="Barcode No.">
            <button style="display:none;" id="btn-code" onclick="sale();"></button>
          </div>
          <div class="action-button">
            <button id="del"><i class='fa fa-times'></i> Cancel</button>
            <button id="check-out"><i class='fa fa-shopping-cart'></i> Check Out</button>
          </div>
        </div>

        <div class="change-div">
          <button id="change-btn">Change Product</button>
        </div>
      </div>
    </div>
  </div>
	<div class="payment-sec">
		<div class="payment-sec-form">
			<div class="title-payment">
				<h2><i class="fa fa-money"></i>&#160;Payment</h2>
			</div>
			<div class="payment-form">
				<table>
					<tr>
						<td><label>Customer:</label></td>
						<td>
							<input type="radio" id="none" name="dics" value="none" checked>
							<label for="none">Regular</label>
							<input id="sc" type="radio" name="dics" value="sc" >
							<label for="sc">SC</label>
						
						</td>
					</tr>
					<tr id="hidden-tr1">
						<td colspan='2'><input type="text" id="scname" name="scname" placeholder="Name"><input id="scno" placeholder="Sc No." type="text" name="scno"></td>
					</tr><!-- hidden tr --> 
					<tr id="hidden-tr2">
						<td colspan='2'><input type="text" id="pwdname" name="pwdname" placeholder="Name"><input id="pwdno" placeholder="PWD No." type="text" name="pwdno"></td>
					</tr><!-- hidden tr --> 
					<tr>
						<td><label>Sub Total:</label></td>
						<td><label>Php&#160;<span id="sub-total2">0.00</span></label></td>
					</tr>
					<tr>
						<td><label>Discount:</label></td>
						<td><label>Php&#160;<span id="discount">0.00</span></label></td>
					</tr>
					<tr>
						<td><label>Total Due:</label></td>
						<td><label>Php&#160;<span id="total-due2">0.00</span></label></td>
					</tr>
					<tr id="payment-tr">
						<td><label>Payment:</label></td>
						<td><label>Php&#160;</label><input id="payment-input" placeholder="00.00" type="number" name="paymnet"></td>
					</tr>
					<tr>
						<td><label>Change:</label></td>
						<td><label>Php&#160;<span id="change">0.00</span></label></td>
					</tr>
					<tr id="button-tr">
						<td colspan='2'>
							<button id="cancel2">Cancel</button>
							<button id="pay-btn">Pay</button>
						</td>		
					</tr>
				</table>
			</div>
		</div>
	</div>
	<div id="trans-complete">
		<h1><i class="fa fa-check-circle"></i> Transaction Complete!</h1>
	</div>



  
	<div id="pdf-viewer">
    <div class="pdf-viewer-card">
		<embed  id="embed-view"  type="application/pdf" width="270px" height="400px;" src="../transaction/jspdf/533-3040.pdf">	</embed>
    <button id="close-pdf">Close</button>
    </div>
	</div>



  <div class="footer">
  <p>Copyright ©2022 Team Yutz Developer</p>
</div>
	<div class="custom-shape-divider-bottom-1667704152">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div>
</body>
</html>