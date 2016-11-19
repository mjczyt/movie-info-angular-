'use strict';

angular.module('movie.current', ['ngRoute','movie.services.http'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/current', {
			templateUrl: 'current/current.html',
			controller: 'currentCtrl'
		});
	}])

	.controller('currentCtrl', ['$scope','HttpService',function($scope,HttpService) {
		$scope.subjects = [];
		for(var i=0;i<20;i++){
			$scope.subjects={
				id:i,
				title:"",
				imgUrl:'',
				directors:[],
				genres:[],
				casts:[]
			}
		}

		$scope.subjects = [];
		HttpService.jsonp('https://api.douban.com/v2/movie/in_theaters', {start: 0, count: 20}, function (data) {
			$scope.subjects = data.subjects;
			$scope.$apply('subject');

		});
	}]);
