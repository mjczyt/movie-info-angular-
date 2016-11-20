'use strict';

// Declare app level module which depends on views, and components
angular.module('movie', [
	'ngRoute',
	'movie.services.http'
]).
	config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/:category', {
				templateUrl: 'tabs/view.html',
				controller: 'indexCtrl'
			})

			.otherwise({redirectTo: '/top50'});
	}])

	.controller('indexCtrl', ['$scope', '$window', '$location', '$route', '$routeParams', 'HttpService', function ($scope, $window, $location, $route, $routeParams, HttpService) {

		$scope.activeChange = function (id, title) {
			for (var i = 0; i < $scope.li.length; i++) {
				if ($scope.li[i].id == id) {
					$scope.li[i].active = true;
				} else {
					$scope.li[i].active = false;
				}
			}
			$route.updateParams({category: title});

		};
		$scope.init=function(){
			$route.updateParams({category: 'top50'});
		};
		$scope.li = [{
			id: 0,
			title: 'top50',
			active: true,
			icon: 'icon/top50.svg'
		},
			{
				id: 1,
				title: 'current'
				, active: false,
				icon: 'icon/current.svg'
			},
			{
				id: 2,
				title: 'incoming',
				active: false,
				icon: 'icon/incoming.svg'


			}];

		$scope.scroll = function () {
			var scrollTop = function () {
				var timer = $window.setInterval(function () {
					var currentTop = $window.scrollY;
					var nextOffset = currentTop - (currentTop - 0) / 17;
					$window.scroll(0, nextOffset);
					if (parseInt(currentTop) == 0) {
						$window.clearInterval(timer);

					}
					//console.log(currentTop);
				}, 30)
			};
			scrollTop();
		};
		$scope.submit = function () {
				$route.updateParams({category: 'search',q:$scope.submitText});
		};

		(function(){
			var api = 'https://api.douban.com/v2/movie';
			$scope.subjects = [];
			switch ($routeParams.category) {
				case 'top50' :
					api = api + "/top250";
					break;
				case 'current':
					api = api + '/in_theaters';
					break;
				case 'incoming':
					api = api + '/coming_soon';
					break;
				case 'search':
					api = api + '/search' + "?q=" + $routeParams.q;
					break;
			}
			HttpService.jsonp(api, {}, function (data) {
				$scope.subjects = data.subjects;
				$scope.$apply();
			});
		})()

	}]);

