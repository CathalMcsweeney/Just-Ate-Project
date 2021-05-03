function getrestaurants() 
{
    console.log("Function called");
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

    // Track the state changes of the request.
    xhr.onreadystatechange = function () 
    {
        var DONE = 4; // readyState 4 means the request is done. 
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) 
        {
            if (xhr.status === OK) 
            {
                
                if(xhr.responseText != "Restaurants collection empty")
                {
                    var data = JSON.parse(xhr.responseText); 
                    var sHTML = "<div class='container'>";
                    for(var i = 0; i < data.length; i++){
                        // every second restaurant add an extra row
                        if(i % 2 == 0){
                            sHTML += "<div class='row'>";
                        }
                        // general information
                        sHTML += "<div class='card col-6' style='width: 32rem;'><h5 class='card-header text-center font-weight-bold text-white bg-primary'>" + data[i].name + "</h5>"
                        sHTML += "<div class='card-body font-weight-bold'><div class='row'><div class='col-6'>Cuisine: " + data[i].cuisine + "</div><div class='col-6'>Order Limit: " + data[i].orderlim + "</div></div>";
                        sHTML += "<div class='row'><div class='col-6'>Longitude: " + data[i].longitude + "</div><div class='col-6'>Latitude: " + data[i].latitude + "</div></div>";
                        sHTML += "<div class='row'><div class='col-6'>Weekday Open: " + data[i].weekdayOpen + "</div><div class='col-6'>Weekday Close: " + data[i].weekdayClose + "</div></div>";
                        sHTML += "<div class='row'><div class='col-6'>Weekend Open: " + data[i].weekendOpen + "</div><div class='col-6'>Weekend Close: " + data[i].weekendClose + "</div></div>";
                       
                        // starters
                        sHTML += "<div class='row' id='starters'><h6 class='text-center col-12'>Starters</h6>";
                        for(var j = 0; j < data[i].starters.length; j++){
                            sHTML += "<button class='btn btn-primary text-white text-center font-weight-bold'>" + data[i].starters[j].item + " €" + data[i].starters[j].price + "</button>";
                        }
                        sHTML += "</div>";

                        // mains
                        sHTML += "<div class='row' id='mains'><h6 class='text-center col-12'>Mains</h6>";
                        for(var j = 0; j < data[i].mains.length; j++){
                            sHTML += "<button class='btn btn-primary text-white text-center font-weight-bold'>" + data[i].mains[j].item + " €" +data[i].mains[j].price + "</button>";
                        }
                        sHTML += "</div>";

                        // desserts
                        sHTML += "<div class='row' id='desserts'><h6 class='text-center col-12'>Desserts</h6>";
                        for(var j = 0; j < data[i].desserts.length; j++){
                            sHTML += "<button class='btn btn-primary text-white text-center font-weight-bold'>" + data[i].desserts[j].item + " €" + data[i].desserts[j].price + "</button>";
                        }
                        sHTML += "</div></div></div>";

                        // close off the row for with the two restaurants displayed and new row if needed
                        if(i % 2 == 0 && i != 0){
                            sHTML += "</div>";
                        }

                    }

                     sHTML += "</div>";
                
                    restaurants.innerHTML = sHTML;
                    

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