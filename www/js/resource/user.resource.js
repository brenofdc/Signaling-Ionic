(function () {
    angular
        .module('signaling')
        .factory('UserResource', Service);
    Service.$inject = ['$q', 'ResourceFactory'];
    function Service($q, ResourceFactory) {
        var Resource = ResourceFactory.make("/api/users/:email");
        return {
            updateUser: function(email, userData){
                var userUpdate = new Resource(userData);
                var promise = $q.defer();
                userUpdate.$update({email: email}).then(
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
