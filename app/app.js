'use strict';

// Declare app level module which depends on views, and components
angular.module('movie', [
	'ngRoute',
	'movie.top50',
	'movie.current',
	'movie.incoming'
]).
	config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.otherwise({redirectTo: '/top50'});
	}])

	.controller('indexCtrl', ['$scope', '$window', function ($scope, $window) {

		$scope.activeChange = function (id) {
			for (var i = 0; i < $scope.li.length; i++) {
				if ($scope.li[i].id == id) {
					$scope.li[i].active = true;
				} else {
					$scope.li[i].active = false;
				}
			}
		};
		$scope.li = [{
			id: 0,
			title: 'top50',
			active: true
		},
			{
				id: 1,
				title: 'current'
				, active: false
			},
			{
				id: 2,
				title: 'incoming',
				active: false

			}];

		$scope.scroll = function () {
			var scrollTop = function () {
			var timer=	$window.setInterval(function () {
					var currentTop = $window.scrollY;
					var nextOffset =currentTop- (currentTop-0)/17;
					$window.scroll(0,nextOffset);
					if(parseInt(currentTop)==0){
						$window.clearInterval(timer);

					}
				//console.log(currentTop);
				}, 30)
			};
			scrollTop();
		}
	}]);

