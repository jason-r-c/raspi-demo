/**
 * Config.js
 * Config for the environment
 */
"use strict";

var _switches = {};


/*
    Iterate over any command line parameters and set the switches appropriately. 
    Used inconjuction with Config.js to correctly set startup params
 */
process.argv.forEach(function(val, index, array) {
    // Split any key usually in the format --env=dev etc.
    let keys = val.split("=");
    // This is a supported key
    _switches[keys[0]] = keys[1];
    // Output what ( if any ) switches were specified.
    console.log(`Switch [${keys[0]}] set to [${keys[1]}]`);
});

function getSwitch(name){
    return _switches[name] !== undefined ? _switches[name] : undefined;
}

module.exports = { getSwitch }