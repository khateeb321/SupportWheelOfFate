(function () {
	"use strict";
	angular
		.module("wheelOfFaith")
		.controller("homeController", files);

	files.$inject = ["$scope", "$window", "$timeout", "$uibModal", "$location"];

	function files($scope, $window, $timeout, $uibModal, $location) {
		/* jshint validthis:true */
		console.log("controller loaded");
	}
}());