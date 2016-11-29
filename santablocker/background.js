//this is the background app script

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.userPreferencesUpdated){
        loadUserPreferences();
    }
});