(function(angular){
	'use strict';


angular.module('ControlElectoralApp')
    .controller('ZonaCtrl',['ZonaResource',function (ServiceResource) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;      

        function loadData(page) {
            ServiceResource.query({page: page, per_page: ctrl.itemsPerPage}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
            });
        };     


        function refresh() {           
            loadData(ctrl.pageno);          
        };    
         
        ctrl.refresh = refresh;   
        ctrl.loadData = loadData;          
        ctrl.refresh();
    }]);
}(window.angular));