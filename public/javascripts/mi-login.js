

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





app.controller('AddUser', ['$scope', '$resource', '$location', '$window',
    function($scope, $resource, $location,$window){
        $scope.register = function(){
       
         var Users = $resource('/api/insert');
            
           Users.save($scope.user,function()
             {  
               console.log('works');
             });
           Users.query(function(obj){
                  if(obj.status = true) 
                  $scope.mi_num = obj.new_mi_no;
                  else 
                  $scope.mi_num = obj.message;    
                 });           
              $window.alert($scope.mi_num);     
$location.path('/events-reg');
};
    }]);
