(function () {
	"use strict";
	angular
		.module("wheelOfFaith")
		.controller("homeController", files);

	files.$inject = ["$scope", "$window", "$timeout", "$uibModal", "$location", "engineersService"];

	function files($scope, $window, $timeout, $uibModal, $location, engineersService) {
		/* jshint validthis:true */

		engineersService.getAllEngineers().then(function (response) {
			console.log(response);
		});
		console.log("controller loaded");
	}
}());