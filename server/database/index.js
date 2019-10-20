const ee = require("@nauma/eventemitter");
const DATABASE = new ee.EventEmitter("models");
global.DATABASE = DATABASE;

require("./auth");
require("./profile");
