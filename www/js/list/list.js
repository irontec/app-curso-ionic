(function() {
  'use strict';

  angular
    .module('starter.list') // Obtener el módulo starter.list, para añadir un controller
    .controller('ListController', ListController); // declarar el controller

  // Inyectar dependencias de modo que al minimizar el código, no se pierdan los nombres originales
  ListController.$inject = ['$ionicPopup', '$ionicListDelegate', '$scope', '$translate', 'Tasks'];

  /* @ngInject */
  function ListController($ionicPopup, $ionicListDelegate, $scope, $translate, Tasks) {
    var vm = this;
    // variables
    vm.tasks = Tasks.getTasks();
    vm.showDelete = false;
    vm.searchTerm = '';
    // methods
    vm.addTask = addTask;
    vm.editTask = editTask;
    vm.removeTask = removeTask;
    vm.resetSearch = resetSearch;
    vm.toggleShowRemove = toggleShowRemove;

    //////////////////////////
    $scope.$on('$ionicView.loaded', function (viewInfo, state) {
        console.log('CTRL - $ionicView.loaded', viewInfo, state);
    });
    //////////////////////////
    activate();

    function activate() {
      console.log($translate.instant('LIST.ACTIVATED'));
    }
    //////////////////////////
    function addTask() {
      // Guardar la promesa que devuelve el $ionicPopup, para acceder al .then()
      var promptPopup = $ionicPopup.prompt({
        title: $translate.instant('LIST.ADD_TASK_BUTTON_LABEL'),
        template: $translate.instant('LIST.ADD_TASK'),
        inputType: 'text',
        inputPlaceholder: $translate.instant('LIST.TASK_PLACEHOLDER')
      });
      // Si todo ha ido bien, la promesa ejecutará .then() y recibirá una variable con el nombre de la tarea
      promptPopup.then(function(task) {
        if (task) {
          console.log($translate.instant('LIST.TASK_CONSOLE'), task);
          Tasks.addTask(task);
        }
      });

    }

    function editTask(task) {
      // Guardar la promesa que devuelve el $ionicPopup, para acceder al .then()
      var promptPopup = $ionicPopup.prompt({
        title: "Editar tarea",
        template: "Nuevo nombre",
        inputType: 'text',
        inputPlaceholder: task
      });
      // Si todo ha ido bien, la promesa ejecutará .then() y recibirá una variable con el nombre de la tarea
      promptPopup.then(function(newTask) {
        if (newTask) {
          console.log("Nueva tarea: ", newTask);
          Tasks.editTask(task, newTask);
        }

        $ionicListDelegate.closeOptionButtons();
      });
    }

    function removeTask(task) {
      Tasks.removeTask(task);
    }

    function resetSearch() {
      vm.searchTerm = '';
    }

    function toggleShowRemove() {
      vm.showDelete = !vm.showDelete;
    }
  }
})();
