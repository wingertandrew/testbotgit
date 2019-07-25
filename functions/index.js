
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
app.intent('ask_all_info', (conv, {planet}) => {
    const term = planet.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, arrival, departure, hotel_conf, call_one} = snapshot.data();
    conv.ask(`Here's ${crew} info, ${arrival} arrival. ${departure} departure. 
                Hotel conformation is ${hotel_conf}, 21st call time is ${call_one}.` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('ask_all_info error, something inside the code is broken.');
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

//------------INTENT MAP FOR TRAVEL INFO----------------------------------------
app.intent('User_Asks_Travel', (conv, {planet}) => {
    const term = planet.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, arrival, flight_arrive, hotel_conf, departure, flight_depart} = snapshot.data();
    conv.ask(`${crew} arrives ${arrival} on ${flight_arrive}. Hotel conformation ${hotel_conf}.
                Departure is ${departure} on ${flight_depart}.` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('User_Ask_Travel, error. It works enough to get to this error at least.');
    });
});
//------------------------------------------------------------------------------------


exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")