import moment from "moment";
import SysLogger from 'ain2';

let console = new SysLogger();

export default class Chrono {
  week = Array(6);
  constructor() {
    //creating chrono data structure
    for (let d = 0; d < 7; d++) {
      this.week[d] = Array(1339);
      for (let m = 0; m < 1440; m++) {
        this.week[d][m] = "";
      }
    }
    this.loadConf();
  }

  loadConf() {
    let conf = global.CONF.get("chrono");
    //applying temperatures set
    conf.week.forEach(day => {
      day.ranges.forEach(range => {
        for (let i = range.at; i < range.at + range.duration; i++) {
          this.week[day.day][i] = this.getTemperatureFromMode(range.mode);
        }
      });
    });

    //applying ice temps
    this.week.forEach((day, d) =>
      day.forEach((min, m) => {
        if (min === "") {
          this.week[d][m] = this.getTemperatureFromMode("");
        }
      })
    );
  }

  getTemperatureFromMode(mode) {
    let temperatures = global.CONF.get("thermo");
    switch (mode.toUpperCase()) {
      case "H":
        return temperatures.highTemp;
      case "L":
        return temperatures.lowTemp;
      default:
        return temperatures.iceTemp;
    }
  }

  getTargetTemperature() {
    let t = moment();
    return this.week[parseInt(t.format("d"))][
      parseInt(t.format("H")) * 60 + parseInt(t.format("m"))
    ];
  }
}
