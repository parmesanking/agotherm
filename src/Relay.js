import { Gpio } from "onoff";
import SysLogger from 'ain2';

//let console = new SysLogger();
class Relay  {
  constructor(pin, mode) {
    console.log(`Creating relay on pin: #${pin} mode: ${mode}`)
    this.gpio= new Gpio(pin, mode)
    this.normallyClosed = mode === 'low'
  }
  normallyClosed = null

  on = () => {
    this.gpio.writeSync(this.normallyClosed ? 1 : 0)
    //console.log("ON");
  };

  off = () => {
    this.gpio.writeSync(this.normallyClosed ? 0 : 1)
    //console.log("OFF");
  };

  status() {
    return this.gpio.readSync() === 1 ? "ON" : "OFF"
  }

}

export default Relay;
