var mlhApp = angular.module('mlhApp', []);

	// create the controller and inject Angular's $scope
	mlhApp.controller('mainController', function($scope, $http) {
		$scope.events = {};
		$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1y5iBt2jEQU3g8b9rxVtLyvfafkpxQ1oNZqKoAaqckAI/export?gid=1214435617&format=csv'}).
		    success(function(csv, status, headers, config) {
		      var lines=csv.split("\n");
 			  var result = [];
              var headers=lines[0].split(",");
 			  for(var i=1;i<lines.length;i++){
 				  var obj = {};
				  var currentline=lines[i].split(",");
			 
				  for(var j=0;j<headers.length;j++){
					  obj[headers[j]] = currentline[j];
				  }
			 
				  result.push(obj);
			  }
  			  $scope.events = angular.fromJson(result); //JSON
  			  console.log($scope.events);
		    }).
		    error(function(data, status, headers, config) {
		      console.log(status);
		});
	});