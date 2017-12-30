

export function getStatus(req, res){
    res.send({temperature: global.THERMO.currentTemperature, status: global.THERMO.status, timestamp: global.THERMO.lastCheckOn})
}


export function manual(req, res){
    
    global.THERMO.manual(req.params.command)
    res.send(true)
}