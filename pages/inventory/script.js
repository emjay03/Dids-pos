$(document).ready(function () 
{
	var editProd_code;
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
	var table=$('#myTable').DataTable();
	var table2=$('#myTable2').DataTable();
	$('#myTable').on('click','#edit-btn',function () 
	{

		var editBtn_row = $(this).closest('tr');
		var id=editBtn_row.attr("id");
		console.log(id);
		var code=editBtn_row.find('span:eq(0)').text();
		var name=editBtn_row.find('span:eq(1)').text();
		var desc=editBtn_row.find('span:eq(2)').text();
		var cat=editBtn_row.find('span:eq(3)').text();
		var price=editBtn_row.find('span:eq(4)').text();
		var unit=editBtn_row.find('span:eq(5)').text();
		var max=editBtn_row.find('span:eq(7)').text();

		$(".save-edit").attr("id",id);

		$('#update-category').find('option').each(function() {
			if($(this).text() === cat) {
				$(this).attr("selected","selected");
			}	
		});
		$('#update-unit').find('option').each(function() {
			if($(this).text() === unit) {
				$(this).attr("selected","selected");
			}	
		});

		

		$('#update-code').val(code);
		$('#update-name').val(name);
		$('#update-desc').val(desc);
		$('#update-code').val(code);
		$('#update-price').val(price);
		$('#update-max').val(max);
	})
	$(".save-edit").click(function () {
		var id=$(this).attr("id");
		var edit_code=$('#update-code').val();
		var edit_name=$('#update-name').val();
		var edit_desc=$('#update-desc').val();
		var edit_cat=$('#update-category').find(":selected").text();
		var edit_unit=$('#update-unit').find(":selected").text();
		var edit_price=$('#update-price').val();
		var edit_max=$('#update-max').val();

		$.ajax({  
			type: 'POST',  
			url: 'edit_del.php', 
			data: {id:id,editcode: edit_code,edit_name:edit_name,
				edit_desc:edit_desc,edit_cat:edit_cat,
				edit_unit:edit_unit,edit_price:edit_price,edit_max:edit_max},
				success: function(response) {
					if (response==="Successfully Edited") 
					{
						location.reload();
						console.log("Total :"+response);
					}
					
				}
			});
		
	})
	$('#myTable').on('click','#delete',function () 
	{
		var currentRow = $(this).closest('tr');
		var trID= $(this).closest('tr').attr("id");
		
		var trCode=currentRow.find('span:eq(0)').text();
		if (confirm("You really want to Delete this Item?")) 
		{
			$.ajax({  
				type: 'POST',  
				url: 'edit_del.php', 
				data: {delcode: trCode},
				success: function(response) {
					console.log("Total :"+response);
					
					$('.alert1').append('<div style="width: 97.5%;" class="alert alert-info alert-dismissible fade in">'+
						'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
						'<strong>Alert!</strong> Product Successfully deleted'+
						'</div>');
					$('.alert1').fadeIn();
					setTimeout(function()
					{
   						$('.alert1').fadeOut(1500);// or fade, css display however you'd like.
   					}, 2500);
					setTimeout(function()
					{
						$('.alert1').empty();
					}, 4000);
					table.row(currentRow).remove().draw( false );
					$("#tbody2").find("tr").each(function () {
						
						if ($(this).attr("id")===trID) 
						{
							table2.row($(this)).remove().draw( false );
						}
					})
					
					
				}
			});
		}
		else
		{
			console.log(trCode);
		}
	})
	$('#btn-add-prod').click(function () 
	{
		var barcode=$('#add-barcode').val();
		var prodname=$('#add-prodname').val();
		var desc=$('#add-desc').val();
		var category=$('#add-category').val();
		var price=$('#add-price').val();
		var unit=$('#add-unit').val();
		var stocks=$('#add-stocks').val();
		var max_stocks=$('#add-maxstocks').val();
		var expiry=$('#add-expiry').val();
		var supplier=$('#add-supplier').val();


		if (barcode=="" || prodname=="" || desc=="" || category=="" ||
			price=="" || unit=="" || stocks=="" || max_stocks=="" ||
			expiry=="")
		{ 
			
			swal("Warning", "Fillout All Information!", "warning");
		}
		else
		{
			$.ajax({  
				type: 'POST',  
				url: 'add-prod.php', 
				data: { barcode: barcode, prodname:prodname,
					desc:desc,category:category,price:price,
					unit:unit,stocks:stocks,max_stocks:max_stocks,
					expiry:expiry,supplier:supplier
				},
				success: function(data) {

					if (data=="Product Already Exist") 
					{
						$('.alert1').append('<div style="width: 97.5%;" class="alert alert-danger alert-dismissible fade in">'+
							'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
							'<strong>Error! </strong> Product Already Exist'+
							'</div>');
					}
					else
					{
						swal({
							title: "Success",
							text: "Product Successfully Added!",
							icon: "success",
							
							
							
						  })
						  .then((success) => {
							if (success) {
							
							 location.reload();
							} 
						  });
					}

					$('.alert1').fadeIn();

					setTimeout(function()
					{
   						$('.alert1').fadeOut(1500);// or fade, css display however you'd like.
   						
   					}, 2500);

					setTimeout(function()
					{
						$('.alert1').empty();
					}, 4000);

					$('.modal-body > .form-control').each(function () 
					{
						$(this).val("");
					})
					$('#modal-exit').click();	
				}
			});

			/*var xmlhttp2= new XMLHttpRequest();
			xmlhttp2.onreadystatechange = function()
			{
				if(this.readyState== 4 && this.status == 200) 
				{
					var myObj = JSON.parse(this.responseText);	
					//table.row.add([myObj[0],'1234']).draw();
					// t.row.add($(rowHtml)).draw();
					table.row.add([{'barcode': myObj[0], 
						            'brandname':myObj[1],
						             'dec':myObj[2],
						             'category':myObj[3],
						             'sellprice':myObj[4],
						             'unit':myObj[5],
						             'stocks':myObj[6],
						             'maxstocks':myObj[7],
						             'action':'none', }]).draw();
					console.log(myObj);
				}
			}
			xmlhttp2.open("GET","add-prod.php?barcode="+barcode+"&prodname="+prodname+"&category="+category+"&desc="+desc+
				"&price="+price+"&unit="+unit+"&stocks="+stocks+"&max_stocks="+max_stocks+"&expiry="+expiry);
				xmlhttp2.send();*/
			}


		})
	var input = document.getElementById("add-stock-code");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("add-stock").click();
			input.value="";
			console.log("clicked");
		}
	});
	var input = document.getElementById("add-stock-input");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("add-stock-btn").click();
			input.value="";
			console.log("clicked");
		}
	});
	$("#add-stock-btn").click(function() {
		var add_code=$("#code-stock").text().replace(' ', '');
		var add_stock_intput=$("#add-stock-input").val();
		var stock_expiry=$("#new-stock-expiry").val();
		if (add_stock_intput==""||stock_expiry=="") 
		{
			
			swal("Warning", "No Stock Quantity or Expriry!", "warning");
		}
		else
		{	
			var currentStock=parseInt($("#current-stock").text());
			var maxStock=parseInt($("#max-stock").text());
			var totalstock=currentStock+parseInt(add_stock_intput);

			if (totalstock>maxStock) 
			{
				alert("Stock Overload: Please Minimize add Stock");
			}
			else
			{
				

				$.ajax({  
					type: 'GET',  
					url: 'add-stock.php', 
					data: { barcode:add_code,
						expiry:stock_expiry,
						new_stock:totalstock},
						success: function(response) {

							console.log(response);
						
							swal({
								title: "Success",
								text: "Stock Successfully Added!",
								icon: "success",
								
								
								
							  })
							  .then((success) => {
								if (success) {
								
								 location.reload();
								} 
							  });
						}
				
						
						
					});
			}
		}

	})
	$("#add-stock-input").keyup(function () {
		$(".table-modal tr:last-child").css("display","contents");
		var currentStock=parseInt($("#current-stock").text());
		var add_stock_intput=$("#add-stock-input").val();
		var totalstock=currentStock+parseInt(add_stock_intput);
		var maxStock=parseInt($("#max-stock").text());
		if (add_stock_intput=="") 
		{
			$(".table-modal tr:last-child td:last-child").text(currentStock)
		}
		else
		{
			$(".table-modal tr:last-child td:last-child").text(totalstock);
			if (totalstock>maxStock) 
			{
				$(".table-modal tr:last-child td:last-child").css("color","rgb(255, 69, 69)");
				$(".table-modal tr:last-child td:last-child").text(totalstock+" Stock Overload");
			}
			else
			{
				$(".table-modal tr:last-child td:last-child").css("color","black");
			}
		}
		

	})
	$("#stock-modal").click(function () {
		$("#code-stock").text("");
		$("#name-stock").text("");
		$("#desc-stock").text("");
		$("#current-stock").text("");
		$("#max-stock").text("");
		$("#add-stock-input").val("");
		$("#add-stock-input").prop("disabled",true);
		$("#new-stock-expiry").prop("disabled",true);
		$("#new-stock-expiry").val("");
		$(".table-modal tr:last-child").css("display","none");
	})
	
	$('#tbody').find('tr').each(function() {

		const limit=parseInt($(this).find("td span:eq(6)").text());
		if (limit<=10) 
		{
			const code=$(this).find("td span:eq(0)").text();
			$('.alert2').append('<div style="width: 97.5%;" class="alert alert-danger alert-dismissible fade in">'+
				'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
				'<strong>Alert! </strong>Product with Barcode <strong>'+code+"</strong> is running out of stock"+
				'</div>');
			$(this).css("background-color","rgba(245, 49, 49,0.3)");
			$(this).find("td span:eq(6)").css("color","rgba(245, 49, 49)");
		}	

		var date = new Date();
		const year=date.getFullYear().toString();
		const day=date.getDate()+1;
		const month=date.getMonth()+1;
		const expiration=$(this).find("td span:eq(8)").text();
		const date_today=year+"-"+month+"-"+day;

		

		const diffTime=Math.abs(Date.parse(expiration) - Date.parse(date_today));
		const diffDays=Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
		console.log(diffDays+" days left");

		if (diffDays<=14) 
		{
			const code=$(this).find("td span:eq(0)").text();
			$('.alert2').append('<div style="width: 97.5%;" class="alert alert-danger alert-dismissible fade in">'+
				'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
				'<strong>Alert! </strong>Product with Barcode <strong>'+code+"</strong> has only <u>2 weeks</u> to expired"+
				'</div>');
			$(this).css("background-color","rgba(245, 49, 49,0.3)");
			$(this).find("td span:eq(8)").css("color","rgba(245, 49, 49)");
		}	


	});
	
	
})
function add_stock() 
{
	var add_code=$("#add-stock-code").val();
	var xmlhttp2= new XMLHttpRequest();
	xmlhttp2.onreadystatechange = function()
	{
		try
		{
			if(this.readyState== 4 && this.status == 200) 
			{
				var myObj = JSON.parse(this.responseText);
				console.log(myObj);
				$("#code-stock").text(" "+myObj[0]);
				$("#name-stock").text(" "+myObj[1]);
				$("#desc-stock").text(" "+myObj[2]);
				$("#current-stock").text(" "+myObj[6]);
				$("#max-stock").text(" "+myObj[7]);
				$("#add-stock-input").prop("disabled",false);
				$("#new-stock-expiry").prop("disabled",false);
			}
			
		}
		catch(error)
		{
			console.log('Product Not Found!');
			$("#code-stock").text("");
			$("#name-stock").text("");
			$("#desc-stock").text("");
			$("#current-stock").text("");
			$("#max-stock").text("");
			$("#add-stock-code").val("");
			swal("Error!", "Product Not Found!", "error");
		}
		
	}
	xmlhttp2.open("GET","fetch-add-stock.php?code="+add_code);
	xmlhttp2.send();

}