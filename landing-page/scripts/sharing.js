function shareOnFacebook() {
    var redirectUrl = "https://www.facebook.com/sharer/sharer.php?u=blitzn.io&title=Blitzn";
    window.open(redirectUrl, "FacebookShare", "location=0,status=0,width=800,height=650");
}

function shareOnTwitter() {
    var tweet = "Blitzn by Studio Something";
    var url = "http://blitzn.io";
    var twitterUrl = "https://twitter.com/intent/tweet?text="+ encodeURIComponent(tweet + " " + url) + "&related=s0methingsays";
    window.open(twitterUrl, "Tweet", "location=0,status=0,width=800,height=650");
}