angular.module('partageApp')

  .factory('ContentType', ['$resource', 'SERVER_API', function ($resource, SERVER_API) {
    return $resource(SERVER_API + '/api/ContentType/:option', null, {
      save : { method : 'POST', headers : {'Content-Type': 'application/json'}} //application/x-www-form-urlencoded
    });
  }]);