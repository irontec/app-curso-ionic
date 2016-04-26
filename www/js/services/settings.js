(function() {
    'use strict';

    angular
        .module('starter.services') // Obtener el módulo starter.services, para añadir una factoría
        .factory('Settings', Settings); // declarar la factoría

    // Inyectar dependencias de modo que al minimizar el código, no se pierdan los nombres originales
    Settings.$inject = ['localStorageService', '$translate'];

    /* @ngInject */
    function Settings(localStorageService, $translate) {
        // Declarar el objeto que se va a devolver con las funciones públicas que estarán accesibles
        var service = {
          init: init,
          getLanguage: getLanguage,
          setLanguage: setLanguage,
          getRegion: getRegion,
          setRegion: setRegion,
          reset: reset
        };
        // Devolver el objeto
        return service;
        /////////////////////////////////
        // Inicializa la configuración
        function init() {
          $translate.use(getLanguage());
        }

        // Devuelve el idioma actual
        function getLanguage() {
          return localStorageService.get('language') || 'es';
        }

        // Cambia de idioma y guarda el valor en local storage
        function setLanguage(language) {
          $translate.use(language);
          localStorageService.set('language', language);
        }
        
        function getRegion() {
          return localStorageService.get('region') || 'Europe';
        }
        
        function setRegion(region) {
          localStorageService.set('region', region);          
        }

        // Elimina los datos del local storage
        function reset() {
          localStorageService.clearAll();
        }
    }
})();
