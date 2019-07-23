
'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {dialogflow} = require('actions-on-google');
console.log("Line 7")
const app = dialogflow({debug: true});
admin.initializeApp();
const db = admin.firestore();
const collectionRef = db.collection('planets');
//-----------

app.intent('ask_planet_intent', (conv, {planet}) => {
    const term = planet.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, arrival, departure, hotelconf, phone, position} = snapshot.data();
    conv.ask(`Here's your info ${crew}, you arrive ${arrival} and you depart ${departure}.
                Hotel conformation is ${hotelconf}, postion is ${position} and phone is ${phone}.` 
               // + `What else do you want to know?`
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('Error, Not that smart yet. Ask for "tell me about (crewmember).');
    });
});


exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")