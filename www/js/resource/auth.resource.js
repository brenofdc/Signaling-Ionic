(function () {
    angular
        .module('signaling')
        .factory('AuthResource', Service);
    Service.$inject = ['$q', 'ResourceFactory'];
    function Service($q, ResourceFactory) {
        var Resource = ResourceFactory.make("/auth/:action");
        return {
            authenticateUser: function(email, password){
                var authentication = new Resource({email: email, password: password});
                var promise = $q.defer();
                authentication.$authenticate({action: 'login'}).then(
                    function(response){
                        promise.resolve(response.data);
                    },
                    function(response){
                        promise.reject(response.reason);
                    }
                );
                return promise.promise;
            },
            createUser: function(userData){
                var newUser = new Resource(userData);
                var promise = $q.defer();
                newUser.$authenticate({action: 'signup'}).then(
                    function(){
                      promise.resolve();
                    },
                    function(response){
                        promise.reject(response.reason);
                    }
                );
                return promise.promise;
            }
        }
    }
})();
