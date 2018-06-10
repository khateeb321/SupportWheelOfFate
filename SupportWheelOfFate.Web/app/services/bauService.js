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
			getAllBAUDetails: function () {
				return $http({
					method: "GET",
					url: "BAU/GetAll"
				})
					.then(function (response) {
						return response.data;
					});
			}
		};
	}
})();