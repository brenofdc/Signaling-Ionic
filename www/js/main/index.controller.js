(function() {
    angular
        .module('signaling')
        .controller('IndexCtrl', Controller);

    Controller.$inject = ['$ionicSideMenuDelegate', '$state', 'Popup', 'Session', 'AuthResource'];
    function Controller($ionicSideMenuDelegate, $state, Popup, Session, AuthResource) {
      var vm = this;

      vm.loginData = {
        email: "",
        password: ""
      };

      vm.login = login;

      $ionicSideMenuDelegate.canDragContent(false);

      function login(){
        if (vm.loginData.email === "" || vm.loginData.password === ""){
          Popup.error('Preencha todos os campos de login.');
        }
        else{
          AuthResource.authenticateUser(vm.loginData.email, vm.loginData.password)
            .then(function(user){
                Session.login(user);
                $state.go("dashboard");
              },
              function(error){
                if (error === "authentication failed"){
                  Popup.error('Email ou senha incorreta.');
                }
                else{
                  Popup.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
                }
              });
        }
      }
    }
})();
