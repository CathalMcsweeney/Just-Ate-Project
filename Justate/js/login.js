function login() 
{
    let email = document.getElementById('exampleInputEmail1').value   
    // if email is contained in collection of restaurants 
    let password = document.getElementById('exampleInputPassword1').value   
    let restArray = [];

    var xhr = new XMLHttpRequest();
    console.log(location.hostname);
    if(location.hostname === "localhost" || location.hostname === "127.0.0.1")
    {
        xhr.open('GET', 'http://localhost:5001/justateapp/us-central1/checkEmails');
    }
    else
    {
        xhr.open('GET', 'https://us-central1-justateapp.cloudfunctions.net/checkEmails');
    }

    xhr.onreadystatechange = function (){
        var DONE = 4; // readyState 4 means the request is done. 
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE){
            if (xhr.status === OK) {
                if(xhr.responseText != "No data in database"){
                    var data = JSON.parse(xhr.responseText); 
                    for (var i = 0; i < data.length; i++){
                        restArray.push(data[i].email); 
                    }
                
                    firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {            
                        // Signed in            
                        var user = userCredential.user;            
                        // If successful redirect to a secure page            
                        
                        document.cookie = "accessToken="+ user.za; 
                        document.cookie = "uid=" + user.uid;  
                        console.log(user);
                        for (var i = 0; i < data.length; i++){
                            if(email === restArray[i]){
                            window.location.href = "/addmenu.html";  
                            }
                        }          
                        window.location.href = "/secure.html";
                        // ...        
                    })        
                    .catch((error) => {            
                        var errorCode = error.code;            
                        var errorMessage = error.message;            
                        console.log(errorCode, errorMessage);        
                    });
                
                }      
                else{
                    alert("not working")
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
 