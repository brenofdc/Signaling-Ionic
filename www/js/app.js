(function() {

  angular.module('signaling', ['ionic', 'ngResource', 'ngMap']);

  angular.module('signaling')
    .run(OnRun);

  OnRun.$inject = ['$ionicPlatform', '$ionicSideMenuDelegate', '$rootScope', '$state', 'Session'];
  function OnRun($ionicPlatform, $ionicSideMenuDelegate, $rootScope, $state, Session) {

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error === 'no_auth'){
        $state.go('index');
      }
      else if (error === 'already_auth'){
        $state.go('reportList');
      }
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      console.log(Session.hasUserAuthenticated());
      if (Session.hasUserAuthenticated()){
        $ionicSideMenuDelegate.canDragContent(true);
      }
      else {
        $ionicSideMenuDelegate.canDragContent(false);
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
