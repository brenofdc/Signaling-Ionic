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
                controller: 'IndexCtrl'
            });

        $urlRouterProvider.otherwise('/index');

    }
})();
