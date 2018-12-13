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

export async function reserveEquip(equip){
    return await equipments.post('reserve', equip).then( res =>{
      return res.status
    }).catch((err) =>{
        
    })
  }

export async function acceptReserve(equip){
    return await equipments.get('accept'+'/'+equip.patrimonio).then( res=>{
        return res.status
    }).catch((err)=>{

    })
}

export async function rejectReserve(equip){
    return await equipments.get('reject'+'/'+equip.patrimonio).then( res=>{
        return res.status
    }).catch((err)=>{

    })
}
