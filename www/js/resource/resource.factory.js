(function () {
    angular
        .module('signaling')
        .factory('ResourceFactory', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var HOST = "http://0.0.0.0:8080";
        return {
            make: function(url){
                return $resource(
                    HOST + url,
                    {},
                    {
                        update: {method: 'PUT', isArray: false},
                        authenticate: {method: 'PUT', isArray: false}
                    }
                );
            }
        }
    }
})();
