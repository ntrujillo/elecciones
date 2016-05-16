(function(angular){
'use strict';

angular.module('ControlElectoralApp')
    .config(['$stateProvider', 
        function ($stateProvider) {       
            // Application routes
            $stateProvider               
                .state('home', {
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
                .state('app.provincia', {
                    parent:'app',
                    url: '/provincia',                    
                    views:{
                        'content':{
                            templateUrl: 'views/provincias.html',
                            controller: 'ProvinciaCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia',
                                    files: [                                      
                                        'scripts/services/provincia.service.js',
                                        'scripts/controllers/provincia.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('provincia');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                })
                .state('app.provincia-detail', {
                    parent:'app',
                    url: '/provincia/{id}/canton',                   
                    views:{
                        'content':{
                            templateUrl: 'views/provincia-detail.html',
                            controller: 'ProvinciaDetailCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-detail',
                                    files: [   
                                      'scripts/services/provincia.service.js',                                    
                                      'scripts/services/provincia.canton.service.js',                                                                            
                                      'scripts/controllers/provincia-detail.controller.js'                                        
                                    ]
                                }])
                        }],
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('canton');
                            return $translate.refresh();
                        }]
                    }, data :{

                    }
                })
                .state('app.canton', {
                    parent:'app',
                    url: '/canton',                    
                    views:{
                        'content':{
                            templateUrl: 'views/cantones.html',
                            controller: 'CantonCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'canton',
                                    files: [                                      
                                        'scripts/services/canton.service.js',
                                        'scripts/controllers/canton.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('canton');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                })
                .state('app.canton-detail', {
                    parent:'app',
                    url: '/canton/{id}/parroquia',                   
                    views:{
                        'content':{
                            templateUrl: 'views/canton-detail.html',
                            controller: 'CantonDetailCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-detail',
                                    files: [   
                                      'scripts/services/canton.service.js',                                    
                                      'scripts/services/canton.parroquia.service.js',                                                                            
                                      'scripts/controllers/canton-detail.controller.js'                                        
                                    ]
                                }])
                        }],
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('parroquia');
                            return $translate.refresh();
                        }]
                    }, data :{

                    }
                }).state('app.parroquia', {
                    parent:'app',
                    url: '/parroquia',                    
                    views:{
                        'content':{
                            templateUrl: 'views/parroquias.html',
                            controller: 'ParroquiaCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'parroquia',
                                    files: [                                      
                                        'scripts/services/parroquia.service.js',
                                        'scripts/controllers/parroquia.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('parroquia');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                }).state('app.parroquia-detail', {
                    parent:'app',
                    url: '/parroquia/{id}/zona',                   
                    views:{
                        'content':{
                            templateUrl: 'views/parroquia-detail.html',
                            controller: 'ParroquiaDetailCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-detail',
                                    files: [   
                                      'scripts/services/parroquia.service.js',                                    
                                      'scripts/services/parroquia.zona.service.js',                                                                            
                                      'scripts/controllers/parroquia-detail.controller.js'                                        
                                    ]
                                }])
                        }],
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('zona');
                            return $translate.refresh();
                        }]
                    }, data :{

                    }
                }).state('app.zona', {
                    parent:'app',
                    url: '/zona',                    
                    views:{
                        'content':{
                            templateUrl: 'views/zonas.html',
                            controller: 'ZonaCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'zona',
                                    files: [                                      
                                        'scripts/services/zona.service.js',
                                        'scripts/controllers/zona.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('zona');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                }).state('app.zona-detail', {
                    parent:'app',
                    url: '/zona/{id}/recinto',                   
                    views:{
                        'content':{
                            templateUrl: 'views/zona-detail.html',
                            controller: 'ZonaDetailCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-detail',
                                    files: [   
                                      'scripts/services/zona.service.js',                                    
                                      'scripts/services/zona.recinto.service.js',                                                                            
                                      'scripts/controllers/zona-detail.controller.js'                                        
                                    ]
                                }])
                        }],
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('recinto');
                            return $translate.refresh();
                        }]
                    }, data :{

                    }
                }).state('app.recinto', {
                    parent:'app',
                    url: '/recinto',                    
                    views:{
                        'content':{
                            templateUrl: 'views/recintos.html',
                            controller: 'RecintoCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'parroquia',
                                    files: [                                      
                                        'scripts/services/recinto.service.js',
                                        'scripts/controllers/recinto.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('recinto');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                }).state('app.recinto-detail', {
                    parent:'app',
                    url: '/recinto/{id}/junta',                   
                    views:{
                        'content':{
                            templateUrl: 'views/recinto-detail.html',
                            controller: 'RecintoDetailCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'recinto-detail',
                                    files: [   
                                      'scripts/services/recinto.service.js',                                    
                                      'scripts/services/recinto.junta.service.js',                                                                            
                                      'scripts/controllers/recinto-detail.controller.js'                                        
                                    ]
                                }])
                        }],
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('junta');
                            return $translate.refresh();
                        }]
                    }, data :{

                    }
                })
                .state('app.role', {
                    parent:'app',
                    url: '/role',                    
                    views:{
                        'content':{
                            templateUrl: 'views/roles.html',
                            controller: 'RoleCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'role',
                                    files: [                                      
                                        'scripts/services/role.service.js',
                                        'scripts/controllers/role.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('role');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                }).state('app.user', {
                    parent:'app',
                    url: '/user',                    
                    views:{
                        'content':{
                            templateUrl: 'views/users.html',
                            controller: 'UserCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'role',
                                    files: [                                      
                                        'scripts/services/user.service.js',
                                        'scripts/controllers/user.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('user');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                }).state('app.menu', {
                    parent:'app',
                    url: '/menu',                    
                    views:{
                        'content':{
                            templateUrl: 'views/menus.html',
                            controller: 'MenuCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'role',
                                    files: [                                      
                                        'scripts/services/menu.service.js',
                                        'scripts/controllers/menu.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('menu');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                });               
    }]);
}(window.angular));