(function () {
	var app = angular.module("wheelOfFaith");

	app.config(["$httpProvider", "$routeProvider", "$locationProvider", "$provide", appConfig]);
	app.run([
		"$rootScope", "$location", "$interval", "$filter", appRun
	]);

	function appConfig($httpProvider, $routeProvider, $locationProvider, $provide) {
		$provide.decorator('$exceptionHandler', function ($delegate) {

			return function (exception, cause) {
				$delegate(exception, cause);
				console.log(exception);
				console.log(cause);
			};
		});

		$httpProvider.defaults.useXDomain = true;
		//To resolve 2f issue

		$locationProvider.hashPrefix("");
		delete $httpProvider.defaults.headers.common["X-Requested-With"];


		$routeProvider
			.when("/home", {
				templateUrl: "app/views/home.html",
				controller: "homeController"
			})
			.otherwise({ redirectTo: "/home" });
	}

	function appRun($rootScope,
		$location,
		$interval,
		$filter) {
		$rootScope.pageTitle = "Support Wheel Of Faith";
		$rootScope.form = {};
		
		$rootScope.appConfig = {
			toastrOptions: {}
		};
	}
})();