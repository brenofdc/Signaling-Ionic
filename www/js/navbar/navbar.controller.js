(function() {
  angular
    .module('signaling')
    .controller('NavbarCtrl', Controller);

  Controller.$inject = ['$state'];
  function Controller($state) {

    var vm = this;
    vm.showNavbar = showNavbar;

    function showNavbar(){
      return !$state.is("index");
    }
  }
})();
