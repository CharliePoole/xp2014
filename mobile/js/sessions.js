var SESSIONS = (function(){

    var CONFERENCE_PROGRAM = "http://xp2012.org/program";
    var CONTENT_NODE = 'program-content';

    var $sessionsNav, $pluses;

    var ready = function(){

        $pluses = $('.add');
        $pluses.bind('click', addToFavourites);

        $sessionsNav = $('#day').find('li').click(scrollToDay);

    };

    var scrollToDay = function(evt){

        var clicked = $(this);
        var goto = clicked.attr('id').substr(0, 3) + '-' + clicked.attr('id').substr(3);

        var scrollTarget = $("#" + goto).get(0).offsetTop - 45;

        if(scrollTarget){

            $.mobile.silentScroll(scrollTarget);

        }

    };

    var addToFavourites = function(evt){

        var clicked = $(this);
        var title = clicked.parent().find('h3').html();

        if(itemAllowed(title)){

            if(localStorage.getItem('userSessions')){

                if(title){

                    var obj = JSON.parse(localStorage.getItem('userSessions'));

                    var content = clicked.parent().html();

                    content = content.replace(/\r\n/g, "");
                    obj[title] = content;

                    console.log(title)
                    console.log(typeof (title))

                    localStorage.setItem('userSessions', JSON.stringify(obj));
                    localStorage.setItem('userSessionsRefresh', 'yes');

                }

            }

            clicked.fadeTo(250, .2, onAddedToFavourites);

        }else{

            alert("This session is already part of your schedule!");

        }

    };

    var itemAllowed = function(item){

        var allowed = false;

        if(localStorage.getItem('userSessions')){

            var obj = JSON.parse(localStorage.getItem('userSessions'));

            if(obj[item]){

                allowed = false;

            }else{

                allowed = true;

            }

        }

        return allowed;

    }

    var onAddedToFavourites = function(evt){

        var current = $(this);
        current.unbind();

    };

    var caculateDay = function() {



    };

    $(document).ready(ready);

    return{

        ready: ready

    }

}());