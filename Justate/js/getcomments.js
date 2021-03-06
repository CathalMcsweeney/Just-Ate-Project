// GET comments
function getComments() 
{
    console.log("Function called");
    var xhr = new XMLHttpRequest();
    console.log(location.hostname);
    if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        xhr.open('GET', 'http://localhost:5001/justateapp/us-central1/getcomments');
    }
    else {
        xhr.open('GET', 'https://us-central1-justateapp.cloudfunctions.net/getcomments');
    }

    // Track the state changes of the request.
    xhr.onreadystatechange = function (){
        var DONE = 4; // readyState 4 means the request is done. 
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE){
            if (xhr.status === OK) {
                var sHTML = "";
                if(xhr.responseText != "No data in database"){
                    var data = JSON.parse(xhr.responseText);
                    for (var i = 0; i < data.length; i++){
                        sHTML += "<p> Handle: " + data[i].handle + "</p>"; 
                        sHTML += "<p> Restaurant: " + data[i].restaurant + "</p>"; 
                        sHTML += "<p> Rating: " + data[i].rating + "</p>"; 
                        sHTML += "<p> Comment: " + data[i].comment + "</p>"; 
                        sHTML += "<button class='btn btn-primary btn-xs text-uppercase' style='width: 30%;' onclick = deleteComment(" + "'"+ data[i].id + "'" + ")> Delete Comment </button>";
                        comments.innerHTML = sHTML;
                    }
                }           
            } 
            else 
            {
                console.log('Error: ' + xhr.status); 
            }
        }
    };
    // An error occurred during the request. 
    // Send the request to https://us-central1-my-cool-web-app-37271.cloudfunctions.net/getcomments
    xhr.send(null);
}
//setInterval(getComments, 20000);