import Chrono from "./Chrono";
import Relay from "./Relay";
import tempDev from "ds18b20";
import config from "config";
import moment from 'moment'
import _ from 'lodash'


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
      //console.log(`Run: -> ${targetTemp} ${Date()}`);

      let tempBufLength =
        global.CONF.get("chrono").temperatureBufferMinutes *
        60 /
        (global.CONF.get("chrono").temperaturePoolTime / 1000);
      let currTemp = config.iceTemp
      try {
        currTemp = tempDev.temperatureSync(config.get("thermo.thermo_id"));
        if (!isNaN(currTemp)) { 
          currTemp = _.round(currTemp, 2)
        } 
      } catch (error) {
        console.error("Error reading temperature", error.message, error.stack)        
      }

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
      //console.log(recentItems.length);
      //console.log(avgTempRec);
      let tempRaising = avgTempRec >= avgTemp;
      if (targetTemp >= avgTempRec) {
        this.relay.on()
      } else {
        this.relay.off()
      }
      //console.log(`Current stat: $this.relay.status() temp: $currTemp avg: $avgTemp $(tempRaising ? String.fromCharCode(8593) : String.fromCharCode(8595))`);
      console.log(`Current stat: ${this.relay.status()} target:${targetTemp } temp: ${currTemp} avg: ${avgTemp} ${(tempRaising ? String.fromCharCode(8593) : String.fromCharCode(8595))}`);

      this.currentTemperature = currTemp
      this.status = this.relay.status(),
      this.lastCheckOn = moment()

    }
  }

  manual(value){
    if (this.chrono){
      this.chrono.manual(value)
    }
  }
}
