"use strict";

var testController = angular.module('testModule', []);

testController.controller('testController', ['$scope', '$routeParams', function ($scope, $routeParams) {
  console.log($routeParams);
  $scope.double = function (value) { return value * 2; };
}]);