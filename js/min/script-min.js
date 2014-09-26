var mlhApp=angular.module("mlhApp",["ngRoute","ngAnimate"]);mlhApp.config(function(e,o){e.when("/",{templateUrl:"views/home.html",controller:"mainController"}).when("/events",{templateUrl:"views/events.html",controller:"eventsController"}).when("/organize",{templateUrl:"views/organize.html",controller:"organizeController"}).when("/about",{templateUrl:"views/about.html",controller:"aboutController"}).when("/faq",{templateUrl:"views/faq.html",controller:"faqController"}).when("/news",{templateUrl:"views/news.html",controller:"newsController"}),o.html5Mode(!0)}),mlhApp.controller("mainController",function(e,o){e.message="The Official High School Hackathon League"}),mlhApp.controller("eventsController",function(e,o){e.message="2014 Season Events"}),mlhApp.controller("aboutController",function(e,o){e.message="About Us"}),mlhApp.controller("organizeController",function(e,o){e.message="Organize An Event"}),mlhApp.controller("newsController",function(e,o){e.message="News"}),mlhApp.controller("faqController",function(e,o){e.message="FAQ"}),mlhApp.controller("indexController",function(e,o){e.events={},o({method:"GET",url:"https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1y5iBt2jEQU3g8b9rxVtLyvfafkpxQ1oNZqKoAaqckAI/export?gid=1214435617&format=csv"}).success(function(o,l,n,t){for(var r=o.split("\n"),s=[],n=r[0].split(","),a=1;a<r.length;a++){for(var m={},c=r[a].split(","),h=0;h<n.length;h++)m[n[h]]=c[h];s.push(m)}e.events=angular.fromJson(s),console.log(e.events)}).error(function(e,o,l,n){console.log(o)})});