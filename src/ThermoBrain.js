import Chrono from './Chrono'
import Relay from './Relay'
export default class ThermoBrain {
  constructor() {
    console.log("Starting ThermoBrain.");
    this.chrono = new Chrono();
    let relay = new Relay(global.CONF.get('thermo').relayid, global.CONF.get('thermo').relayMode )
    console.log("Weekly chrono setup from configuration...");
  }

  chrono = null;;
  relay = null

  intervalObj = setInterval(() => this.run(), 10000);

  run(){
    if (this.chrono) {
      let targetTemp = this.chrono.getTargetTemperature()      
      console.log("Run: -> ", targetTemp, " ", Date());
      parseInt(targetTemp) > 20 ? this.relay.on() : this.relay.off()
      console.log("Current val: " & this.relay.read())

   }
  }
}
