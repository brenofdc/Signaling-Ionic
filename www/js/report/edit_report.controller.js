(function() {
  angular
    .module('signaling')
    .controller('EditReportCtrl', Controller);

  Controller.$inject = ['$state', 'ReportResource', 'Session', 'Popup'];
  function Controller($state, ReportResource, Session, Popup) {

    var vm = this;

    vm.id = $state.params.reportId;
    vm.startedLocation = false;

    vm.saveReport = saveReport;
    vm.pickLocation = pickLocation;
    vm.startLocation = startLocation;

    function loadReport(){
      ReportResource.getReport(vm.id)
        .then(function(report){
            if (report.user_id !== Session.getCurrentUser().id || report.status !== 'open'){
              $state.go('reportList');
              return false;
            }
            vm.report = report;
            vm.report.id = undefined;
            vm.startedLocation = !!report.lat && !!report.long;
          },
          function(){
            $state.go('reportList');
          });
    }

    function startLocation(){
      if (vm.startedLocation){
        return vm.report.lat + ', ' + vm.report.long;
      }

      return 'current-location';
    }

    function pickLocation(event){
      vm.startedLocation = true;
      var ll = event.latLng;
      vm.report.lat = ll.lat();
      vm.report.long = ll.lng();
    }

    function saveReport(){
      if (!vm.report.description || !vm.report.proposal || !vm.report.address){
        Popup.error('Preencha todos os campos corretamente.');
        return false;
      }

      ReportResource.editReport(vm.id, vm.report).then(function(){
          Popup.success('Caso salvo com sucesso!');
          $state.go('profile');
        },
        function(){
          Popup.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
          return false;
        });
    }

    loadReport();
  }
})();
