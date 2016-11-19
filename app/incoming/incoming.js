'use strict';

angular.module('movie.incoming', ['ngRoute','movie.services.http'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/incoming', {
			templateUrl: 'incoming/incoming.html',
			controller: 'incomingCtrl'
		});
	}])

	.controller('incomingCtrl', ['$scope','HttpService',function($scope,HttpService) {
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
		HttpService.jsonp('https://api.douban.com/v2/movie/coming_soon', {start: 0, count: 20}, function (data) {
			$scope.subjects = data.subjects;
			$scope.$apply('subject');

		});
	}]);

