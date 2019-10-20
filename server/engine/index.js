const ee = require("@nauma/eventemitter");
const ENGINE = new ee.EventEmitter("engine");
global.ENGINE = ENGINE;

require("./auth");
require("./profile");
