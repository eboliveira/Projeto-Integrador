const admin = require('firebase-admin');

var serviceAccount = require('<path/to/serviceAccountKey.json>');

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

const auth = app.auth();

module.exports = {auth, app}
