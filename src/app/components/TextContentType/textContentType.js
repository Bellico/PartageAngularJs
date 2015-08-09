'use strict';

angular.module('TextContentType', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/text', { controller: 'TextController', templateUrl: 'app/components/textContentType/textContentType.html'});
  }])

  .controller('TextController', ['$scope', 'ContentType', function ($scope, ContentType) {
    $scope.textContentType = new ContentType();
  //  $scope.transition = 'flip';

    $scope.create = function () {
      $scope.textContentType.$save({ option: 'text' });
    };

    $scope.$watch('event', function () {
      if ($scope.event && $scope.event.keyCode === 13) { $scope.create(); }
    });

  }]);

//$http.post('http://localhost:1*0596/api/ContentType/text', t , {headers : {'Content-Type': 'application/json'}});
//var text = TextContentType.get({option: 'lien'}, function () {});