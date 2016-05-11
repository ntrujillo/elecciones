(function(angular){
    'use strict';

angular.module('ControlElectoralApp').controller('ZonaDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ParroquiaZonaResource',
        function($scope, $stateParams, $modalInstance, entity, ServiceDetailResource) {
        $scope.initData = function(id) {
            ServiceDetailResource.get({id_parroquia:$stateParams.id, id : id}, function(result) {
                $scope.zona = result;
            });
        };
        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:cantonUpdate', result);
            $modalInstance.close(result);
        };
        $scope.save = function () {
            if ($scope.zona._id != null) {
                ServiceDetailResource.update({id_parroquia:$stateParams.id,id:$scope.zona._id}, $scope.zona, onSaveFinished);
            } else {
                ServiceDetailResource.save({id_parroquia:$stateParams.id}, $scope.zona, onSaveFinished);
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