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
    vm.goBack = goBack;

    function showNavbar(){
      return !$state.is("index");
    }

    function toggleSidenav(){
      $ionicSideMenuDelegate.toggleLeft();
    }

    function hasSidenav(){
      return Session.hasUserAuthenticated();
    }

    function goBack(){
      var backHistory = {
        "report": "reportList",
        "reportList": "index"
      };
      var state = $state.current.name;
      $state.go(backHistory[state]);
    }
  }
})();
