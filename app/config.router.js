(function(angular){
'use strict';
    angular
    .module('ControlElectoralApp')
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            FastClick.attach(document.body);
        },
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

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
                    
                })
                .state('app.dashboard', {
                    url: '/home',
                    parent:'app',
                    views:{
                        'content':{
                             templateUrl: 'views/dashboard.html'
                        }
                    },                   
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'styles/themes/default/climacons-font.css',
                                        'styles/themes/default/rickshaw.min.css'
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [
                                        'bower_components/d3/d3.min.js',
                                        'scripts/lib/rickshaw/rickshaw.min.js',
                                        'scripts/lib/flot/jquery.flot.js',
                                        'scripts/lib/flot/jquery.flot.resize.js',
                                        'scripts/lib/flot/jquery.flot.pie.js',
                                        'scripts/lib/flot/jquery.flot.categories.js',
                                    ]
                                },
                                {
                                    name: 'angular-flot',
                                    files: [
                                        'bower_components/angular-flot/angular-flot.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/dashboard.js');
                            });
                        }]
                    },
                    data: {
                        title: 'Dashboard',
                    }
                }).state('app.resultados', {
                    url: '/resultados',
                    parent:'app',
                    views:{
                        'content':{
                            templateUrl: 'views/results-filter.html',
                            controller: 'FiltroCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'angular-factory',
                                    files: [
                                        'scripts/services/filtro-busqueda.client.service.js',
                                        'scripts/services/lista.client.service.js',
                                        'scripts/services/votos.client.service.js',
                                        'scripts/controllers/filtro-busqueda.client.controller.js'
                                    ]
                                }]);
                        }]
                    },
                    data: {
                        title: 'Resultados',
                    }
                }).state('app.registro', {
                    url: '/registro',
                    parent:'app',
                    views:{
                        'content':{
                            templateUrl: 'views/entry.html',
                            controller: 'EntryCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'angular-factory',
                                    files: [
                                        'factory/factory-junta.js',
                                        'factory/factory-genero.js',
                                        'scripts/services/province.client.service.js',
                                        'scripts/services/canton.client.service.js',
                                        'scripts/services/parroquia.client.service.js',
                                        'scripts/services/zona.client.service.js',
                                        'scripts/services/recinto.client.service.js',
                                        'scripts/services/junta.client.service.js',
                                        'scripts/controllers/entry.js'
                                    ]
                                }])
                        }]
                    },
                    data: {
                        title: 'Registro de votos',
                    }
                })                
                // Chart routes
                .state('app.charts', {                   
                    abstract: true,
                    url: '/charts'
                }).state('app.charts.flot', {
                    url: '/flot',
                    views:{
                        'content':{
                            templateUrl: 'views/charts-flot.html'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                                {
                                    serie: true,
                                    files: [
                                        'scripts/lib/flot/jquery.flot.js',
                                        'scripts/lib/flot/jquery.flot.resize.js',
                                        'scripts/lib/flot/jquery.flot.categories.js',
                                        'scripts/lib/flot/jquery.flot.stack.js',
                                        'scripts/lib/flot/jquery.flot.time.js',
                                        'scripts/lib/flot/jquery.flot.pie.js',
                                        'scripts/lib/flot-spline/js/jquery.flot.spline.js',
                                        'scripts/lib/flot.orderbars/js/jquery.flot.orderBars.js'
                                    ]
                                },
                                {
                                    name: 'angular-flot',
                                    files: [
                                        'bower_components/angular-flot/angular-flot.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/flot.js');
                            });
                        }]
                    },
                    data: {
                        title: 'Flot Charts',
                    }
                }).state('app.charts.easypie', {
                    url: '/easypie',
                    templateUrl: 'views/charts-easypie.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'easypiechart',
                                    files: [
                                        'scripts/lib/jquery.easy-pie-chart/dist/angular.easypiechart.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/easychart.js');
                            });
                        }]
                    },
                    data: {
                        title: 'Easypie Charts',
                    }
                }).state('app.charts.chartjs', {
                    url: '/chartjs',
                    templateUrl: 'views/charts-chartjs.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: [
                                        'scripts/lib/chartjs/Chart.js',
                                    ]
                                },
                                {
                                    name: 'angles',
                                    serie: true,
                                    files: [
                                        'scripts/lib/angles/angles.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/chartjs.js');
                            });
                        }]
                    },
                    data: {
                        title: 'Chartjs',
                    }
                }).state('app.charts.rickshaw', {
                    url: '/rickshaw',
                    templateUrl: 'views/charts-rickshaw.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'scripts/lib/rickshaw/rickshaw.min.css'
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [
                                        'bower_components/d3.min.js',
                                        'scripts/lib/rickshaw/rickshaw.min.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/rickshaw.js');
                            });
                        }]
                    },
                    data: {
                        title: 'Rickshaw Charts',
                    }
                }).state('app.charts.nvd3', {
                    url: '/nvd3',
                    templateUrl: 'views/charts-nvd3.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'scripts/lib/nvd3/nv.d3.min.css'
                                    ]
                                },
                                {
                                    name: 'nvd3',
                                    serie: true,
                                    files: [
                                        'bower_components/d3/d3.min.js',
                                        'scripts/lib/nvd3/nv.d3.min.js',
                                        'scripts/lib/angular-nvd3/dist/angular-nvd3.min.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/nvd3.js');
                            });
                        }]
                    },
                    data: {
                        title: 'Nvd3 Charts',
                    }
                }).state('app.charts.c3', {
                    url: '/c3',
                    templateUrl: 'views/charts-c3.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'scripts/lib/c3/c3.min.css'
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [
                                        'bower_components/d3/d3.min.js',
                                        'scripts/lib/c3/c3.min.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/c3.js');
                            });
                        }]
                    },
                    data: {
                        title: 'C3',
                    }
                });
        }
    ]).config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: false
        });
    }]);

}(window.angular));


