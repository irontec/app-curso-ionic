(function() {
    'use strict';

    angular
      .module('starter.services') // Obtener el módulo starter.services, para añadir una constante
      .constant('apiUrl', 'https://restcountries.eu/rest/v1/'); // declarar la constante apiUrl, que estará disponible para inyectarlo como dependencia
})();
