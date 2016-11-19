'use strict';

angular.module('movie.top50', ['ngRoute', 'movie.services.http'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/top50', {
			templateUrl: 'top50/top50.html',
			controller: 'top50Ctrl'
		});
	}])


	.controller('top50Ctrl', ['$scope', 'HttpService', function ($scope, HttpService) {
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
		HttpService.jsonp('https://api.douban.com/v2/movie/top250', {start: 0, count: 20}, function (data) {
			$scope.subjects = data.subjects;
			$scope.$apply('subject');

		});
	}]);


