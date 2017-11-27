
/*import Relay from './src/relay'


relay.on()
*/

import   ThermoBrain   from './src/ThermoBrain.js'
import config from 'config'

global.CONF = config


let thermo = new ThermoBrain();

