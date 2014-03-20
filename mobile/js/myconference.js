var MY_CONFERENCE = (function(){

    var $sessions, $minuses;

    var ready = function(){

        $sessions = $('.sessions-box');

        console.log(localStorage.getItem('userSessionsLoaded'))

        if(localStorage.getItem('userSessions') && localStorage.getItem('userSessionsLoaded') == 'yes'){

            var obj = JSON.parse(localStorage.getItem('userSessions'));
            var count = 0;
            var html = [];

            console.log(obj)

            for(var item in obj){

                html.push({title: '<h2>' + item + '</h2>', content: obj[item].replace(/\n\r/,"")});
                count++;

                console.log(item)

            }

            if(count > 0){

                $sessions.find("h2:not('.title-sessions')").fadeOut('slow');

                if( localStorage.getItem('userSessionsRefresh') == 'yes'){

                    var $all = $sessions.find('div[data-role="collapsible"]');
                    $all.hide();

                }

            }

            showItems(html);

            localStorage.setItem('userSessionsLoaded', 'yes');

        }

        var currentPage = event.currentTarget;
        $(currentPage).trigger('create');

        $.mobile.silentScroll(0);

        $minuses = $('.delete');
        $minuses.bind('click', removeFromFavourites);

    };

    var removeFromFavourites = function(evt){

        var clicked = $(this);
        var title = clicked.parent().find('h3').html();

       /* console.log(clicked)
        console.log(clicked.parent())
        console.log(title)
*/

        if(localStorage.getItem('userSessions')){

            var obj = JSON.parse(localStorage.getItem('userSessions'));
           // console.log(obj[title])
            if(obj[title]){

                delete obj[title];
                clicked.parent().parent().fadeOut(250);

                localStorage.setItem('userSessions', JSON.stringify(obj));

            }
            // console.log(JSON.parse(localStorage.getItem('userSessions')));
        }

    };

    var showItems = function(html){

        if(html.length == 0)return;

        var $item =  $('<div data-role="collapsible"></div>');
        $(html.pop()).each(function(evt){

            $item.append(this.title).append(this.content);

        });

        $item.find('a').removeClass('add').addClass('delete').attr('title', 'Remove this').text('Remove from favourites');

        $sessions.append($item);

        showItems(html);

    };

    $(document).ready(ready);

    return {

        ready: ready

    }

}());