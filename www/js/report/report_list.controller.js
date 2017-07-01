(function() {
  angular
    .module('signaling')
    .controller('ReportListCtrl', Controller);

  Controller.$inject = ['$state', 'ReportResource'];
  function Controller($state, ReportResource) {

    var vm = this;

    vm.reports = [];
    vm.fetching = false;

    vm.formatReportId = formatReportId;
    vm.goToReport = goToReport;

    function loadReports(){
      vm.fetching = true;
      ReportResource.getAllReports()
        .then(function(reports){
          vm.reports = reports;
          vm.fetching = false;
        });
    }

    function formatReportId(id){
      var zeroes = 7;
      var str = id + "";
      while (str.length < zeroes) str = "0" + str;
      return str;
    }

    function goToReport(id){
      $state.go('report', {reportId: id});
    }

    loadReports();
  }
})();
