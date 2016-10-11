(function() {
	'use strict';
	angular.module('switrApp').controller('FormController', FormController);

	//inject whatever this controller needs here
	FormController.$inject = ['$scope' ,'$timeout', 'APIService'];

	//define the controller, $scope and APIService will be imported as long as you pass it into $inject
	function FormController($scope, $timeout, APIService) {
		//init socket
		var socket = io.connect(baseUrl);
		//init alert Message
		$scope.alertMessage = '';
		//your swit from the input
		$scope.swit = '';
		//list of swits that fetched from server
		$scope.swits = [];

		//to demo the integration of React 
		$scope.isReact = false;
		//reload when it gets true
		$scope.$watch('isReact', function(newVal, oldVal){
			if (newVal) {
				//refresh the list
				getSwits();
			}
		});

		//register an event to trigger alert message
		$scope.$on('getAlertMessage', function(event, alertMessage){
			console.log('getAlertMessage gets called');
			$scope.alertMessage = alertMessage;
			//setTimeout will not work here, the alertMessage will not update the UI, unless you do it with $apply
			//I'd rather use Angular's $timeout service
			$timeout(function(){
				console.log('reseting alert message');
				//reset after 2 secs
				$scope.alertMessage = '';
			}, 2000);
		});

		//right now, just create a error callback for all, send and get request!
		var errorCallback = function(errorResponse) {
			//do whatever you need when the post request fails
			alert('Sorry, can not do your request now. Try again later.');
		};

		//listen to any incoming swit from socket
		socket.on('incoming swit', function(swit) {
			console.log('incoming swit...', swit);
			addSwit(swit);
			//WTF?! Why?
			$scope.$apply();
		});

		//for the first time, call the get to populate all swits available
		getSwits();

		//onclick action for the button
		$scope.doSwit = function(usingSocket) {
			if (usingSocket) {
				//when user choose to use using socket, it no need the HTTP request on API Service
				//just call the event that we have registered in server using .emit() function.
				socket.emit('new swit', $scope.swit);
				//reset the swit
				$scope.swit = '';
				return;
			}
			var successCallback = function(successResponse) {
				addSwit(successResponse.data.swit);
				$scope.swit = '';
			};
			//send whatever inside the input to server
			APIService.sendSwit($scope.swit, successCallback, errorCallback);
		};

		function getSwits() {
			//same as errorCallback, will be used for general. once you have successfully send the swit, fetch them back.
			var successCallback = function(successResponse) {
				console.log('all swits are received', successResponse);
				//do whatever you need when the post request succeeds 
				//right now i'm going to get the array of the swits
				var swits = successResponse.data.swits;
				//refer this swits to the array we have, but always use copy, 
				//otherwise, the reference to the template is just gone
				angular.copy(swits, $scope.swits);
			};

			//call get request to get the swits and pass the success and error callbacks.
			APIService.getSwits(successCallback, errorCallback);
		}

		function addSwit(swit) {
			$scope.swits.push(swit);
		}
	}
})();