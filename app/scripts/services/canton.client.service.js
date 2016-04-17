(function (angular) {
    'use strict';
    angular.module('ControlElectoralApp').factory('Canton', ['$resource', function ($resource) {
        return $resource('/api/canton/:codeProvince', {query: {method: "GET", isArray: true}});
    }]);

}(window.angular));