(function() {
    'use strict';
    angular.module('switrApp').directive('eachSwit', eachSwit);

    function eachSwit() {
        return {
            templateUrl: 'js/eachSwitDirective/eachSwit.view.html',
            scope: {
                switObj: '=swit' // '=' 2 way binding, '@' one way binding, '&' for binding a function
            },
            controller: function($scope) {
            	//convert to be like '3 minutes ago'
                $scope.getMoment = function(date) {
                	date = new Date(date);
                	//get the hours from current swit
                	var hour = date.getHours();
                	//convert and return
                    return moment(date).fromNow();
                };
            },
            restrict: 'E' //'E' for element, 'A' for attribute, 'C' for class
        };
    }
})();