var APP = (function(){

    if(!localStorage.getItem('userSessions')){

        localStorage.setItem('userSessions', JSON.stringify({}));

    }else{

        localStorage.setItem('userSessionsLoaded', 'yes');
        localStorage.setItem('userSessionsRefresh', 'no');


    }

    $("#conferenceMap").live('pageshow', MAPS.ready);
    $("#sessions").live('pageinit', SESSIONS.ready);
    $("#bitesanddrinks").live('pageshow', BITES_AND_DRINKS.ready);
    $("#socials").live('pageshow', SOCIALS.ready);
    $("#myconference").live('pageshow', MY_CONFERENCE.ready);
    $("#settings").live('pageinit', SETTINGS.ready);

    return {



    }

}());