//this runs in the page

$(document).ready(function(){

    chrome.runtime.sendMessage({userPreferencesRequested: true}, function(response){
        if(response.blockingEnabled){
            initialize();
        }
    });
})

function initialize(){
    console.log("initialized");
}

    //if on then check for christmas theme
        //if christmas theme then check for bad content

    //load html by ajax - need to - http://stackoverflow.com/questions/32269398/load-html-file-from-file-system-with-chrome-extension

    //parallax manager

    //question manager