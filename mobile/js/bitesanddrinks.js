var BITES_AND_DRINKS = (function(){

    var map,service, locationMarker, center, markersArray, isOffilne;
    var $bites, $drinks, $live, $map;

    var GOOGLE_PLACE = 'https://maps.googleapis.com/maps/api/place/search/json?';
    var DRINKS = ['bar', 'cafe', 'liquor_store'];
    var BITES = ['bar', 'food', 'grocery_or_supermarket', 'meal_takeaway', 'meal_delivery', 'restaurant'];
    var LIVE = ['bar', 'night_club', 'casino'];

    try{

        var LOCATION = {lat:55.56643162996372, long: 12.976398468017578,
                        NE: new google.maps.LatLng(55.58804712719683, 13.086605072021484),
                        SW: new google.maps.LatLng(55.54359022004004, 12.85074234008789)};

    }catch(error){

        isOffilne = true;

    }

    var searchPlaces = function(types, map, location){

        var request = {
            location: location,
            radius: '18000',
            types: types
        };

        service = new google.maps.places.PlacesService(map);
        service.search(request, onSearchResults);

    };

    var onSearchResults = function (results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < results.length; i++) {

                var place = results[i];
                createMarker(results[i]);

            }
        }
    };

    var createMarker = function (place) {

        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({

            map: map,
            position: place.geometry.location

        });

        markersArray.push(marker);

        var infowindow = new google.maps.InfoWindow({content: place.name + '<br>' + place.vicinity});

        google.maps.event.addListener(marker, 'click', function() {

            infowindow.open(map, this);

        });

    };

    var initLocationMarker = function(map){

        locationMarker = new google.maps.Marker({

            position: center,
            map: map,
            title: "Malmö exhibition center",
            icon: 'images/green-dot.png'

        });

    };

    var clearMarkers = function(array){

        for (i in array) {

            array[i].setMap(null);

        }

        array = [];

    };

    var ready = function(){

        if(isOffilne)return;

        $bites = $('#bites');
        $drinks = $('#drinks');
        $live = $('#live');
        $map = $('#mapContainer');

        markersArray = [];

        var greenIcon = new google.maps.MarkerImage("/images/green-dot.png", new google.maps.Size(32,32), new google.maps.Point(0,0), new google.maps.Point(0,35));

        center = new google.maps.LatLng(LOCATION.lat, LOCATION.long, true);

        map = new google.maps.Map($map[0], {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center,
            zoom: 11

        });

        initLocationMarker(map);

        searchPlaces(BITES, map, center);

        $bites.click(function(evt){

            $bites.addClass('current');
            $drinks.removeClass('current');
            $live.removeClass('current');

            clearMarkers(markersArray);
            initLocationMarker(map);
            searchPlaces(BITES, map, center);

        });

        $live.click(function(evt){

            $bites.removeClass('current');
            $drinks.removeClass('current');
            $live.addClass('current');

            clearMarkers(markersArray);
            initLocationMarker(map);
            searchPlaces(LIVE, map, center);

        });

        $drinks.click(function(evt){

            $bites.removeClass('current');
            $drinks.addClass('current');
            $live.removeClass('current');

            clearMarkers(markersArray);
            initLocationMarker(map);
            searchPlaces(DRINKS, map, center);

        });
    };

    $(document).ready(ready);

    return {

        ready: ready

    }

}());