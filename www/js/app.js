(function() {

  angular.module('signaling', ['ionic', 'ngResource', 'ngMap']);

  angular.module('signaling')
    .run(OnRun);

  OnRun.$inject = ['$ionicPlatform', '$rootScope', '$state'];

  function OnRun($ionicPlatform, $rootScope, $state) {

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error === 'no_auth'){
        $state.go('index');
      }
      else if (error === 'already_auth'){
        $state.go('reportList');
      }
    });

    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();
