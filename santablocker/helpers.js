var userPreferences = {};

function loadUserPreferences(callback){
    chrome.storage.sync.get(dataKey, function(result){
            var userPrefJson = result[dataKey];
            userPreferences = {};
            if(isEmpty(result)){
                userPreferences = {
                    blockingEnabled: true
                };
            }
            else{
                userPreferences = JSON.parse(userPrefJson);
            }
            if(callback) {
                callback();
            }
    });
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}