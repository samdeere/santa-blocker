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
    var pageText = nativeSelector().toString();
    var hasChristmasContent = pageText.match(christmasListRegex);
    console.log("christmas content -" + hasChristmasContent);
    if(hasChristmasContent){
        var hasNaughtyListContent = pageText.match(naughtListRegex);
        console.log("naughty list content - " + hasNaughtyListContent);
        if(hasNaughtyListContent){
            console.log("loading child lock");
            showBlocker();
        }
    }
}

function nativeSelector() {
    var elements = document.querySelectorAll("body, body *"); 
    var results = [];
    var child;
    for(var i = 0; i < elements.length; i++) {
        child = elements[i].childNodes[0];
        if(elements[i].hasChildNodes() && child.nodeType == 3) {
            results.push(child.nodeValue);
        }
    }
    return results;
}

function showBlocker(){
    $('body').children().hide();
    $('body').load(chrome.extension.getURL("blocker.html"));
}


    //load html by ajax - need to - http://stackoverflow.com/questions/32269398/load-html-file-from-file-system-with-chrome-extension

    //parallax manager

    //question manager