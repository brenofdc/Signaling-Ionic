(function () {
    angular
        .module('signaling')
        .factory('UserStorage', Service);
    Service.$inject = ['LocalStorage'];
    function Service(LocalStorage) {
        return {
            setUser: function(user){
                LocalStorage.put("session", user);
            },
            getUser: function(){
                try{
                    return LocalStorage.get("session");
                }
                catch (e){
                    return null;
                }
            }
        }
    }
})();
