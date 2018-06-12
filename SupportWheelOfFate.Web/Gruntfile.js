module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		protractor: {
			options: {
				keepAlive: false
			},
			testTargetConfigFile: {
				configFile: "protractor.conf.js",
				options: {
					webdriverManagerUpdate: true
				}
			}
		},
		jshint: {
			beforeconcat: ["Gruntfile.js", "app/**/*.js"]
		},
		ngconstant: {
			options: {
				space: " ",
				dest: "app/core/app.const.js",
				name: "itChangeRequestConst"
			},
			dev: {
				constants: {
					"CONST_WATGXRESTAPIURL": "http://localhost/watgApi/api",
					//"CONST_WATGXRESTAPIURL": "http://testdev00.teknita.com/watgApi/api",
					"CONST_RESOURCEURL": "http://localhost:8081/",
					//"CONST_RESOURCEURL": "http://testdev00.teknita.com/resources.watg.com/",
					"CONST_LOGSENABLED": true,
					"CONST_W1_STAFF_PROFILE_URL": "http://10.10.1.63/watg1/#teamMemberDetails/"
				}
			},
			tolga: {
				constants: {
					"CONST_WATGXRESTAPIURL": "http://192.168.0.7/watgapi/api",
					"CONST_RESOURCEURL": "http://192.168.0.7:8080",
					"CONST_LOGSENABLED": true,
					"CONST_W1_STAFF_PROFILE_URL": "http://10.10.1.63/watg1/#teamMemberDetails/"
				}
			},
			stage: {
				constants: {
					"CONST_WATGXRESTAPIURL": "http://itstage1.watg.com/watgapi/api",
					"CONST_RESOURCEURL": "http://resources.watg.com",
					"CONST_LOGSENABLED": true,
					"CONST_W1_STAFF_PROFILE_URL": "http://itstage1.watg.com/watg1/#teamMemberDetails/"
				}
			},
			prod: {
				constants: {
					"CONST_WATGXRESTAPIURL": "http://itstage2.watg.com/watgapiMT/api",
					"CONST_RESOURCEURL": "http://resources.watg.com",
					"CONST_LOGSENABLED": true,
					"CONST_W1_STAFF_PROFILE_URL": "http://10.10.1.63/watg1/#teamMemberDetails/"
				}
			}
		},
		concat: {
			app: {
				src: ["app/app.js", "app/**/*.js"],
				dest: "public/js/app.js"
			},
			vendor: {
				src: [
					"bower_components/jquery/jquery.js",
					"bower_components/jquery-ui/jquery-ui.js",
					"bower_components/bootstrap/dist/js/bootstrap.js",
					"bower_components/moment/moment.js",
					"bower_components/toastr/toastr.js",
					"bower_components/angular/angular.js",
					"bower_components/angular-sanitize/angular-sanitize.js",
					"bower_components/angular-route/angular-route.js",
					"bower_components/angular-bootstrap/ui-bootstrap.js",
					"bower_components/angular-animate/angular-animate.js",
					"bower_components/watg-angular-autocomplete/dist/js/watg-angular-autocomplete.js",
					"bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
					"bower_components/angular-file-upload/dist/angular-file-upload.js",
					"bower_components/angularUtils-pagination/dirPagination.js",
					"bower_components/ng-image-gallery/dist/ng-image-gallery.js",
					"bower_components/ng-file-upload/ng-file-upload.js",
					"bower_components/ng-file-upload/ng-file-upload-shim.js",
					"bower_components/ng-file-upload/FileAPI.min.js",
					"bower_components/ng-file-upload/ng-file-upload-all.min.js",
					"bower_components/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js",
					"bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.js",
					"bower_components/sweetalert2/dist/sweetalert2.js"
				],
				dest: "public/js/vendor.js"
			},
			vendorMin: {
				src: [
					"bower_components/jquery/jquery.min.js",
					"bower_components/jquery-ui/jquery-ui.min.js",
					"bower_components/bootstrap/dist/js/bootstrap.min.js",
					"bower_components/moment/min/moment.min.js",
					"bower_components/toastr/toastr.min.js",
					"bower_components/angular/angular.min.js",
					"bower_components/angular-sanitize/angular-sanitize.min.js",
					"bower_components/angular-route/angular-route.min.js",
					"bower_components/angular-bootstrap/ui-bootstrap.min.js",
					"bower_components/angular-animate/angular-animate.min.js",
					"bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
					"bower_components/angular-file-upload/dist/angular-file-upload.min.js",
					"bower_components/angularUtils-pagination/dirPagination.js",
					"bower_components/ng-image-gallery/dist/ng-image-gallery.min.js",
					"bower_components/ng-file-upload/ng-file-upload.min.js",
					"bower_components/ng-file-upload/ng-file-upload-shim.min.js",
					"bower_components/ng-file-upload/FileAPI.min.js",
					"bower_components/ng-file-upload/ng-file-upload-all.min.js",
					"bower_components/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js",
					"bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js",
					"bower_components/sweetalert2/dist/sweetalert2.min.js"
				],
				dest: "public/js/vendor.min.js"
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false
			},
			app: {
				files: {
					'public/js/app.min.js': ["public/js/app.js"]
				}
			}
		},
		concat_css: {
			dev: {
				src: ["Server/Content/app-dev.less", "Server/Content/app-main.less"],
				dest: "Server/Content/compiled/app.less"
			},
			stage: {
				src: ["Server/Content/app-stage.less", "Server/Content/app-main.less"],
				dest: "Server/Content/compiled/app.less"
			},
			prod: {
				src: ["Server/Content/app-prod.less", "Server/Content/app-main.less"],
				dest: "Server/Content/compiled/app.less"
			}
		},
		less: {
			development: {
				options: {
					paths: ["Server/Content"]
				},
				files: {
					"Server/Content/compiled/app-compiled.css": "Server/Content/compiled/app.less"
				}
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			assets: {
				files: {
					'public/css/app.min.css': ["Server/Content/compiled/app-compiled.css"]
				}
			},
			vendor: {
				files: {
					'public/css/vendor.min.css': [
						"bower_components/bootstrap/dist/css/bootstrap.min.css",
						"bower_components/jquery-ui/themes/base/all.css",
						"bower_components/fontawesome/css/font-awesome.min.css",
						"bower_components/toastr/toastr.css",
						"bower_components/footable/css/footable.core.min.css",
						"bower_components/sweetalert2/dist/sweetalert2.css"
					]
				}
			}
		},
		watch: {
			dev: {
				files: ["app.js", "app/**/*.js", "Server/Content/*.less"],
				tasks: ["concat:app", "concat_css:dev", "less", "cssmin:assets"] //'uglify',
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					src: ["bower_components/fontawesome/fonts/*", "bower_components/bootstrap/fonts/*"],
					dest: "public/fonts/",
					filter: "isFile",
					flatten: true
				},
				{
					expand: true,
					src: ["bower_components/footable/css/fonts/*"],
					dest: "public/css/fonts/",
					filter: "isFile",
					flatten: true
				},
				{
					expand: true,
					src: ["server/content/images/*", "bower_components/jquery-ui/themes/base/images/*"],
					dest: "public/css/images/",
					filter: "isFile",
					flatten: true
				}
				]
			}
		}
	});
	grunt.loadNpmTasks("grunt-protractor-runner");
	grunt.loadNpmTasks("grunt-ng-constant");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-concat-css");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.registerTask("dev", [
		"ngconstant:dev", "jshint", "concat", "uglify", "concat_css:dev", "less", "cssmin", "copy", "watch:dev"
	]);
	grunt.registerTask("tolga", [
		"ngconstant:tolga", "jshint", "concat:app", "concat:vendor", "uglify", "concat_css:dev", "less", "cssmin",
		"copy", "watch:dev"
	]);
	grunt.registerTask("stage", [
		"ngconstant:stage", "jshint", "concat", "uglify", "concat_css:stage", "less", "cssmin", "copy"
	]);
	grunt.registerTask("prod", [
		"ngconstant:prod", "jshint", "concat", "uglify", "concat_css:prod", "less", "cssmin", "copy"
	]);
	grunt.registerTask("test", ["jshint", "protractor"]);
};