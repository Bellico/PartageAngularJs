'use strict';

angular.module('partageApp', [
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'partageHome',
  'TextContentType'
])

  .constant('SERVER_API', "http://localhost:10596/")

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', { controller: 'HomeController', templateUrl: 'app/components/home/home.html' })
      .when('/error', { templateUrl: 'app/components/home/error.html'})
      //.when('/:type', { controller: 'TextController', templateUrl: 'app/components/home/home.html' })
      .otherwise({ redirectTo : '/error' });
  }])

  .controller('PartageController', ['$scope', function ($scope) {
   // $scope.transition = "flip";
  }]);