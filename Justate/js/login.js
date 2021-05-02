function login() 
{
    let email = document.getElementById('exampleInputEmail1').value   
    
    // if email is contained in collection of restaurants 
    let password = document.getElementById('exampleInputPassword1').value   

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {            
        // Signed in            
        var user = userCredential.user;            
        // If successful redirect to a secure page            
        
        document.cookie = "accessToken="+ user.za; 
        document.cookie = "uid=" + user.uid;  
        console.log(user);     
        window.location.href = "/secure.html"            
    
        // ...        
    })        
    .catch((error) => {            
        var errorCode = error.code;            
        var errorMessage = error.message;            
        console.log(errorCode, errorMessage);        
    });
}
 