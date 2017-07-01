(function() {
  angular
    .module('signaling')
    .controller('ReportCtrl', Controller);

  Controller.$inject = ['$state', '$ionicPopup', 'ReportResource', 'Session'];
  function Controller($state, $ionicPopup, ReportResource, Session) {

    var vm = this;

    vm.id = $state.params.reportId;

    vm.canManage = canManage;
    vm.hasLatLong = hasLatLong;
    vm.deleteReport = deleteReport;
    vm.closeReport = closeReport;
    vm.editReport = editReport;

    function loadReport(){
      ReportResource.getReport(vm.id)
        .then(function(report){
            vm.report = report;
          },
          function(){
            $state.go('reportList');
          });
    }

    function canManage(){
      if (!vm.report){
        return false;
      }

      return vm.report.status !== 'closed' &&
        Session.hasUserAuthenticated() &&
        Session.getCurrentUser().id === vm.report.user_id;
    }

    function hasLatLong(){
      if (!vm.report){
        return false;
      }

      return !!vm.report.lat && !!vm.report.long;
    }

    function deleteReport(){
      $ionicPopup.show({
        template: '',
        title: 'Deletar caso',
        subTitle: 'Deseja mesmo deletar este caso? Esta ação é irreversível.',
        buttons: [
          { text: 'Não' },
          {
            text: '<b>Sim</b>',
            type: 'button-assertive',
            onTap: function(e) {
              ReportResource.deleteReport(vm.id);
              $state.go("reportList");
            }
          }
        ]
      });
    }

    function closeReport(){
      $ionicPopup.show({
        template: '',
        title: 'Finalizar caso',
        subTitle: 'Deseja mesmo marcar este caso como finalizado? Esta ação é irreversível.',
        buttons: [
          { text: 'Não' },
          {
            text: '<b>Sim</b>',
            type: 'button-balanced',
            onTap: function(e) {
              ReportResource.closeReport(vm.id);
              $state.go("reportList");
            }
          }
        ]
      });
    }

    function editReport(){
      $state.go('editReport', {reportId: vm.id});
    }

    loadReport();
  }
})();
