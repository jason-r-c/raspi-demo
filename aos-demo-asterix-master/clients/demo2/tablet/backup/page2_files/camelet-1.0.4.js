window.camelet=window.camelet||{},function(e){e.Message=function(e){var n,t,o;return e=e||{},n=e.id||camelet.Utils.generateUuid(),t=e.body||void 0,o=e.headers||{},o.routingSlip=[],{addRoutingSlip:function(e,n){var t={pattern:e,component:n};o.routingSlip.push(t)},getBody:function(){return t},getHeaders:function(){return o},getRoutingSlip:function(){return o.routingSlip},getId:function(){return n},setBody:function(e){t=e}}}}(camelet),window.camelet=window.camelet||{},function(e){e.Properties=function(e){var n=[],t={};return{addAuditItem:function(e,t,o){var r=new Date,i=r.getTime(),a={message:e,id:t,name:o,timestamp:i};n.push(a)},getAuditItems:function(e){return n},getValue:function(e){return t[e]},setValue:function(e,n){t[e]=n}}}}(camelet),window.camelet=window.camelet||{},function(e){e.Exchange=function(e){var n={},t=void 0;return n.$class="camelet.Exchange",n.message=void 0,n.properties=camelet.Properties(),n.getId=function(){return t},n.getMessage=function(){return n.message},n.setMessage=function(e){n.message=e},t=camelet.Utils.generateUuid(),e&&(e.mep||"InOut"),n}}(camelet),window.camelet=window.camelet||{},function(e){e.Endpoint=function(e){var n={},t=void 0,o=void 0,r=void 0,i=[];if(n.scheme="scheme",n.context="context",n.options=[],n.name=void 0,n.addListener=function(e){return i.push(e),this},n.delListener=function(e){for(var n=0;n<i.length;n++){i[n].name===e.name&&i.splice(n,1)}return this},n.connectConsumer=function(e){r=e,r.addConsumer({name:this.name,fn:this.handler,scope:this})},n.disconnectConsumer=function(){r=void 0},n.connectProducer=function(e){o=e},n.disconnectProducer=function(){o=void 0},n.getId=function(){return t},n.getName=function(){return n.name},n.handler=function(e){var o=i.length;camelet.Log.debug(n,"["+n.name+"] pulsed."),camelet.Log.debug(n,"--\x3e EP:"+t+":"+n.name);for(var r=0;r<o;r++){var a=i[r];a.fn.call(a.scope,e)}return this},n.logger=function(){},n.send=function(e){return o?(camelet.Log.debug(n,"<-- EP:"+t+":"+n.name),n.logger(e),o.send(e)):(camelet.Log.debug(this,"Warning. ["+t+"] no out Channel defined."),!1)},n.withOptions=function(e){var t=!1;if(!e)return t;for(var o=0;o<n.options.length;o++){var r=n.options[o];if(r.cls=r.cls||"",index=e.toLowerCase().indexOf(r.cls.toLowerCase()),index>-1){t="black"!==r.list;break}}return t},n.fn=n.handler,t=camelet.Utils.generateUuid(),e&&(n.scheme=e.scheme||void 0,n.context=e.context||void 0,n.options=e.options||[],o=e.producer||void 0,n.name=e.name||void 0,e.consumer&&(r=e.consumer,r.addConsumer({name:n.name,fn:n.handler,scope:n})),this.listeners=[],e.listeners))for(var a=0;a<e.listeners.length;a++){var c=e.listeners[a];n.addListener({name:"not-known",fn:c.fn,scope:c.scope})}return n}}(camelet),window.camelet=window.camelet||{},function(e){e.Channel=function(e){var n={},t=void 0,o=void 0,r=void 0;return n.name=void 0,n.addConsumer=function(e){return r=e,this},n.addProducer=function(e){return o=e,this},n.getId=function(){return t},n.getName=function(){return n.name},n.send=function(e){return r?(camelet.Log.debug(n,"<-> CH:"+t+":"+n.name),r.fn.call(r.scope,e),!0):(camelet.Log.error(n,"No valid Consumer configured for Channel ["+t+"]"),!1)},t=camelet.Utils.generateUuid(),e&&(o=e.producer||void 0,r=e.consumer||void 0,n.name=e.name||"No Name Set"),camelet.Log.debug(n,"Channel Created ["+t+"]["+n.name+"]"),n}}(camelet),window.camelet=window.camelet||{},function(e){e.Registry=function(e){var n={};return n.channels=camelet.Map({name:"Channels"}),n.endpoints=camelet.Map({name:"Endpoints"}),n.components=camelet.Map({name:"Components"}),n.consumers=camelet.Map({name:"Consumers"}),n.producers=camelet.Map({name:"Producers"}),n.addChannel=function(e){n.channels.push(e)},n.getChannelById=function(e){return n.channels.items[e]},n.addEndpoint=function(e){n.endpoints.push(e)},n.delEndpoint=function(e){n.endpoints.remove(e)},n.getEndpointById=function(e){return n.endpoints.items[e]},n.getEndpointByName=function(e){for(var t in n.endpoints.items){var o=n.endpoints.items[t];if(o.getName()===e)return o}},n.addComponent=function(e){n.components.push(e)},n.getComponentById=function(e){return n.components.items[e]},n.findComponentByName=function(e){var t=void 0,o=n.components.items;for(var r in o){var i=o[r];if(i.name===e){t=i;break}}return t},n.addConsumer=function(e){n.consumers.push(e)},n.getConsumerById=function(e){return n.consumers.items[e]},n.findConsumerByName=function(e){var t=void 0,o=n.consumers.items;for(var r in o){var i=o[r];if(i.name===e){t=i;break}}return t},n.findConsumerByContext=function(e){var t=void 0,o=n.consumers.items;for(var r in o){var i=o[r];if(i.context===e){t=i;break}}return t},n.findConsumerByScheme=function(e){var t=void 0,o=n.consumers.items;for(var r in o){var i=o[r];if(i.scheme===e){t=i;break}}return t},n.addProducer=function(e){n.producers.push(e)},n.getProducerById=function(e){return n.producers.items[e]},n.findProducerByName=function(e){var t=void 0,o=n.producers.items;for(var r in o){var i=o[r];if(i.name===e){t=i;break}}return t},n.findProducerByContext=function(e){var t=void 0,o=n.producers.items;for(var r in o){var i=o[r];if(i.context===e){t=i;break}}return t},n.findProducerByScheme=function(e){var t=void 0,o=n.producers.items;for(var r in o){var i=o[r];if(i.scheme===e){t=i;break}}return t},n.getStats=function(){return{channels:n.channels,endpoints:n.endpoints,components:n.components,consumers:n.consumers,producers:n.producers}},n}}(camelet),window.camelet=window.camelet||{},function(e){e.Camelet=function(e){var n={};e=e||{};var t=0,o=camelet.Registry(),r=function(e,r){var i=camelet.Endpoint({name:r.name+"<"+e.name,scheme:"basic",context:r.context,options:r.inOptions});o.addEndpoint(i);var a=camelet.Endpoint({name:e.name+">"+r.name,context:e.context,options:e.inOptions,scheme:"basic"});o.addEndpoint(a);var c=n.createChannel({name:"Channel"+t++});i.connectProducer(c),a.connectConsumer(c),e.addProducer(i),r.addConsumer(a)},i=function(e,n){var t=n.name+"<"+e.name;e.delProducer({name:t});var o=e.name+">"+n.name;n.delConsumer({name:o})};return n.createChannel=function(e){e=e||{};var n=camelet.Channel({name:e.name||void 0,consumer:e.consumer||void 0,producer:e.producer||void 0});return o.addChannel(n),n},n.createEndpoint=function(e){e=e||{};var n=camelet.Endpoint({name:e.name||void 0,context:e.context||void 0,options:e.options||void 0,scheme:e.scheme||"internal",listeners:e.listeners||void 0});return o.addEndpoint(n),n},n.createComponent=function(e){e=e||{};var t;return t=e.type?camelet[e.type]():camelet.Component({name:e.name||"component-name-not-set",consumers:e.consumers||[],producers:e.producers||[],camelet:n}),t&&o.addComponent(t),t},n.createConsumer=function(e){e=e||{};var t=camelet.Component({name:e.name||"component-name-not-set",context:e.context||"",scheme:e.scheme||"",consumers:e.consumers||[],producers:e.producers||[],camelet:n});return t&&o.addConsumer(t),t},n.createProducer=function(e){e=e||{};var t=camelet.Component({name:e.name||"component-name-not-set",context:e.context||"",scheme:e.scheme||"",consumers:e.consumers||[],producers:e.producers||[],camelet:n});return t&&o.addProducer(t),t},n.registerConsumer=function(e){camelet.Log.info(this,"Adding Consumer [ "+e.name+" "+e.scheme+" "+e.context+" ]"),e.camelet=n,e.setCamelet(n),o.addConsumer(e)},n.registerProducer=function(e){camelet.Log.info(this,"Adding Producer [ "+e.name+" "+e.scheme+" "+e.context+" ]"),e.camelet=n,e.setCamelet(n),o.addProducer(e)},n.registerComponent=function(e){e.camelet=n,e.setCamelet(n),o.addComponent(e)},n.addRoute=function(e,n,t){var i=o.findConsumerByName(n),a=o.findProducerByName(t);if(i&&a){camelet.Log.info(this,"Adding Duplex Route [ "+n+","+t+" ]");for(var n,t,c=0;c<=e.length;c++)n=0===c?i:e[c-1],t=c===e.length?a:e[c],r(n,t)}},n.wire=function(e,n){var t=o.findConsumerByName(e);t||(t=o.findComponentByName(e));var i=o.findProducerByName(n);i||(i=o.findComponentByName(n)),t&&i&&r(t,i)},n.unwire=function(e,n){var t=o.findConsumerByName(e);t||(t=o.findComponentByName(e));var r=o.findProducerByName(n);r||(r=o.findComponentByName(n)),t&&r&&i(t,r)},n.connectEndpointTo=function(e,n){var t=o.findConsumerByName(n);if(t||(t=o.findProducerByName(n)),t||(t=o.findComponentByName(n)),!t)return!1;r(e,t)},n.connectEndpointFrom=function(e,n){var t=o.findConsumerByName(n);if(t||(t=o.findProducerByName(n)),t||(t=o.findComponentByName(n)),!t)return!1;r(t,e)},n.registerConsumerEndpoint=function(e){var r=o.findConsumerByContext(e.context);if(!r)return!1;camelet.Log.info(this,"Adding Consumer EndPoint [ "+e.name+" "+e.scheme+" "+e.context+" ]"),o.addEndpoint(e);var i=n.createChannel({name:"Channel"+t++}),a=n.createEndpoint({name:"Consumer-"+e.getName(),scheme:e.scheme||"basic",options:e.options});return e.connectProducer(i),a.connectConsumer(i),r.addConsumer(a),!0},n.unregisterConsumerEndpoint=function(e){var n=o.getEndpointByName(e.name);if(!n)return!1;var t=o.findConsumerByContext(n.context);if(!t)return!1;camelet.Log.info(this,"Remove Consumer EndPoint [ "+n.name+" "+n.scheme+" "+n.context+" ]"),o.delEndpoint(n),n.disconnectProducer();var r=o.getEndpointByName("Consumer-"+e.name);return!!r&&(t.delConsumer(r),r.disconnectConsumer(),!0)},n.unregisterProducerEndpoint=function(e){var n=o.getEndpointByName(e.name);if(!n)return!1;var t=o.findProducerByContext(n.context);if(!t)return!1;camelet.Log.info(this,"Remove Producer EndPoint [ "+n.name+" "+n.scheme+" "+n.context+" ]"),o.delEndpoint(n),n.disconnectConsumer();var r=o.getEndpointByName("Producer-"+e.name);return!!r&&(t.delProducer(r),r.disconnectProducer(),!0)},n.registerProducerEndpoint=function(e){var r=o.findProducerByContext(e.context);if(!r)return!1;camelet.Log.info(this,"Adding Producer EndPoint [ "+e.name+" "+e.scheme+" "+e.context+" ]"),o.addEndpoint(e);var i=n.createChannel({name:"Channel"+t++}),a=n.createEndpoint({name:"Producer-"+e.getName(),scheme:e.scheme||"basic",options:e.options});return e.connectConsumer(i),a.connectProducer(i),r.addProducer(a),!0},n.getChannelById=function(e){return o.getChannelById(e)},n.getEndpointById=function(e){return o.getEndpointById(e)},n.getEndpointByName=function(e){return o.getEndpointByName(e)},n.getComponentById=function(e){return o.getComponentById(e)},n.getComponentByName=function(e){return o.findComponentByName(e)},n.getConsumerById=function(e){return o.getConsumerById(e)},n.getStats=function(){return o.getStats()},n.setComponentProperty=function(e,n,t){var r=o.findComponentByName(e);r&&r.setOption(n,t)},n.getComponentProperty=function(e,n,t){var r=void 0,i=o.findComponentByName(e);return i&&(r=i.getOption(n,t)),r},camelet.Log.info(this,"Camelet started."),n}}(camelet),window.camelet=window.camelet||{},function(e){e.Component=function(e){e=e||{};var n=e.child||{},t=void 0,o=[],r=[],i="component";if(n.camelet=void 0,n.inOptions=[],n.outOptions=[],n.options={},n.context=void 0,n.scheme=void 0,n.name=void 0,n.getId=function(){return t},n.getType=function(){return i},n.addConsumer=function(e,t){return e.addListener({name:n.name,fn:n.pulsed,scope:n}),o.push({endpoint:e,scope:t}),!0},n.delConsumer=function(e){for(var t=0;t<o.length;t++){var r=o[t];r.endpoint.name===e.name&&(r.endpoint.delListener({name:n.name}),o.splice(t,1))}return!0},n.getConsumer=function(e){for(var n=void 0,t=0;t<o.length;t++){var r=o[t];if(r.endpoint.getName()===e){n=r.endpoint;break}}return n},n.getConsumers=function(){return o},n.addProducer=function(e,n){return r.push({endpoint:e,scope:n}),!0},n.delProducer=function(e){for(var n=0;n<r.length;n++){r[n].endpoint.name===e.name&&r.splice(n,1)}return!0},n.getProducer=function(e){var n=void 0;-1===e.indexOf("<")&&(e+="<");for(var t=0;t<r.length;t++){var o=r[t];if(o.endpoint.name.indexOf(e)>-1){n=o;break}}return n},n.getProducerById=function(e){var n=void 0;name+="<";for(var t=0;t<r.length;t++){var o=r[t];if(o.endpoint.getId()===e){n=o;break}}return n},n.getProducers=function(){return r},n.process=function(e){return camelet.Log.info(n,"*@* CP:"+t+":"+n.name),e},n.pulse=function(e){camelet.Log.debug(n,"<-- CP:"+t+":"+n.name);for(var o=0;o<r.length;o++){r[o].endpoint.send(e)}},n.pulsed=function(e){camelet.Log.debug(n,"--\x3e CP:"+t+":"+n.name),e.$class&&e.properties.addAuditItem("Processed",t,n.name),e=n.process(e),n.pulse(e)},n.setOption=function(e,t){n.options[e]=t},n.getOption=function(e){var t=n.options[e];return!0===camelet.Typeof.isFunc(t)?t():t},n.setCamelet=function(e){n.camelet=e},t=camelet.Utils.generateUuid(),e&&(n.name=e.name||"component-name-not-set",i=e.type||"component",n.process=e.process||n.process,n.pulse=e.pulse||n.pulse,n.inOptions=e.inOptions,n.outOptions=e.outOptions,n.context=e.context||void 0,n.scheme=e.scheme||void 0,n.camelet=e.camelet||void 0),e.consumers)for(var a=0;a<e.consumers.length;a++){var c=e.consumers[a];n.addConsumer(c,this)}if(e.producers)for(var a=0;a<e.producers.length;a++){var u=e.producers[a];n.addProducer(u,this)}return camelet.Log.debug(this,"Component Created ["+e.name+"]"),n}}(camelet),window.camelet=window.camelet||{},function(e){e.DynamicRouter=function(e){e=e||{},e.type="DynamicRouter";var n=camelet.Component(e),t={};for(var o in n)t[o]=n[o];return t._super=n,t.getCameletInstance=function(){return t._super.camelet},t.onprocess=function(e,n){return n},t.onsend=function(e,n,t){return!0},t._super.process=function(e){return camelet.Log.info(t,"*@* CP:"+t.getId()+":"+t.name),t.onprocess.call(t.scope,t,e),e},t._super.pulse=function(e){camelet.Log.debug(t,"<-- CP:"+t.getId()+":"+t.name);for(var n=e.getMessage(),o=(n.getHeaders(),t.getProducers()),r=0;r<o.length;r++){var i=o[r].endpoint;t.onsend(i,n,e.properties)&&i.send(e)}},e&&(t.routes=e.routes||[],t.onsend=e.onsend||t.onsend,t.onprocess=e.onprocess||t.onprocess,t.scope=e.scope||t),camelet.Log.debug(t,"DynamicRouter Created ["+t.getId()+"]"),t}}(camelet),window.camelet=window.camelet||{},function(e){e.Consumer=function(e){e=e||{},e.type="Consumer";var n=camelet.Component(e);return n.routes=void 0,n.addRoute=function(e,t){var o={pattern:e,component:t};n.routes.push(o)},n._process=function(e){for(var t,o=e.getMessage().getRoutingSlip(),r=e.getMessage(),i=r.getHeaders(),a=n.getProducers(),c=0;c<a.length;c++){var u=a[c].endpoint;if(u.withOptions(i.pulseClass)){t={fromId:n.id,toId:u.getId(),toName:u.name},camelet.Log.info(n,"*@* DC:"+n.getId()+":"+n.name+"~Matched route ["+t.toName+"]"),o.push(t);break}}return e},n.process=function(e){return n._process(e)},n.pulse=function(e){camelet.Log.debug(n,"<-- CP:"+n.getId()+":"+n.name);var t=e.getMessage(),o=(t.getHeaders(),e.getMessage().getRoutingSlip().shift()),r=n.getProducerById(o.toId);r?r.endpoint.send(e):camelet.Log.warning(n,"*@* DC:"+n.getId()+": No ROUTE found for message.")},e&&(n.routes=e.routes||[]),camelet.Log.debug(n,"Consumer Created ["+n.getId()+"]"),n}}(camelet),window.camelet=window.camelet||{},function(e){e.Producer=function(e){e=e||{},e.type="Producer";var n=camelet.Component(e);return n.process=function(e){for(var t,o=e.getMessage().getRoutingSlip(),r=e.getMessage(),i=r.getHeaders(),a=n.getProducers(),c=0;c<a.length;c++){var u=a[c].endpoint;u.withOptions(i.pulseClass)&&(t={fromId:n.id,toId:u.getId(),toName:u.name},camelet.Log.info(n,"*@* DC:"+n.getId()+":"+n.name+"~Matched route ["+t.toName+"]"),o.push(t))}return e},n.pulse=function(e){camelet.Log.debug(n,"<-- CP:"+n.getId()+":"+n.name);for(var t=e.getMessage(),o=(t.getHeaders(),e.getMessage().getRoutingSlip());o.length>0;){var r=o.shift(),i=n.getProducerById(r.toId);i&&i.endpoint.send(e)}},camelet.Log.debug(n,"Producer Created ["+n.getId()+"]"),n}}(camelet),window.camelet=window.camelet||{},function(e){e.Ajax=function(e){var n={};return n.create=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"==typeof ActiveXObject)return null;for(var e=["Msxml2.XMLHttp","Microsoft.XMLHTTP"],n=0;n<e.length;n++)try{return new ActiveXObject(e[n])}catch(e){}return null},n.encode=function(e){if("string"==typeof e)return e;var n=[];for(var t in e)if(e.hasOwnProperty(t)){var o=encodeURIComponent(t)+"="+encodeURIComponent(e[t]);n.push(o)}return n.join("&")},n.query=function(e){var t,o=arguments[1]||{},r=n.create();if(r.open(o.method||"GET",e,!!o.async,o.username,o.password),"function"==typeof o.onload?r.onreadystatechange=function(){4==r.readyState&&(t=o.onload(r))}:"function"==typeof o.onreadystate&&(r.onreadystatechange=function(){t=o.onreadystate(r)}),o.nocache&&(o.headers||(o.headers={}),o.headers["If-Modified-Since"]=new Date(0).toUTCString()),o.content&&(o.headers||(o.headers={}),o.headers["Content-Length"]=o.content.length,o.headers.hasOwnProperty("Content-Type")||(o.headers["Content-Type"]="application/x-www-form-urlencoded")),o.headers)for(var i in o.headers)o.headers.hasOwnProperty(i)&&"string"==typeof o.headers[i]&&r.setRequestHeader(i,o.headers[i]);return r.send(o.content),t},n}()}(camelet),window.camelet=window.camelet||{},function(e){e.Typeof=function(e){var n={};return n.isA=function(e,n){return Object.prototype.toString.apply(e)===n},n.isArray=function(e){return n.isA(e,"[object Array]")},n.isBool=function(e){return n.isA(e,"[object Boolean]")},n.isFunc=function(e){return n.isA(e,"[object Function]")},n.isString=function(e){return n.isA(e,"[object String]")},n.isValid=function(e){return"unknown"!=typeof e},n}()}(camelet),window.camelet=window.camelet||{},function(e){e.Log={_pluginLoggers:[],_level:"NONE",_levelMap:{DEBUG:4,ERROR:3,WARN:2,INFO:1,NONE:0},addPluginLogger:function(e,n){var t={fn:e,scope:n};this._pluginLoggers.push(t)},callPluginLoggers:function(e,n){for(var t=0;t<this._pluginLoggers.length;t++){var o=this._pluginLoggers[t];o.fn.call(o.scope,e,n)}},setLevel:function(e){this._level=e},write:function(e,n){return this._levelMap[this._level]>=this._levelMap[e]&&("undefined"!=typeof console&&console.log("["+e+"]: "+n),this.callPluginLoggers(e,n)),this},debug:function(e,n){return camelet.Log.write("DEBUG",n),this},error:function(e,n){return camelet.Log.write("ERROR",n),this},warning:function(e,n){return camelet.Log.write("WARN",n),this},info:function(e,n){return camelet.Log.write("INFO",n),this}}}(camelet),window.camelet=window.camelet||{},function(e){e.Utils={escape:function(e){var n={"?":"&#63;"};return e.replace(/[&<>"'\/\?]/g,function(e){return n[e]})},unescape:function(e){var n={"&#63;":"?"};return e.replace(/(&#63;)/g,function(e){return n[e]})},generateUuid:function(){var e,n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),t=[];t[8]=t[13]=t[18]=t[23]="-",t[14]="4";for(var o=0;o<36;o++)t[o]||(e=0|16*Math.random(),t[o]=n[19==o?3&e|8:e]);return t.join("")},now:function(e){function normalise(e){return e<10?"0"+e:""+e}var n=e?new Date(e):new Date,t={yyyy:"","-":"-",MM:"","--":"-",dd:"",T:"T",HH:"",":":":",mm:"","::":":",ss:""};t.yyyy=normalise(n.getUTCFullYear()),t.MM=normalise(n.getUTCMonth()+1),t.dd=normalise(n.getUTCDate()),t.HH=normalise(n.getUTCHours()),t.mm=normalise(n.getUTCMinutes()),t.ss=normalise(n.getUTCSeconds());var o="";for(var r in t)o+=t[r];return o}},e.Utils.uuid=e.Utils.generateUuid}(camelet),window.camelet=window.camelet||{},function(e){e.Map=function(e){var n={},t={length:0};return n.name="",n.items={},n.push=function(e){var o=e.getId?e.getId():e.id;return!!o&&(!n.items[o]&&(n.items[o]=e,void t.length++))},n.remove=function(e){var o=e.getId?e.getId():e.id;return!!o&&(delete n.items[o],--t.length)},n.length=function(){return t.length},e&&(n.name=e.name||"Map"),n}}(camelet);