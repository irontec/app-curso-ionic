(function() {
  'use strict';

  angular
    .module('starter.services') // Obtener el módulo starter.services, para añadir una factoría
    .factory('Tasks', Tasks); // declarar la factoría

  // Inyectar dependencias de modo que al minimizar el código, no se pierdan los nombres originales
  Tasks.$inject = ['localStorageService'];

  /* @ngInject */
  function Tasks(localStorageService) {
    // Declarar una variable privada para guardar las tareas, no estará accesible desde "fuera"
    var _tasks = localStorageService.get('tasks') || [];
    // Declarar el objeto que se va a devolver con las funciones públicas que estarán accesibles
    var service = {
      addTask: addTask,
      editTask: editTask,
      getTasks: getTasks,
      removeTask: removeTask
    };
    // Devolver el objeto
    return service;
    //////////////////////////////
    // Añade una tarea y actualiza el local storage
    function addTask(task) {
      _tasks.push(task);
      localStorageService.set('tasks', _tasks);
    }

    function editTask(task, newTask) {
      var index = _tasks.indexOf(task);

      if (index > -1) {
        _tasks[index] = newTask;
      }

      localStorageService.set('tasks', _tasks);
    }

    // Devuelve la variable privada _tasks
    function getTasks() {
      return _tasks;
    }

    // Elimina la tarea especifiacda y actualiza el local storage
    function removeTask(task) {
      var index = _tasks.indexOf(task);

      if (index > -1) {
        _tasks.splice(index, 1);
      }

      localStorageService.set('tasks', _tasks);
    }
  }
})();
