﻿var miposicion = '';
var lat = localStorage.getItem("latitud");
var long = localStorage.getItem("longitud");
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: { lat: lat, lng: long },
    mapTypeId: 'roadmap'
});
function getandsaveGeoLocation() {
    //Call the Cordova Geolocation API
    navigator.geolocation.getCurrentPosition(SGetLocationSuccess, onGetLocationError,
        { enableHighAccuracy: true });
    $('#error-msg').show();
    $('#error-msg').text('Determining your current location ...');
}
function SGetLocationSuccess(position) {
    //Retrieve the location information from the position object AND SAVE ON LOCAL STORAGE
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    localStorage.setItem("latitud", latitude);
    localStorage.setItem("longitud", longitude);
}
function getGeoLocation() {
    //Call the Cordova Geolocation API
    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
        { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    $('#error-msg').show();
    $('#error-msg').text('Determining your current location ...');
}


function onGetLocationSuccess(position) {
    //Retrieve the location information from the position object
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var LatLong = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: LatLong,
        zoom: 13,
        mapTypeId:'roadmap'
    };
    var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 16,
                            center: LatLong,
                            mapTypeId:'roadmap'
                        });

    miposicion = new google.maps.Marker({
              position: LatLong,
              map: map,
              title: 'Minha localização',
              icon: 'img/cmarker.png'
    });
    miposicion.setAnimation(google.maps.Animation.BOUNCE);
    
            $.getJSON("https://gpromo.com.br/getcompanys.php?find=companys&cat=9999", function(json1) {
                $.each(json1, function(key, data) {
                    var latLng = new google.maps.LatLng(data.lat, data.log); 
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: data.nomeemp
                    });
                });
            });
}

function newposition(lat, long) {

    var miposicion = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: map,
        title: 'Minha localização',
        icon: 'img/cmarker.png'
    });
    miposicion.setAnimation(google.maps.Animation.BOUNCE);
}

function watchCurrentPosition() {

    var positionTimer = navigator.geolocation.watchPosition(

        function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            //var NewLatLong = new google.maps.LatLng(latitude, longitude);

            if (latitude != lat) {
                if (longitude != long) {
                    newposition(latitude, longitude);
                }
            }
            

        }, onGetLocationError, { maximumAge: 600000, timeout: 50000, enableHighAccuracy: true });
}


function onGetLocationError(error) {
    $('#map').html('<p class="error"><span class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-inline"></span>Por favor verifique que seu GPS esta ativo ou que você deu permissão ao aplicativo, não podemos localizar sua posicão</p>');
    $("#map").trigger("create");
}