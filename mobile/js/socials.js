var SOCIALS = (function(){
    var cleanit;
    var ready = function(){

        $('#tweetfeed').jTweetsAnywhere({
            username: 'xp2012conf',
            searchParams: 'q=%23XP2012',
            count: 10,
            showTweetFeed: {
                showProfileImages: true,
                showUserScreenNames: true,
                showUserFullNames: true,
                showActionReply: true,
                showActionRetweet: true,
                showActionFavorite: true,
                autorefresh:                  // An object literal representing the configuration options for the
                {                             // autorefresh behaviour.
                    // Since 1.2.0

                    // IMPORTANT: Please always keep in mind, that the use of the Twitter API is rate
                    // limited. Non-authenticated users are rated IP-based and you have only 150
                    // calls per hour available. Every retrieval of tweets counts and so does for
                    // example hovering over a profile image to show the hovercard. jTweetsAnywhere will
                    // always check the remaining count of free API calls before actually calling
                    // Twitter to avoid black listing your visitor's IP.

                    // However - choose your settings wisely to keep your visitors happy. A refresh
                    // interval of 30 seconds on a tweet feed that is updated averaged once per hour
                    // does not make sense and is a total waste of remaining API calls!

                    mode: "auto-insert",             // Accepted values for mode are: "none" | "auto-insert" | "trigger-insert"
                    // "none" (the default value) - disables the autorefresh feature
                    // "auto-insert" - automatically insert the new tweets on top of the tweet feed
                    // "trigger-insert" - if new tweets arrived, show or update a button that displays
                    // the number of new tweets. These new tweets are inserted on top of the tweet
                    // feed, if the user clicks on the button.

                    interval: 60,             // Time in seconds to be waited until the next request for new tweets. Minimum
                    // value is 30, the default value is 60.

                    duration: -1            // Time in seconds for how long the autorefresh will be active. After
                    // this period of time, auto-refreshing will stop. A value of -1 means
                    // autorefresh for ever.
                }
            },
            showTweetBox: {
                label: '<span style="color: #ffffff">Spread the word ...</span>'
            }
        });

        cleanit = setInterval (checkItem, 500 );

    };

    var checkItem = function(){

        if($('.twitter-anywhere-tweet-box').contents().find('#tweet-box').length > 0){

            clearInterval(cleanit);

            var $tArea = $('.twitter-anywhere-tweet-box').contents().find('#tweet-box');
            $tArea.removeAttr('style');

            $tArea.attr('style', 'height: 55px; width: 100%; margin-left: 10px;')

        }

    };

    $(document).ready(ready);

    return{

        ready: ready

    }

}());