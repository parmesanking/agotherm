import Chrono from "./Chrono";
import Relay from "./Relay";
import SysLogger from "ain2";
import tempDev from "ds18b20";
import config from "config";
import moment from 'moment'

let console = new SysLogger();

export default class ThermoBrain {
  constructor() {
    console.log("Starting ThermoBrain.");
    this.chrono = new Chrono();
    this.relay = new Relay(
      global.CONF.get("thermo").relayid,
      global.CONF.get("thermo").relayMode
    );
    console.log("Weekly chrono setup from configuration...");
  }

  chrono = null;
  relay = null;
  tempBuffer = [];

  status = "";
  currentTemperature = 0;
  lastCheckOn = null;

  intervalObj = setInterval(
    () => this.run(),
    global.CONF.get("chrono").temperaturePoolTime
  );

  run() {
    if (this.chrono) {
      let targetTemp = this.chrono.getTargetTemperature();
      debug("Run: -> ", targetTemp, " ", Date());

      let tempBufLength =
        global.CONF.get("chrono").temperatureBufferMinutes *
        60 /
        (global.CONF.get("chrono").temperaturePoolTime / 1000);
      let currTemp = tempDev.temperatureSync(config.get("thermo.thermo_id"));
      if (this.tempBuffer.length >= tempBufLength) {
        this.tempBuffer.shift();
      }
      this.tempBuffer.push(currTemp);

      let avgTemp =
        this.tempBuffer.reduce((a, b) => a + b) / this.tempBuffer.length;
      let recentItems = this.tempBuffer.slice(
        parseInt(this.tempBuffer.length / 2)
      );
      let avgTempRec = recentItems.reduce((a, b) => a + b) / recentItems.length;
      debug(recentItems.length);
      debug(avgTempRec);
      let tempRaising = avgTempRec >= avgTemp;
      targetTemp >= avgTempRec ? this.relay.on() : this.relay.off();
      debug(
        "Current stat: ",
        this.relay.status(),
        " temp: ",
        currTemp,
        " avg: ",
        avgTemp,
        tempRaising ? String.fromCharCode(8593) : String.fromCharCode(8595)
      );

      this.currentTemperature = currentTemp
      this.status = this.relay.status(),
      this.lastCheckOn = moment()

    }
  }
}
