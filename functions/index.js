
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
            const {third, definition, word} = snapshot.data();
    conv.ask(`Here you go, ${word}, ${third} ${definition}. ` +
            `What else do you want to know?`);
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('Sorry, try again and tell me another planet.');
    });
});


exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")