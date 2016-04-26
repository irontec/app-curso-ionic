(function() {
  'use strict';

  angular
    .module('starter.atlas') // Obtener el módulo starter.atlas, para añadir un controller
    .controller('CapitalController', CapitalController); // declarar el controller

  CapitalController.$inject = ['$stateParams', 'Atlas'];

  /* @ngInject */
  function CapitalController($stateParams, Atlas) {
    var vm = this;
    // variables
    vm.title = $stateParams.capital;
    vm.info = [];
    vm.searchTerm = '';
    // methods
    vm.resetSearch = resetSearch;
    //////////////////////////
    activate();

    function activate() {
      console.log('Atlas activado');
      // pedir información de la capital
      Atlas.getCapital( $stateParams.capital )
        .then(getCapitalCompleted);

      function getCapitalCompleted(data) {
        // guardar información de la capital
        vm.info = data;
      }

    }
    //////////////////////////
    function resetSearch() {
      vm.searchTerm = '';
    }
  }
})();
