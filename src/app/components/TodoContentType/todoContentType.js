'use strict';

angular.module('TodoContentType', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/todo', { controller: 'controller', templateUrl: 'page.html'});
  }])

  .controller('controller', ['$scope', function ($scope) {

  }]);