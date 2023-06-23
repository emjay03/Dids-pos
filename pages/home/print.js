//console.log("Testing js file")
window.jsPDF = window.jspdf.jsPDF

var specialElementHandlers = {
    '#sales-tab-ajax': function (element, renderer) {
        return true;
    }
};



function print(name) 
{

    var source=$('#sales-tab-ajax');
    var totalsale=$('#sub-total').text();
    var discount=$('#discount').text();
    var cash=parseFloat($('#payment-input').val()).toFixed(2);
    var change=$('#change').text();
    var cashier_name=$('#cashier-name').text();
    if (cashier_name=="") 
    {
        cashier_name=name;
    }
    var totaldueDisc=$('#total-due2').text();
    var radioValue = $("input[name='dics']:checked").val();
    $('#sales-tab-ajax tr td:nth-child(3)').hide();

    var scname=$("#scname").val();
    var scno=$("#scno").val();
    var pwdname=$("#pwdname").val();
    var pwdno=$("#pwdno").val();
    var imgData;



    var height=$('#sales-tab-ajax').height();

    

    var doc=new jsPDF('p', 'mm', [57,140+(height*0.26)]);
    var date = new Date().toDateString(); 
    var trans=$('#trans-no').text();
    JsBarcode("#barcode", trans,{
        height: 20,
        width: 1.5,
        fontOptions: "normal",
        fontSize: 13

    });
    const img = document.querySelector('img#barcode');
    const logo = document.querySelector('img#logo');


     doc.addImage(logo.src, 'JPEG', 23,2, 12,12);

    doc.setFont('courier','normal');
    doc.text("DID'S STORE",10,20);
    doc.setFontSize(10);
    doc.text("42 Production St.",11,25);
    doc.text("Sangandaan Quezon City",5,30);
    doc.text("Cel No: 0928 297 4076",6,35);
    doc.text("=======================",4,40);
    doc.text("Cashier: "+cashier_name,4,45);

    doc.text("Date: "+date,4,50);


    doc.text("Invoice #: "+trans,4,55);
    doc.text("=======================",4,60);
    doc.text("Qty    Item       Total",4,65);

    doc.autoTable({
        html:'#sales-tab-ajax',
        theme: "plain",
        tableWidth: 60,
        columnStyles: {
           0: {
               cellWidth: 10
           },
           1: {
               cellWidth: 28
           },
           2: {
               cellWidth: 18
           }
       },
       styles:
       {
        fontSize: 9,
        font:'courier',
        halign: 'left'
    },
    margin: {left:2,right:0,top:5},
    startY:65,

});
    doc.text("=======================" ,4, doc.autoTable.previous.finalY+5)
    doc.setFontSize(9);

    
    if (discount!=='0.00') 
    {
        doc.text("Total           Php "+totalsale,4, doc.autoTable.previous.finalY+10)
        doc.text("Discount        Php "+discount,4, doc.autoTable.previous.finalY+15)
        doc.setFont('courier','bold');
        doc.text("Total Due       Php "+totaldueDisc,4, doc.autoTable.previous.finalY+20)
        doc.setFont('courier','normal');
        doc.text("Cash            Php "+cash,4, doc.autoTable.previous.finalY+25)
        doc.text("Change          Php "+change,4, doc.autoTable.previous.finalY+30)
        if (radioValue=='sc')   
        {
            doc.text("SC Name: "+scname,4, doc.autoTable.previous.finalY+35)
            doc.text("SC No : "+scno,4, doc.autoTable.previous.finalY+40)
            
        }
        else if (radioValue=='pwd') 
        {
            doc.text("PWD Name: "+pwdname,4, doc.autoTable.previous.finalY+35)
            doc.text("PWD No : "+pwdno,4, doc.autoTable.previous.finalY+40)
            
        }
        doc.addImage(img.src, 'JPEG', 8, doc.autoTable.previous.finalY+41, 40, 15);

    }
    else
    {
        doc.setFontSize(9);
        doc.setFont('courier','bold');
        doc.text("Total           Php "+totalsale,4, doc.autoTable.previous.finalY+10)
        doc.setFont('courier','normal');
        doc.text("Cash            Php "+cash,4, doc.autoTable.previous.finalY+15)
        doc.text("Change          Php "+change,4, doc.autoTable.previous.finalY+20)
        doc.addImage(img.src, 'JPEG', 8, doc.autoTable.previous.finalY+25, 40, 15);

    }
    
    doc.save(trans+".pdf");



    
}