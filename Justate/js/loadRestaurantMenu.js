function loadRestaurantMenu() 
{
    console.log("Function called");

    var xhr = new XMLHttpRequest();
    console.log(location.hostname);
    if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        xhr.open('GET', 'http://localhost:5001/justateapp/us-central1/authorizedRestaurant');
    }
    else {
        xhr.open('GET', 'https://us-central1-justateapp.cloudfunctions.net/authorizedRestaurant');
    }

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.        
        var OK = 200; // status 200 is a successful return.        
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            var sHTML = "";
            console.log(xhr.responseText);
            if(xhr.responseText != "No data in database"){
                var data = JSON.parse(xhr.responseText);
                for (var i = 0; i < data.length; i++){
                    if(data[i].uid == getCookie('uid')){
                        console.log('here it worked');

                        sHTML+="<div class='container'> <div class='card'><h10 class='card-header text-center font-weight-bold text-white bg-primary'>General Information</h10><div class='card-body'><div class='row'><div class='form-group col-4'><input type='text' id='inpName' class='form-control col-xs-3' value='"+data[i].name+"'></div><div class='form-group col-4'><input type='text' id='latitude' class='form-control col-xs-3' value='"+data[i].latitude+"'></div><div class='form-group col-4'><input type='text' id='longitude' class='form-control col-xs-3' value='"+data[i].longitude+"'></div></div><div class='row'><div class='form-group col-6'><input type='text'  id='inpCuisine' class='form-control col-xs-3' value='"+data[i].cuisine+"' ></div><div class='form-group col-6'><input type='text' id='inpOrdLim' class='form-control col-xs-3' value='"+data[i].orderlim+"'></div></div><div class='row'><div class='form-group col-6'><input type='text' id='inpwWekdayOT' class='form-control col-xs-3' value='"+data[i].weekdayOpen+"'> </div><div class='form-group col-6'><input type='text' id='inpWeekdayCT' class='form-control col-xs-3' value='"+data[i].weekdayClose+"' ></div></div><div class='row'><div class='form-group col-6'><input type='text' id='inpWeekendOT' class='form-control col-xs-3' value='"+data[i].weekendOpen+"' ></div><div class='form-group col-6'><input type='text' id='inpWeekendCT' class='form-control col-xs-3' value='"+data[i].weekendClose+"' > </div></div></div></div></div>"
                        genInfo.innerHTML = sHTML;

                        sHTML = "";
                        for(var j = 0; j < data[i].desserts.length; j++){
                            sHTML+= "<div class='form-group col-6'><input type='text' class='form-control col-xs-3' value='"+data[i].desserts[j].item+"'></div>"
                            sHTML+= "<div class='form-group col-2'><input type='text' class='form-control col-xs-3' value='"+data[i].desserts[j].price+"'></div>"
                            sHTML+= "<div class='form-group col-2'><input type='text' class='form-control col-xs-3' value='"+data[i].desserts[j].preptime+"'></div>"
                        }
                        starters.innerHTML = sHTML;
                        sHTML = ""; 
                        for(var j = 0; j < data[i].mains.length; j++){
                            sHTML+= "<div class='form-group col-6'><input type='text' class='form-control col-xs-3' value='"+data[i].mains[j].item+"'></div>"
                            sHTML+= "<div class='form-group col-2'><input type='text' class='form-control col-xs-3' value='"+data[i].mains[j].price+"'></div>"
                            sHTML+= "<div class='form-group col-2'><input type='text' class='form-control col-xs-3' value='"+data[i].mains[j].preptime+"'></div>"
                        }
                        mains.innerHTML = sHTML;
                        sHTML = ""; 
                        for(var j = 0; j < data[i].desserts.length; j++){
                            sHTML+= "<div class='form-group col-6'><input type='text' class='form-control col-xs-3' value='"+data[i].desserts[j].item+"'></div>"
                            sHTML+= "<div class='form-group col-2'><input type='text' class='form-control col-xs-3' value='"+data[i].desserts[j].price+"'></div>"
                            sHTML+= "<div class='form-group col-2'><input type='text' class='form-control col-xs-3' value='"+data[i].desserts[j].preptime+"'></div>"
                        }
                        desserts.innerHTML = sHTML;  
                        sHTML = "<button class='btn btn-warning btn-lg row=6' onclick = postRestaurant(" + "'"+ data[i].id + "'" + ")>Publish your restaurant!</button>"
                        postRest.innerHTML = sHTML;
                    }
                }
            }
            //response.innerHTML = xhr.responseText;
          }
        } 
        else {
          //response.innerHTML = "Unauthorized to view this content";
          console.log('Error: ' + xhr.status); // An error occurred during the request.        
        }
      };
      // Set the Authorization header    
      //xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('accessToken'))
      xhr.send(null);

};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function addItem(section){
    var parentDiv;
    // get correct container
    if(section == "starter") {
        parentDiv = document.getElementById("starterItems");
    } else if (section == "main"){
        parentDiv = document.getElementById("mainItems");
   } else if (section == "dessert") {
        parentDiv = document.getElementById("dessertItems");
   }
    var newDiv = document.createElement("div");
     // hardcoded row with 3 cells -> item name & price & prep time
    newDiv.innerHTML = "<div class='card-body'><div class='row'><div class='form-group col-6'><input type='text' class='form-control col-xs-3' placeholder='Item'></div><div class='form-group col-2'><input type='text' class='form-control col-xs-3' placeholder='Price'></div><div class='form-group col-2'><input type='text'class='form-control col-xs-3' placeholder='Prep Time'></div></div></div>";
    parentDiv.appendChild(newDiv);
}

function deleteItem(section){
    var parentDiv;
    // get correct container
    if(section == "starter") {
        parentDiv = document.getElementById("starterItems");
    } else if (section == "main"){
        parentDiv = document.getElementById("mainItems");
   } else if (section == "dessert") {
        parentDiv = document.getElementById("dessertItems");
   }
   // remove last div apart from the first one
   if(parentDiv.childElementCount > 2){
         parentDiv.removeChild(parentDiv.lastElementChild);
   }
}

function validateForm(infoObj, starters, mains, desserts){
    // for all fields in the info object, check for missing information
    for(var key in infoObj) {
        if(infoObj[key] == null || infoObj[key] == "") {
           return false;
        } 
    }

    if(isNaN(infoObj.latitude) || isNaN(infoObj.longitude)){
        return false;
    }

    // check if any item/price/preptime field in it the object array is empty
    if(starters.some(it => it.item === '') || starters.some(pr => pr.price === '' || isNaN(pr.price)) || starters.some(pre => pre.preptime === '')) {
        return false;
    }

    if(mains.some(it => it.item === '') || mains.some(pr => pr.price === '' || isNaN(pr.price)) || mains.some(pre => pre.preptime === '')) {
        return false;
    }

    if(desserts.some(it => it.item === '') || desserts.some(pr => pr.price === '' || isNaN(pr.price) ) || desserts.some(pre => pre.preptime === '')) {
        return false;
    }
    // all tests passed successfully
    return true;
}

function postRestaurant(id){

    var xhr = new XMLHttpRequest();
    var url = "https://us-central1-justateapp.cloudfunctions.net/deleteRestaurant" + "?id=" + id;
    xhr.open('DELETE',url);

    // Track the state changes of the request.
    xhr.onreadystatechange = function () 
    {
        var DONE = 4; // readyState 4 means the request is done. 
        var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) 
            {
                if (xhr.status === OK) {
                // If comment deleted successfully
                // Call getComments to refresh the page 
                console.log(xhr.responseText); 
                } 
                else 
                {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                } 
            }
    };
    xhr.send(null);


    var info = { uid:getCookie('uid'),name:"",latitude:"",longitude:"",cuisine:"",orderlim:"",weekdayOpen:"",weekdayClose:"",weekendOpen:"",weekendClose:""};
    info.name = document.getElementById("inpName").value;
    info.latitude = document.getElementById("latitude").value;
    info.longitude = document.getElementById("longitude").value;
    info.cuisine = document.getElementById("inpCuisine").value;
    info.orderlim = document.getElementById("inpOrdLim").value;
    info.weekdayOpen = document.getElementById("inpwWekdayOT").value;
    info.weekdayClose = document.getElementById("inpWeekdayCT").value;
    info.weekendOpen = document.getElementById("inpWeekendOT").value;
    info.weekendClose = document.getElementById("inpWeekendCT").value;
    
    var starters = getItems("starterItems");
    var mains =  getItems("mainItems");
    var desserts =  getItems("dessertItems");
  

    
    if(!validateForm(info, starters, mains, desserts)) {
        alert("Include all correctly formatted information!");
        return;
    } else {
        var xhr = new XMLHttpRequest();
        if(location.hostname === "localhost" || location.hostname === "127.0.0.1")
        {
            xhr.open('POST', 'http://localhost:5001/justateapp/us-central1/postRestaurant');
        }
        else
        {
            xhr.open('POST', 'https://us-central1-justateapp.cloudfunctions.net/postRestaurant');
        }
    
        xhr.setRequestHeader("Content-type", "application/json"); // Track the state changes of the request. 
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    // ready and ok
                    alert("Posting your restaurant!");
                }
                else {
                    console.log("Error " + xhr.status);
                }
            }
        }
        
        
        //concat and stringify all objects into a JSON object and send it using _.merge function from lodash library to avoid objects being overwritten
        var allData = _.merge(info,{"starters":starters},{"mains":mains},{"desserts":desserts});
        xhr.send(JSON.stringify(allData));
    }   
}