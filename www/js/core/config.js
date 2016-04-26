(function() {
  'use strict';

  angular.module('starter')
    .config(configLocalStorage) // Configurar el paquete angular-local-storage
    .config(configStates) // Configurar los estados de la aplicación
    .config(configTranslate) // Configurar el paquete angular-translate
    .run(initCoreComponents); // Iniciar componentes del núcleo

  ////////////////////////
  function configLocalStorage(localStorageServiceProvider) {
    // para evitar colisiones, añadir un prefijo
    localStorageServiceProvider.setPrefix('starter');
  }

  function configStates($stateProvider, $urlRouterProvider) {
    // Declarar un estado abstracto que tendrá el template de las pestañas
    // Si un hijo de tab (en este caso son todos hijos) está activo, activará este estado renderizando el template de las pestañas
    $stateProvider.state('tab', {
      url:'/tab',
      abstract: true,
      templateUrl: 'layout/tabs.html'
    });

    // Declarar estado tab.list vinculado a la url /tab/list y una view llamada tab-list con template list.html y controller ListController as vm
    $stateProvider.state('tab.list', {
      url:'/list',
      views: {
        'tab-list': {
          'templateUrl': 'js/list/list.html',
          'controller': 'ListController as vm'
        }
      }
    });

    // Declarar estado tab.countries vinculado a la url /tab/atlas y una view llamada tab-atlas con template countries.html y controller CountriesController as vm
    $stateProvider.state('tab.countries', {
      url:'/atlas',
      views: {
        'tab-atlas': {
          'templateUrl': 'js/atlas/countries.html',
          'controller': 'CountriesController as vm'
        }
      }
    });

    // Declarar estado tab.countries-capital vinculado a la url /tab/atlas/:capital y una view llamada tab-atlas con template capital.html y controller CapitalController as vm
    $stateProvider.state('tab.countries-capital', {
      url:'/atlas/:capital',// capital sera una variable accesible desde $stateParams.capital
      views: {
        'tab-atlas': { // al compartir view con el estado 'tab.countries' el cambio se hará en la misma view y por lo tanto, aparecerá el botón back
          'templateUrl': 'js/atlas/capital.html',
          'controller': 'CapitalController as vm'
        }
      }
    });

    // Declarar estado settings vinculado a la url /settings y una view llamada settings con template settings.html y controller SettingsController as vm
    $stateProvider.state('tab.settings', {
      url:'/settings',
      views: {
        'tab-settings': {
          'templateUrl': 'js/settings/settings.html',
          'controller': 'SettingsController as vm'
        }
      }
    });

    // Si una dirección no está vinculada con ningún estado, que vaya a la dirección /list
    $urlRouterProvider.otherwise('/tab/list');
  }

  function configTranslate($translateProvider) {
    // Especificar desde dónde se cargarán los archivos con los literales
    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/languages/',
      suffix: '.json'
    });

    // Especificar qué claves de idioma utilizará la aplicación
    // las claves se concatenarán con el prefix y suffix: 'assets/languages/' + [es | eu] + '.json'
    $translateProvider.registerAvailableLanguageKeys(['es', 'eu'], {
      'es-ES': 'es', 'es-MX': 'es', 'es-PA': 'es',
      'eu-ES': 'eu'
    });
    // Especificar el idioma por defecto
    $translateProvider.preferredLanguage('es');
    // Especificar qué idioma utilizar en caso de que falte un literal de un idioma
    $translateProvider.fallbackLanguage('es');
    // Por temas de seguridad, hay que utilizar un estrategia sanitize; en nuestro caso, se utilizará escape
    $translateProvider.useSanitizeValueStrategy('escape');
  }

  function initCoreComponents($ionicPlatform, Settings) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      // Inicializar la configuración de la aplicación
      Settings.init();

      console.log('init!');
    });
  }

})();
