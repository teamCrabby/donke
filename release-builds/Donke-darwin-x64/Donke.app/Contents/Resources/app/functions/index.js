const functions = require('firebase-functions');
const admin = require('firebase-admin')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

const users = admin.firestore().collection("users")

// exports.addUser = functions.auth.user()
//     .onCreate((user) => 
//         users.doc(user.uid).set({ displayName: user.displayName, email: user.email }))

exports.removeUser = functions.auth.user()
    .onDelete((user) => 
        users.doc(user.uid).delete())
