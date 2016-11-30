var userPreferences = {
    test: true
}

loadUserPreferences()

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.userPreferencesUpdated){
        loadUserPreferences();
    }

    if(request.userPreferencesRequested){
        loadUserPreferences(sendResponse(userPreferences));
    }
});