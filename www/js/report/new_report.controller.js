(function() {
  angular
    .module('signaling')
    .controller('NewReportCtrl', Controller);

  Controller.$inject = ['$state', 'ReportResource', 'Session', 'Popup', 'GeoCoder'];
  function Controller($state, ReportResource, Session, Popup, GeoCoder) {

    var vm = this;

    vm.newReport = {
      address: "",
      date: new Date(),
      description: "",
      lat: "",
      long:"",
      proposal: "",
      status: "open",
      user_id: Session.getCurrentUser().id
    };
    vm.startedLocation = false;


    vm.saveNewReport = saveNewReport;
    vm.pickLocation = pickLocation;

    function pickLocation(event){
      vm.startedLocation = true;
      var ll = event.latLng;
      vm.newReport.lat = ll.lat();
      vm.newReport.long = ll.lng();
      GeoCoder.geocode( { 'latLng': ll }).then(function(results){
        if (results.length){
          vm.newReport.address = results[0].formatted_address;
        }
      });
    }

    function saveNewReport(){
      if (!vm.newReport.description || !vm.newReport.address){
        Popup.error('Preencha todos os campos corretamente.');
        return false;
      }

      ReportResource.createReport(vm.newReport).then(function(){
          Popup.success('Caso enviado com sucesso!');
          $state.go('profile');
        },
        function(){
          Popup.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
          return false;
        });
    }
  }
})();
