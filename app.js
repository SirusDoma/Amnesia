console.log('Amnesia v1.0');

// Initialize module
console.log('Initializing modules..');
const ENV = require('dotenv').config();
const MermoryEraserDevice = require('./memory_eraser_device');
    
// Retrieve credential information
console.log('Retrieving configurations..');
const profileid = process.env.PROFILEID;
const email     = process.env.EMAIL;
const password  = process.env.PASSWORD;

// Retrieve scanner config
const args  = process.argv.slice(2);
const start = parseInt(args[0]);
const end   = parseInt(args[1]);

// Validate scanner config
if (!start || !end || end < start) {
    console.error('Unspecified or invalid start year and / or end year');
    return;
}

// Activate the device!!!
const device = new MermoryEraserDevice(profileid, email, password);
device.activate(start, end);
