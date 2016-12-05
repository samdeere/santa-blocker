var initialBody;
var blockerLoaded = false;

$(document).ready(function () {
    chrome.runtime.sendMessage({ userPreferencesRequested: true }, function (response) {
        if (response.blockingEnabled) {
            initialize();
            $(document).scroll(onScrollCheck);
        }
    });
})

function onScrollCheck() {
    if (!blockerLoaded) {
        initialize();
    }
}

function initialize() {
    console.log("initialized");
    var pageText = $('body *:not(:has(*)):visible').text();
    var hasChristmasContent = pageText.match(christmasListRegex);
    console.log("christmas content - " + hasChristmasContent);
    if (hasChristmasContent) {
        var hasNaughtyListContent = pageText.match(naughtyListRegex);
        console.log("naughty list content - " + hasNaughtyListContent);
        if (hasNaughtyListContent) {
            console.log("loading child lock");
            showBlocker();
        }
    }
}

//move to jquery library isinviewport
//remove if jquery tests are more effective
function nativeSelector() {
    var elements = document.querySelectorAll("body, body *");
    var results = [];
    var child;
    for (var i = 0; i < elements.length; i++) {
        child = elements[i].childNodes[0];
        if (elements[i].hasChildNodes() && child.nodeType == 3) {
            results.push(child.nodeValue);
        }
    }
    return results;
}

function showBlocker() {
    blockerLoaded = true;
    initialBody = $('body').children();
    initialBody.addClass('santa-blocker-hidden');
    $('.santa-blocker-hidden').addClass('hide');
    $('body').append('<div class="santa-blocker-body"></div>');
    $('.santa-blocker-body').load(chrome.extension.getURL("blocker.html"), function () {
        setupQuestions();
    });
}