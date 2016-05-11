(function(angular){
    'use strict';

angular.module('ControlElectoralApp')
    .controller('ZonaDetailCtrl',['$stateParams','$uibModal', 'ZonaRecintoResource','ZonaResource',
        function ($stateParams, $modal, ServiceDetailResource, ServiceResource) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;

        function loadData(page) {
            ServiceResource.get({id:$stateParams.id},function(result){
                ctrl.zona = result;
            });

            ServiceDetailResource.query({id_zona: $stateParams.id, page: page, per_page: ctrl.itemsPerPage}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
            });
        };         


        function _delete(id) {
            ServiceDetailResource.get({id_zona: $stateParams.id, id:id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            ServiceDetailResource.delete({id_zona: $stateParams.id, id: id},
                function () {
                    ctrl.loadData(ctrl.pageno);
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {
            ctrl.loadData(ctrl.pageno);          
        };    

        function showModal(selectedZona) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/recinto-dialog.html',
                  controller: 'RecintoDialogCtrl as ctrl',
                  size: 'sm',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedZona;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'recinto-dialog',
                                    files: [                                      
                                        'scripts/services/zona.recinto.service.js',
                                        'scripts/controllers/recinto-dialog.controller.js'                                        
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