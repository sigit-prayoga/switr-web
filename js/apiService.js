(function(){
	'use strict';
	//load module and create a new service
	angular.module('switrApp').service('APIService', APIService);

	//inject $http service to as dependency
	//$http is an Angular service to handle all http request we need in Angular app
	APIService.$inject = ['$http'];

	function APIService($http){
		this.sendSwit = function(swit, successCallback, errorCallback) {
			console.log('sending swit...', swit);
			//call http post here
			$http({
				method: 'POST',
				data: {
					swit: swit
				},
				headers: {
					'Content-Type': 'application/json'
				},
				url: baseUrl + '/api/swit'
			}).then(function(success) {
				//pass the success response from http to callback function
				successCallback(success);
			}, function(error) {
				//if http error occurs, it goes here and pass it on to error callback
				errorCallback(error);
			});
		};

		this.getSwits = function(successCallback, errorCallback) {
			console.log('getting all swits...');
			//call http get here
			$http({
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				url: baseUrl + '/api/swits'
			}).then(function(success) {
				//pass the success response from http to callback function
				successCallback(success);
			}, function(error) {
				//if http error occurs, it goes here and pass it on to error callback
				errorCallback(error);
			});
		}
	}
})();