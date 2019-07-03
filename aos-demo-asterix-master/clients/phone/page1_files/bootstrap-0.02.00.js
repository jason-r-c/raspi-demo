/*
 * @license
 * Copyright (c) 2016 Pumpco Inc.
 *
 * BOOTSTRAP.js is distributed by PumpCo Inc.
 *
 * Pump API and Application 2.0.1.
 * Copyright(c) 2016 Pumpco Inc.
 */
/**
 * Load the library located at the same path with this file
 *
 * AMONIS: 23/11/2016: RequireJS Upgrades ( https://github.com/requirejs/alameda )
 *
 * Will automatically load ext-all-dev.js if any of these conditions is true:
 * - Current hostname is localhost
 * - Current hostname is an IP v4 address
 * - Current protocol is "file:"
 *
 * Bootstrap PumpFaceOS
 *
 Examples of Bootstrap startup params ( 31/10/2016 )

 <script type="text/javascript">
    siteId = "00275367eb2b62de00000001";
    var params = {
       	"siteId":"00275367eb2b62de00000001",
       	"siteName":"Sandbox.cnect_to_sandbox",
       	"siteTitle":"aOS Sandbox",
       	"cogParams":[
       		{
       			"name":"HealthPump.HealthPumpLoginCog",
       			"value":{"signupUrl":"sandbox/signup"}
       		}
       	],
       	"sitePath":"sandbox/",
       	"pumpfacePath":"pf-hydra/",
       	"favicon":"resources/images/favicon.ico",
       	"bootstrapVersion":"0.02.00",
       	"contactDetails":"Your Support Contact"
	};
</script>

<script type="text/javascript">
    siteId = "00275367f28cb59900000001";
    var params = {
    	"siteId":"00275367f28cb59900000001",
    	"siteName":"Sandbox.cnect_to_sandbox_signup",
    	"siteTitle":"aOS Sandbox",
    	"cogParams":[
    		{
    			"name":"HealthPump.HealthPumpLoginCog",
    			"value":{
    				"action":"signup",
    				"appflow":"sandbox.form.signup"
    			}
    		}
    	],
    	"sitePath":"sandbox/signup/",
    	"pumpfacePath":"pf-hydra/",
    	"favicon":"resources/images/favicon.ico",
    	"bootstrapVersion":"0.02.00",
    	"contactDetails":"Your Support Contact"
    };
</script>

 v1.01
 */

(function() {

  // CAPABILITY SWITCHES
  // var useWebpack = true; // AMONIS: 03/10/2018: Removed webpack switch ( default build process from now on )

  // DECLARATIONS
  window.__timers = {};
  window.__timer = window.performance || Date;

  /**
   * ### markTimer
   * @param  {type} name
   * @return {type}      [description]
   */
  window.__mark = function(name) {
    window.__timers[name] = window.__timers[name] || [];
    window.__timers[name].push(window.__timer.now());
  };

  /**
   * Method that returns (in ms) the difference between the Start and Now
   * @private
   */
  window.__markEnd = function(name) {
    var result = undefined;
    if (window.__timers[name]) {
      result = "";
      window.__timers[name].push(window.__timer.now());
      for (var i = window.__timers[name].length - 1; i > 0; i--) {
        result = (window.__timers[name][i] - window.__timers[name][i - 1]) + "," + result;
      }
      result = name + ":" + result;
    }
    return result;
  };

  /**
   * Creates a new Element
   * @param  {[type]} type   [description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  function newEl(type, params) {
    var div = document.createElement(type);
    for (var key in params) {
      div.setAttribute(key, params[key]);
    }
    return div;
  }

  /**
   * Retreive a boot config property ( from bootcore.js )
   * The allows environment configuration prior to boot
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  function getConfig(name) {

    if (this.bootconfig && this.bootconfig[name]) {
      return this.bootconfig[name];
    } else {
      return undefined;
    }
  }

  /**
   * ###cssFeature
   * detects css features and can be used for browser detection
   */
  function cssFeature(capabilities) {
    var el = document.createElement("detect");

    var result = false;
    for (var i = 0; i < capabilities.length; i++) {
      if (el.style[capabilities[i]] == "") {
        result = true;
        break;
      }
    }

    return result;
  }

  /**
   * Determines the path to use as a base from the name of this file in the scipt block
   */
  var _getPathFromInclude = null;

  function getPathFromInclude(trim) {
    if (_getPathFromInclude === null) {
      trim = trim || false;

      var trimLength = trim ? 5 : 4;

      var path = "";

      // The script include will reference this file. Get the path from this.
      var scripts = document.getElementsByTagName('script');
      for (var i = 0, ln = scripts.length; i < ln; i++) {
        var scriptSrc = scripts[i].src;

        var match = scriptSrc.match(/bootstrap[-0-9.]*\.js$/);
        if (match) {
          path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
          break;
        }
      }

      // Remove the trailing sdk/ to get the base path
      _getPathFromInclude = path.substring(0, path.length - trimLength);
    }

    return _getPathFromInclude;
  }

  /**
   * Determines what the path used to access the site is
   * IMPORTANT: Ignores anything after the first folder as that is used for the domain routing
   */
  function getPathName() {
    var pathname = window.location.pathname;

    // Match the first folder as the domain
    var domain = pathname.match(/^\/[\w]*/g);

    // Return the first Matched item as the domain ( used to map CSS paths )
    return domain[0].toLowerCase();
  }

  /**
   * Determines what the extra debug name will be given a url path.
   */
  function getDebugInclusion() {
    var debug = "";

    var queryString = window.location.search;
    if (queryString.match('(\\?|&)debug') !== null) {
      debug = "-debug";
    }

    return debug;
  }

  /**
   * Adds appropriate Meta headers to the page for scaling and sizing on a device by device basis.
   * Android and Apple treat orientation changes differently etc.
   */
  function addMetaHeaders(params) {
    var scale = window.screen.width / 980;
    if (window.orientation && (window.orientation === 90 || window.orientation === -90)) {
      // landscape
      if (the.isIos) {
        scale = window.screen.height / 980;
        // Android flips height / width when rotated. Ios doesn't
      }
    }
    document.write('<meta name="HandheldFriendly" content="true">')
    document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">');
    document.write('<meta name="apple-mobile-web-app-capable" content="yes">');
    document.write('<meta name="apple-mobile-web-app-status-bar-style" content="black">');

    // Create localised FAVICON settings based on path in url
    var domain = getPathName();
    var resourcesPath = getPathFromInclude() + 'resources/' + domain + '/favicon';
    if (params.wrapped)
      resourcesPath = 'resources/' + params.location.path + '/favicon';

    // Add old style favicon ( as an icon as it is most widely supported )
    document.write('<link rel="icon" type="image/x-icon" 				href="' + resourcesPath + '/favicon.ico" />');

    // Add apple icons for homepage
    document.write('<link rel="apple-touch-icon" sizes="57x57" 			href="' + resourcesPath + '/apple-icon-57x57.png">');
    document.write('<link rel="apple-touch-icon" sizes="60x60" 			href="' + resourcesPath + '/apple-icon-60x60.png">');
    document.write('<link rel="apple-touch-icon" sizes="72x72" 			href="' + resourcesPath + '/apple-icon-72x72.png">');
    document.write('<link rel="apple-touch-icon" sizes="76x76" 			href="' + resourcesPath + '/apple-icon-76x76.png">');
    document.write('<link rel="apple-touch-icon" sizes="114x114" 		href="' + resourcesPath + '/apple-icon-114x114.png">');
    document.write('<link rel="apple-touch-icon" sizes="120x120" 		href="' + resourcesPath + '/apple-icon-120x120.png">');
    document.write('<link rel="apple-touch-icon" sizes="144x144" 		href="' + resourcesPath + '/apple-icon-144x144.png">');
    document.write('<link rel="apple-touch-icon" sizes="152x152" 		href="' + resourcesPath + '/apple-icon-152x152.png">');
    document.write('<link rel="apple-touch-icon" sizes="180x180" 		href="' + resourcesPath + '/apple-icon-180x180.png">');

    // Add apple splash screens
    document.write('<meta name="apple-mobile-web-app-capable" 			content="yes" />');
    document.write('<link rel="apple-touch-icon" sizes="750x1334" 	href="' + resourcesPath + '/apple_splash_750.png" rel="apple-touch-startup-image">');
    document.write('<link rel="apple-touch-icon" sizes="640x1136" 	href="' + resourcesPath + '/apple_splash_640.png" rel="apple-touch-startup-image">');

    // Add android icons for homepage
    document.write('<link rel="icon" type="image/png" sizes="192x192" 	href="' + resourcesPath + '/android-icon-192x192.png">');
    document.write('<link rel="icon" type="image/png" sizes="32x32" 	href="' + resourcesPath + '/favicon-32x32.png">');
    document.write('<link rel="icon" type="image/png" sizes="96x96" 	href="' + resourcesPath + '/favicon-96x96.png">');
    document.write('<link rel="icon" type="image/png" sizes="16x16" 	href="' + resourcesPath + '/favicon-16x16.png">');

    // Add MS tile settings for homepage
    document.write('<meta name="msapplication-TileImage"			 content="' + resourcesPath + '/ms-icon-144x144.png">');
    document.write('<meta name="msapplication-TileColor" content="#ffffff">');
    document.write('<meta name="theme-color" content="#ffffff">');
  }

  /**
   * ###addLoaderBar
   */
  function addLoaderBar() {
    // Create a new loaderbar element
    var el = newEl("div", {
      "id": "loaderbar"
    });
    // Add to the body ( this is expected to be called after the body 'onload' has fired )
    document.getElementsByTagName("body")[0].appendChild(el);
  }

  /**
   * ###checkLoadingState
   */
  function checkLoadingState() {
    var ns = ["Date", "camelet", "ko", "jQuery", "phil"]

    // **property** boolean complete Assume truthy
    var complete = true;
    // **property** int completeCount
    var completeCount = 0;
    var result = [];

    // Iterate over the list of required name space properties
    for (var i = 0; i < ns.length; i++) {
      if (!window[ns[i]]) {
        complete = false;
        completeCount++;
        result.push(ns[i]);
      }
    }

    if (complete) {
      // AMONIS: 22/11/2016
      // Loading complete, may want to invoke a callback here?
    } else {
      // AMONIS: 22/11/2016: Check if the loadbar is available
      var _bar = document.getElementById("loaderbar");
      if (_bar && completeCount !== 0) {
        var width = 100 - ((completeCount / ns.length) * 100);

        _bar.setAttribute("style", "width:" + width + "%");
      }

      // AMONIS: 22/11/2016: Continue checking only if we haven't completed.
      setTimeout(checkLoadingState, 100);
    }
  }


  /**
   * @method addJS
   * Writes out a correctly formatted JS include with debug flags etc
   */
  function addJS(name, dataParams) {
    dataParams = dataParams || [];

    var path = getPathFromInclude();
    var debug = getDebugInclusion();

    // Expand data- params if passed in e.g. data-main="src/static"
    var data = "";
    for (var i = 0; i < dataParams.length; i++) {
      data += "data-" + dataParams[i].name + "=\"" + dataParams[i].value + "\"";
    }

    document.write('<script ' + data + 'type="text/javascript" charset="UTF-8" src="' + path + name + debug + '.js"></script>');
  }

  /**
   * @method addCSS
   * Writes out a correctly formatted CSS include with debug flags etc ( debug being expanded CSS )
   * AMONIS: 25/11/2015: now allows any link to be outputted.
   * e.g. <link rel="icon" type="image/x-icon" href="http://example.com/image.ico" />
   * using addCSS( "image.ico", "image/x-icon", "icon" );
   */
  function addCSS(name, type, rel) {

    // default the link to be a CSS Stylesheet include
    type = type || "text/css";
    rel = rel || "stylesheet"

    var path = getPathFromInclude();
    var debug = getDebugInclusion();

    if (rel === "stylesheet") {
      if (document.head) {
        var el = document.createElement("link");
        el.setAttribute("rel", "stylesheet");
        el.setAttribute("type", "text/css");
        el.setAttribute("href", path + name + '.css');
        document.head.appendChild(el);
      } else {
        // Apply the debug parameter
        document.write('<link rel="stylesheet" type="text/css" href="' + path + name + debug + '.css" />');
      }
    } else {
      // Don't apply the debug parameter
      document.write('<link rel="' + rel + '" type="' + type + '" href="' + path + name + '"/>');
    }
  }

  /**
   * ###removeCSS
   * Removes an existing html link from the bootstrap html file.
   * This shouldn't really be neccessary, as the template should be adjusted to remove these things in PH.
   * AMONIS: 25/11/2015
   */
  function removeCSS(name) {
    // Get the parent first ( the html.head )
    var head = document.querySelector("head");

    // Find the "link"
    var link = document.querySelector("link");
    if (link) {
      // check for favicon reference
      if (link.href.indexOf("favicon.ico") > -1) {
        // remove this tag
        head.removeChild(link);
      }
    }
  }

  /**
   * @method addScript
   * Writes out a correctly formatted JS include with debug flags etc
   */
  function addScript(script) {
    document.write('<script type="text/javascript" charset="UTF-8">' + script + '</script>');
  }

  /**
   * @method addStyle
   * Writes out a correctly formatted CSS include with debug flags etc
   */
  function addStyle(style) {
    document.write('<style type="text/css" charset="UTF-8">' + style + '</style>');
  }

  /**
   * ###showHidePanel
   * Helper to show or hide a div
   * @param {JSON} show [description]
   * @param {JSON} id   [description]
   * @return {JSON}      [description]
   */
  function showHidePanel(show, id) {
    show = show || false;
    var panel = document.getElementById(id);

    if (!panel || panel === null)
      return -1

    if (show) {
      panel.style.display = "block";
      panel.style.visibility = "visible";
    } else {
      panel.style.display = "none";
      panel.style.visibility = "hidden";
    }
  }

  function showHidePanelLoading(show) {
    showHidePanel(show, "PanelLoading");
  }

  /**
   * ###polyfilES5Bind
   * @return {JSON} [description]
   */
  function polyfilES5Bind() {
    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function() {},
          fBound = function() {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
          };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
      };
    }
  }

  /**
   * ###polyfilES5AttachEventListener
   * @return {JSON} [description]
   */
  function polyfilES5AttachEventListener() {
    !window.addEventListener && (function(WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
      WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function(type, listener) {
        var target = this;

        registry.unshift([target, type, listener, function(event) {
          event.currentTarget = target;
          event.preventDefault = function() {
            event.returnValue = false;
          };
          event.stopPropagation = function() {
            event.cancelBubble = true;
          };
          event.target = event.srcElement || target;

          listener.call(target, event);
        }]);

        this.attachEvent("on" + type, registry[0][3]);
      };

      WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function(type, listener) {
        for (var index = 0, register; register = registry[index]; ++index) {
          if (register[0] == this && register[1] == type && register[2] == listener) {
            return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
          }
        }
      };

      WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function(eventObject) {
        return this.fireEvent("on" + eventObject.type, eventObject);
      };
    })(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
  }

  /*
  ### MAIN BOOT PROCESS ###
  */
  __mark("boot");

  // Check the Browser for compatibility first
  var isSupportedBrowser = cssFeature(["animation", "-webkit-animation"]);

  addStyle([
    "#PanelLoading { background-color:#ccc; box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.74); text-align:center; display:none; }",
    "#PanelLoading > p { margin:0px; padding:5px 5px; font-size:12px; font-family: monospace; }",
    "#PanelLoading > h1 { display:none; background-color: #ccc; font-size:44px; font-weight:bold; margin:0px; padding:10px 0px; text-transform:uppercase; }",
    "#loaderbar { height: 2px; background-color: #0088cc; height: 2px; position: fixed; top: 0; }",
    "#logo { box-shadow:0px 0px 5px rgba(0,0,0,0.5); border-radius:25px; position: absolute; left: -48px; top: -48px; margin-left: 50%; margin-top: 50%; width: 96px; height: 96px; background-image:url(aos/resources" + getPathName() + "/favicon/favicon-96x96.png); background-repeat: no-repeat; background-position: center center; }"
  ].join("\n"));

  var params = window.params = window.params || {};
  window.params.wrapped = window.params.wrapped || false;

  // Add in Mobile Meta headers
  addMetaHeaders(params);

  // AMONIS: 21/11/2016: Internal checker of loading state
  checkLoadingState();

  // Add the Primary libraries that are required by aOS
  addJS("lib/the/the");
  addJS("node_modules/knockout/build/output/knockout-latest");
  addJS("lib/camelet/camelet-1.0.4");
  addJS("node_modules/jquery/dist/jquery.min");
  addJS("lib/phil/sdk/phil-1.1.0");

  // Add the Secondary ( none critical ) libraries that support functionality in aOS
  addJS("node_modules/localforage/dist/localforage.min");
  addJS("lib/datejs/date-en");

	// Add Optional libraries Per Domain Path ( configured in bootcore.js )
	var conf = getConfig( getPathName() );
	if( conf.libs ){
		var libs = getConfig( "libs" );
		for( var name=0; name<conf.libs.length; name++ ){
			addJS( libs[ conf.libs[ name ] ] );
			// console.log( "Adding " + libs[ conf.libs[ name ] ] );
		}
	}

  // Add in aOS
  addJS("sdk/pumpfaceos");

  // Add in required Polyfil for the .bind() function
  polyfilES5Bind();

  // Add in required Polyfil for the .attachEventListener() function
  polyfilES5AttachEventListener();


  /*
  APP - The boot app
  This section is really tricky.
  It essentially mirrors the config in build.js which compiles all of the files together
  for faster download in live.
  */
  var app = {
    init: function() {
      // Add wrapped / browser event handlers as appropriate
      if (!params.wrapped) {
        // **window.load** Fired by the DOM when the page is complete and ready.
        window.addEventListener("load", this.onload.bind(this), false);
      } else {
        // **document.deviceready** Fired by Cordova when the device is ready. This maps the drives to local resources etc.
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
      }
    },

    /**
     * ###window.load
     * Assumption that this is fired by a BROWSER. WINDOW, DOCUMENT and DOM will be available
     * Fired after DOM has loaded, at which point we know that we have Require.js
     * Pass through the appropriate Require.js Config
     * Then call "require" with the param "live", which refers to live.js and should book the OS.
     * Final minor tweaks to the DOM to set the classes etc.
     */
    onload: function() {
      // AMONIS: 21/11/2016: Loader bar that detects libraries being loaded in
      addLoaderBar();
      // Boot the platform
      this.boot();
    },

    /**
     * ###document.onDeviceReady
     * Assumption thsi this is fired by Cordova. Don't bind to WINDOW events, use CORDOVA instead.
     * Fired by Cordova when the app is ready and the local paths are mapped.
     * Pass through the appropriate Require.js Config
     * Then call "require" with the param "live", which refers to live.js and should book the OS.
     * Final minor tweaks to the DOM to set the classes etc.
     */
    onDeviceReady: function() {
      // AMONIS: 21/11/2016: Loader bar that detects libraries being loaded in
      addLoaderBar();
      // Boot the platform
      this.boot();
    },

    /**
     * Generic boot handler
     * @return {[type]} [description]
     */
    boot: function() {
      // Boot using webpack
      this.bootWebpack()
    },

    /**
     * Boot assuming webpack included libraries
     * @return {[type]} [description]
     */
    bootWebpack: function() {
      __mark("boot");

      // console.log("built using Webpack 4.x");

      addCSS("resources/phil-1.0.0"); // Add PHIL library ( could move into live.js? )
      addCSS("resources/animate"); // Add animate library ( lazy load if required by cog live.js? )
      addCSS("resources/core"); // Add Core library
      // Check for option running as part of Cog IDE
      if (getConfig("ide") && getConfig("ide").stylesheet !== undefined) {
        addCSS(getConfig("ide").stylesheet); // Add Site Specific CSS based on URL
      } else {
        // Usual execution path, add site specific styles
        addCSS("resources/" + getPathName() + "/site"); // Add Site Specific CSS based on URL
      }

      // AMONIS: 24/11/2015: Add "webapp" class for when running in a regular browser
      document.body.setAttribute("class", "os-loading");

      // AMONIS: 2018: AOS should be exposed by Webpack.config ( => live.js:main() )
      AOS();
    }
  };

  // Initialise the App
  // Sets event listeners for: -
  // .onload ( fired by browsers )
  // .onDeviceReady ( fired by Cordova )
  app.init();

})();
