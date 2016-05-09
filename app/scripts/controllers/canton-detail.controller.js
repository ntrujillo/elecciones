'use strict';

angular.module('ControlElectoralApp')
    .controller('CantonDetailCtrl', function ($scope, $rootScope, $stateParams, entity, CantonResource, ProvinciaResource) {
        $scope.canton = entity;
        $scope.load = function (id) {
            CantonResource.get({id: id}, function(result) {
                $scope.canton = result;
            });
        };
        $rootScope.$on('fimepedApp:cantonUpdate', function(event, result) {
            $scope.canton = result;
        });
    });
