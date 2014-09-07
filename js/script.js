var mlhApp = angular.module('mlhApp', ['ngRoute']);
	
	mlhApp.config(function($routeProvider, $locationProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'mainController'
			})

			.when('/events', {
				templateUrl : 'views/events.html',
				controller  : 'eventsController'
			})

			.when('/organize', {
				templateUrl : 'views/organize.html',
				controller  : 'organizeController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'views/about.html',
				controller  : 'aboutController'
			});

			$locationProvider.html5Mode(true)
	});

	// create the controller and inject Angular's $scope
	mlhApp.controller('mainController', function($scope, $http) {
		$scope.message = 'The Official High School Hackathon League';
	});

	mlhApp.controller('eventsController', function($scope, $http) {
		$scope.message = '2014 Season Events';
	});

	mlhApp.controller('aboutController', function($scope, $http) {
		$scope.message = 'About Us';
	});

	mlhApp.controller('organizeController', function($scope, $http) {
		$scope.message = 'Organize An Event';
	});

	mlhApp.controller('indexController', function($scope, $http) {
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