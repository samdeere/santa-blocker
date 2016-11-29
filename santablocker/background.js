//this is the background app script

chrome.runtime.onMessaage.addListener(function(request, sender, sendResponse){
    if(request.userPreferencesUpdated){
        loadUserPreferences();
    }
});