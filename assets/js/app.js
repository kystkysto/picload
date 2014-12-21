'use strict';
(function(){

	angular.module('picload', ['flow'])
	
	.config(['flowFactoryProvider', function (flowFactoryProvider) {
		flowFactoryProvider.defaults = {
			target: '/photo/upload/',
			testChunks: false,
			permanentErrors:[404, 500, 501]
		};
	}])
	
	.run(['getData','Data', function(getData, Data){
		getData().success(function(data){
			if(data) Data.photos = data;
		});
	}])

	.controller("photosCtrl", ['$scope', 'Data', '$http', function($scope, Data, $http) {
		$scope.$watch(function() {
			return Data.photos
		}, function(newVal, oldVal) {
			$scope.photos = newVal;
		});

		$scope.$on('flow::fileSuccess', function(event, $flow, flowFile, photo) {
			var photo = JSON.parse(photo);
			Data.photos.push(photo);
		});

		$scope.getDimensions = function(id) {
			$http.get("/photos/list/" + id + "/details/").success(function(data){
				if(data) {
					var msg = "<p>height: " + data.height +
  					"</p><p>width: " + data.width + "</p>";
					bootbox.alert(msg,function(){});
				}
			});
		}
	}])

	.factory("getData", ['$http', function($http) {	
		var get = function() {
			return $http.get("/photos/list/")
		};
		
		return function() {
			return get();
		}
	}])

	.value("Data", {
		photos: {}
	});
})();