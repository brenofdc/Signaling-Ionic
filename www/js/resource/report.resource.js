(function () {
    angular
        .module('signaling')
        .factory('ReportResource', Service);
    Service.$inject = ['$q', 'ResourceFactory'];
    function Service($q, ResourceFactory) {
        var Resource = ResourceFactory.make("/api/report/:id/:email/:action");
        return {
            createReport: function (reportData) {
                var newReport = new Resource(reportData);
                var promise = $q.defer();
                newReport.$save().then(
                    function(){
                      promise.resolve();
                    },
                    function(response){
                        promise.reject(response.reason);
                    }
                );

                return promise.promise;
            },
            closeReport: function (id) {
                var report = new Resource();
                var promise = $q.defer();
                report.$update({id: id, action: 'close'}).then(
                    function(){
                      promise.resolve();
                    },
                    function(response){
                      promise.reject(response.reason);
                    }
                );

                return promise.promise;
            },
            getReport: function(id){
                var report = new Resource();
                var promise = $q.defer();
                report.$get({id: id}).then(
                    function(response){
                      promise.resolve(response.data);
                    },
                    function(response){
                        promise.reject(response.reason);
                    }
                );

                return promise.promise;
            },
            getAllReports: function(){
                var reports = new Resource();

                var promise = $q.defer();
                reports.$get().then(
                    function(response){
                      promise.resolve(response.data);
                    },
                    function(response){
                        promise.reject(response.reason);
                    }
                );

                return promise.promise;
            },
            getUserReports: function(email){
              var report = new Resource();
              var promise = $q.defer();
              report.$get({email: email, action: 'by-user'}).then(
                function(response){
                  promise.resolve(response.data);
                },
                function(response){
                  promise.reject(response.reason);
                }
              );

              return promise.promise;
            },
            editReport: function(id, newReportData){
                var report = new Resource(newReportData);

                var promise = $q.defer();
                report.$update({id: id}).then(
                    function(response){
                      promise.resolve(response.data);
                    },
                    function(response){
                      promise.reject(response.reason);
                    }
                );

                return promise.promise;
            },
            deleteReport: function(id){
                var report = new Resource();

                var promise = $q.defer();
                report.$delete({id: id}).then(
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
