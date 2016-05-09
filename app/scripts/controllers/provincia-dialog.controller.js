(function(angular){
    'use strict';

angular.module('ControlElectoralApp').controller('ProvinciaDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ProvinciaResource',
        function($scope, $stateParams, $modalInstance, entity, ProvinciaResource) {



        $scope.initData = function(id) {
            ProvinciaResource.get({id : id}, function(result) {
                $scope.provincia = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:provinciaUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.provincia.id != null) {
                ProvinciaResource.update($scope.provincia, onSaveFinished);
            } else {
                ProvinciaResource.save($scope.provincia, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };

        if(entity){
            $scope.initData(entity._id);
        }
        
}]);
}(window.angular));