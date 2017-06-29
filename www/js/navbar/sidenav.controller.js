(function() {
  angular
    .module('signaling')
    .controller('SidenavCtrl', Controller);

  Controller.$inject = ['$state', '$ionicSideMenuDelegate', '$ionicPopup', 'Session'];
  function Controller($state, $ionicSideMenuDelegate, $ionicPopup, Session) {

    var vm = this;
    vm.press = press;
    vm.logout = logout;

    function press(to){
      $state.go(to);
      $ionicSideMenuDelegate.toggleLeft();
    }

    function logout(){
      $ionicSideMenuDelegate.toggleLeft();
      $ionicPopup.show({
        template: '',
        title: 'Sair',
        subTitle: 'Deseja mesmo desconectar de sua conta?',
        buttons: [
          { text: 'Não' },
          {
            text: '<b>Sim</b>',
            type: 'button-assertive',
            onTap: function(e) {
              Session.logout();
              $state.go("index");
            }
          }
        ]
      });
    }
  }
})();
