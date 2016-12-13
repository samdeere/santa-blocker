function shareOnFacebook() {
    var redirectUrl = "https://www.facebook.com/sharer/sharer.php?u=blitzn.io&title=Blitzn";
    window.open(redirectUrl, "FacebookShare", "location=0,status=0,width=800,height=650");
}

function shareOnTwitter() {
    var tweet = "Blitzn, the chrome extension that keeps the magic of Christmas alive. Install it now at ";
    var url = "http://blitzn.io";
    var twitterUrl = "https://twitter.com/intent/tweet?text="+ encodeURIComponent(tweet + " " + url) + "&related=s0methingsays";
    window.open(twitterUrl, "Tweet", "location=0,status=0,width=800,height=650");
}