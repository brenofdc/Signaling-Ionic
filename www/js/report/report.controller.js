(function() {
  angular
    .module('signaling')
    .controller('ReportCtrl', Controller);

  Controller.$inject = ['$state', 'ReportResource'];
  function Controller($state, ReportResource) {

    var vm = this;

    vm.id = $state.params.reportId;

    function loadReport(){
      ReportResource.getReport(vm.id)
        .then(function(report){
          vm.report = report;
        },
        function(){
          $state.go('reportList');
        });
    }

    loadReport();
  }
})();
