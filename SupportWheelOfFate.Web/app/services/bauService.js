(function () {
	"use strict";
	angular
		.module("wheelOfFaith")
		.factory("bauService", ["$http", "$rootScope", bauService]);
	function bauService($http, $rootScope) {
		return {
			save: function (bauDetails) {
				return $http({
					method: "POST",
					url: "BAU/Save",
					data: { bauDetails: bauDetails }
				})
					.then(function (response) {
						return response.data;
					});
			},
			reset: function (bauDetails) {
				return $http({
					method: "POST",
					url: "BAU/Reset"
				})
					.then(function (response) {
						return response.data;
					});
			},
			getAllBAUDetails: function () {
				return $http({
					method: "GET",
					url: "BAU/GetAll"
				})
					.then(function (response) {
						return response.data;
					});
			},
			checkDateInWeek: function (date) {
				return $http({
					method: "GET",
					url: "BAU/checkIfInWeek",
					params: {date: date}
				})
					.then(function (response) {
						return response.data;
					});
			},
			getThisWeekData: function () {
				return $http({
					method: "GET",
					url: "BAU/GetThisWeek"
				})
					.then(function (response) {
						return response.data;
					});
			}
		};
	}
})();