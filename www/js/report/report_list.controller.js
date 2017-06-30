(function() {
  angular
    .module('signaling')
    .controller('ReportListCtrl', Controller);

  Controller.$inject = ['$ionicSideMenuDelegate', 'Session'];
  function Controller($ionicSideMenuDelegate, Session) {

    if (!Session.hasUserAuthenticated()){
      $ionicSideMenuDelegate.canDragContent(false);
    }

  }
})();
