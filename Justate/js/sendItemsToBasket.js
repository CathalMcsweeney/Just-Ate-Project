function sendItemsToBasket(UIDarray) {
    var data = document.getElementById("cart").getElementsByTagName('span');  
    if(data.length == 0){
        return;
    }
    var total = 0;
    var output = "";
    var count = 0;
    
    for(var i = 0; i < data.length; i+=3) { 
        output += "<p>"+data[i].innerHTML+" ";
        output += data[i+1].innerHTML;
        output += "<span class='price'> €"+data[i+2].innerHTML+"</span></p>";
        total += parseFloat(data[i+2].innerHTML);

        count++;
    }
     window.location.href="/payment.html?data="+output+"&total="+total+"&count="+count+"&UIDarray="+UIDarray;
}