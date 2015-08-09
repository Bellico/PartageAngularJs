'use strict';

angular.module('partageHome', [])

  .controller('HomeController', ['$scope', '$location', 'EventAction', function ($scope, $location, EventAction) {
    $scope.listTypeEnable = ['textContentType', 'TodoConttType', 'TestContentType'];
    $scope.panelTypeShow = false;
    $scope.current = 0;
    $scope.transition = 'rotateSlide';

    EventAction.listen($scope);

    EventAction.on(EventAction.ENTER, function () {
      if ($scope.selected && $scope.panelTypeShow) {
        $scope.panelTypeShow = false;
        $scope.transition = 'opac';
        $location.path('/text');
      } else { $scope.panelTypeShow = true; }
    });

    EventAction.on(EventAction.UP, function () {
      if ($scope.current > 0) { $scope.current--; }
      $scope.selected = $scope.listTypeEnable[$scope.current];
    });

    EventAction.on(EventAction.DOWN, function () {
      if ($scope.current < $scope.listTypeEnable.length - 1) { $scope.current++; }
      $scope.selected = $scope.listTypeEnable[$scope.current];
    });

    $scope.togglePanel = function (show) {
      $scope.panelTypeShow = show;
    };

    $scope.mousemove = function () {
      $scope.selected = null;
    };

  }]);