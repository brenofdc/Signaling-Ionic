(function() {
  angular
    .module('signaling')
    .controller('NavbarCtrl', Controller);

  Controller.$inject = ['$state', '$ionicSideMenuDelegate', 'Session'];
  function Controller($state, $ionicSideMenuDelegate, Session) {

    var vm = this;
    vm.showNavbar = showNavbar;
    vm.toggleSidenav = toggleSidenav;
    vm.hasSidenav = hasSidenav;
    vm.backToLogin = backToLogin;

    function showNavbar(){
      return !$state.is("index");
    }

    function toggleSidenav(){
      $ionicSideMenuDelegate.toggleLeft();
    }

    function hasSidenav(){
      return Session.hasUserAuthenticated();
    }

    function backToLogin(){
      $state.go('index');
    }
  }
})();
