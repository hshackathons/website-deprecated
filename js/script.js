var mlhApp = angular.module('mlhApp', ['ngRoute', 'ngAnimate']);
	
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
			})

			//route for the faq page
			.when('/faq/:param?', {
				templateUrl : 'views/faq.html',
				controller  : 'faqController'
			})

			// route for the news page
			.when('/news', {
				templateUrl : 'views/news.html',
				controller  : 'newsController'
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

	mlhApp.controller('newsController', function($scope, $http) {
		$scope.message = 'News';
		$scope.news = {};
		$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://news.mlh.io/category/major-league-hacking-announcements/feed'}).
		    success(function(feed, status, headers, config) {
		      $scope.news = feed.responseData.feed.entries;
		      console.log($scope.news);
		    }).
		    error(function(data, status, headers, config) {
		      console.log(status);
		      console.log(data);
		      console.log(headers);
		      console.log(config);
		});
	});

	mlhApp.controller('faqController', function($scope, $http, $routeParams) {
		var param = $routeParams.param;
		$scope.s = true;
		$scope.t = false;
		$scope.p = false;
		if (param == "teacher") {
			$scope.t = true;
			$scope.s = false;
		}
		if (param == "parent") {
			$scope.p = true;
			$scope.s = false;
		}
		$scope.message = 'FAQ';
		$scope.student = function() {
			$scope.s = true;
			$scope.t = false;
			$scope.p = false;
		};
		$scope.teacher = function() {
			$scope.t = true;
			$scope.s = false;
			$scope.p = false;
		};
		$scope.parent = function() {
			$scope.p = true;
			$scope.s = false;
			$scope.t = false;
		};
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