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
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            // For unmatched routes
            $urlRouterProvider.otherwise('/');
            // Application routes
            $stateProvider
                .state('app', {
                    abstract: true,
                    views:{
                        'main@':{
                            templateUrl: 'views/common/layout.html'
                        }
                    }
                    
            });

            $ocLazyLoadProvider.config({
                debug: false,
                events: false
            });
    }])
    .run(['$http', '$window','$rootScope', '$state', 
        function ($http, $window, $rootScope, $state) {
            // add JWT token as default auth header
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
           // $rootScope.$state = $state;
           // $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                window.scrollTo(0, 0);
                $rootScope.activeTab = toState.data.activeTab;
            });
            FastClick.attach(document.body);
            $state.go('app.dashboard');
        },
    ]);

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;
            angular.bootstrap(document, ['ControlElectoralApp']);
        });
    });


}(window.angular));



