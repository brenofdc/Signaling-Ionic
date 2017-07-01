(function() {
  angular
    .module('signaling')
    .controller('ReportCtrl', Controller);

  Controller.$inject = ['$state', 'ReportResource', 'Session'];
  function Controller($state, ReportResource, Session) {

    var vm = this;

    vm.id = $state.params.reportId;

    vm.canManage = canManage;
    vm.hasLatLong = hasLatLong;

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

    loadReport();
  }
})();
