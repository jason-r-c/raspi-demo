/**
 * Run on load
 * Binds to demo-next, demo-prev & demo-reset for click handlers
 * Formulates correct navigation urls and dispatches
 * Polls for changes every second to keep screen in sync
 * AMONIS: 18/10/18
 */
function bind(){
    var API_URL = window.location.origin;
    var STATUS_URL = API_URL + '/api/status';
    var NEXT_URL = API_URL + '/api/next';
    var PREV_URL = API_URL + '/api/prev';
    var RESET_URL = API_URL + '/api/reset';

    // Store the current window pathname
    var currentPage = window.location.pathname;

    // Add NEXT processing
    var btnNext = document.querySelector( ".demo-next" );
    if( btnNext ){
        btnNext.addEventListener('click', function(){
            var url = NEXT_URL + '?pathname=' + currentPage;
            getJson( url ).then( function( json ) {
                checkCurrent( currentPage, json.pathname );
            });
        });
    }

    // Add PREV processing
    var btnPrev = document.querySelector( ".demo-prev" );
    if( btnPrev ){
        btnPrev.addEventListener('click', function(){
            var url = PREV_URL + '?pathname=' + currentPage;
            getJson( url ).then( function( json ) {
                checkCurrent( currentPage, json.pathname );
            });
        });
    }

    // Add RESET processing
    var btnReset = document.querySelector( ".demo-reset" );
    if( btnReset ){
        btnReset.addEventListener('click', function(){
            var url = RESET_URL + '?pathname=' + currentPage;
            getJson( url ).then( function( json ) {
                checkCurrent( currentPage, json.pathname );
            });
        });
    }

    /**
     * Poller runs to query current status
     */
    function poll(){
        var url = STATUS_URL + '?pathname=' + currentPage;
        // console.log( "REQUESTING STATUS" );
        getJson( url ).then( function( json ) {
            checkCurrent( currentPage, json.pathname );
        });
        // Re-poll
        setTimeout( poll, 1000 );
    }

    // Start the page change polling listener
    poll();
}

/**
 * Helper to change to a new Page if it is not currently being displayed
 * @param {} current 
 * @param {*} desired 
 */
function checkCurrent( current, desired ){
    if( current.indexOf( desired) === -1 ){
        //Nope, load the appropriate one.
        window.location = desired;
    } else {
        // console.log( "not navigating" );
    }
}

/**
 * Wrapper to request JSON and resolve when done
 * @param {*} url 
 */
function getJson( url ){
    return new Promise( function( resolve ) {
        // Request the URL with extra param
        fetch( url ).then( function( response ) {
            return response.json();
        }).then( function( json ) {
            resolve( json );
        });
    });
}

window.onload = bind;