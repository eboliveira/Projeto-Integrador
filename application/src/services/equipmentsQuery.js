import {DB} from './Api'

export async function all(){
    return await DB.get('equipments/all').then( (res) =>{
        return res.data
    });
};
