const admin = require('./firebaseSDK')

const authDomain = '@utfpr.edu.br'
const readOnlyDomain = '@alunos.utfpr.edu.br'

module.exports.setCustomUserClaimsAdmin = async function(uid, role){
    return await admin.auth.getUser(uid).then((user) => {
        if((user.email.indexOf(authDomain) != -1 || user.email.indexOf(readOnlyDomain) != -1) && user.emailVerified){
            return admin.auth.setCustomUserClaims(uid, {role: role}).then((log) => {
                return log
            });
        } else {
            return false
        }
    })
}

module.exports.createUser = function(userData, callback){
    if (userData.email.indexOf(authDomain) != -1) {
        newUser = {
            uid: userData.registration,
            email: userData.email,
            emailVerified: true,
            password: userData.password,
            displayName: userData.userName,
            disabled: true
        }

        admin.auth.createUser(newUser).then(function(user) {
            admin.auth.setCustomUserClaimsAdmin(user.uid, {role: 'standart'}).then((log) => {
                callback(log, null)
            })
            console.log("Successfully created new user:", uid.uid);
        }).catch(function(error) {
            callback(null, error)
        });
    } else if (userData.email.indexOf(readOnlyDomain) != -1) {
        newUser = {
            uid: userData.registration,
            email: userData.email,
            emailVerified: true,
            password: userData.password,
            displayName: userData.userName,
            disabled: true
        }

        admin.auth.createUser(newUser).then(function(user) {
            admin.auth.setCustomUserClaimsAdmin(user.uid,  {role: 'student'}).then((log) => {
                callback(log, null)
            })
        }).catch(function(error) {
            callback(null, error)
        });
    } else {
        callback(null, Error('E-mail domain not authorized'))
    }
}

module.exports.updateUser = function(uid, userData){
    if ((user.email.indexOf(authDomain) != -1 || user.email.indexOf(readOnlyDomain) != -1)) {
        admin.auth.updateUser(uid, userData).then(function(user) {
            return user
        }).catch(function(error) {
            return error
        });
    } else {
        return Error('E-mail domain not authorized')
    }
}

module.exports.deleteUser = function(uid, userData){
    return admin.auth.deleteUser(uid).then(function() {
        return true
    }).catch(function(error) {
        return error
    });
}

module.exports.isAdmin = function(idToken){
    return admin.auth.verifyIdToken(idToken).then((claims) => {
        if (claims.role == 'admin') {
            return true
        } else {
            return false
        }
    });
}
