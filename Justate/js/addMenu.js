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

function postRestaurant(){
    var info = { name:"",latitude:"",longitude:"",cuisine:"",orderlim:"",weekdayOpen:"",weekdayClose:"",weekendOpen:"",weekendClose:""};
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

function getItems(section){
   var itemsArr = [];
   // get the parent of dessertItems && all child nodes of it, get data from three fields at a time
   var inputFields = document.getElementById(section).getElementsByTagName('input');
   for(var i = 0; i < inputFields.length; i+=3) {
        var itemObj = { item:"",price:"",preptime:"" };
       itemObj.item = inputFields[i].value;
       itemObj.price = inputFields[i+1].value;
       itemObj.preptime = inputFields[i+2].value;
       itemsArr.push(itemObj);
   }
   return itemsArr;
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
