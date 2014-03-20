var SESSIONS = (function(){

    var CONFERENCE_PROGRAM = "http://xp2012.org/program";
    var CONTENT_NODE = 'program-content';

    var $sessions;

    var ready = function(){

        $sessions = $('.sessions-box');
        return

        if(localStorage.getItem('program')){

            console('asdas')

        }else{

            $.ajax({
                url: CONFERENCE_PROGRAM,
                type: 'GET',
                success: function(res) {

                    var headline = $(res.responseText).find("#" + CONTENT_NODE).text();
                    processData(headline, $sessions);

                },
                error: function(){

                    var msg = "Sorry but there was an error loading the conference program, please try again later...";

                }
            });

        }

    };

    var processData = function(text) {

        var escaped = text;

        var findReplace = [[/&/g, "&amp;"], [/</g, "&lt;"], [/>/g, "&gt;"], [/"/g, "&quot;"], [/@/g, "&lt;"]]

        for(var item in findReplace) {

            escaped = escaped.replace(findReplace[item[0]], findReplace[item[1]]);

        }

        escaped = escaped.replace(/\(/g, '&#40;').replace(/\)/g, '&#41;').replace(/@/g, '&#64;').replace(/\+/g, '&#43;');

        console.log((escaped.split('<div>').length))
        var $days = $(escaped).find('.selectable');
        console.log($days);


    }

    $(document).ready(ready);

    return{

        ready: ready

    }

}());