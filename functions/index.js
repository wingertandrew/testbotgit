
'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {dialogflow} = require('actions-on-google');
console.log("Line 7")
const app = dialogflow({debug: true});
admin.initializeApp();
const db = admin.firestore();

//---------DATABASE CALL DEFINITIONS ----------------------------------------------
const collectionRef = db.collection('crew');
const collectionRefAddress = db.collection('addresses');
const collectionRefCalls = db.collection('calls');

//------------INTENT MAP FOR ASK CREW INFO-----------------------------------------
app.intent('Ask_Crew_Info', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, position, phone, email} = snapshot.data();
    conv.ask(`${crew} is the ${position}. Contact info: ${phone}, ${email}. Do you need to know anything else?` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('Ask_Crew_Info error, something inside the code is broken');
    });
});
//-------------INTENT MAP FOR ADDRESSES--------------------------------------------
app.intent('User_Ask_Address', (conv, {address}) => {
    const term = address.toLowerCase();
    const termRef = collectionRefAddress.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {address, url} = snapshot.data();
    conv.ask(`${address} & Google Maps ${url}. Do you need more info?` 
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('User_Ask_Address error .');
    });
}); 

//------------INTENT MAP FOR TRAVEL------------------------------------------------
app.intent('User_Asks_Travel', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, arrival, flight_arrive, hotel_conf, departure, flight_depart} = snapshot.data();
    conv.ask(`${crew} arrives ${arrival} on ${flight_arrive}. Hotel conformation ${hotel_conf}.
                Departure is ${departure} on ${flight_depart}. Do you need more info?` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('User_Ask_Travel, error. It works enough to get to this error at least.');
    });
});

//------------INTENT MAP FOR HOTEL CONFIRMATION------------------------------------
app.intent('User_Ask_Hotel_Conf', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {arrival, hotel_checkin, hotel_conf, departure, hotel_checkout} = snapshot.data();
    conv.ask(`Confirmation #${hotel_conf}. You're set to arrive ${arrival} checking in at ${hotel_checkin}. Checking out ${departure} at ${hotel_checkout}. Do you need more info?.` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('Hotel Confirmation error, something inside the code is broken');
    });
});

//------------INTENT MAP FOR CALL GROUPS-------------------------------------------
app.intent('User_Asks_Group_Call', (conv, {crewgroup}) => {
    const term = crewgroup.toLowerCase();
    const termRef = collectionRefCalls.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew_group, date_one, call_one, date_two, call_two, date_three, call_three, date_four, call_four, date_five, call_five} = snapshot.data();
    conv.ask(`The ${crew_group} call on ${date_one} is ${call_one}. ${date_two} - ${call_two}. ${date_three} - ${call_three}. ${date_four} - ${call_four}. ${date_five} - ${call_five}.`
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('Call group error.');
    });
}); 

//------------INTENT MAP FOR ASK CREW INFO-----------------------------------------
app.intent('transport_car_ride', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {arrival, transport_car_agency, transport_car_conf, transport_car_passenger, departure} = snapshot.data();
    conv.ask(`Your car starts on ${arrival}. ${transport_car_agency}, conf:${transport_car_conf}. Passengers are ${transport_car_passenger}. Vehicle return ${departure}. Do you need anything else? You can ask for the name of a crew member to get their contact information.` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('Ask_Crew_Info error, something inside the code is broken');
    });
});


exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")