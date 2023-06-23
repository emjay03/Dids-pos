$(document).ready(function () 
{
	//console.log("Test");
	var table=$('#myTable').DataTable();
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
	$("#myTable").on("click","#delete-supplier",function () 
	{
		const currentRow = $(this).closest('tr');
		const id= $(this).closest('tr').attr("id");

		{
			$.ajax({  
				type: 'POST',  
				url: 'del.php', 
				data: {id:id},
				success: function(response) {
				
					
					
					
					
				}
			});
		}
	})
	$("#myTable").on("click","#supplier-edit-btn",function () 
	{	

		const edit_btn=$(this).closest("tr");
		const edit_name=edit_btn.find("span:eq(0)").text();
		const edit_company_name=edit_btn.find("span:eq(1)").text();
		const edit_tell=edit_btn.find("span:eq(2)").text();
		const edit_email=edit_btn.find("span:eq(3)").text();
		const edit_address=edit_btn.find("span:eq(4)").text();

		$("#edit_supp_name").val(edit_name);
		$("#edit_supp_company_name").val(edit_company_name);
		$("#edit_supp_tell").val(edit_tell);
		$("#edit_supp_email").val(edit_email);
		$("#edit_supp_add").val(edit_address);
		const id=edit_btn.attr("id");
		$(".save-edit-supplier").attr('id', id);
	})
	$(".save-edit-supplier").click(function () 
	{
		const edit_name=$("#edit_supp_name").val();
		const edit_company_name=$("#edit_supp_company_name").val();
		const edit_tell=$("#edit_supp_tell").val();
		const edit_email=$("#edit_supp_email").val();
		const edit_address=$("#edit_supp_add").val();
		const id=$(this).attr("id");

		
		$.ajax({  
				type: 'POST',  
				url: 'edit.php', 
				data: {id:id,edit_name:edit_name,edit_company_name:edit_company_name,
				        edit_tell:edit_tell,edit_email:edit_email,edit_address:edit_address },
				success: function(response) {
					if (response==="Successfully Edited") 
					{
						location.reload();
						console.log("Total :"+response);
					}
					
				}
			});
	})
	$("#add-supplier-btn").click(function () 
	{
		//console.log("Test");

		const name=$("#add_supp_name").val();
		const company_name=$("#add_supp_company_name").val();
		const tell=$("#add_supp_tell").val();
		const email=$("#add_supp_email").val();
		const address=$("#add_supp_add").val();
		

		
		if (name=="" && company_name=="" && tell==""&& email =="" && address=="") 
		{
			
			swal("Warning", "Name, Company Name, and Tell No are Required!", "warning");
		}
		else if(name=="") 
		{
			swal("Warning", "Name is Required!", "warning");
		}
		else if(company_name=="") 
		{
			swal("Warning", "Company name is Required!", "warning");
		}
		else if(tell=="") 
		{
			swal("Warning", "Tellephone number is Required!", "warning");
		}
		else if(email=="") 
		{
			swal("Warning", "Email is Required!", "warning");
		}
		else if(address=="") 
		{
			swal("Warning", "Address is Required!", "warning");
		}
		
		else
		{
			$.ajax({  
				type: 'POST',  
				url: 'add_supplier.php', 
				data: {name:name,company_name:company_name,tell:tell,email:email,address:address},
				success: function(response) {
					if (response==="Supplier Added Successfully") 
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
					else
					{
						console.log("Error");
					}
					
				}
			});
		}
	})
})