

var app = angular.module('MI', ['ngResource','ngRoute']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'AddUser'

        })
        .when('/events-reg/', {
            templateUrl: 'partials/events.html',
            controller: 'SendMail'
            })
        .when('/users/', {
             templateUrl: 'partials/users.html',
             controller: 'Test'
             })
        .otherwise({
            redirectTo: '/'
        });
}]);


var mi;


app.controller('AddUser', ['$scope', '$resource', '$location', '$window',
    function($scope, $resource, $location,$window){
        $scope.register = function(){
       
         var Users = $resource('/api/insert');
            
           Users.save($scope.user,function()
             {  
               console.log('works');
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


app.controller('SendMail', ['$scope', '$resource', '$location', '$window',
      function($scope, $resource, $location) {
        var Users = $resource('/api/insert');
        
          Users.get(function(insert){
            console.log(insert); 
             $scope.user = insert;
            console.log($scope.user);
           });
        }]);

app.controller('Test', ['$scope', '$resource', '$location', '$window',
      function($scope, $resource, $location) {
        var Users = $resource('/users');
             
             Users.get(function(users){
                $scope.user = users ;
                console.log($scope.user); 
                  });
            
        }]);

