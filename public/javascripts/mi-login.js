

var app = angular.module('MI', ['ngResource','ngRoute']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'AddUser'

        })
        .when('/events-reg/', {
            templateUrl: 'partials/events.html'
            })
        .otherwise({
            redirectTo: '/'
        });
}]);





app.controller('AddUser', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.register = function(){
        var Users = $resource('/api/insert');
           Users.save($scope.user,function()
             {
               console.log('works');
               
             });
             //$location.path('/events-reg');
        };
    }]);
