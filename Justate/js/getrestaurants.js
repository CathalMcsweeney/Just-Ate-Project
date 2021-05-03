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

                    var mHTML = "<section class='page-section bg-light' id='portfolio'><div class='container'><div class='text-center'><h2 class='section-heading text-uppercase'>Restaurants that we have teamed up with.</h2><h3 class='section-subheading text-muted'>Amazing selections from worlds best cuisines.</h3></div><div class='row'>";
                    for(var i = 0; i < data.length; i++){
                        mHTML += "  <div class='col-lg-4 col-sm-6 mb-4'><div class='portfolio-item'><a class='portfolio-link' data-toggle='modal' href='#portfolioModal"+i+"'><div class='portfolio-hover'><div class='portfolio-hover-content'><i class='fas fa-plus fa-3x'></i></div></div><img class='img-fluid' src='assets/img/restaurants/kfc.png'alt='' /></a><div class='portfolio-caption'><div class='portfolio-caption-heading'>KFC</div><div class='portfolio-caption-subheading text-muted'>American Chicken</div></div></div></div>";
                    }
                    mHTML += "</div></div></section>";
                    triggermodals.innerHTML = mHTML;


                    var sHTML = "";
                    for(var i = 0; i < data.length; i++){
                        sHTML += "<div class='portfolio-modal modal fade' id='portfolioModal"+i+"' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='close-modal' data-dismiss='modal'><img src='assets/img/close-icon.svg' alt='Close modal' /></div><div class='container'><div class='now justify-content-center'><div class='col-lg-8'><div class='modal-body'><h2 class='text-uppercase'>Project Name</h2><p class='item-intro text-muted'>Lorem ipsum dolor sit amet consectetur.</p><p class='item-intro text-muted'>Make a table with a tick selection to be able to tick off and choose items of the menu</p><p>Use this area to describe your project. !</p><ul class='list-inline'><li>Date: January 2020 // Make the total amount of items in the basket from this restaurant here</li><li>Client: Threads // List the items in the basket</li><li>Category: Illustration // Total price for this restaurants basket</li></ul><button class='btn btn-primary' data-dismiss='modal' type='button'><i class='fas fa-times mr-1'></i>Close Menu and Add to Main Basket</button></div></div></div></div></div></div></div>";
                    }
                    
                    modals.innerHTML = sHTML;
                
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