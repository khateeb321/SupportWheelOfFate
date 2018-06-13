(function () {
	"use strict";
	angular
		.module("wheelOfFaith")
		.controller("homeController", home);

	home.$inject = ["$scope", "$window", "$timeout", "$uibModal", "$location", "engineersService", "bauService"];

	function home($scope, $window, $timeout, $uibModal, $location, engineersService, bauService) {
		/* jshint validthis:true */
		$scope.pickedDay = new Date();
		$scope.loading = true;

		$scope.getThisWeekInfo = function () {
			$scope.today = [];
			bauService.getThisWeekData().then(function (weekRes) {
				$scope.thisWeekData = [];
				angular.forEach(weekRes, function (weekItem) {

					engineersService.getById(weekItem.UserId + 1).then(function (r) {
						var userInfo = {};
						userInfo.Name = r.name;
						userInfo.UserId = r.Id;
						userInfo.Rota = weekItem.Rota;

						$scope.thisWeekData.push(userInfo);

						var itemDate = new Date(parseInt(weekItem.Rota.substr(6))).toDateString();

						console.log(itemDate, $scope.pickedDay.toDateString());
						if (itemDate == $scope.pickedDay.toDateString()) {
							// todayyy

							$scope.today.push(userInfo);
						}
					});


				});
			});
		};

		$scope.AppInit = function () {
			$scope.loading = true;
			engineersService.getAllEngineers().then(function (response) {
				var data = [];

				angular.forEach(response, function (item) {
					console.log(item);
					data.push({ "label": item.name, "value": item.Id, "question": "What CSS property is used for specifying the area between the content and its border?" });
				});

				$scope.getThisWeekInfo();
				var previousEng = []; // -1 logic

				bauService.getAllBAUDetails().then(function (res) {
					$scope.loading = false;
					console.log("bar: ", res);
					angular.forEach(res, function (item) {
						previousEng.push(item.UserId);
					});

					var padding = { top: 20, right: 40, bottom: 0, left: 0 },
						w = 500 - padding.left - padding.right,
						h = 500 - padding.top - padding.bottom,
						r = Math.min(w, h) / 2,
						rotation = 0,
						oldrotation = 0,
						picked = 100000,
						oldpick = previousEng,
						color = d3.scale.category20();//category20c()
					//randomNumbers = getRandomNumbers();
					//http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results

					var svg = d3.select('#chart')
						.append("svg")
						.data([data])
						.attr("width", w + padding.left + padding.right)
						.attr("height", h + padding.top + padding.bottom);
					var container = svg.append("g")
						.attr("class", "chartholder")
						.attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
					var vis = container
						.append("g");

					var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
					// declare an arc generator function
					var arc = d3.svg.arc().outerRadius(r);
					// select paths, use arc generator to draw
					var arcs = vis.selectAll("g.slice")
						.data(pie)
						.enter()
						.append("g")
						.attr("class", "slice");

					arcs.append("path")
						.attr("fill", function (d, i) { return color(i); })
						.attr("d", function (d) { return arc(d); });
					// add the text
					arcs.append("text").attr("transform", function (d) {
						d.innerRadius = 0;
						d.outerRadius = r;
						d.angle = (d.startAngle + d.endAngle) / 2;
						return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
					})
						.attr("text-anchor", "end")
						.text(function (d, i) {
							//console.log("x");
							return data[i].label;
						});
					container.on("click", spin);
					angular.forEach(previousEng, function (item) {
						d3.select(".slice:nth-child(" + (item + 1) + ") path")
							.attr("fill", "#111");
					});
					function spin(d) {
						bauService.checkDateInWeek($scope.pickedDay).then(function (checkWeekRes) {
							if (!checkWeekRes) {
								swal(
									'Week Finished!',
									'Come back next week.',
									'error'
								);

								return;
							}

							if ($scope.today.length >= 2) {
								swal(
									'Chosen!',
									'2 Engineers are already chosen for today.',
									'error'
								);

								return;
							}
							container.on("click", null);
							//all slices have been seen, all done
							console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
							if (oldpick.length == data.length) {
								console.log("done");
								$scope.reset();
								container.on("click", null);
								return;
							}
							var ps = 360 / data.length,
								pieslice = Math.round(1440 / data.length),
								rng = Math.floor((Math.random() * 1440) + 360);

							rotation = (Math.round(rng / ps) * ps);

							picked = Math.round(data.length - (rotation % 360) / ps);
							picked = picked >= data.length ? (picked % data.length) : picked;
							if (oldpick.indexOf(picked) !== -1) {
								d3.select(this).call(spin);
								//console.log("y");
								return;
							} else {
								oldpick.push(picked);
								//console.log("y");
							}
							rotation += 90 - Math.round(ps / 2);
							vis.transition()
								.duration(3000)
								.attrTween("transform", rotTween)
								.each("end", function () {

									//populate question
									//d3.select("#question h1")
									//	.text(data[picked].question);
									oldrotation = rotation;
									// Done Here
									swal({
										title: 'Are you sure?',
										text: "You want to pick " + data[picked].label,
										type: 'warning',
										showCancelButton: true,
										confirmButtonColor: '#3085d6',
										cancelButtonColor: '#d33',
										confirmButtonText: 'Yes!'
									}).then(function (result) {
										if (result.value) {
											//oldpick.pop(); if no
											//mark question as seen
											var paramList = [];
											var param = {};

											param.UserId = picked;
											param.Rota = $scope.pickedDay;

											paramList.push(param);
											bauService.save(paramList).then(function () {
												d3.select(".slice:nth-child(" + (picked + 1) + ") path")
													.attr("fill", "#111");
												$scope.getThisWeekInfo();
												swal(
													'Chosen!',
													data[picked].label + ' is chosen.',
													'success'
												);
											});
											console.log("old: ", oldpick);
										}
										else {
											oldpick.pop();
										}
									});

									container.on("click", spin);
								});
							//console.log("d");
						});
					}
					//make arrow
					svg.append("g")
						.attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
						.append("path")
						.attr("d", "M-" + (r * 0.15) + ",0L0," + (r * 0.05) + "L0,-" + (r * 0.05) + "Z")
						.style({ "fill": "black" });
					//draw spin circle
					container.append("circle")
						.attr("cx", 0)
						.attr("cy", 0)
						.attr("r", 60)
						.style({ "fill": "white", "cursor": "pointer" });
					//spin text
					container.append("text")
						.attr("x", 0)
						.attr("y", 15)
						.attr("text-anchor", "middle")
						.text("SPIN")
						.style({ "font-weight": "bold", "font-size": "30px" });


					function rotTween(to) {
						var i = d3.interpolate(oldrotation % 360, rotation);
						return function (t) {
							return "rotate(" + i(t) + ")";
						};
					}


					function getRandomNumbers() {
						var array = new Uint16Array(1000);
						var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
						if (window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function") {
							window.crypto.getRandomValues(array);
							console.log("works");
						} else {
							//no support for crypto, get crappy random numbers
							for (var i = 0; i < 1000; i++) {
								array[i] = Math.floor(Math.random() * 100000) + 1;
							}
						}
						return array;
					}
				});

			});
		};
		$scope.AppInit();

		// Utility Functions

		$scope.reset = function () {
			bauService.reset().then(function (response) {
				$('#chart').remove();
				$('#chartParent').append('<div id="chart"></div>');
				$scope.thisWeekData = [];
				$scope.today = [];
				$scope.pickedDay = new Date();
				$scope.AppInit();
			});
		};

		Date.prototype.addDays = function (days) {
			this.setDate(this.getDate() + parseInt(days));
			return this;
		};

		$scope.addDate = function () {
			$scope.pickedDay.addDays(1);
			$scope.today = [];
			$scope.getThisWeekInfo();
		};
	}
}());