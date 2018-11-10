$(function initMap() {
    var coord = {lat: 54.17865728, lng: 37.59816689};

    var image = {
        url: '/images/marker.png',
        size: new google.maps.Size(32, 46),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 46)
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 54.177216, lng: 37.602301},
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
        styles:
            [
                {"featureType": "administrative","elementType": "all","stylers": [{"saturation": "-100"}]},
                {"featureType": "administrative.province","elementType": "all","stylers": [{"visibility": "off"}]},
                {"featureType": "landscape","elementType": "all","stylers": [{"saturation": -100},{"lightness": 25},{"visibility": "on"}]},
                {"featureType": "poi","elementType": "all","stylers": [{"saturation": -100},{"lightness": "50"},{"visibility": "off"}]},
                {"featureType": "road","elementType": "all","stylers": [{"saturation": "-100"}]},
                {"featureType": "road.highway","elementType": "all","stylers": [{"visibility": "simplified"}]},
                {"featureType": "road.arterial","elementType": "all","stylers": [{"lightness": "30"}]},
                {"featureType": "road.local","elementType": "all","stylers": [{"lightness": "40"}]},
                {"featureType": "transit","elementType": "all","stylers": [{"saturation": -100},{"visibility": "simplified"}]},
                {"featureType": "water","elementType": "geometry","stylers": [{"hue": "#ffff00"},{"lightness": -25},{"saturation": -97}]},
                {"featureType": "water","elementType": "labels","stylers": [{"lightness": -25},{"saturation": -100}]}
            ]
    });
    var marker = new google.maps.Marker({
        position: coord,
        icon: image,
        map: map
    });
});
$(function(){
    $('.header__mobile-btn').click(function(){
        $('body').toggleClass('_open');
        $('.header__mobile-btn').toggleClass('_open');
        $('.header-menu').toggleClass('_open');
        $('.overlay').fadeToggle();
    });
    $('.overlay').click(function(){
        $('body').toggleClass('_open');
        $('.header__mobile-btn').toggleClass('_open');
        $('.header-menu').toggleClass('_open');
        $('.overlay').fadeToggle();
    });
});
