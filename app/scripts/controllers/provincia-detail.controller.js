(function(angular){
	'use strict';

angular.module('ControlElectoralApp')
    .controller('ProvinciaDetailCtrl',['$stateParams','$uibModal', 'CantonResource',
        function ($stateParams, $modal, CantonResource) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;

        function loadData(page) {
            CantonResource.query({id_provincia: $stateParams.id, page: page, per_page: ctrl.itemsPerPage}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
            });
        };         


        function _delete(id) {
            CantonResource.get({id: id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            CantonResource.delete({id: id},
                function () {
                    ctrl.loadData(ctrl.pageno);
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {
            ctrl.loadData(ctrl.pageno);          
        };    

        function showModal(selectedCanton) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/canton-dialog.html',
                  controller: 'CantonDialogCtrl as ctrl',
                  size: 'sm',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedCanton;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-dialog',
                                    files: [                                      
                                        'scripts/services/canton.service.js',
                                        'scripts/controllers/canton-dialog.controller.js'                                        
                                    ]
                                }])
                        }]
                  }
                });

                modalInstance.result.then(function(obj) {
                  ctrl.result = obj;
                  ctrl.registros.push(obj);
                });
        };  
        ctrl.refresh = refresh;       
        ctrl.confirmDelete = confirmDelete;
        ctrl.deleteRegistro = _delete;        
        ctrl.loadData = loadData;
        ctrl.showModal = showModal;
        ctrl.refresh();
    }]);
}(window.angular));