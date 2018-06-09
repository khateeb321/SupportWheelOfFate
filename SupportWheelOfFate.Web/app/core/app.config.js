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

			//.when("/sharedFiles/:referrer", {
			//    templateUrl: "app/views/sharedFiles.html",
			//    controller: "sharedFilesController",
			//    controllerAs: "sharedFile",
			//    caseInsensitiveMatch: true
			//})
			.otherwise({ redirectTo: "/home" });
	}

	function appRun($rootScope,
		$location,
		$interval,
		$filter) {
		$rootScope.pageTitle = "Help Desk Feedbak";
		$rootScope.form = {};
		$rootScope.userApplicationRoles = [];
		$rootScope.currentRoute = "/admin";

		//$rootScope.adminRoleList = ["/results"/*, "/addProject", "/addUser", "/addCategory"*/];

		$rootScope.user = localStorage.getItem("userObj");

		$rootScope.arrayBufferToBase64 = function (buffer) {
			var binary = "";
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			return window.btoa(binary);
		};

		$rootScope.validateAdmin = function () {
			var stateUrl = $location.url();
			if (!localStorage.getItem("userObj"))
				$location.path("/login");
			else {
				var loggedInTimeStamp = localStorage.getItem("loginTimeStamp");
				var currentTimeStamp = new Date();

				var timeDiff = $rootScope.calculateDiffInMins(loggedInTimeStamp, currentTimeStamp);

				if ((JSON.parse(localStorage.getItem("userObj")).Role === 0) && (timeDiff < parseInt(localStorage.getItem("sessionTime")))) {
					$location.path(stateUrl);
				}
				else {
					$location.path("/login");
				}
			}
		};

		$rootScope.validateUser = function () {
			var stateUrl = $location.url();

			if (!localStorage.getItem("userObj")) {
				$location.path("/login");
			}
			else {
				var loggedInTimeStamp = localStorage.getItem("loginTimeStamp");
				var currentTimeStamp = new Date();

				var timeDiff = $rootScope.calculateDiffInMins(loggedInTimeStamp, currentTimeStamp);

				if ((JSON.parse(localStorage.getItem("userObj")).Role === 1) &&
					(timeDiff < parseInt(localStorage.getItem("sessionTime")))) {
					$location.path(stateUrl);
				}
				else {
					$location.path("/login");
				}
			}
		};

		$rootScope.appConfig = {
			toastrOptions: {}
		};
	}
})();