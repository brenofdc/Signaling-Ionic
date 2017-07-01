(function () {
  angular
    .module('signaling')
    .factory('UserStorage', Service);
  Service.$inject = ['Storage'];
  function Service(Storage) {
    return {
      setUser: function(user){
        Storage.put("session", user);
      },
      getUser: function(){
        try{
          return Storage.get("session");
        }
        catch (e){
          return null;
        }
      }
    }
  }
})();
