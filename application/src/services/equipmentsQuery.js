import {equipments} from './Api'

export async function all(){
    return await equipments.get('all').then( (res) =>{
        return res.data
    });
};
