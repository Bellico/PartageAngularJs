angular.module('partageApp')

  .factory('EventAction', [function () {
    return {

      ENTER : 13,
      UP : 38,
      DOWN : 40,

      stackAction : [],

      listen : function ($scope) {
        var stackAction = this.stackAction;
        $scope.$watch('event', function () {
          if (!$scope.event) { return false; }
          for (var i = 0; i < stackAction.length; i++) {
            if(stackAction[i].key === $scope.event.keyCode) { stackAction[i].action(); }
          }
        });

        this.on = function (key, action) {
          this.stackAction.push({ key: key, action : action});
        };

      }
    };
  }]);