function orderTracker(UIDarray){
    //var UIDarray = UIDarray;

    var xhr = new XMLHttpRequest();
    console.log(location.hostname);
    if(location.hostname === "localhost" || location.hostname === "127.0.0.1")
    {
        xhr.open('GET', 'http://localhost:5001/justateapp/us-central1/getrestaurants');
    }
    else
    {
        xhr.open('GET', 'https://us-central1-justateapp.cloudfunctions.net/getrestaurants');
    }

    var array = UIDarray.split(',');

    let toBeCalc = [];

    // Track the state changes of the request.
    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4){ // readyState 4 means the request is done. 
            if (xhr.status === 200){ // status 200 is a successful return.
                if(xhr.responseText != "Restaurants collection empty"){
                    var data = JSON.parse(xhr.responseText);
                    if(array.length>1){
                        for(var i = 0; i < array.length; i++){
                            for(var j = 0; j < data.length; j++){
                                if(data[j].uid === array[i]){
                                    toBeCalc.push(data[j].latitude);
                                    toBeCalc.push(data[j].longitude);
                                }
                            }
                        }
                        distance(toBeCalc[0],toBeCalc[1],toBeCalc[2],toBeCalc[3]);
                    }
                    else{
                        alert("Your Order is On The Way")
                    }

                }
            }
            else 
            {
                console.log('Error: ' + xhr.status); 
            }
        }
    };
    xhr.send(null);
}

function distance(x1, y1, x2, y2)
{
    // Calculating distance
    var ans= Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 0.25);

// Drivers Code
alert(ans+"minutes");
}