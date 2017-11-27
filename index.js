/*import Relay from './src/relay'

let relay = new Relay(17, 'out')
relay.on()
*/

import Chrono from './src/Chrono'
let w = new Chrono();
w.loadConf();

console.log(w.getTargetTemperature());

//console.log(new Chrono().week)
