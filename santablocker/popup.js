var blockingEnabledToggle;

document.addEventListener('DOMContentLoaded', function(){
    blockingEnabledToggle = document.getElementById('blocking-enabled-toggle');
    blockingEnabledToggle.addEventListener('change', storeUserPreferences)
})   

function storeUserPreferences(){
    var data = {};

    data[dataKey] = JSON.stringify ({
        blockingEnabled: blockingEnabledToggle.checked
    });

    chrome.storage.sync.set(data, function(){
        chrome.runtime.sendMessage({userPreferencesUpdated: true});
    });
}

loadUserPreferences(function(){
    blockingEnabledToggle.checked = userPreferences.blockingEnabled; 
});