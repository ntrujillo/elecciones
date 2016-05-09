(function(angular){
	'use strict';

angular.module('ControlElectoralApp').controller('CantonDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'CantonResource',
        function($scope, $stateParams, $modalInstance, entity, CantonResource) {



        $scope.initData = function(id) {
            CantonResource.get({id_provincia:$stateParams.id, id : id}, function(result) {
                $scope.canton = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:cantonUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.canton.id != null) {
                CantonResource.update({id_provincia:$stateParams.id}, $scope.canton, onSaveFinished);
            } else {
                CantonResource.save({id_provincia:$stateParams.id}, $scope.canton, onSaveFinished);
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