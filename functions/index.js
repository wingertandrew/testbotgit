
'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {dialogflow} = require('actions-on-google');
console.log("Line 7")
const app = dialogflow({debug: true});
admin.initializeApp();
const db = admin.firestore();

//---------DATABASE CALL DEFINITIONS -------------------------------
const collectionRefCrew = db.collection('crew');
const collectionRefAddress = db.collection('addresses');
const collectionRefCalls = db.collection('calls');
const collectionRefSiteOps = db.collection('siteops');
//const collectionRefSchedule = db.collection('schedule');
const collectionRefBilling = db.collection('billing');
const collectionRefTranspo = db.collection('transpo');

//------------INTENT MAPS FOR CREW---------------------------------
       
        // GENERAL CREW INFO - crew.general_info
app.intent('crew.general_info', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRefCrew.doc(`${term}`);
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

         // GENERAL CREW INFO - crew.individual_radio_channel
app.intent('crew.individual_radio_channel', (conv, {crewentity}) => {
            const term = crewentity.toLowerCase();
            const termRef = collectionRefCrew.doc(`${term}`);
                return termRef.get()
                    .then((snapshot) => {
                    const {group, radio_channel, crew} = snapshot.data();
            conv.ask(`${crew} is on ${radio_channel}:${group}. Do you need to know anything else?` 
                       );
           
        
                }).catch((e) => {
        console.log('error:', e);
        conv.close('Ask_Crew_Info error, something inside the code is broken');
            });
        });

        // GENERAL CREW INFO - crew.individual_call_time
app.intent('crew.individual_call_time', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRefCrew.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, date_one, call_one, date_two, call_two, 
                    date_three, call_three, date_four, call_four, 
                    date_five, call_five} = snapshot.data();
    conv.ask(`${crew}'s call on 
    ${date_one} - ${call_one}. | 
    ${date_two} - ${call_two}. | 
    ${date_three} - ${call_three}. | 
    ${date_four} - ${call_four}. | 
    ${date_five} - ${call_five}. 
    Do you need more info?` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('Ask_Crew_Info error, something inside the code is broken');
    });
});

        // TRANSPORT - crew.travel_rentals
app.intent('crew.travel_rentals', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRefCrew.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {arrival, transport_car_agency, transport_car_driver, transport_car_conf, transport_car_passenger, departure} = snapshot.data();
    conv.ask(`${transport_car_driver} is the driver. Your car starts on ${arrival}. ${transport_car_agency} - conf: ${transport_car_conf}. Passengers: ${transport_car_passenger}. Vehicle return ${departure}. Do you need more info?` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('crew.travel_ground, something in here is broken :/ ');
    });
});

        //HOTEL CONFIRMATION - user_ask_hotel_conf
app.intent('crew.hotel_confirmation', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRefCrew.doc(`${term}`);
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

        //TRAVEL - crew.travel_air
app.intent('crew.travel_air', (conv, {crewentity}) => {
    const term = crewentity.toLowerCase();
    const termRef = collectionRefCrew.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew, arrival, flight_arrive, hotel_conf, departure, flight_depart, transport_flight_arrive_time, transport_flight_depart_time} = snapshot.data();
    conv.ask(`${crew} arrives ${arrival} on ${flight_arrive} at ${transport_flight_arrive_time}. Hotel conformation ${hotel_conf}.
                Departure is ${departure} on ${flight_depart} at ${transport_flight_depart_time}. Do you need more info?` 
               );
   

        }).catch((e) => {
console.log('error:', e);
conv.close('User_Ask_Travel, error. It works enough to get to this error at least.');
    });
});

//INTENT MAP FOR ADDRESSES----------------------------------------

app.intent('addresses.info', (conv, {address}) => {
    const term = address.toLowerCase();
    const termRef = collectionRefAddress.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {address, url, place, phone} = snapshot.data();
    conv.ask(`${place} - ${address} - ${phone} - Map: ${url}` 
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('address.info error .');
    });
}); 

//INTENT MAPS FOR CALLS-------------------------------------------

        //CALL GROUPS - calls.group_call
app.intent('calls.group_call', (conv, {crewgroup}) => {
    const term = crewgroup.toLowerCase();
    const termRef = collectionRefCalls.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {crew_group, date_one, call_one, date_two, call_two, date_three, call_three, date_four, call_four, date_five, call_five} = snapshot.data();
    conv.ask(`The ${crew_group} call on ${date_one} is ${call_one}. ${date_two} - ${call_two}. ${date_three} - ${call_three}. ${date_four} - ${call_four}. ${date_five} - ${call_five}. Do you need more info?`
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('Call group error.');
    });
}); 

//INTENT MAPS FOR SITEOPS --------------------------------------
      
         //RADIO CHANNELS
app.intent('siteops.radio_channels', (conv, {siteopsentity}) => {
    const term = siteopsentity.toLowerCase();
    const termRef = collectionRefSiteOps.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {race_control_name,race_control_channel,open_chat_a_name,open_chat_a_channel,
                tech_ops_name,tech_ops_channel,event_production_name,event_production_channel,
                audience_mgmt_name,audience_mgmt_channel,broadcast_ops_name,broadcast_ops_channel,
                broadcast_audio_name,broadcast_audio_channel,broadcast_video_name,broadcast_video_channel,
                features_name,features_channel,specialty_name,specialty_channel,lighting_audio_name,
                lighting_audio_channel,features_tech_name,features_tech_channel,security_name,security_channel,
                open_chat_b_name,open_chat_b_channel,open_chat_c_name,open_chat_c_channel,all_call_name, 
                all_call_channel} = snapshot.data();
    conv.ask(`Radio Channel list: ${race_control_channel}: ${race_control_name}. | ${open_chat_a_channel}: ${open_chat_a_name}. | 
                ${tech_ops_channel}: ${tech_ops_name}. | ${event_production_channel}: ${event_production_name}. | 
                ${audience_mgmt_channel}: ${audience_mgmt_name}. | ${broadcast_ops_channel}: ${broadcast_ops_name}. |
                ${broadcast_audio_channel}: ${broadcast_audio_name}. | ${broadcast_video_channel}: ${broadcast_video_name}. | 
                ${features_channel}: ${features_name}. | ${specialty_channel}: ${specialty_name}. | 
                ${lighting_audio_channel}: ${lighting_audio_name}. | 
                ${features_tech_channel}: ${features_tech_name}. | 
                ${security_channel}: ${security_name}. | 
                ${open_chat_b_channel}: ${open_chat_b_name}. | 
                ${open_chat_c_channel}: ${open_chat_c_name}. | 
                ${all_call_channel}: ${ all_call_name}.` 
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('radio names error .');
    });
}); 

         //WATER LOCATIONS
app.intent('siteops.water_locations', (conv, {siteopsentity}) => {
    const term = siteopsentity.toLowerCase();
    const termRef = collectionRefSiteOps.doc(`${term}`);
         return termRef.get()
         .then((snapshot) => {
         const {count, location_one, location_two, location_three, location_four} = snapshot.data();
         conv.ask(`There are ${count} water locations on site. ${location_one}, ${location_two}, ${location_three} & ${location_four}. Do you need more info?` 
                       );
           
           
                }).catch((e) => {
        console.log('error:', e);
        conv.close('siteops.water_locations error .');
            });
        }); 

        //VENUE DETAILS - siteops.venue_details
app.intent('siteops.venue_details', (conv, {siteopsentity}) => {
    const term = siteopsentity.toLowerCase();
    const termRef = collectionRefSiteOps.doc(`${term}`);
        return termRef.get()
        .then((snapshot) => {
         const {credentials, site_office_location, venue_ingress} = snapshot.data();
         conv.ask(`Venue entry is ${venue_ingress} Site office directions: ${site_office_location} ${credentials} Do you need more info?` 
          );
                   
                   
    }).catch((e) => {
    console.log('error:', e);
    conv.close('siteops.venue_details.');
    });
}); 

//INTENT MAPS FOR BILLING --------------------------------------

         //BILLING.INVOICE
app.intent('billing.invoice', (conv, {billingentity}) => {
    const term = billingentity.toLowerCase();
    const termRef = collectionRefBilling.doc(`${term}`);
        return termRef.get()
            .then((snapshot) => {
            const {invoice_info, invoice_link } = snapshot.data();
    conv.ask(`${invoice_info} - DRL invoice template: ${invoice_link}. Do you need to know anything else?` 
               );
   
   
        }).catch((e) => {
console.log('error:', e);
conv.close('billing.invoice error.');
    });
}); 

         //BILLING.PER_DIEM
app.intent('billing.per_diem', (conv, {billingentity}) => {
            const term = billingentity.toLowerCase();
            const termRef = collectionRefBilling.doc(`${term}`);
                return termRef.get()
                    .then((snapshot) => {
                    const {invoice_name, invoice_info} = snapshot.data();
            conv.ask(`${invoice_name} at this event is set at $${invoice_info}. Do you need more information?` 
                       );
           
           
                }).catch((e) => {
        console.log('error:', e);
        conv.close('billing.per_diem error.');
            });
}); 

         //BILLING.EXPENSES
app.intent('billing.expenses', (conv, {billingentity}) => {
            const term = billingentity.toLowerCase();
            const termRef = collectionRefBilling.doc(`${term}`);
                return termRef.get()
                    .then((snapshot) => {
                    const {invoice_info, invoice_link} = snapshot.data();
            conv.ask(`${invoice_info}: ${invoice_link}. Do you need more information?` 
                       );
           
           
                }).catch((e) => {
        console.log('error:', e);
        conv.close('billing.expenses error.');
            });
}); 

//INTENT MAPS FOR TRANSPO --------------------------------------
        
        //TRANSPO.airport_hotel
app.intent('transpo.airport_hotel', (conv, {transpoentity}) => {
    const term = transpoentity.toLowerCase();
     const termRef = collectionRefTranspo.doc(`${term}`);
         return termRef.get()
              .then((snapshot) => {
              const {place, schedule_travel_to, type} = snapshot.data();
      conv.ask(`The ${type} from the ${place} is ${schedule_travel_to} ` 
                  );
           
           
                }).catch((e) => {
        console.log('error:', e);
        conv.close('transpo.airport_hotel error.');
            });
}); 

        //TRANSPO.hotel_airport
app.intent('transpo.hotel_airport', (conv, {transpoentity}) => {
    const term = transpoentity.toLowerCase();
     const termRef = collectionRefTranspo.doc(`${term}`);
          return termRef.get()
               .then((snapshot) => {
                const {type, schedule_travel_to, place} = snapshot.data();
         conv.ask(`The ${type} from the ${place} is ${schedule_travel_to} ` 
                          );
                   
                   
            }).catch((e) => {
    console.log('error:', e);
    conv.close('transpo.hotel_airport error.');
                    });
}); 

        //TRANSPO.hotel_venue
app.intent('transpo.hotel_venue', (conv, {transpoentity}) => {
        const term = transpoentity.toLowerCase();
        const termRef = collectionRefTranspo.doc(`${term}`);
                  return termRef.get()
                       .then((snapshot) => {
                        const {place, schedule_travel_to, type} = snapshot.data();
                 conv.ask(`The ${type} from the ${place} is ${schedule_travel_to} ` 
                                  );
                           
                           
                    }).catch((e) => {
            console.log('error:', e);
            conv.close('transpo.hotel_venue error.');
                            });
        }); 

        //TRANSPO.hotel_venue
app.intent('transpo.venue_hotel', (conv, {transpoentity}) => {
            const term = transpoentity.toLowerCase();
            const termRef = collectionRefTranspo.doc(`${term}`);
                      return termRef.get()
                           .then((snapshot) => {
                            const {place, schedule_travel_to, type} = snapshot.data();
                     conv.ask(`The ${type} from the ${place} is ${schedule_travel_to} ` 
                                      );
                               
                               
                        }).catch((e) => {
                console.log('error:', e);
                conv.close('transpo.venue_hotel error.');
                                });
}); 

// CLOSING - DON'T BREAK THIS
exports.actionsOracle = functions.https.onRequest(app);
console.log("Line 49")

