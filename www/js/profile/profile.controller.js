(function() {
  angular
    .module('signaling')
    .controller('ProfileCtrl', Controller);

  Controller.$inject = ['$state', 'ReportResource', 'Session'];
  function Controller($state, ReportResource, Session) {

    var vm = this;

    vm.user = Session.getCurrentUser();

    vm.goToReport = goToReport;

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

    loadReports();
  }
})();
