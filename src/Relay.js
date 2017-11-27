import { Gpio } from "onoff";

class Relay extends Gpio {
  constructor(pin, mode) {
    console.log(`Creating relay on pin: #${pin} mode: ${mode}`)
    super(pin,mode);
    this.normallyClosed = mode === 'low'
  }
  normallyClosed = null

  on = () => {
    this.writeSync(this.normallyClosed ? 1 : 0)
    console.log("ON");
  };

  off = () => {
    this.writeSync(this.normallyClosed ? 0 : 1)
    console.log("OFF");
  };

  read = () => {
    return this.readSync()
  }
}

export default Relay;
