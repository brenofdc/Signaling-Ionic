(function() {
  angular
    .module('signaling')
    .filter('reportId', FilterScope);

  FilterScope.$inject = [];
  function FilterScope(){
    return Filter;

    function Filter(id){
      var zeroes = 7;
      var str = id + "";
      while (str.length < zeroes) str = "0" + str;
      return str;
    }
  }

})();
