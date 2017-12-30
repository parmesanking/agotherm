import moment from "moment";
import SysLogger from "ain2";
import debug from 'debug'

let console = new SysLogger();
debug.log = console.info.bind(console);

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

  manual(value) {
    console.log(`Manual ovverride: ${value}`)
    let t = moment();
    let curStat = this.week[parseInt(t.format("d"))][
      parseInt(t.format("H")) * 60 + parseInt(t.format("m"))
    ];
    for (
      let i = parseInt(t.format("H")) * 60 + parseInt(t.format("m"));
      i < 1440;
      i++
    ) {
      //console.log(`w:${parseInt(t.format("d"))} m:${i} s:${curStat}`)
      if (this.week[parseInt(t.format("d"))][i] != curStat) {
        console.log(`Set until: ${i}`)
        break;
      } else {
        this.week[parseInt(t.format("d"))][i] = this.getTemperatureFromMode(value === 'true' ? "H" : "L");
      }
    }
  }
}

