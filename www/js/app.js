(function() {

  angular.module('signaling', ['ionic', 'ngResource']);

  angular.module('signaling')
    .run(OnRun);

  OnRun.$inject = ['$ionicPlatform'];

  function OnRun($ionicPlatform) {
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
