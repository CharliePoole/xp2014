var MAPS = (function(){

    var MALMO_EXHIBITION = "MalmöMässan <br>Mässgatan 6 <br>215 32 Malmö <br>";

    var map, locationMarker, userMarker, infowindow, directionsDisplay, isOffilne;
    var $map, $route, $bicycle, $walking, $geolocationInfo;

    try{

        var LOCATION = {lat:55.56643162996372, long: 12.976398468017578,
                        NE: new google.maps.LatLng(55.58804712719683, 13.086605072021484),
                        SW: new google.maps.LatLng(55.54359022004004, 12.85074234008789)};
        var OPTIONS = {center: new google.maps.LatLng(LOCATION.lat, LOCATION.long, true),
                       mapTypeId: google.maps.MapTypeId.ROADMAP,
                       zoom: 14};

    }catch(error){

        isOffilne = true;

    }

    var init = function(){

        if(!isOffilne){

            map = new google.maps.Map($map[0], OPTIONS);

            locationMarker = new google.maps.Marker({

                position: OPTIONS.center,
                map: map,
                title: "Malmö exhibition center"

            });

            infowindow = new google.maps.InfoWindow({

                content: MALMO_EXHIBITION

            });

            google.maps.event.addListener(locationMarker, 'click', function() {

                infowindow.open(map,locationMarker);

            });

        }

    };

    var getRoute = function (evt){

        // console.log($geolocationInfo);

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(calculateRoute, onGeolocationError);

        } else {

            $(evt.currentTarget).unbind('click');
            alert("Geolocation not supported in your device...");

            // If location is not supported on this platform, disable it
            // $geolocationInfo.text("Geolocation not supported in your device...");
            // $geolocationInfo.popup('open');

        }

    };

    var calculateCenter = function(markers, map){

        var latlngbounds = new google.maps.LatLngBounds(LOCATION.SW, LOCATION.NE);

        for ( var i = 0; i < markers.length; i++ ){

               if(markers[i].position){

                   latlngbounds.extend( markers[i].getPosition());

               }

        }

        map.fitBounds( latlngbounds );

    };

    var designRoute = function(start, end, target, mode){

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();

        directionsDisplay.setMap(target);

        var request = {
            origin:start,
            destination:end,
            travelMode: mode || google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(result, status) {

            if (status == google.maps.DirectionsStatus.OK) {

                directionsDisplay.setDirections(result);
            }

        });

        return directionsDisplay;

    };

    var changeToBicyle = function(){

        if(directionsDisplay){

            calculateCenter([locationMarker, userMarker], map, google.maps.TravelMode.BICYCLING);

        }else{

            alert('Please get the route before changing the travel mode...');

        }

    };

    var changeToWalking = function(){

        if(directionsDisplay){

            calculateCenter([locationMarker, userMarker], map, google.maps.TravelMode.WALKING);

        }else{

            alert('Please get the route before changing the travel mode...');

        }

    };

    var calculateRoute = function(position){

        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        userMarker = new google.maps.Marker({

            position: pos,
            map: map,
            title: "Your location"

        });

        var infowindow = new google.maps.InfoWindow({

            content: "<b>Your location:</b> <br> lat: " + position.coords.latitude + "<br> long: " + position.coords.longitude + "<br> accuracy " + position.coords.accuracy

        });

        calculateCenter([locationMarker, userMarker], map);
        directionsDisplay = designRoute(userMarker.getPosition(), locationMarker.getPosition(), map);

        google.maps.event.addListener(userMarker, 'click', function() {

            infowindow.open(map, userMarker);

        });

    };

    var onGeolocationError = function(){

        var errors = {
            1: 'Permission denied',
            2: 'Position unavailable',
            3: 'Request timeout'
        };

        alert("Something went wrong trying to calculate your route to the venue, the app get the following error: " + errors[error.code]);

    };

    var ready = function(){

        $map = $("#mapContainer");
        $route = $("#route");
        $bicycle = $("#bicycle");
        $walking = $("#add");
        $geolocationInfo = $("#geolocationInfo");

        init();

        $route.click(getRoute);
        $bicycle.click(changeToBicyle);
        $walking.click(changeToWalking);

    };

    $(document).ready(ready);

    return{

        ready: ready

    }

}());