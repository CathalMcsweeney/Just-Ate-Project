const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.postcomments = functions.https.onRequest((request, response) => {

  cors(request, response, () => {
    const currentTime = admin.firestore.Timestamp.now();
    request.body.timestamp = currentTime;

    return admin.firestore().collection('comments').add(request.body).then(() => {
      response.send('Saved in the database');
    });
  });
});

exports.postRestaurant = functions.https.onRequest((request, response) => {
    cors(request,response, () => {
      return admin.firestore().collection('restaurants').add(request.body).then(() => {
      response.send('Restaurant saved successfully');
    });
  }); 
});

exports.getcomments = functions.https.onRequest((request, response) => {
  // 1. Connect to our Firestore database
  cors(request, response, () => {
    let myData = []

    admin.firestore().collection('comments').orderBy("timestamp").get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        response.send('No data in database');
        return;
      }
      snapshot.forEach(doc => {
        let docObj = {};
        docObj.id = doc.id;
        myData.push(Object.assign(docObj, doc.data()));
      });
      // 2. Send data back to client
      response.send(myData);
    })
  })
});

exports.checkEmails = functions.https.onRequest((request, response) => {
  // 1. Connect to our Firestore database
  cors(request, response, () => {
    let myData = []

    admin.firestore().collection('restaurantEmails').get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        response.send('No data in database');
        return;
      }
      snapshot.forEach(doc => {
        let docObj = {};
        docObj.id = doc.id;
        myData.push(Object.assign(docObj, doc.data()));
      });
      // 2. Send data back to client
      response.send(myData);
    })
  })
});


exports.getrestaurants = functions.https.onRequest((request,response) => {
  cors(request, response, () =>{
    let restaurants = [];
    admin.firestore().collection('restaurants').get().then((snapshot) =>{
        if(snapshot.empty) {
          console.log("Restaurants collection empty");
          response.send("Restaurants collection empty");
          return;
        }

        snapshot.forEach(doc => {
          let restaurant = {};
          restaurant.id = doc.id;
          restaurants.push(Object.assign(restaurant, doc.data()));
        });

        response.send(restaurants);
    });
  });
});

exports.deletecomment = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // your function body here - use the provided req and res from cors
    admin.firestore().collection("comments").doc(request.query.id).delete().then(function () {
      response.send("Document successfully deleted!");
    })
  });
});

exports.authorizedendpoint = functions.https.onRequest((request, response) => {

  cors(request, response, () => {
    console.log("Check if request is authorised with Firebase ID token");

    if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer '))) {
      console.error('No Firebase ID token was passed as a Bearer token in the Authorization header',
        'Make sure you authorize your request by porviding the following HTTP header: ',
        'Authorization: Bearer <Firebase ID Token>');
      response.status(403).send('Unauthorized');
      return;
    }

    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
      console.log('Found Authorization header');
      idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
      //No cookie
      response.status(403).send('Unauthorized');
      return;
    }
    try {
      admin.auth().verifyIdToken(idToken).then((token) => {
        console.log('ID Token correctly decoded', token);
        let myComments = [];
        admin.firestore().collection('comments').where('uid', '==', token.uid).get().then((snapshot) => {
          if (snapshot.empty) { 
            console.log('No matching documents.'); 
            response.send('No data '); 
            return; 
          } 

          snapshot.forEach(doc => { 
            let docObj = {};
            docObj.id = doc.id; 
            myComments.push(Object.assign(docObj, doc.data())); 
          }); 

        response.send('Welcome to the secure section' + token);
        response.send(myComments);
      })
    });
    } catch (error) {
      console.error('Error while verifying Firebase ID Token', error);
      response.status(403).send('Unauthorised');
      return;
    }
  });
});

exports.restaurantUsers = functions.https.onRequest((request, response) => {
  cors(request,response, () => {
    return admin.firestore().collection('restaurantEmails').add(request.body).then(() => {
    response.send('Restaurant saved successfully');
  });
}); 
});

exports.customerUsers = functions.https.onRequest((request, response) => {
  cors(request,response, () => {
    return admin.firestore().collection('customerEmails').add(request.body).then(() => {
    response.send('Customer saved successfully');
  });
}); 
});


exports.authorizedRestaurant = functions.https.onRequest((request, response) => {

  cors(request, response, () => {
    let myData = []

    admin.firestore().collection('restaurants').get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        response.send('No data in database');
        return;
      }
      snapshot.forEach(doc => {
        let docObj = {};
        docObj.id = doc.id;
        myData.push(Object.assign(docObj, doc.data()));
      });
      // 2. Send data back to client
      response.send(myData);
    })
  })
});

exports.deleteRestaurant = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // your function body here - use the provided req and res from cors
    admin.firestore().collection("restaurants").doc(request.query.id).delete().then(function () {
      response.send("Document successfully deleted!");
    })
  });
});