var mlhApp = angular.module('mlhApp', []);

	// create the controller and inject Angular's $scope
	mlhApp.controller('mainController', function($scope, $http) {
		$scope.events = {};
		$http({method: 'GET', url: '../data.json'}).
		    success(function(data, status, headers, config) {
		      $scope.events = data;
		      console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		      console.log(status);
		});
	});
