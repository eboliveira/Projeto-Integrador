const {PythonShell} = require ('python-shell')

module.exports.generateCSV = function(user, passwd, callback){
    let options = {
        mode: 'text',
        scriptPath: '/home/eduardo/Documents/PI/Projeto-Integrador/server/resources/',
        args: [user, passwd]
    }
    resp = {}
    PythonShell.run("captura.py", options, (err, res)=>{
        callback(err,res)
    })
    return resp
}

