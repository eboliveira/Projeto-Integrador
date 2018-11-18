const admin = require('./firebaseSDK')

const authDomain = '@utfpr.edu.br'
const readOnlyDomain = '@alunos.utfpr.edu.br'

var usersList = []

module.exports.allUsers = function(uid, callback){
    const listAllUsers = (nextPageToken, callback) => {
        admin.auth.listUsers(100, nextPageToken)
        .then(function(listUsersResult) {
            listUsersResult.users
            for (var i = 0; i < listUsersResult.users.length; i++){
                usersList.push(listUsersResult.users[i].toJSON())
            }
            if (listUsersResult.pageToken) {
                listAllUsers(listUsersResult.pageToken, callback)
            } else {
                callback(usersList, null)
            }
        })
        .catch(function(error) {
            console.log("Error listing users:", error);
        });
    }

    admin.auth.getUser(uid).then((userRequest) => {
        if (userRequest.customClaims.role == 'admin') {
            usersList = []
            listAllUsers(undefined, callback)
        } else {
            callback(null, Error('Forbidden'))
        }
    }).catch((error) => {
        callback(null, error)
    })
}

module.exports.setCustomUserClaims = async function(uidAdmin, uid, role, callback){
    admin.auth.getUser(uidAdmin).then((userRecord) => {
        if (userRecord.customClaims.role == 'admin') {
            admin.auth.getUser(uid).then((user) => {
                if((user.email.indexOf(authDomain) != -1 || user.email.indexOf(readOnlyDomain) != -1) && user.emailVerified){
                    admin.auth.setCustomUserClaims(uid, {role: role}).then(() => {
                        callback(null)
                    });
                } else {
                    if (user.emailVerified) {
                        callback(Error('E-mail domain not authorized'))
                    } else {
                        callback(Error('E-mail not verified'))
                    }
                }
            }).catch((error) => {
                callback(error)
            })
        } else {
            callback(Error('Forbidden'))
        }
    }).catch((error) => {
        callback(error)
    })
}

module.exports.createUser = function(userData, callback){
    let newUser = {
        uid: userData.uid,
        email: userData.email,
        emailVerified: true,
        password: userData.password,
        displayName: userData.displayName,
        disabled: true
    }
    if (userData.email.indexOf(authDomain) != -1) {
        admin.auth.createUser(newUser).then(function(user) {
            admin.auth.setCustomUserClaims(user.uid, {role: 'standart'}).then(() => {
                callback(null)
            })
            console.log("Successfully created new user:", uid.uid);
        }).catch(function(error) {
            callback(error)
        });
    } else if (userData.email.indexOf(readOnlyDomain) != -1) {

        admin.auth.createUser(newUser).then(function(user) {
            admin.auth.setCustomUserClaims(user.uid,  {role: 'student'}).then(() => {
                callback(null)
            })
        }).catch(function(error) {
            callback(error)
        });
    } else {
        callback(Error('E-mail domain not authorized'))
    }
}

module.exports.updateUser = function(uid, userData, callback){
    if ((userData.email.indexOf(authDomain) != -1 || userData.email.indexOf(readOnlyDomain) != -1)) {
        admin.auth.updateUser(uid, userData).then(function(user) {
            callback(user, null)
        }).catch(function(error) {
            callback(null, error)
        });
    } else {
        callback(null, Error('E-mail domain not authorized'))
    }
}

module.exports.deleteUser = function(uid, callback){
    admin.auth.deleteUser(uid).then(() => {
        callback(null)
    }).catch(function(error) {
        callback(error)
    });
}

module.exports.isAdmin = function(uid, callback){
    admin.auth.getUser(uid).then((userRecord) => {
        if (userRecord.customClaims.role == 'admin') {
            callback(true, null)
        } else {
            callback(false, null)
        }
    }).catch((error) => {
        callback(null, error)
    })
}
