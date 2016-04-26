(function() {
  'use strict';

  angular
    .module('starter.settings') // Obtener el módulo starter.settings, para añadir un controller
    .controller('SettingsController', SettingsController); // declarar el controller

  // Inyectar dependencias de modo que al minimizar el código, no se pierdan los nombres originales
  SettingsController.$inject = ['$translate', '$filter', '$ionicPopup', 'Settings'];

  /* @ngInject */
  function SettingsController($translate, $filter, $ionicPopup, Settings) {
    var vm = this;
    // variables
    vm.language = Settings.getLanguage();
    vm.region = Settings.getRegion();
    // methods
    vm.changeLanguage = changeLanguage;
    vm.changeRegion = changeRegion;
    vm.resetLocalStorage = resetLocalStorage;
    //////////////////////////////////
    activate();

    function activate() {
      // 1) forma de conseguir una traducción de un texto
      //console.log($filter('translate')('SETTINGS.ACTIVATED'));
      // 2) forma de conseguir una traducción de un texto
      console.log($translate.instant('SETTINGS.ACTIVATED'));
      // 3) forma de conseguir una traducción de un texto
      //$translate('SETTINGS.ACTIVATED').then(function(translatedvalue) {
      //  console.log(translatedvalue);
      //});
  }

  function changeLanguage() {
    Settings.setLanguage(vm.language);
  }
  
  function changeRegion() {
    Settings.setRegion(vm.region);
  }

  function resetLocalStorage() {
      // Guardar la promesa que devuelve el $ionicPopup, para acceder al .then()
      var confirmPopup = $ionicPopup.confirm({
        title: $translate.instant('SETTINGS.RESET_DATA'),
        template: $translate.instant('SETTINGS.RESET_SURE'),
        cancelText: $translate.instant('SETTINGS.CANCEL'),
        cancelType: 'button-calm',
        okText: $translate.instant('SETTINGS.YES'),
        okType: 'button-assertive'
      });
      // Si todo ha ido bien, la promesa ejecutará .then() y recibirá una variable con la selección del usuario
      confirmPopup.then(function(reset) {
        if(reset) {
          Settings.reset();
        } else {
          console.log($translate.instant('SETTINGS.NO_DELETED'));
        }
      });
  }
}
})();
