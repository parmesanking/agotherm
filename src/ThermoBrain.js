import Chrono from './Chrono'

export default class ThermoBrain {
  constructor() {
    console.log("Starting ThermoBrain.");
    this.chrono = new Chrono();
    //this.chrono.loadConf();
    console.log("Weekly chrono setup from configuration...");
  }

  chrono = null;

  intervalObj = setInterval(() => this.run(), 10000);

  run(){
    if (this.chrono) {
      console.log("Run: -> ", this.chrono.getTargetTemperature());
    }
  }
}
