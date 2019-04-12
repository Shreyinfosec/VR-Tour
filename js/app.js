var nibbl = angular.module('nibbl', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',
    'firebase',
    'summernote',
    'ngMap'
]);

/**
 * Defines constant to the Firebase Database
 */
nibbl.constant('FIREBASE_URL', 'https://project-8f245.firebaseio.com/');
