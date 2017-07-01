(function() {
  angular
    .module('signaling')
    .controller('ReportListCtrl', Controller);

  Controller.$inject = ['$state', 'ReportResource'];
  function Controller($state, ReportResource) {

    var vm = this;

    vm.reports = [];
    vm.search = "";
    vm.fetching = false;


    vm.goToReport = goToReport;
    vm.matchesSearch = matchesSearch;
    vm.isShowingReports = isShowingReports;

    function loadReports(){
      vm.fetching = true;
      ReportResource.getAllReports()
        .then(function(reports){
          vm.reports = reports;
          vm.fetching = false;
        });
    }


    function goToReport(id){
      $state.go('report', {reportId: id});
    }

    function matchesSearch(report){
      if (!!vm.search){
        var search = vm.search.toLowerCase();
        if (report.id.toString().toLowerCase().indexOf(search) !== -1){
          return true;
        }
        if (report.description.toLowerCase().indexOf(search) !== -1){
          return true;
        }
        if (report.proposal.toLowerCase().indexOf(search) !== -1){
          return true;
        }

        return report.address.toLowerCase().indexOf(search) !== -1;
      }

      return true;
    }

    function isShowingReports(){
      if (!vm.reports || !vm.reports.length){
        return false;
      }

      for (var i = 0; i < vm.reports.length; i++){
        if (matchesSearch(vm.reports[i])){
          return true;
        }
      }

      return false;
    }

    loadReports();
  }
})();
