angular.module('partageApp')

  .directive('zKeyup', function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {
        elem.bind('keyup', function () {
          scope.$apply(function (s) {
            s.$eval(attr.zKeyup);
          });
        });
      }
    };
  });