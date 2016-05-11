(function(angular){
    'use strict';

angular.module('ControlElectoralApp')
    .controller('RecintoDetailCtrl',['$stateParams','$uibModal', 'RecintoJuntaResource','RecintoResource',
        function ($stateParams, $modal, ServiceDetailResource, ServiceResource) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;

        function loadData(page) {
            ServiceResource.get({id:$stateParams.id},function(result){
                ctrl.recinto = result;
            });

            ServiceDetailResource.query({id_recinto: $stateParams.id, page: page, per_page: ctrl.itemsPerPage}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
            });
        };         


        function _delete(id) {
            ServiceDetailResource.get({id_recinto: $stateParams.id, id:id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            ServiceDetailResource.delete({id_recinto: $stateParams.id, id: id},
                function () {
                    ctrl.loadData(ctrl.pageno);
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {
            ctrl.loadData(ctrl.pageno);          
        };    

        function showModal(selectedRecinto) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/junta-dialog.html',
                  controller: 'JuntaDialogCtrl as ctrl',
                  size: 'sm',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedRecinto;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'junta-dialog',
                                    files: [                                      
                                        'scripts/services/recinto.junta.service.js',
                                        'scripts/controllers/junta-dialog.controller.js'                                        
                                    ]
                                }])
                        }]
                  }
                });

                modalInstance.result.then(function(obj) {
                  ctrl.result = obj;
                  ctrl.refresh();
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