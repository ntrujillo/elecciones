(function(angular){
    'use strict';

angular.module('ControlElectoralApp').controller('JuntaDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'RecintoJuntaResource',
        function($scope, $stateParams, $modalInstance, entity, ServiceDetailResource) {
        $scope.initData = function(id) {
            ServiceDetailResource.get({id_recinto:$stateParams.id, id : id}, function(result) {
                $scope.junta = result;
            });
        };
        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:recintoUpdate', result);
            $modalInstance.close(result);
        };
        $scope.save = function () {
            if ($scope.junta._id != null) {
                ServiceDetailResource.update({id_recinto:$stateParams.id,id:$scope.junta._id}, $scope.junta, onSaveFinished);
            } else {
                ServiceDetailResource.save({id_recinto:$stateParams.id}, $scope.junta, onSaveFinished);
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