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
    var selector = getSelector();
    var pageText = $(selector).text();
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

function getSelector() {
    var selector;
    if (urlContains('facebook.com')) {
        selector = ".userContentWrapper, #pagelet_trending_tags_and_topics ul > li";
    }
    if (urlContains('twitter.com')) {
        selector = "[data-item-type='tweet'], .trend-item";
    }
    if (urlContains('google')) {
        setupGoogleCheck();
        selector = "a, span, p";
    }
    if (urlContains('reddit.com')) {
        selector = ".sitetable > .thing.link:visible";
    }
    if (urlContains('wikipedia')) {
        selector = "body *:not(:has(*)):visible";
    }
    if (urlContains('youtube.com')) {
        selector = ".yt-lockup, .related-list-item, .comment-renderer-text";
    }
    if (urlContains('buzzfeed.com')) {
        selector = "lede";
    }
    if (urlContains('tumblr.com')) {
        selector = ".post_container, article";
    }
    return selector;
}

function setupGoogleCheck(){
    var checks = 0;
    setTimeout(function(){
        checks++;
        if(!blockerLoaded && checks < 3){
            console.log("google check " + checks);
            initialize();
        }
    },300);
}

function urlContains(site) {
    var url = window.location.href.toLowerCase();
    return url.indexOf(site) > -1;
}

function showBlocker() {
    blockerLoaded = true;
    initialBody = $('body').children();
    initialBody.addClass('santa-blocker-hidden');
    $('.santa-blocker-hidden').addClass('hide');
    $('body').append('<div class="santa-blocker-body"></div>');
    $('body').css("overflow-y", "hidden");
    $('.santa-blocker-body').load(chrome.extension.getURL("blocker.html"), function () {
        setupQuestions();
    });
}