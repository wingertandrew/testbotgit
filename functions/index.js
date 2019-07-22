
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
const collectionRefCrew = db.collection('crew');


app.intent('ask_planet_intent', (conv, {planet}) => {
    const term = planet.toLowerCase();
    const termRef = collectionRef.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {definition, word} = snapshot.data();
    conv.ask(`Here you go, ${word}, ${definition}. ` +
            `What else do you want to know?`);
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('Sorry, try again and tell me another planet.');
    });
});

console.log("Line 30")

app.intent('UserAskCrew', (conv, {crew}) => {
    const termCrew = crew.toLowerCase();
    const termRefCrew = collectionRefCrew.doc(`${termCrew}`);
        return termRefCrew.get()
            .then((snapshot) => {
            const {email, position} = snapshot.data();
    conv.ask(`Here you go, ${email}, job is ${position}` +
            `Do you want info on another crew member?`);
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('This is an error.');
    });
});

exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")