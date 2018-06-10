(function () {
	"use strict";
	angular
		.module("wheelOfFaith")
		.factory("engineersService", ["$http", "$rootScope", engineersService]);
	function engineersService($http, $rootScope) {
		return {
			save: function (engineer) {
				return $http({
					method: "POST",
					url: "Engineers/Save",
					data: { engineer: engineer }
				})
					.then(function (response) {
						return response.data;
					});
			},
			getAllEngineers: function () {
				return $http({
					method: "GET",
					url: "Engineers/GetAll"
				})
					.then(function (response) {
						return response.data;
					});
			}
		};
	}
})();