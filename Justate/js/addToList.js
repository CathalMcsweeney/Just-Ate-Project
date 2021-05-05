function addToList(itemObj){ 
    var parentDiv = document.getElementById("cart");
    var newDiv = document.createElement("div");
    
    var newItem = "<div class='row text-white fs-5'>";
    newItem += "<p class='col-2'><span>"+itemObj.name+"</span></p>";
    newItem += "<p class='col-2'><span>" + itemObj.item + "</span></p>";
    newItem += "<p class='col-2'><span>" + itemObj.price + "</span>€</p>";
    newItem += "<p class='col-2'> Preparation Time: " + itemObj.preptime + "</p>";
    newItem += "<p class='col-4'><button class='btn btn-primary btn-sm' type='button' onclick='this.parentNode.parentNode.parentNode.remove();'>Remove</button></p></div>";
    
    newDiv.innerHTML = newItem;
    parentDiv.appendChild(newDiv);
}

