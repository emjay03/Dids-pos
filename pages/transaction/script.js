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
	$("#myTable").on("click",".view-trans",function () {
		const currentRow=$(this).closest('tr');
		const invoiceNo=currentRow.find('span:eq(0)').text();
		console.log(invoiceNo);
		$("#embed-view").attr("src","../../archive_doc/"+invoiceNo+".pdf");
	})
	$("#close-view-pdf").click(function () {
		console.log("closed");
		$("#embed-view").attr("src","");
	})
	$("#myTable").on("click","#delete-supplier",function () 
	{
		const currentTR=$(this).closest("tr");
		const invoiceNo=currentTR.find('span:eq(0)').text();

		if (confirm("Do you really want to delete this Transaction?")) 
		{
			$.ajax({  
				type: 'POST',  
				url: 'del-trans.php', 
				data: {invoiceNo:invoiceNo},
				success: function(response) {
					console.log("Total :"+response);
					if (response=="Transaction Deleted Successfully") 
					{
						console.log(response);

						$('.alert1').append('<div style="width: 97.5%;" class="alert alert-info alert-dismissible fade in">'+
							'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
							'<strong>Alert!</strong> Transaction Successfully deleted'+
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
						table.row(currentTR).remove().draw( false );	
					}
				}
			});
		}
		else
		{
			console.log("Delete Cancelled -"+invoiceNo);
		}
	})
})

