(function(){
	'use strict';
	angular.module('switrApp').directive('eachSwit', eachSwit);

	function eachSwit(){
		return {
			templateUrl: 'js/eachSwitDirective/eachSwit.view.html',
			restrict: 'E'
		};
	}
})();