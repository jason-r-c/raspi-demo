/**
 * #BOOTCORE
 * Provides an extension mechanism to BOOTSTRAP.
 * BOOTSTRAP, is the main boot processor for the Pump platform, BOOTCORE configures
 * specific overrides, for functions to customise and hook into the boot process.
 */
bootconfig = {
  /*
    IDE: Specific overrides for running in Standalone mode
    .stylesheet allows for a different stylesheet from the domain to be used.
   */
  "ide": {
    "stylesheet": undefined
  },
  // Additional Library Paths ( not required by core platform )
  "libs": {
    "d3": "node_modules/d3/d3.min",
    "u2f": "lib/u2f/u2f-api",
    "notify": "lib/notifyjs/notify"
  },
  "/iotaa": {
    // Addtional libraries to include
    "libs": [ "notify" ]
  },
  "/pumpco": {
    // Addtional libraries to include
    "libs": [ "d3", "u2f" ]
  },
  "/rand": {
    // Addtional libraries to include
    "libs": []
  },
  "/hs": {
    // Addtional libraries to include
    "libs": [ "d3" ]
  }
};
