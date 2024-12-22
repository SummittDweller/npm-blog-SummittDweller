function checkTweetDate( ) {
  var cards = document.getElementsByClassName('timeline-card');
  if (cards) {
    console.log("cards..." + cards);
    var iframe = document.getElementById("twitter-widget-0");
    if (iframe) {
      console.log("iframe..." + iframe);
      var metadata = iframe.contentWindow.document.getElementsByClassName('timeline-Tweet-metadata')[0];
      if (typeof(metadata) != "undefined") {
        console.log("metadata..." + metadata);
        var target = metadata.getElementsByTagName('time')[0];
        console.log("target..." + target);
        var pubTime = Date.parse(target.getAttribute('datetime'));
        console.log("pubTime..." + pubTime);

        var now = Date.parse(Date());
        console.log("now..." + now);

        var diff = now - pubTime;
        console.log("pubTime diff is: " + diff);

        // check if tweet is more than 1 week (168 hours) old
        if (diff > 168*60*60*1000) {
          alert("Tweet is stale");
          cards[0].style.display = "none";
          cards[1].style.display = "none";
        }
      }
    }
  }
}
