function loadUserPreferences(){
    chrome.storage.sync.get(datakey, function(){
            var userPrefJson = result[dataKey];
            var userPref = {};
            if(userPrefJson === null || userPrefJson === ''){
                userPref = {
                    block: true
                };
            }
            else{
                userPref = JSON.Parse(userPrefJson);
            }
            return userPref;
    });
}