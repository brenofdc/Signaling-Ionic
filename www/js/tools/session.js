(function () {
    angular
        .module('signaling')
        .factory('Session', Service);
    Service.$inject = ['UserStorage'];
    function Service(UserStorage) {
        return {
            getCurrentUser: function(){
                return UserStorage.getUser();
            },
            hasUserAuthenticated: function(){
                return this.getCurrentUser() !== null;
            },
            authenticate: function(user){
                return UserStorage.setUser(user);
            },
            logout: function(){
                return UserStorage.setUser(null);
            }
        }
    }
})();
