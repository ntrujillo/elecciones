(function(angular){
    'use strict';

angular.module('ControlElectoralApp').controller('HeaderCtrl',
    ['$rootScope','$scope',  
        function($rootScope, $scope ) {

       $scope.user = $rootScope.user; 
        
        
    }]);
}(window.angular));