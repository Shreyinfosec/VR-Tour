var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


var prefix = 'orientation' in screen ? '' :
    'mozOrientation' in screen ? 'moz' :
        'msOrientation' in screen ? 'ms' :
            null;

if (prefix === null) {
    document.getElementById('so-unsupported').classList.remove('hidden');

    ['lock-button', 'unlock-button'].forEach(function(elementId) {
        document.getElementById(elementId).setAttribute('disabled', 'disabled');
    });
} else {
    var form = document.getElementById('form-orientation');
    var select = document.getElementById('orientation-type');

    // Function needed to see lock in action
    function launchFullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function exitFullscreen() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    function orientationHandler() {
        var orientationProperty = prefix + (prefix === '' ? 'o' : 'O') + 'rientation';
        document.getElementById('orientation').textContent = screen[orientationProperty];
    }

    window.addEventListener(prefix + 'orientationchange', orientationHandler);
    document.getElementById('lock-button').addEventListener('click', function(event) {
        event.preventDefault();
        launchFullscreen(document.documentElement);

        setTimeout(function() {
            screen[prefix + (prefix === '' ? 'l' : 'L') + 'ockOrientation'](select.value);
        }, 1);
    });
    document.getElementById('unlock-button').addEventListener('click', function() {
        exitFullscreen();
        screen[prefix + (prefix === '' ? 'u' : 'U') + 'nlockOrientation']();
    });

    orientationHandler();
}

function initPano() {

    var panorama;
    var panorama2;
    var googleplex = {lat: 30.770595, lng: 76.57460};

    // Set up the map
    var map = new google.maps.Map(document.getElementById('map1'), {
        center: googleplex,
        zoom: 18,
        streetViewControl: false
    });
    var map2 = new google.maps.Map(document.getElementById('map2'), {
        center: googleplex,
        zoom: 18,
        streetViewControl: false
    });

    panorama = map.getStreetView();
    panorama.setVisible(true);
    panorama2 = map2.getStreetView();
    panorama2.setVisible(true);


    calculateRoute("30.770595, 76.57460", "NH-95, Ludhiana - Chandigarh State Hwy, Punjab 140413", []);


    function createStreetView(map) {
        // var panorama = new google.maps.StreetViewPanorama(
        //     document.getElementById(mapId), {
        //         position: {lat: 30.770595 , lng: 76.57460},
        //         addressControlOptions: {
        //           position: google.maps.ControlPosition.BOTTOM_CENTER
        //         },
        //         linksControl: false,
        //         panControl: false,
        //         enableCloseButton: false,
        //         pov: {
        //           heading: 200,
        //           pitch: 0
        //         }
        //     });
        var panorama = map.getStreetView();
        return panorama;
    }



    // Set up the markers on the map
    var googleMarker = new google.maps.Marker({
        position: googleplex,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'https://i.postimg.cc/v8LCr47Y/chandigarh-university.png',
        title: 'Chandigarh university'
    });
    var googleMarker = new google.maps.Marker({
        position: googleplex,
        animation: google.maps.Animation.BOUNCE,
        map: map2,
        icon: 'https://i.postimg.cc/v8LCr47Y/chandigarh-university.png',
        title: 'Chandigarh university'
    });
    alert(JSON.stringify(googleMarker) + " " + JSON.stringify(map));

    var gardenMarker = new google.maps.Marker({
        position: {lat: 30.7524071, lng: 76.8006932},
        animation: google.maps.Animation.BOUNCE,
        icon: 'https://i.postimg.cc/15vTdbYb/rock-garden.png',
        title: 'Rock Garden'
    });

    var towerMarker = new google.maps.Marker({
        position: {lat: 15.3350132, lng: 76.4578353},
        map: map,
        animation: google.maps.Animation.BOUNCE,
        icon: 'https://i.postimg.cc/Qx8w0jSp/hampi-temple.png',
        title: 'Hampi Temple'
    });

    var churchMarker = new google.maps.Marker({
        position: {lat: 19.9427145, lng: 75.210962},
        map: map,
        animation: google.maps.Animation.BOUNCE,
        icon: 'https://i.postimg.cc/W1tKcSBz/dev-giri-temple.png',
        title: 'Devgiri Fort'
    });

    var artsMarker = new google.maps.Marker({
        position: {lat: 15.4008674, lng: 73.8981735},
        map: map,
        animation: google.maps.Animation.BOUNCE,
        icon: 'https://i.postimg.cc/JzgFrZ8q/shanta-durga-temple.png',
        title: 'Shanta Durga Temple'
    });

    googleMarker.setMap(map);

    function addListeners(panorama, panorama2) {

        panorama.addListener('position_changed', function() {

            var position = {
                lat: panorama.position.lat(),
                lng: panorama.position.lng()
            };

            panorama2.setPosition(position);

            console.log( panorama2.position.lat() + " " +  panorama2.position.lng() );

        });

//        panorama.addListener('pov_changed', function() {
//
//            var pov = {
//                heading: panorama.pov.heading + calculateHeadingOffset(panorama.pov.heading) ,
//                pitch: panorama.pov.pitch //+ panorama.pov.pitch*0.04
//            };
//
//            panorama2.setPov(pov);
//
//            console.log( panorama2.pov.heading + " " +  panorama2.pov.pitch );
//
//        });

    }

    function changePov(panorama, heading, pitch) {
        var pov = {
            heading: heading,
            pitch: pitch //+ panorama.pov.pitch*0.04
        };

        panorama.setPov(pov);

        console.log( panorama.pov.heading + " " +  panorama.pov.pitch );
    }

    function calculateHeadingOffset(heading) {
        var addOn;
        var offset = 0.04;
        console.log(heading);
        if (heading >= 0) {
            addOn = -heading * offset;
        } else {
            addOn = +heading * offset;
        }
        return addOn;
    }

    function calculateRoute(origin, destination, waypoints) {

        var directionsService = new google.maps.DirectionsService;
//        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsService.route({
            origin: origin,//document.getElementById('start').value,
            destination: destination,//document.getElementById('end').value,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: waypoints
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {

                // panorama = createStreetView(map);
                // panorama2 = createStreetView(map);

                if (window.DeviceOrientationEvent) {
                    window.addEventListener("deviceorientation", function (event) {
                        //tilt([event.beta, event.gamma]); //alpha z axis, beta x axis, gamma y axis
                        console.log(event.alpha + " " + event.beta);

                        var pitch = -event.gamma + (event.gamma < 0 ? -90 : 90);//-(event.gamma/2) ;

                        var heading = event.alpha*(event.gamma < 0 ? -1 : 1) + (event.gamma < 0 ? -90 : 90);

                        if (pitch > 0 && event.gamma > 180)
                            var heading = -event.alpha - 270;

                        if (pitch > 0 && event.gamma <= 180)
                            var heading = -event.alpha + 90;

                        var neg = (isSafari ? -1 : 1);

                        changePov(panorama, heading, pitch);
                        changePov(panorama2, heading + calculateHeadingOffset(heading), pitch);

                        console.log("Device orientation supported");
                    }, true);
                } else {

                    console.log("Device orientation not supported");
                }

                addListeners(panorama, panorama2);

                //        console.log(JSON.stringify(response.routes[0].legs[0].steps[0].path[0].lat()))
                var steps = response.routes[0].legs[0].steps;
                for (var j = 0; j < steps.length; j++){

                    //Path array can be taken from firebase object.
                    var paths = steps[j].path;
                    console.log(paths.length);

                    var wait = 3000;
                    for (var i=0; i<paths.length; i++) {

                        console.log(JSON.stringify(paths[i]));
                        move(paths[i], i*wait);

                    }
                }
            } else {
                window.alert('Directions request failed due to ' + status);
            }

        });
    }

    function move(path, timeout) {
        setTimeout(function() {
            console.log("New location: " + path + " " + path );

            var position = {
                lat: path.lat(),
                lng: path.lng()
            };

            panorama.setPosition(position);
            panorama2.setPosition(position);

//                var pov = {
//                    heading: panorama.pov.heading + calculateHeadingOffset(panorama.pov.heading) ,
//                    pitch: panorama.pov.pitch //+ panorama.pov.pitch*0.04
//                };
//
//                panorama2.setPov(pov);
        }, timeout);

    }

}
