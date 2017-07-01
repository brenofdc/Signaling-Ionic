(function() {
  angular
    .module('signaling')
    .controller('ReportListCtrl', Controller);

  Controller.$inject = ['$ionicSideMenuDelegate', 'ReportResource', 'Session'];
  function Controller($ionicSideMenuDelegate, ReportResource, Session) {

    var vm = this;

    vm.reports = [];
    vm.fetching = false;

    vm.formatReportId = formatReportId;

    if (!Session.hasUserAuthenticated()){
      $ionicSideMenuDelegate.canDragContent(false);
    }

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

    loadReports();
  }
})();
