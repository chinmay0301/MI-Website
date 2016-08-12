

var app = angular.module('MI', ['ngResource','ngRoute']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'AddUser'

        })
        .when('/events-reg/', {
            templateUrl: 'partials/events.html',
            controller: 'DisplayMi'
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
               $location.path('/events-reg');
             });
           //Users = $resource('/api/display');
             //Users.query(function(obj){
               //   var mi_num;
                  /*if(obj.status = true) 
                  { 
                   mi_num = obj.data;
                  console.log('MI_num display');
                  }*/
                 // if(obj.status == true)
                  //{
                  // mi_num = obj.message; 
                   //console.log('error bro');   
                 // }
                 // });           
             // $window.alert(mi_num);
$location.path('/events-reg');
};
    }]);


app.controller('DisplayMi', ['$scope', '$resource', '$location', '$window',
      function($scope, $resource, $location) {
        var Users = $resource('/api/insert');
            Users.query(function(insert){
             $scope.mi_num = insert.new_mi_no;
             $window.alert(user);
            }); 
        }]);



