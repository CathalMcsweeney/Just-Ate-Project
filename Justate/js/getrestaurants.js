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
                    // visible icons of the modals -> when clicked displays the inside of the modal
                    var mHTML = "<section class='page-section bg-light' id='portfolio'>";
                    mHTML += "<div class='container'>";
                    mHTML += "<div class='text-center'>";
                    mHTML += "<h2 class='section-heading text-uppercase'>Restaurants that we have teamed up with.</h2>";
                    mHTML += "<h3 class='section-subheading text-muted'>Amazing selections from worlds best cuisines.</h3>"
                    mHTML += "</div><div class='row'>";
                    for(var i = 0; i < data.length; i++){
                        mHTML += "<div class='col-lg-4 col-sm-6 mb-4'>";
                        mHTML += "<div class='portfolio-item'>";
                        mHTML += "<a class='portfolio-link' data-toggle='modal' href='#portfolioModal"+i+"'>";
                        mHTML += "<div class='portfolio-hover'>";
                        mHTML += "<div class='portfolio-hover-content'><i class='fas fa-plus fa-3x'></i></div></div>";
                        mHTML += "<img class='img-fluid' src='assets/img/restaurants/restaurant.jpg'alt='' />";
                        mHTML += "</a><div class='portfolio-caption'>";
                        mHTML += "<div class='portfolio-caption-heading'><p>" + data[i].name + "</p></div>";
                        mHTML += "<div style='font-size:100%' class='portfolio-caption-heading'><p>" + data[i].cuisine + "</p></div>";
                        mHTML += "<div class='portfolio-caption-subheading text-muted'><p>Latitude: " + data[i].latitude + "</p></div>";
                        mHTML += "<div class='portfolio-caption-subheading text-muted'><p>Longitude: " + data[i].longitude + "</p></div>";
                        mHTML += "<div class='portfolio-caption-subheading text-muted'><p>Order Limit: " + data[i].orderlim + "</p></div>";
                        mHTML += "<div class='portfolio-caption-subheading text-muted'><p>Weekday Opening: " + data[i].weekdayOpen + "</p></div>";
                        mHTML += "<div class='portfolio-caption-subheading text-muted'><p>Weekday Closing: " + data[i].weekdayClose + "</p></div>";
                        mHTML += "<div class='portfolio-caption-subheading text-muted'><p>Weekend Opening: " + data[i].weekendOpen + "</p></div>";
                        mHTML += "<div class='portfolio-caption-subheading text-muted'><p>Weekend Closing: " + data[i].weekendClose + "</p></div>";
                        mHTML += "</div></div></div>";
                    }
                    mHTML += "</div></div></section>";
                    displayModal.innerHTML = mHTML;

                    // inside of the modals containing the menu for the restaurant
                    var sHTML = "";
                    for(var i = 0; i < data.length; i++){
                        sHTML += "<div class='portfolio-modal modal fade' id='portfolioModal"+i+"' tabindex='-1' role='dialog' aria-hidden='true'>";
                        sHTML += "<div class='modal-dialog'><div class='modal-content'>";
                        sHTML += "<div class='close-modal' data-dismiss='modal'><img src='assets/img/close-icon.svg' alt='Close modal' /></div>";
                        sHTML += "<div class='container'><div class='now justify-content-center'><div class='col-lg-16'><div class='modal-body'>";
                        
                        // starters
                        sHTML += "<h2 class='text-uppercase portfolio-caption-subheading text-muted'>Starters</h2>";
                        sHTML += "<div class='row'>";
                        for(var j = 0; j < data[i].starters.length; j++){
                            sHTML += "<div class='column'><div class='card'>";
                            sHTML += "<h6>" + data[i].starters[j].item + "</h6>";
                            sHTML += "<img src='/assets/img/about/starter.jpg'>";
                            sHTML += "<h6>" + data[i].starters[j].price + " €</h6>";
                            var restaurant = {"name":data[i].name};
                            var obj = Object.assign({},restaurant,data[i].starters[j]);
                            var dataToCart = JSON.stringify(obj);
                            sHTML += "<p><button class='btn btn-primary btn-sm' type='button' onclick='addToList("+dataToCart+");' > Add to Cart </button> </p>";
                            sHTML += " </div></div>";
                        }
                        sHTML += "</div>";

                        // mains
                        sHTML += "<h2 class='text-uppercase portfolio-caption-subheading text-muted'>Mains</h2>";
                        sHTML += "<div class='row'>";
                        for(var j = 0; j < data[i].mains.length; j++){
                            sHTML += "<div class='column'><div class='card'>";
                            sHTML += "<h6>" + data[i].mains[j].item + "</h6>";
                            sHTML += "<img src='/assets/img/about/mainmenu.png'>";
                            sHTML += "<h6>" + data[i].mains[j].price + " €</h6>";
                            var restaurant = {"name":data[i].name};
                            var obj = Object.assign({},restaurant,data[i].mains[j]);
                            var dataToCart = JSON.stringify(obj);
                            sHTML += "<p> <button class='btn btn-primary btn-sm' type='button' onclick='addToList("+dataToCart+");' > Add to Cart </button> </p>";
                            sHTML += " </div></div>";
                        }
                        sHTML += "</div>";
                       
                        // desserts
                        sHTML += "<h2 class='text-uppercase portfolio-caption-subheading text-muted'>Desserts</h2>";
                        sHTML += "<div class='row'>";
                        for(var j = 0; j < data[i].desserts.length; j++){
                            sHTML += "<div class='column'><div class='card'>";
                            sHTML += "<h6>" + data[i].desserts[j].item + "</h6>";
                            sHTML += "<img src='/assets/img/about/dessert1.jpg'>";
                            sHTML += "<h6>" + data[i].desserts[j].price + " €</h6>";
                            var restaurant = {"name":data[i].name};
                            var obj = Object.assign({},restaurant,data[i].desserts[j]);
                            var dataToCart = JSON.stringify(obj);
                            sHTML += "<p><button class='btn btn-primary btn-sm' type='button' onclick='addToList("+dataToCart+");'>Add to Cart</button> </p>";
                            sHTML += " </div></div>";
                        }
                        sHTML += "</div>";
                
                        sHTML += "</div></div>";
                        // TODO: purchase button should transer the user to the basket and should hold on to the total cost
                        sHTML += "<button class='btn btn-success' data-dismiss='modal' type='button'>Close Menu</button>";
                        sHTML += "</div></div></div></div></div></div></div>";
                    }
                    modals.innerHTML = sHTML;
                    // make the shopping cart apear once the restaurants are loaded
                    document.getElementById("shoppingCart").style.display = "block"; 
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