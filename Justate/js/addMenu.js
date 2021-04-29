
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
    newDiv.innerHTML = "<div class='row'><div class='form-group col-6'><input type='text' class='form-control col-xs-3' placeholder='Item'></div><div class='form-group col-2'><input type='text' class='form-control col-xs-3' placeholder='Price'></div><div class='form-group col-2'><input type='text'class='form-control col-xs-3' placeholder='Prep Time'></div></div>";
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

function populateObjects(){
    //TODO: extract the data from input fields
    var info = { name:"",cuisine:"",orderlim:"",weekdayOpen:"",weekdayClose:"",weekendOpen:"",weekendClose:""};


    info.name = document.getElementById("inpName").value;
    info.cuisine = document.getElementById("inpCuisine").value;
    info.orderlim = document.getElementById("inpOrdLim").value;
    info.weekdayOpen = document.getElementById("inpwWekdayOT").value;
    info.weekdayClose = document.getElementById("inpWeekdayCT").value;
    info.weekendOpen = document.getElementById("inpWeekendOT").value;
    info.weekendClose = document.getElementById("inpWeekendCT").value;

    if(!checkInputFields(infoObj)) {
        alert("Fill out the form!");
        return;
    }
    
}
// for all fields in the info object, check for missing information
function checkInputFields(infoObj){
    for(var key in infoObj){
        var temp = infoObj[key];
        if(temp.length == null) {
            return false;
        } 
    }
    return true;
}
