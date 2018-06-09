(function () {
	"use strict";
	var modules = [
		"ngRoute",
		"ngSanitize",
		"ui.bootstrap",
		"ui.bootstrap.datetimepicker",
		//"wheelOfFaithConst",
		"ngFileUpload"
	];
	var app = angular.module("wheelOfFaith", modules);
	var defaultToastrOptions = {
		progressBar: false,
		preventDuplicates: true,
		positionClass: "toast-bottom-right",
		timeOut: 3000
	};
	toastr.options = defaultToastrOptions;
}());