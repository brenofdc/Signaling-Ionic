(function() {
  angular
    .module('signaling')
    .config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
  function Routes($stateProvider, $urlRouterProvider) {

    Authenticated.$inject = ['$q', 'Session'];
    function Authenticated($q, Session){
      return Session.hasUserAuthenticated() ? $q.resolve() : $q.reject('no_auth');
    }

    NotAuthenticated.$inject = ['$q', 'Session'];
    function NotAuthenticated($q, Session){
      return Session.hasUserAuthenticated() ? $q.reject('already_auth') : $q.resolve();
    }

    $stateProvider
      .state('index', {
        url: '/index',
        cache: false,
        templateUrl: 'templates/main/index.html',
        controller: 'IndexCtrl',
        controllerAs: 'vm',
        resolve: {
          noAuth: NotAuthenticated
        }
      })
      .state('reportList', {
        url: '/reportList',
        cache: false,
        templateUrl: 'templates/report/list.html',
        controller: 'ReportListCtrl',
        controllerAs: 'vm'
      })
      .state('report', {
        url: '/report/:reportId',
        cache: false,
        templateUrl: 'templates/report/report.html',
        controller: 'ReportCtrl',
        controllerAs: 'vm'
      })
      .state('newReport', {
        url: '/newReport',
        cache: false,
        templateUrl: 'templates/report/new_report.html',
        controller: 'NewReportCtrl',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        cache: false,
        templateUrl: 'templates/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm',
        resolve: {
          auth: Authenticated
        }
      });

    $urlRouterProvider.otherwise('/index');

  }
})();
