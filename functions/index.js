
'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {dialogflow} = require('actions-on-google');
console.log("Line 7")
const app = dialogflow({debug: true});
admin.initializeApp();
const db = admin.firestore();
const collectionRef = db.collection('planets');
const collectionRefAddress = db.collection('addresses');

//--------------------------------------------------------------------------------------------

app.intent('ask_planet_intent', (conv, {planet}) => {
    const term = planet.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, arrival, departure, hotelconf, phone, position} = snapshot.data();
    conv.ask(`Here's your info ${crew}, you arrive ${arrival} and you depart ${departure}.
                Hotel conformation is ${hotelconf}, postion is ${position} and phone is ${phone}.` 
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('Error, Not that smart yet. Ask for "tell me about (crewmember).');
    });
});

//------------------------------------------------------------------------------------------

 app.intent('UserAskHotel', (conv, {address}) => {
    const term = address.toLowerCase();
    const termRef = collectionRefAddress.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {address} = snapshot.data();
    conv.ask(`Here's your info ${address}.` 
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('Error 2, the individual one does not work.');
    });
}); 

//------------------------------------------------------------------------------------------



exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")