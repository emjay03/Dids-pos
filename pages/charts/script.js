$(document).ready(function () {
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
	var date = new Date();
	const year=date.getFullYear().toString();
	const day=date.getDate().toString();
	const month=date.getMonth()+1;
	const today_date=year+"-"+month+"-"+day; 

	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200) 
		{
			var myObj = JSON.parse(this.responseText);
			$(".total-sales").append(myObj[0]);
			$(".total-trans").text(myObj[1]);
			$(".total-prod").text(myObj[2]);
		}
	};
	xmlhttp.open("POST","get-total-today.php?date="+today_date,true);
	xmlhttp.send();


	const xArray = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var yyArray = [0,0,0,157,0,0,0,0,0,0,0,0];
	var yArray = new Array(12);
	var temp;

	var barColors = [
	"#b91d47",
	"#00aba9",
	"#2b5797",
	"#e8c3b9",
	"#1e7145",
	"#F16262",
	"#B69393",
	"#E3DC89",
	"#ABBE54",
	"#54BEB8",
	"#67A9C2",
	"#5D73B5"
	];
	
	temp=0;
	var xmlhttp1= new XMLHttpRequest();
	xmlhttp1.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200) 
		{
			var myObj = JSON.parse(this.responseText);

			//console.log(myObj);
			new Chart("myPlot", {
				type: "bar",
				data: {
					labels: xArray,
					datasets: [{
						backgroundColor:barColors,
						data: myObj
					}]
				},
				options: {
					legend: {display: false},
					title: {
						display: true,
						text: "Sales Month of "+year
					},
					scales: {
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: 'Pesos'
							}
						}]
					},
					plugins:{
						
						labels: {
							render: function (args) {
								return  ;
							},
							fontColor: '#ffff',
						}
					}
				}
			});
		}
	};
	xmlhttp1.open("POST","sales-per-month.php?year="+year,true);
	xmlhttp1.send();


	var xmlhttp2= new XMLHttpRequest();
	xmlhttp2.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200) 
		{
			var myObj = JSON.parse(this.responseText);
			console.log(myObj);
			new Chart("myPlot2", {
				type: "doughnut",
				data: {
					labels: xArray,
					datasets: [{
						backgroundColor: barColors,
						data: myObj
					}]
				},
				options: {
					cutoutPercentage: 30,
					maintainAspectRatio:false,
					title: {
						display: true,
						text: "Total Transaction per Month of "+year
					},
					legend:{
						labels: {
							filter: (legendItem, data) => data.datasets[0].data[legendItem.index] != 0
						},
						position:"right"
					},
					plugins:{

						labels: {
							render: function (args) {
								if (args.percentage>10) 
								{
									return  args.percentage+"% ("+args.value+")";
								}
							},
							fontColor: '#ffff',
						}
					}
				}
			});
		}
	};
	xmlhttp2.open("POST","sales-per-year.php?year="+year,true);
	xmlhttp2.send();
})