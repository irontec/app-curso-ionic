(function() {
  'use strict';

  angular
    .module('starter.services') // Obtener el módulo starter.services, para añadir una factoría
    .factory('Atlas', Atlas); // declarar la factoría

  // Inyectar dependencias de modo que al minimizar el código, no se pierdan los nombres originales
  Atlas.$inject = ['$http', '$q', 'apiUrl'];

  /* @ngInject */
  function Atlas($http, $q, apiUrl) {
    // Declarar el objeto que se va a devolver con las funciones públicas que estarán accesibles
    var service = {
      getCapital: getCapital,
      getCountriesByRegion: getCountriesByRegion
    };
    // Devolver el objeto
    return service;
    //////////////////////////////
    // devuelve información de la capital especificada
    function getCapital(capital) {
      var deferred = $q.defer();

      $http.get(apiUrl + 'capital/' + capital)
        .then(getCapitalCompleted)
        .catch(getCapitalFailed);

      function getCapitalCompleted(response) {
        console.log(response);
        deferred.resolve(response.data[0]);
      }

      function getCapitalFailed(reason) {
        console.log(reason);
        deferred.reject();
      }

      return deferred.promise;
    }

    // devuelve la lista de países de la región especificada
    function getCountriesByRegion(region) {
      var deferred = $q.defer();

      $http.get(apiUrl + 'region/' + region)
        .then(getCountriesByRegionCompleted)
        .catch(getCountriesByRegionFailed);

      function getCountriesByRegionCompleted(response) {
        console.log(response);
        deferred.resolve(response.data);
      }

      function getCountriesByRegionFailed(reason) {
        console.log(reason);
        deferred.reject();
      }

      return deferred.promise;
    }
  }
})();
