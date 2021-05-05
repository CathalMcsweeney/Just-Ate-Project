function register()
{ 
    var xhr = new XMLHttpRequest();
    let email = document.getElementById('exampleInputEmail1').value    
    let password = document.getElementById('exampleInputPassword1').value
    let isRestaurant = document.querySelector( 'input[name="isRestaurant"]:checked'); 

    if(isRestaurant == null){
      window.alert("please selected Customer or Restaurant user");
    }
    var custOrRest;
    if(document.getElementById('rest').checked){
      custOrRest = 1;
    }
    else {
      custOrRest = 0;
    }

    if(custOrRest == 1){ //is a Restaurant
      if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        xhr.open('POST', 'http://localhost:5001/justateapp/us-central1/restaurantUsers');
      }
      else{
        xhr.open('POST', 'https://us-central1-justateapp.cloudfunctions.net/restaurantUsers');
      }
      xhr.setRequestHeader("Content-type", "application/json"); // Track the state changes of the request. 
      xhr.onreadystatechange = function (){
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
              // ready and ok
              alert("Posting your restaurant!");
              window.location.href = "/addmenu.html"
          }
          else {
              console.log("Error " + xhr.status);
          }
        }
      }
      

      firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        document.cookie = "accessToken="+ user.za; 
        document.cookie = "uid=" + user.uid;
        console.log(user);
        xhr.send(JSON.stringify({"email": email, "uid": user.uid}));
        
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage, errorCode);
      });
    }


    else{ //is a Customer
      if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        xhr.open('POST', 'http://localhost:5001/justateapp/us-central1/customerUsers');
      }
      else{
        xhr.open('POST', 'https://us-central1-justateapp.cloudfunctions.net/customerUsers');
      }
      xhr.setRequestHeader("Content-type", "application/json"); // Track the state changes of the request. 
      xhr.onreadystatechange = function (){
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
              // ready and ok
              alert("Redirecting you now");
              window.location.href = "/secure.html"
          }
          else {
              console.log("Error " + xhr.status);
          }
        }
      }
      

      firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        document.cookie = "accessToken="+ user.za; 
        document.cookie = "uid=" + user.uid;
        console.log(user);
        xhr.send(JSON.stringify({"email": email}));
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage, errorCode);
      });
    }
}