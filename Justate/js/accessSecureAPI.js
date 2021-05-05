function getSecureAPI() {
  var xhr = new XMLHttpRequest();
  
      xhr.open('GET', 'https://us-central1-justateapp.cloudfunctions.net/authorizedendpoint');
  

  // Track the state changes of the request.    
  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.        
    var OK = 200; // status 200 is a successful return.        
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log(xhr.responseText);
        //response.innerHTML = xhr.responseText;
      }
    } else {
      //response.innerHTML = "Unauthorized to view this content";
      console.log('Error: ' + xhr.status); // An error occurred during the request.        
    }
  };
  // Set the Authorization header    
  xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('accessToken'))
  xhr.send(null);
}

// W3C Schools
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

function logout() {
  firebase.auth().signOut().then(() => {
    console.log("Sign out successful");
    // Reset cookie    
    document.cookie = "accessToken= ";
    // Redirect to the home page    
    window.location.href = "/index.html";
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
