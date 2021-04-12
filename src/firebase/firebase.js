import firebase from 'firebase';
import 'firebase/database';
 
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
 
firebase.initializeApp(firebaseConfig);
 
// Get a reference to the database service
const database = firebase.database();

// Authentication (Google) Setup
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Important: Components shouldn't communicate with firebase
// Should be used in action generators, and change configureStore
export { firebase, googleAuthProvider, database as default };



/** RULES on Firebase */
/**{
  "rules": {
    ".read": false, // disable public read and write
    ".write": false,
    "users": {
      "$user_id": {
      	".read": "$user_id === auth.uid", // check auth uid if that's same as the ref variable
    	".write": "$user_id === auth.uid",
        "expenses": {
          "$expense_id": {  // for each expense
            ".validate": "newData.hasChildren(['description', 'note', 'createdAt', 'amount'])",  // check if each expense has these 4 things
            "description": {  // data validator for description
              ".validate": "newData.isString() && newData.val().length > 0"
            },
            "note": {
              ".validate": "newData.isString()"
            },
            "createdAt": {
              ".validate": "newData.isNumber()"
            },
            "amount": {
              ".validate": "newData.isNumber()"
            },
            "$other": {  // do not allow any other keys besides the 4 stuffs in each expense
              ".validate": false
            }
          }
        },
        "$other": {  // do not allow any other keys besides expenses for root ref
          ".validate": false
        }
      }
    }
  }
} */




/** Sample Requests to handle array data in Firebase */

//===========Subscriber on child added============
// database.ref('expenses')
//     .on('child_added', (snapshot) => { // trigger event on child added, for both new and existing ones!
//         console.log("Added:", snapshot.key, snapshot.val());
//     }, (e) => {
//         console.log('Error with data fetching', e);
//     });

//===========Subscriber on child removal============
// database.ref('expenses')
//     .on('child_removed', (snapshot) => { // trigger event on child removal
//         console.log("Removal:", snapshot.key, snapshot.val());
//     }, (e) => {
//         console.log('Error with data fetching', e);
//     });

//===========Subscriber on child changed============
// database.ref('expenses')
//     .on('child_changed', (snapshot) => { // trigger event on child changed
//         console.log("Changed:", snapshot.key, snapshot.val());
//     }, (e) => {
//         console.log('Error with data fetching', e);
//     });

/** Challenge 2: Subscription on expenses list change */
// database.ref('expenses')
//     .on('value', (snapshot) => { // trigger event on value change
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({ // mapping
//                 id: childSnapshot.key, // key
//                 ...childSnapshot.val(), // value spread
//             });
//         });

//         console.log(expenses); // transformed data
//     }, (e) => {
//         console.log('Error with data fetching', e);
//     });

//===========READ: SNAPSHOT FOREACH===============
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({ // mapping
//                 id: childSnapshot.key, // key
//                 ...childSnapshot.val(), // value spread
//             });
//         });

//         console.log(expenses); // transformed data
//     });

/** Challenges 1 */
// import expenses from '../tests/fixtures/expenses';
// expenses.forEach(({ description, note, amount, createdAt }) => {
//     database.ref('expenses').push({ 
//         description, 
//         note, 
//         amount, 
//         createdAt 
//     });
// });

//===========PUSH===============
// database.ref('notes').push({ // auto-generate a unique id for this note! 'notes/fhaofqo29017/body'
//     title: 'To Do',
//     body: 'Go for a run'
// });
// database.ref('notes/-MXmPzDzZ8hdv55wHh1I').update({ // use the id so you can update it
//     body:'Revise React.js',
// });

//===========PROBLEM: Firebase does not support arrays, only objects (use id)===============
// const firebaseNotes = {
//     notes: {
//         sfcwsdvewvw312: {
//             title: 'First note!',
//             body: 'This is my note',
//         },
//         jfdsdjmwj23mm: {
//             title: 'Another note!',
//             body: 'This is my note',
//         }
//     }
// };
// const notes = [{ // not supported
//     id: '12',
//     title: 'First note!',
//     body: 'This is my note',
// }, {
//     id: '761ase',
//     title: 'Another note!',
//     body: 'This is my note',
// }];
// database.ref('notes').set(firebaseNotes);




/** Sample Requests to change the data in Firebase - CRUD*/

//===========CREATE(set)===============
// database.ref().set({ // reference to the root of database
//     name: 'Zach',
//     age: 24,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google',
//     },
//     location: {
//         city: 'Hong Kong',
//         country: 'China',
//     },
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => { // to trigger this, change firebase rule to not allow read/write
//     console.log("This failed.", e);
// });

// database.ref().set('This is my data.'); // to store only a string
// database.ref('age').set(25); // set/update age only
// database.ref('location/city').set('Macau'); // tree reference

// database.ref('attributes').set({
//     height: 170,
//     weight: 62,
// }).then(() => {
//     console.log('Second set call worked.');
// }).catch((e) => {
//     console.log("Things didn't work for the second error", e);
// });

//===========DELETE(remove)===============
// database.ref() // delete everything
//     .remove()
//     .then(() => {
//         console.log('Data was removed');
//     }).catch((e) => {
//         console.log('Did not remove data', e);
//     });

// database.ref('isSingle')
//     .set(null) // same as .remove()
//     .then(() => {
//         console.log('Data was removed');
//     }).catch((e) => {
//         console.log('Did not remove data', e);
//     });

//===========UPDATE(update)===============
// set will wrap everything to the object; update only update the corresponding attributes.
// database.ref().update({ // must be an object, not everything
//     name: 'Mike', // update existing 
//     age: 29,
//     job: 'Software Developer', // set new atrribute
//     isSingle: null, // remove existing attribute
// }).then(() => {
//     console.log('Data is updated!');
// }).catch((e) => {
//     console.log("This failed.", e);
// });

// update only updates at the root of reference level
// database.ref().update({
//     job: 'Manager',
//     // location: { // not working
//     //     city: 'Beijing', // wrapped out other atrributes in this object
//     // },
//     'location/city': 'Beijing', // it works by using quotes and slash!
// }).then(() => {
//     console.log('Data is updated!');
// }).catch((e) => {
//     console.log("This failed.", e);
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle',
//     'location/country': 'The United States',
// }).then(() => {
//     console.log('Data is updated!');
// }).catch((e) => {
//     console.log("This failed.", e);
// });


//===========READ(once / on: subscription / off: unsubscription)===============
// database.ref('location/city')
//     .once('value') // only fetch once
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('Error fetching data', e);
//     });

// // SUBSCRIPE ON DATABASE CHANGE
// // on must use argument pattern, as it has to run over and over again
// const onValueChange = database.ref().on('value', (snapshot) => { // trigger event on database change
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error with data fetching', e);
// });

// setTimeout(() => {
//     database.ref('age').set(29);
// }, 3600);

// setTimeout(() => {
//     // UNSUBSCRIPE ALL ON DATABASE CHANGE
//     // database.ref().off();

//     // UNSUBSCRIPE ONLY ONE SUB ON DATABASE CHANGE
//     database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//     database.ref('age').set(30);
// }, 10500);

// const onValueChange = database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);
// }, (e) => {
//     console.log('Error with data fetching', e);
// });