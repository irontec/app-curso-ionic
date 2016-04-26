(function() {
  'use strict';

  angular
    .module('starter.atlas') // Obtener el módulo starter.atlas, para añadir un controller
    .controller('CountriesController', CountriesController); // declarar el controller

  CountriesController.$inject = ['$ionicPopover', '$scope', '$state', 'Settings', 'Atlas'];

  /* @ngInject */
  function CountriesController($ionicPopover, $scope, $state, Settings, Atlas) {
    var vm = this;
    // variables
    vm.title = Settings.getRegion();
    vm.countries = [];
    vm.searchTerm = {name: '', subregion: '', capital: '', $:''};
    vm.filterBy = '$';
    vm.orderBy = 'name';
    // methods
    vm.gotoCapital = gotoCapital;
    vm.resetSearch = resetSearch;
    vm.showFilterPopover = showFilterPopover;
    vm.showOrderPopover = showOrderPopover;
    ///////////////////////////
    $scope.$on('$ionicView.enter', function (viewInfo, state) {
      console.log(vm.title);
      console.log(Settings.getRegion());
      if (vm.title !== Settings.getRegion()) {
        vm.title = Settings.getRegion();
        activate();
      }
    });

    $scope.$watch('vm.filterBy', function(newValue, oldValue) {
      console.log('Old: ' + oldValue);
      console.log('New: ' + newValue);
      vm.searchTerm[newValue] = vm.searchTerm[oldValue];
      vm.searchTerm[oldValue] = '';
    });
    //////////////////////////
    activate();

    function activate() {
      console.log('Atlas activado');

      // crear el popover con un template y guardar el objeto en una variable vm.
      $ionicPopover.fromTemplateUrl('js/atlas/atlas-search-filter.html', {
        scope: $scope
      }).then(function(popover) {
        vm.popoverFilter = popover;
      });

      // crear el popover con un template y guardar el objeto en una variable vm.
      $ionicPopover.fromTemplateUrl('js/atlas/atlas-search-order.html', {
        scope: $scope
      }).then(function(popover) {
        vm.popoverOrder = popover;
      });

      // pedir países de la región seleccionada
      Atlas.getCountriesByRegion( Settings.getRegion() )
        .then(getCountriesByRegionCompleted);

      function getCountriesByRegionCompleted(data) {
        // guardar los países de la región seleccionada
        vm.countries = data;
      }

    }
    //////////////////////////
    function gotoCapital(capital) {
      $state.go('tab.countries-capital', {capital: capital});
    }

    function resetSearch() {
      vm.searchTerm = '';
    }

    function showFilterPopover($event) {
      // utilizar la variable devuelta por el $ionicPopover. Es necesario pasar el objeto $event
      vm.popoverFilter.show($event);
    }

    function showOrderPopover($event) {
      // utilizar la variable devuelta por el $ionicPopover. Es necesario pasar el objeto $event
      vm.popoverOrder.show($event);
    }
  }
})();
