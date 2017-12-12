
/*import Relay from './src/relay'


relay.on()
*/
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import bodyParser from 'body-parser'
import debug from 'debug'
import config from 'config'

import ThermoBrain   from './src/ThermoBrain.js'
import * as ThermoMGR from './src/ThermoManager'



global.CONF = config





const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.route('/status').get(ThermoMGR.getStatus);
app.route('/manual/:command').get(ThermoMGR.manual);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app).listen(PORT, () => {
    debug('Server listening on', PORT);
    global.THERMO = new ThermoBrain();
    })

export default app

