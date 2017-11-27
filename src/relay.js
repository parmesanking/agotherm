import { Gpio } from "onoff";

class Relay extends Gpio {
  constructor(pin, mode) {
    super(pin.mode);
    this.normallyClosed = mode === 'low'
  }

  on = () => {
    this.writeSync(normallyClosed ? 1 : 0)
    console.log("ON");
  };

  off = () => {
    this.writeSync(normallyClosed ? 0 : 1)
    console.log("ON");
  };
}

export default Relay;
