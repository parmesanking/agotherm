import nconf from 'nconf'

export function getStatus(req, res){
    res.send({temperature: global.THERMO.currentTemperature, status: global.THERMO.status, timestamp: global.THERMO.lastCheckOn})
}


export function getConf(req, res){
    res.send({conf: global.CONF, week: global.THERMO.week})
}


export function setWeek(req, res){
    let week = req.body
    nconf.file({ file: __dirname +'/../config/default.json' });
    nconf.set('chrono:week', week.week.sort((a, b) => a.day > b.day))	
    nconf.save( err => {
    if (err == null){
        res.send(true)
    }else{
        console.log(err)
    }
    })
}

export function manual(req, res){
    
    global.THERMO.manual(req.params.command)
    res.send(true)
}
