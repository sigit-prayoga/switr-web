(function() {
    'use strict';
    angular.module('switrApp').directive('eachSwit', eachSwit);

    eachSwit.$inject = ['APIService'];

    function eachSwit(APIService) {
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

                $scope.likeSwit = function(switObj){
                    //TODO we'll get the currentId of the user
                    APIService.likeSwit('someId', switObj.switId, function(res){
                        if (res && res.data && res.data.success) {
                            //calling getAlertMessage in upper level control, that's why we use emit
                            $scope.$emit('getAlertMessage', 'thanks for liking it!');
                            //maybe this is NOT the right thing todo
                            switObj.likes.push('someId');
                        }
                    }, function(error){
                        console.log('error: ', error);
                    });
                };
            },
            restrict: 'EA' //'E' for element, 'A' for attribute, 'C' for class
        };
    }
})();