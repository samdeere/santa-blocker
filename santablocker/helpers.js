function loadUserPreferences(callback){
    chrome.storage.sync.get(dataKey, function(result){
            var userPrefJson = result[dataKey];
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}