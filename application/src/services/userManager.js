import {users} from './Api'

export async function all(uid){
    return await users.post('all', {'uid': uid}).then((res) => {
        return res.data
    })
}

export async function register(userData){
    return await users.post('register', {'userData': userData}).then((res) => {
        return res.data
    })
}

export async function update(uid, userData){
    return await users.put('update', {'uid': uid, 'userData': userData}).then((res) => {
        return res.data
    })
}

export async function isUser(uid){
    return await users.post('isUser', {'uid': uid}).then((res) => {
        return res.data
    })
}

export async function deleteUser(uidAdmin, uid){
    return await users.delete('remove', {'uid': uid, 'uidAdmin': uidAdmin}).then((res) => {
        return res.data
    })
}

export async function isAdmin(uid){
    return await users.post('isAdmin', {'uid': uid}).then((res) => {
        return res.data
    })
}

export async function setRole(uidAdmin, uid, role){
    return await users.post('setRole', {'uid': uid, 'uidAdmin': uidAdmin, 'role': role}).then((res) => {
        return res.data
    })
}
