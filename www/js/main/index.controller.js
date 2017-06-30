(function() {
    angular
        .module('signaling')
        .controller('IndexCtrl', Controller);

    Controller.$inject = ['$scope', '$ionicSideMenuDelegate', '$ionicModal', '$state', 'Popup', 'Session', 'AuthResource'];
    function Controller($scope, $ionicSideMenuDelegate, $ionicModal, $state, Popup, Session, AuthResource) {
      var vm = this;

      vm.loginData = {
        email: "",
        password: ""
      };

      vm.login = login;
      vm.startRegister = startRegister;
      vm.cancelRegister = cancelRegister;
      vm.finishRegister = finishRegister;
      vm.goToList = goToList;

      $ionicSideMenuDelegate.canDragContent(false);
      $ionicModal.fromTemplateUrl('register-modal.html', {scope: $scope}).then(function(modal) {
        vm.modal = modal;
      });

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

      function startRegister(){
        vm.makingRegister = false;

        vm.newUser = {
          cpf: "",
          name: "",
          email: "",
          password: "",
          repeatPassword: ""
        };

        vm.modal.show();
      }

      function cancelRegister(){
        vm.modal.hide();
      }

      function finishRegister(){
        for (var attr in vm.newUser){
          if (!vm.newUser[attr]){
            Popup.error('Preencha todos os campos corretamente.');
            return false;
          }
        }
        if (vm.newUser.password.length < 6){
          Popup.error('A senha deve conter no mínimo 6 caracteres.');
          return false;
        }
        if (vm.newUser.password !== vm.newUser.repeatPassword){
          Popup.error('As senhas informadas não coincidem.');
          return false;
        }
        vm.makingRegister = true;
        AuthResource.createUser(vm.newUser).then(function(){
            Popup.success('Usuário criado com sucesso!');
            vm.makingRegister = false;
            vm.modal.hide();
          },
          function(reason){
            vm.makingRegister = false;
            if (reason === "duplicated"){
              Popup.error('O email informado já possui um cadastro.');
              return false;
            }
            else{
              Popup.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
              return false;
            }
          });
      }

      function goToList(){
        $state.go("reportList");
      }
    }
})();
