import db from "./LevelManager";

export function getStatus(req, res) {
  res.send({
    temperature: global.THERMO.currentTemperature,
    status: global.THERMO.status,
    timestamp: global.THERMO.lastCheckOn
  });
}

export function getConf(req, res) {
  db.getLevelDBData("ChronoWeek").then(value => {
    let conf = JSON.parse(value);
    res.send({ conf: global.CONF, week: conf.week });
})
  
}

export function setWeek(req, res) {
  db.getLevelDBData("ChronoWeek").then(value => {
    let conf = JSON.parse(value);
    let week = req.body;
    conf.week = week.week.sort((a, b) => a.day > b.day);
    db.addDataToLevelDB("ChronoWeek", conf).then(res => {
      if (res.success) {
        res.send(true);
      } else {
        res.status(500).send("Unable to store new configuration");
      }
    });

    res.send(true);
  });
}

export function manual(req, res) {
  global.THERMO.manual(req.params.command);
  res.send(true);
}
