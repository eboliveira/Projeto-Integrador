import {equipments} from './Api'

export async function all(){
    return await equipments.get('all').then( (res) =>{
        return res.data
    });
};

export async function set(equipment){
    return await equipments.put('set', equipment).then((res) => {
        return res.data
    })
}

export async function remove(equipment){
    return await equipments.delete(equipment.codigo).then((res) =>{
        return res.data
    })
}
