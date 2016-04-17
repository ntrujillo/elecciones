(function(angular){
'use strict';
    /*
    * Main module of the application.
    */
angular
    .module('ControlElectoralApp', [
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',     
        'ngSanitize',    
        'ngTouch',
        'ngResource',
        'chart.js',
        'oc.lazyLoad',
        'ngStorage'
    ]).run(function($rootScope, $state){

        $state.go('app.dashboard');

    });

}(window.angular));



