(function () {
    angular
        .module('signaling')
        .factory('UserResource', Service);
    Service.$inject = ['$q', 'ResourceFactory'];
    function Service($q, ResourceFactory) {
        var Resource = ResourceFactory.make("/api/users/:id");
        return {
            updateUser: function(userId, userData){
                var userUpdate = new Resource(userData);
                var promise = $q.defer();
                userUpdate.$update({id: userId}).then(
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
