(function() {
    angular
        .module('signaling')
        .config(Routes);

    Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Routes($stateProvider, $urlRouterProvider) {


        $stateProvider
            .state('index', {
                url: '/index',
                cache: false,
                templateUrl: 'templates/main/index.html',
                controller: 'IndexCtrl',
                controllerAs: 'vm'
            })
            .state('reportList', {
                url: '/reportList',
                cache: false,
                templateUrl: 'templates/report/list.html',
                controller: 'ReportListCtrl',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/index');

    }
})();
