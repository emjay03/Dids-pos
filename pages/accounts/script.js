$(document).ready(function () 
{	
	
	var position;
	var pos_status_admin=false;
	var pos_status_cashier=false;
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
	$(".col-btn1").click(function () {
		console.log(pos_status_admin);
		
		if (!pos_status_admin) 
		{
			$("#username-verify").focus();
			$(this).attr("data-toggle","modal");
			$(this).attr("data-target",".bd-example-modal-sm");

			position="admin";
		}
		else
		{
			$("#collapseExample1").collapse('hide');
			pos_status_admin=false;
		}

			
	})
	$(".col-btn2").click(function () {
		console.log(pos_status_admin);
		if (!pos_status_cashier) 
		{
			$("#username-verify").focus();
			$(this).attr("data-toggle","modal");
			$(this).attr("data-target",".bd-example-modal-sm");
			position="cashier";
		}
		else
		{
			$("#collapseExample2").collapse('hide');
			pos_status_cashier=false;
		}
	})

	$("#verify-btn").click(function () {

		var user=$("#username-verify").val();
		var password=$("#password-verify").val();

		if (position=="admin") 
		{

			$.ajax({  
				type: 'POST',  
				url: 'verify-account.php', 
				data: {user:user,password:password,position,position},
				success: function(response) {
					console.log("Total :"+response);
					if (response==1) 
					{
						pos_status_admin=true;
						$("#collapseExample1").collapse('show');
						$("#close-verify").click();
						$(".col-btn1").attr("data-toggle","");
						$(".col-btn1").attr("data-target","");
					}
					else
					{
						swal({
							title: "Good job!",
							text: "You clicked the button!",
							icon: "success",
						  });
					}
					
				}
			});
		}
		else
		{
			$.ajax({  
				type: 'POST',  
				url: 'verify-account.php', 
				data: {user:user,password:password,position,position},
				success: function(response) {
					console.log("Total :"+response);
					if (response==1) 
					{
						pos_status_cashier=true;
						$("#collapseExample2").collapse('show');
						$("#close-verify").click();
						$(".col-btn2").attr("data-toggle","");
						$(".col-btn2").attr("data-target","");

					}
					else
					{
						alert("Wrong username or password");
					}
					
				}
			});
		}

		$("#username-verify").val("");
		$("#password-verify").val("");
	})

	$(".input-verify").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#verify-btn").click();
    }
});
	$("#add-admin-btn").click(function () 
	{
		//console.log("test");

		const name=$("#admin-name").val();
		const username=$("#admin-username").val();
		const pass=$("#admin-pass").val();
		const ConPass=$("#admin-con-pass").val();
		const position="admin";

		if (name=="" || username=="" || pass=="" || ConPass=="") 
		{
			alert("Fill all requirements");
		}
		else if (pass!==ConPass) 
		{
			alert("Password and Confrim Password does not match");
		}
		else
		{
			$.ajax({  
				type: 'POST',  
				url: 'add-admin.php', 
				data: {name:name,username:username,
				       pass:pass,position:position},
				success: function(response) {
					console.log("Response :"+response);
					location.reload();
				}
			});
		}
	})
	$(".delete-admin").click(function () {
		//console.log("test");
		const currentRow=$(this).closest("tr");
		const id=currentRow.attr("id");
		if (confirm("Do you really want to delete this account?")) {}
		$.ajax({  
				type: 'POST',  
				url: 'edit-del-admin.php', 
				data: {del_id:id},
				success: function(response) {
					console.log("Response :"+response);
					$('.alert1').append('<div style="width: 97.5%;" class="alert alert-info alert-dismissible fade in">'+
						'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
						'<strong>Succeess!</strong> Account Successfully deleted'+
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
					currentRow.remove();

				}
			});

	})
	$(".edit-admin").click(function () {
		const currentRow=$(this).closest("tr");
		const edit_name=currentRow.find("span:eq(1)").text();
		const edit_user_name=currentRow.find("span:eq(2)").text();
		const edit_pass=currentRow.find("span:eq(3)").text();
		const id=currentRow.attr("id");

		$(".edit-admin-btn").attr("id",id);


		$("#edit-name").val(edit_name);
		$("#edit-username").val(edit_user_name);
		$("#edit-pass").val(edit_pass);
		$("#edit-con-pass").val(edit_pass);
	})
	$(".edit-admin-btn").click(function () 
	{
		const name=$("#edit-name").val();
		const username=$("#edit-username").val();
		const pass=$("#edit-pass").val();
		const RetypePass=$("#edit-con-pass").val();
		const edit_id=$(this).attr("id");

		if (name=="" || username=="" || pass=="" || RetypePass=="") 
		{
			alert("Fill all requirements");

		}
		else if(pass!==RetypePass)
		{
			alert("Password and Confirm Password does not match");
		}
		else
		{
			$.ajax({  
				type: 'POST',  
				url: 'edit-del-admin.php', 
				data: {edit_id:edit_id,name:name,username:username,
				       pass:pass},
				success: function(response) {
					console.log("Response :"+response);
					$('.alert1').append('<div style="width: 97.5%;" class="alert alert-success alert-dismissible fade in">'+
						'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
						'<strong>Succeess!</strong> Account Successfully Edited'+
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

					$("#close-edit").click();
					
					$("#tbody-admin").find("tr").each(function () {
						if ($(this).attr("id")==edit_id) 
						{
							$(this).find("span:eq(1)").text(name);
							$(this).find("span:eq(2)").text(username);
							$(this).find("span:eq(3)").text(pass);
						}
					})

				}
			});
			
		}

	})




	$("#add-cashier-btn").click(function () {
		const name=$("#cashier-name").val();
		const username=$("#cashier-username").val();
		const pass=$("#cashier-pass").val();
		const ConPass=$("#cashier-con-pass").val();
		const position="cashier";

		if (name=="" || username=="" || pass=="" || ConPass=="") 
		{
			alert("Fill all requirements");
			console.log(name+" "+username+" "+pass+" "+ConPass);
		}
		else if (pass!==ConPass) 
		{
			alert("Password and Confrim Password does not match");
		}
		else
		{
			$.ajax({  
				type: 'POST',  
				url: 'add-cashier.php', 
				data: {name:name,username:username,
				       pass:pass,position:position},
				success: function(response) {
					console.log("Response :"+response);
					
					location.reload();	
				}
			});
		}
	})

	$(".delete-cashier").click(function () 
	{
		const currentRow=$(this).closest("tr");
		const id=currentRow.attr("id");
		if (confirm("Do you really want to delete this account?")) {}
		$.ajax({  
				type: 'POST',  
				url: 'edit-del-cashier.php', 
				data: {del_cas_id:id},
				success: function(response) {
					console.log("Response :"+response);
					$('.alert1').append('<div style="width: 97.5%;" class="alert alert-info alert-dismissible fade in">'+
						'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
						'<strong>Succeess!</strong> Account Successfully deleted'+
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
					currentRow.remove();

				}
			});
	})
	$(".edit-cashier").click(function () {
		const currentRow=$(this).closest("tr");
		const edit_name=currentRow.find("span:eq(1)").text();
		const edit_user_name=currentRow.find("span:eq(2)").text();
		const edit_pass=currentRow.find("span:eq(3)").text();
		const id=currentRow.attr("id");

		$(".edit-cashier-btn").attr("id",id);


		$("#edit-name-cashier").val(edit_name);
		$("#edit-username-cashier").val(edit_user_name);
		$("#edit-pass-cashier").val(edit_pass);
		$("#edit-con-pass-cashier").val(edit_pass);
	})
	$(".edit-cashier-btn").click(function () 
	{
		const name=$("#edit-name-cashier").val();
		const username=$("#edit-username-cashier").val();
		const pass=$("#edit-pass-cashier").val();
		const RetypePass=$("#edit-con-pass-cashier").val();
		const edit_id=$(this).attr("id");
		console.log(name+" "+username+" "+pass+" "+RetypePass+" "+edit_id);

		if (name=="" || username=="" || pass=="" || RetypePass=="") 
		{
			alert("Fill all requirements");

		}
		else if(pass!==RetypePass)
		{
			alert("Password and Confirm Password does not match");
		}
		else
		{
			$.ajax({  
				type: 'POST',  
				url: 'edit-del-cashier.php', 
				data: {edit_id:edit_id,name:name,username:username,
				       pass:pass},
				success: function(response) {
					console.log("Response :"+response);
					$('.alert1').append('<div style="width: 97.5%;" class="alert alert-success alert-dismissible fade in">'+
						'<a href="#" class="close" style="top:-7px;" data-dismiss="alert" aria-label="close">&times;</a>'+
						'<strong>Succeess!</strong> Account Successfully Edited'+
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

					$("#close-edit-cas").click();
					
					$("#tbody-cashier").find("tr").each(function () {
						if ($(this).attr("id")==edit_id) 
						{
							$(this).find("span:eq(1)").text(name);
							$(this).find("span:eq(2)").text(username);
							$(this).find("span:eq(3)").text(pass);
						}
					})

				}
			});
			
		}

	})


	$("#tbody-admin,#tbody-cashier").on("click",".see-password",function () {
		

		var currentRow=$(this).closest("td");
		
		
		var textType=currentRow.find("span").css("-webkit-text-security");

		if (textType=="disc") 
		{
			currentRow.find("span").css("-webkit-text-security","none");
		}
		else
		{
			currentRow.find("span").css("-webkit-text-security","disc");
		}
		

	})
})