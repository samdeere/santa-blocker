var userPreferences = {};

function loadUserPreferences(callback){
    chrome.storage.sync.get(datakey, function(){
            var userPrefJson = result[dataKey];
            userPreferences = {};
            if(userPrefJson === null || userPrefJson === ''){
                userPreferences = {
                    blockingEnabled: true
                };
            }
            else{
                userPreferences = JSON.Parse(userPrefJson);
            }
            if(callback) {
                callback();
            }
    });
}