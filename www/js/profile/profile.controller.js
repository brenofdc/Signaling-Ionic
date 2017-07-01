(function() {
  angular
    .module('signaling')
    .controller('ProfileCtrl', Controller);

  Controller.$inject = ['$ionicModal', '$state', '$scope', 'ReportResource', 'UserResource', 'Session', 'Popup'];
  function Controller($ionicModal, $state, $scope, ReportResource, UserResource, Session, Popup) {

    var vm = this;

    vm.user = Session.getCurrentUser();

    vm.goToReport = goToReport;
    vm.startEdit = startEdit;
    vm.cancelEdit = cancelEdit;
    vm.finishEdit = finishEdit;

    $ionicModal.fromTemplateUrl('/templates/profile/edit_profile.html', {scope: $scope}).then(function(modal) {
      vm.modal = modal;
    });

    function loadReports(){
      ReportResource.getUserReports(vm.user.id)
        .then(function(reports){
          vm.reports = reports;
        },
        function(){
          $state.go('reportList');
        });
    }

    function goToReport(id){
      $state.go('report', {reportId: id});
    }

    function startEdit(){
      vm.makingRegister = false;

      vm.editUser = {
        cpf: vm.user.cpf,
        name: vm.user.name,
        email: vm.user.email,
        password: "",
        repeatPassword: ""
      };

      vm.modal.show();
    }

    function cancelEdit(){
      vm.modal.hide();
    }

    function finishEdit(){
      if (!vm.editUser.cpf || !vm.editUser.name || !vm.editUser.email){
        Popup.error('Preencha todos os campos corretamente.');
        return false;
      }
      if (!!vm.editUser.password){
        if (vm.editUser.password.length < 6){
          Popup.error('A senha deve conter no mínimo 6 caracteres.');
          return false;
        }
        if (vm.editUser.password !== vm.editUser.repeatPassword){
          Popup.error('As senhas informadas não coincidem.');
          return false;
        }
      }

      UserResource.updateUser(vm.user.id, vm.editUser).then(function(){
          Popup.success('Perfil editado com sucesso!');
          var newUserData = angular.copy(vm.user);
          newUserData.cpf = vm.editUser.cpf;
          newUserData.name = vm.editUser.name;
          newUserData.email = vm.editUser.email;
          Session.login(newUserData);
          vm.modal.hide();
        },
        function(){
          Popup.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
          return false;
        });
    }

    loadReports();
  }
})();
