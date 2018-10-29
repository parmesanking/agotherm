import db from "./LevelManager";

export function getStatus(req, res) {
  res.send({
    temperature: global.THERMO.currentTemperature,
    status: global.THERMO.status,
    timestamp: global.THERMO.lastCheckOn
  });
}

export function getConf(req, res) {
  db.getLevelDBData("Chrono").then(value => {
    let conf = JSON.parse(value);
    res.send({ conf: conf, week: conf.chrono.week });
})
  
}

export function setWeek(req, res) {
  db.getLevelDBData("Chrono").then(value => {
    let conf = JSON.parse(value);
    let week = req.body;
    conf.chrono.week = week.week.sort((a, b) => a.day > b.day);
    db.addLevelDBData("Chrono", JSON.stringify(conf)).then(result => {
      if (result.success) {
        res.send(true);
      } else {
        res.status(500).send("Unable to store new configuration");
      }
    });

  });
}

export function manual(req, res) {
  global.THERMO.manual(req.params.command);
  res.send(true);
}
