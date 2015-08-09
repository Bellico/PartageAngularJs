angular.module('partageApp')

  .factory('TestFactory', [function () {
    var i = 0;
    console.log("factory" + i);
    i++;
    return {
      i: 0,
      up :function (){ this.i ++; }
    };
  }])

  .service('TestService', [function () {
    var i = 0;
    console.log("servive " +i);
    i++;

    this.i = 0 ;

    this.up = function () {
      this.i ++;
    };

  }])

    .provider('TestProvider', [function () {
    var i = 0;
    console.log("provider" + i);
    i++;

    this.$get = function (){
       return {
          i: 0,
          up :function (){ this.i ++; }
        };
    };

  }]);

