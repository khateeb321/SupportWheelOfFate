(function () {
	"use strict";
	var app = angular.module("wheelOfFaith");

	app.filter("jsonDate", ["$filter", function ($filter) {
		return function (input, format) {
			if (!input || !input.length) { return ""; }
			return new Date(parseInt(input.slice(6, -2)));
		};
	}]);

	app.filter("parseDate", ["$filter", function () {
		return function (input, param) {
			if (input) {
				if (param === "DateTime")
					return new Date(parseInt(input.substr(6))).toLocaleString();
				else
					return new Date(parseInt(input.substr(6))).toLocaleDateString();
			}
		};
	}]);
})();