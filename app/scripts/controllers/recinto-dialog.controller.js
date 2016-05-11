(function(angular){
    'use strict';

angular.module('ControlElectoralApp').controller('RecintoDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ZonaRecintoResource',
        function($scope, $stateParams, $modalInstance, entity, ServiceDetailResource) {
        $scope.initData = function(id) {
            ServiceDetailResource.get({id_zona:$stateParams.id, id : id}, function(result) {
                $scope.recinto = result;
            });
        };
        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:recintoUpdate', result);
            $modalInstance.close(result);
        };
        $scope.save = function () {
            if ($scope.recinto._id != null) {
                ServiceDetailResource.update({id_zona:$stateParams.id,id:$scope.recinto._id}, $scope.recinto, onSaveFinished);
            } else {
                ServiceDetailResource.save({id_zona:$stateParams.id}, $scope.recinto, onSaveFinished);
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