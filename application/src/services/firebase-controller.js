import firebase from 'firebase'

// Initialize Firebase
// Replace with your project's data
const config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<MSG_SENDER_ID>"
}

const firebaseApp = firebase.initializeApp(config)
const auth = firebaseApp.auth()

export default auth
