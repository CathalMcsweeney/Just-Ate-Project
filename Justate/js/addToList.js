function addToList(itemObj){ 
    var parentDiv = document.getElementById("cart");
    var newDiv = document.createElement("div");
    
    var newItem = "<div class='row text-white fs-5'>";
    newItem += "<p class='col-2'>"+itemObj.name+"</p>";
    newItem += "<p class='col-2'>" + itemObj.item + " </p>";
    newItem += "<p class='col-2'>" + itemObj.price + " €</p>";
    newItem += "<p class='col-2'> Preparation Time: " + itemObj.preptime + "</p>";
    newItem += "<p class='col-4'><button class='btn btn-primary btn-sm' type='button' onclick='this.parentNode.parentNode.parentNode.remove();'>Remove</button></p></div>";
    
    newDiv.innerHTML = newItem;
    parentDiv.appendChild(newDiv);
}

