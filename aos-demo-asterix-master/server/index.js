/*

*/
const express = require('express');
const bodyParser = require('body-parser');

const Switches = require('./switches.js');

const WWW_PATH =  `${process.cwd()}/clients`;
const PORT = process.env.PORT || 8000;

// Define the page flows
const FLOWS = {
    "demo1": [ "page1.html", "page2.html", "page3.html", "page4.html", "page5.html", "page6.html", "page7.html", "page8.html", "page9.html", "page10.html", "page11.html" ],
    "demo2": [ "page1.html", "page2.html", "page3.html", "page4.html", "page5.html", "page6.html" ],
    "demo3": [ "page1.html", "page2.html", "page3.html", "page4.html", "page5.html", "page6.html", "page7.html" ],
    "demo4": [ "page1.html" ]
}

let status = {
    "demo1": { page:0, pathname:FLOWS["demo1"][0] },
    "demo2": { page:0, pathname:FLOWS["demo2"][0] },
    "demo3": { page:0, pathname:FLOWS["demo3"][0] },
    "demo4": { page:0, pathname:FLOWS["demo4"][0] }
};

/**
 * updated value either 1 or -1
 * @param {*} val
 */
function setPage( val, pathname ){
    // Epxect request to be in the form of /api/status?pathname=/demo1/phone/page1.html
    let paths = pathname.split('/');
    // The demo ( should be item 1 in base array )
    let demo = paths[1];
    let demoStatus = status[demo];
    let demoFlows = FLOWS[demo];

    // Update the page index
    demoStatus.page += val;

    // Check for out of bounds ( and limit where appropriate )
    if( demoStatus.page < 0 ){
        demoStatus.page = 0;
    } else if ( demoStatus.page > ( demoFlows.length - 1 ) ){
        demoStatus.page = ( demoFlows.length - 1 );
    }
    // Set the pathname to display
    demoStatus.pathname = demoFlows[demoStatus.page];
}

/**
 * Gets the appropriate status for the specified pathname
 * @param {*} pathname
 */
function getStatusByPathname(pathname){
    // Epxect request to be in the form of /api/status?pathname=/demo1/phone/page1.html
    let paths = pathname.split('/');
    // The demo ( should be item 1 in base array )
    let demo = paths[1];
    // Get the STATUS for demo path
    return status[demo];
}

// Initialise Express
var app = express();

// Attache bodyParser Middleware
app.use(bodyParser.json());

// Setup Default static routing for www
app.use(express.static(WWW_PATH));

// Setup Default routing for no file specified
app.get('/', (request,response) => { response.sendFile( `${WWW_PATH}/index.html`); } );

// Create Custom API Handlers
app.get('/api/next', function(request, response) {
    // Increment the counter
    setPage( 1, request.query['pathname'] );
    // Get the appropriate Demo
    let demoStatus = getStatusByPathname( request.query['pathname'] );
    // console.log( `move to next page:${status.page}`);
    response.setHeader('Content-Type', 'application/json');
    response.send( JSON.stringify( demoStatus ) );
});

// Create Custom API Handlers
app.get('/api/prev', function(request, response) {
    // Decrement the counter
    setPage( -1, request.query['pathname'] );
    // Get the appropriate Demo
    let demoStatus = getStatusByPathname( request.query['pathname'] );
    // console.log( `move to prev page:${status.page}`);
    response.setHeader('Content-Type', 'application/json');
    response.send( JSON.stringify( demoStatus ) );
});

// Create Custom API Handlers
app.get('/api/reset', function(request, response) {
    // Should set it back to 0
    setPage( -100, request.query['pathname'] );
    // Get the appropriate Demo
    let demoStatus = getStatusByPathname( request.query['pathname'] );
    // console.log( `move to prev page:${status.page}`);
    response.setHeader('Content-Type', 'application/json');
    response.send( JSON.stringify( demoStatus ) );
});

// Create Custom API Handlers
app.get('/api/status', function(request, response) {
    // Get the appropriate Demo
    let demoStatus = getStatusByPathname( request.query['pathname'] );
    // Return a JSON collection of all pre-registered users
    response.setHeader('Content-Type', 'application/json');
    response.send( JSON.stringify( demoStatus ) );
});

// listen for requests :)
app.listen( PORT, () => {
    console.log(`Serving ${WWW_PATH}`);
    console.log(`Server listening on ${PORT}`);
});
