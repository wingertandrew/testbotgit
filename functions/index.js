
'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {dialogflow} = require('actions-on-google');
console.log("Line 7")
const app = dialogflow({debug: true});
admin.initializeApp();
const db = admin.firestore();

//------------DATABASE CALL DEFINITIONS ---------------------------------------------------------
const collectionRef = db.collection('planets');
const collectionRefAddress = db.collection('addresses');

//------------INTENT MAP FOR GENERAL CREW INFO DUMP----------------------------------------
app.intent('ask_planet_intent', (conv, {planet}) => {
    const term = planet.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, arrival, departure, hotelconf, call_one} = snapshot.data();
    conv.ask(`Here's ${crew} info, ${arrival} arrival. ${departure} departure. 
                Hotel conformation is ${hotelconf}, 21st call time is ${call_one} .` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('Error, Not that smart yet. Ask for "tell me about (crewmember).');
    });
});
//-------------INTENT MAP FOR ADDRESSES------------------------------------------------
app.intent('UserAskHotel', (conv, {address}) => {
    const term = address.toLowerCase();
    const termRef = collectionRefAddress.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {address, url} = snapshot.data();
    conv.ask(`Here's the hotel address ${address} & the Google Maps link ${url}.` 
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('UserAskHotel .');
    });
}); 
//------------------------------------------------------------------------------------


exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")