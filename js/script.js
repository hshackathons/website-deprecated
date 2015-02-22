$('[data-toggle="tooltip"]').tooltip();

var igniter = angular.module('igniter', ['ngRoute', 'ngAnimate', 'ngSanitize']);
	
	igniter.config(function($routeProvider, $locationProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'indexController'
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

			//route for the partners page
			.when('/partners', {
				templateUrl : 'views/partners.html',
				controller  : 'faqController'
			})

			//route for the chagelog page
			.when('/changelog', {
				templateUrl : 'views/changelog.html',
				controller  : 'faqController'
			})

			//route for the style page
			.when('/style', {
				templateUrl : 'views/style.html',
				controller  : 'faqController'
			})

			// route for the news page
			.when('/news/:param?', {
				templateUrl : 'views/news.html',
				controller  : 'newsController'
			})

			// route for the photos page
			.when('/photos', {
				templateUrl : 'views/photos.html',
				controller  : 'mainController'
			})

			.otherwise({
				templateUrl : 'views/404.html',
				controller  : 'newsController'
			});

			$locationProvider.html5Mode(true)
	});

	// create the controller and inject Angular's $scope
	igniter.controller('mainController', function($scope, $http) {
		$scope.message = 'The Official High School Hackathon League';
	});

	igniter.controller('eventsController', function($scope, $http) {
		$scope.message = '2015 Spring Season';
	});

	igniter.controller('aboutController', function($scope, $http) {
		$scope.message = 'About Us';
	});

	igniter.controller('organizeController', function($scope, $http) {
		$scope.message = 'Organize An Event';
	});

	igniter.controller('newsController', function($scope, $http, $routeParams, $filter) {
		$scope.message = 'News';
		$scope.single = false;
		var param = $routeParams.param;
		$scope.news = [];
		//display only the blog post in the $routeParams
		if (param != null) {
			//var url = param.substring(19, param.length);
			//console.log(url);
			console.log(param);
			$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://news.mlh.io/category/minor-league-hacking/feed'}).
			    success(function(feed, status, headers, config) {
			      var articles = feed.responseData.feed.entries;
			      for (x in articles) {
			      	console.log(articles[x].link.substring(19, articles[x].link.length));
			      	if (articles[x].link.substring(19, articles[x].link.length) == param) {
			      		$scope.news.push(articles[x]);
			      		$scope.showDetails = true;
			      		$scope.single = true;
			      	}
			      }
			      console.log($scope.news);
			    }).
			    error(function(data, status, headers, config) {
			      console.log(status);
			});
		}
		//display all blog posts
		else {
			$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://news.mlh.io/category/minor-league-hacking/feed'}).
			    success(function(feed, status, headers, config) {
			      $scope.news = feed.responseData.feed.entries;
			      console.log($scope.news);
			    }).
			    error(function(data, status, headers, config) {
			      console.log(status);
			});
		}
	});

	igniter.controller('faqController', function($scope, $http, $routeParams) {
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

	igniter.controller('indexController', function($scope, $http) {
		$('[data-typer-targets]').typer();
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

/* Move this to JS file */
$('[data-toggle="tooltip"]').tooltip();