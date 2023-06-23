$(document).ready(function () 
{
	$('.logout').click(function () {
		swal({
			title: "Are you sure?",
			text: "Once you logout your account, you will be back on the login screen ",
			icon: "warning",
			buttons: true,
			cancelButtonColor: "#DD6B55",
			dangerMode: true,
		  })
		  .then((confirm) => {
			if (confirm) {
			  window.location.replace("../../");
			} 
		  });
	})
	$('#main-table tbody').on('click','#minus',function () 
	{
		var currentRow = $(this).closest('tr');
		var td1=currentRow.find('td:eq(0)').text();
		var pr1=currentRow.find('td:eq(2)').text();
		var totalPrice=currentRow.find('td:eq(3)').text();
		var total=document.getElementById("sub-total").innerHTML;
		var tp=parseFloat(totalPrice);
		var pr=parseFloat(pr1);
		var qty=parseInt(td1);

		if (qty>1) 
		{
			qty--;
			tp=tp-pr;
			currentRow.find('span:eq(0)').text(qty);
			currentRow.find('label:eq(3)').text(tp.toFixed(2));
			var sub_total=parseFloat(total)-pr;
			document.getElementById("sub-total").innerHTML=sub_total.toFixed(2);	
		}
		else
		{
			swal("Oopsss!", "Invalid Input", "warning");
		}
	});
	$('#main-table tbody').on('click','#add',function () 
	{
		var currentRow = $(this).closest('tr');
		var td1=currentRow.find('span:eq(0)').text();
		var pr1=currentRow.find('td:eq(2)').text();
		var totalPrice=currentRow.find('td:eq(3)').text();
		var total=document.getElementById("sub-total").innerHTML;
		var tp=parseFloat(totalPrice);
		var pr=parseFloat(pr1);
		var qty=parseInt(td1);

		var temp=tp+pr;
		var sub_total=parseFloat(total)+pr;
		qty++;
		document.getElementById("sub-total").innerHTML=sub_total.toFixed(2);
		currentRow.find('span:eq(0)').text(qty);
		currentRow.find('label:eq(3)').text(temp.toFixed(2));



	});
	$('#main-table tbody').on('click','#delete',function () 
	{	
		var currentRow = $(this).closest('tr');
		var totalPrice=currentRow.find('td:eq(3)').text();
		var total=document.getElementById("sub-total").innerHTML;
		var tp=parseFloat(totalPrice);
		document.getElementById("sub-total").innerHTML=(parseFloat(total)-tp).toFixed(2);

		$(this).closest('tr').remove();
	});



	var input = document.getElementById("code");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("btn-code").click();
			input.value="";
		}
	});
	$('#del').ready(function () {
		$('#del').on('click',function () 
		{
			var rowCount = $('#sales-tab-ajax tr').length;
			
             swal({
					title: "Do you sure you want to cancel?",
					text: "Once you cancelled, you will not be able to recover this item!",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				  })
				  
				  .then((willDelete) => {
					 if (willDelete) {
						swal("Cancel Item(s)", "You have successfully cancelled your item(s)", "success");
					  {
						$("#sales-tab-ajax").find("tr").remove();
						$("#sub-total").text("0.00");
						$("#trans-no").text("-------")
						$('img#barcode').attr("src","");
						$('#code').focus();
					}
					} else {
					
					  
					}
					
				  });
			
				  if (rowCount==0) 
				  {
					swal("Oopsss!", "No List Yet", "warning");
				  }
			
		})
	})
	$('#check-out').ready(function () {
		$('#check-out').on('click',function () 
		{	
			var rowCount = $('#sales-tab-ajax tr').length;
			var	subtotal=$('#sub-total').text();

			if (rowCount==0) 
			{
				if (rowCount==0) 
				{
				  swal("Oopsss!", "No List Yet", "warning");
				}
			}
			else
			{
				$('.payment-sec').css('display','flex');
				$('#sub-total2').text(subtotal);
				$('#total-due2').text(subtotal);
				$('main').css('pointer-events','none');
				$("#none").prop("checked", true);
				$('#discount').text("0.00");
				$('#payment-input').val('');
				$('#change').text('0.00');
				$('#payment-input').focus();
				document.getElementById('hidden-tr2').style.display = 'none';
				document.getElementById('hidden-tr1').style.display = 'none';

			}
		})
	})

	$('.payment-form input[type=text],input[type=number]').keyup(function(event) {
		if (event.keyCode === 13) {
			$('#pay-btn').click();
		}
	});

	$('.payment-form').ready(function () 
	{
		$('#payment-input').keyup(function () 
		{
			var payment=this.value;
			var due=$('#total-due2').text();

			var change=(parseFloat(payment)-parseFloat(due)).toFixed(2);
			if (!isNaN(change)) 
			{
				$('#change').text(change);
			}
			else
			{
				$('#change').text("0.00");
			}

		})
		$("input[type='radio']").click(function(){
			var radioValue = $("input[name='dics']:checked").val();
			var subtotalVat=$('#sub-total2').text();

			var TotalVat=(parseFloat(subtotalVat)*0.12).toFixed(2);

			var due=$('#total-due2').text();
			$('#payment-input').val('');
			var	totaldue=parseFloat(subtotalVat)-TotalVat;

			var vat20=(totaldue*0.20).toFixed(2);

			totaldue=totaldue-vat20;


			if (radioValue=='sc') 
			{
				document.getElementById('hidden-tr1').style.display = 'contents';
				document.getElementById('hidden-tr2').style.display = 'none';
				$('#scname').css('border','1px solid black');
				$('#scno').css('border','1px solid black');

				$('#scname').val('');
				$('#scname').focus();
				$('#scno').val('');
				$('#change').text("0.00");

				$('#payment-input').css('border','1px solid black');
				$('#total-due2').text(totaldue.toFixed(2));
				$('#discount').text((parseFloat(TotalVat)+parseFloat(vat20)).toFixed(2));


			}
			else if(radioValue=='pwd')
			{
				document.getElementById('hidden-tr2').style.display = 'contents';
				document.getElementById('hidden-tr1').style.display = 'none';
				$('#pwdname').css('border','1px solid black');
				$('#pwdno').css('border','1px solid black');

				$('#pwdname').focus();
				$('#pwdname').val('');
				$('#pwdno').val('');
				$('#change').text("0.00");

				$('#payment-input').css('border','1px solid black');
				$('#total-due2').text(totaldue.toFixed(2));
				$('#discount').text((parseFloat(TotalVat)+parseFloat(vat20)).toFixed(2));


			}
			else
			{
				document.getElementById('hidden-tr2').style.display = 'none';
				document.getElementById('hidden-tr1').style.display = 'none';
				$('#payment-input').css('border','1px solid black');

				$('#payment-input').focus();
				$('#change').text("0.00");
				$('#discount').text(parseFloat(TotalVat-TotalVat).toFixed(2));
				$('#total-due2').text(parseFloat(subtotalVat).toFixed(2));


			}


		});
		$('#cancel2').click(function () 
		{
			$('.payment-sec').css('display','none');
			$('main').css('pointer-events','auto');
		})

		$('#pay-btn').click(function () 
		{
			var radioValue = $("input[name='dics']:checked").val();
			var	paymentIntput=$('#payment-input').val();
			if (radioValue=='sc') 
			{
				var scname=$('#scname').val();
				var scno=$('#scno').val();




				if (scname=='') 
				{
					$('#scname').css('border','2px solid rgba(244, 66, 32, 1.0)');
				}
				else
				{
					$('#scname').css('border','1px solid black');
				}
				if (scno=='') 
				{
					$('#scno').css('border','2px solid rgba(244, 66, 32, 1.0)');
				}
				else
				{
					$('#scno').css('border','1px solid black');
				}
				if (paymentIntput=='') 
				{
					$('#payment-input').css('border','2px solid rgba(244, 66, 32, 1.0)');
				}
				else
				{
					$('#payment-input').css('border','1px solid black');
				}
				if (scname!='' && scno!='' && paymentIntput!='') 
				{
					var change=$('#change').text();
					if (parseFloat(change)<0) 
					{
						alert("Not Enough Payment");
					}
					else
					{	

						var trans=$('#trans-no').text();
						var date = new Date();
						const year=date.getFullYear().toString();
						const day=date.getDate().toString();
						const month=date.getMonth()+1;

						const trans_date=year+"-"+month+"-"+day; 
						var cashier_name=$('#cashier-name').text();
						if (cashier_name=="") 
						{
							cashier_name="Admin";
						}
						var totaldueDisc=$('#sub-total').text();
						add_transaction(trans,trans_date,cashier_name,totaldueDisc);


						print(phpSession);
						$('#sales-tab-ajax tr').each(function() 
						{
												//console.log(this.id)
												var id=$(this).attr('id');
												var qty=$(this).find('span:eq(0)').text();
												console.log("Qty :"+qty);
												$.ajax({  
													type: 'Get',  
													url: 'LessStocks.php', 
													data: { code: id,qty:qty },
													success: function(response) {
														console.log("Total :"+response);
													}
												});

												
											})
						$('#sales-tab-ajax tr td:nth-child(3)').show();
						$('img#barcode').attr("src","");
						$('.payment-sec').css('display','none');
						$("#sales-tab-ajax").find("tr").remove();
						$("#sub-total").text("0.00");
						$("#trans-no").text("-------")
						alert("Change: Php "+change);
						$("#trans-complete").css("visibility","visible");
						setTimeout(function() 
						{ 
							$("#trans-complete").css("visibility","hidden");
						}, 2000);
						$('main').css('pointer-events','auto');
						$("#code").focus();

					}
				}
			}
			else if (radioValue=='pwd') 
			{
				var pwdname=$('#pwdname').val();
				var pwdno=$('#pwdno').val();

				if (pwdname=='') 
				{
					$('#pwdname').css('border','2px solid rgba(244, 66, 32, 1.0)');
				}
				else
				{
					$('#pwdname').css('border','1px solid black');
				}
				if (pwdno=='') 
				{
					$('#pwdno').css('border','2px solid rgba(244, 66, 32, 1.0)');
				}
				else
				{
					$('#pwdno').css('border','1px solid black');
				}
				if (paymentIntput=='') 
				{
					$('#payment-input').css('border','2px solid rgba(244, 66, 32, 1.0)');
				}
				else
				{
					$('#payment-input').css('border','1px solid black');
				}
				if (pwdname!='' && pwdno!='' && paymentIntput!='') 
				{
					var change=$('#change').text();
					if (parseFloat(change)<0) 
					{
						alert("Not Enough Payment");
					}
					else
					{	
						var trans=$('#trans-no').text();
						var date = new Date();
						const year=date.getFullYear().toString();
						const day=date.getDate().toString();
						const month=date.getMonth()+1;

						const trans_date=year+"-"+month+"-"+day; 
						var cashier_name=$('#cashier-name').text();
						if (cashier_name=="") 
						{
							cashier_name="Admin";
						}
						var totaldueDisc=$('#sub-total').text();
						add_transaction(trans,trans_date,cashier_name,totaldueDisc);


						print(phpSession);
						$('#sales-tab-ajax tr').each(function() {
												//console.log(this.id)
												var id=$(this).attr('id');
												var qty=$(this).find('span:eq(0)').text();
												console.log("Qty :"+qty);
												$.ajax({  
													type: 'Get',  
													url: 'LessStocks.php', 
													data: { code: id,qty:qty },
													success: function(response) {
														console.log("Total :"+response);
													}
												});

												
											})
						$('#sales-tab-ajax tr td:nth-child(3)').show();
						$('img#barcode').attr("src","");
						$('.payment-sec').css('display','none');
						$("#sales-tab-ajax").find("tr").remove();
						$("#sub-total").text("0.00");
						$("#trans-no").text("-------")
						alert("Change: Php "+change);
						$("#trans-complete").css("visibility","visible");
						setTimeout(function() 
						{ 
							$("#trans-complete").css("visibility","hidden");
						}, 2000);
						$('main').css('pointer-events','auto');
						$("#code").focus();

					}
				}
			}
			else if (radioValue==''||radioValue=='none')
			{
				if (paymentIntput=='') 
				{
					$('#payment-input').css('border','2px solid rgba(244, 66, 32, 1.0)');
				}
				else
				{
					$('#payment-input').css('border','1px solid black');
				}
				if (paymentIntput!='') 
				{
					var change=$('#change').text();
					if (parseFloat(change)<0) 
					{
						alert("Not Enough Payment");
					}
					else
					{

						var trans=$('#trans-no').text();
						var date = new Date();
						const year=date.getFullYear().toString();
						const day=date.getDate().toString();
						const month=date.getMonth()+1;

						const trans_date=year+"-"+month+"-"+day; 
						var cashier_name=$('#cashier-name').text();
						if (cashier_name=="") 
						{
							cashier_name="Admin";
						}
						var totaldueDisc=$('#sub-total').text();
						add_transaction(trans,trans_date,cashier_name,totaldueDisc);




						print(phpSession);
						$('#sales-tab-ajax tr').each(function() {
							console.log(this.id)
							var id=$(this).attr('id');
							var qty=$(this).find('span:eq(0)').text();
							console.log("Qty :"+qty);
							$.ajax({  
								type: 'Get',  
								url: 'LessStocks.php', 
								data: { code: id,qty:qty },
								success: function(response) {
									console.log("Total :"+response);
								}
							});


						})
						$('#sales-tab-ajax tr td:nth-child(3)').show();
						$('img#barcode').attr("src","");
						$('.payment-sec').css('display','none');
						$("#sales-tab-ajax").find("tr").remove();
						$("#sub-total").text("0.00");
						$("#trans-no").text("-------")
						alert("Change: Php "+change);
						$("#trans-complete").css("visibility","visible");
						setTimeout(function() 
						{ 
							$("#trans-complete").css("visibility","hidden");
						}, 2000);
						$('main').css('pointer-events','auto');
						$("#code").focus();


					}
				}
			}
		})
})

$("#change-btn").click(function () {
	var trans_no = prompt(" Please Enter Invoice Number:");
	if (trans_no==null) 
	{

	}
	else
	{
		$.ajax({  
		type: 'GET',  
		url: 'get-transaction.php', 
		data: { trans_no:trans_no},
			success: function(response) 
			{
				//console.log(response);
				if (response==1) 
				{
					//console.log("success");

					$("#pdf-viewer").css("visibility","visible");
					$("#embed-view").attr("src","../../archive_doc/"+trans_no+".pdf");

				}
				else
				{
					swal({
						title: "Opps!",
						text: "No Transcation Found!",
						icon: "error",
						button: "Ok",
					  });
				}
			}
		});
	}
	
})

$("#close-pdf").click(function () {
	$("#pdf-viewer").css("visibility","hidden");
	$("#embed-view").attr("src","../transaction/"+""+".pdf");
})

})
function add_transaction (transaction,date,cashier_name,total_price) {
	$.ajax({  
		type: 'post',  
		url: 'add_transaction.php', 
		data: { transaction:transaction,date:date,cashier_name:cashier_name,total_price:total_price },
		success: function(response) {
			console.log("Total :"+response);
		}
	});
}
function sale() 
{
	var code=document.getElementById('code').value;
	var xmlhttp3 = new XMLHttpRequest();
	xmlhttp3.onreadystatechange = function()
	{
		if (code!=="") 
		{
			if (this.readyState== 4 && this.status == 200) 
			{
				const date=new Date();
				const year=date.getFullYear().toString();
				const day=date.getDate().toString();
				const hr=date.getHours().toString();
				const month=date.getMonth()+1;	
				const min=date.getMinutes();
				const sec=date.getSeconds();
				var transaction_no=month+day+hr+"-"+min+sec;
				document.getElementById("sales-tab-ajax").innerHTML += this.responseText;
				if ($('#trans-no').text()=='-------') 
				{
					document.getElementById("trans-no").innerHTML =transaction_no;

				}	
			}

		}
		else
		{
			console.log("empty");
		}

	};
	xmlhttp3.open("GET","prod_fetch.php?code="+document.getElementById('code').value,true);
	xmlhttp3.send();
	var xmlhttp4= new XMLHttpRequest();
	xmlhttp4.onreadystatechange = function()
	{
		if (code!=="") 
		{
			try
			{
				if(this.readyState== 4 && this.status == 200) 
				{
					document.getElementsByClassName('sub-sale-table')[0].scrollTop = document.getElementsByClassName('sub-sale-table')[0].scrollHeight;
					var myObj = JSON.parse(this.responseText);
					var price =myObj[0];
					var print=document.getElementById("sub-total").innerHTML;
					var total= parseFloat(print)+parseFloat(price);
					document.getElementById("sub-total").innerHTML=total.toFixed(2);
				}

			}
			catch(error)
			{
				console.log('Error happened here!');
			}

		}
		else
		{
			console.log("empty2");
		}

	};
	xmlhttp4.open("GET","total.php?code="+document.getElementById('code').value,true);
	xmlhttp4.send();	
}