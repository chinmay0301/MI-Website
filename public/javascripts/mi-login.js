var app = angular.module('MI', ['ngResource','ngRoute','facebook']);


app.config(['$routeProvider','FacebookProvider', function($routeProvider,FacebookProvider){
    
    FacebookProvider.init(1243571392349731);

    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'AddUser'

        })
        .when('/events-reg/', {
            templateUrl: 'partials/events.html'
            })
        .when('/fb-login/',{
            templateUrl:'partials/fb_login.html',
            controller:'FbLoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('FbLoginCtrl', ['$scope', '$resource', '$location','Facebook',function($scope, $resource, $location,Facebook){
    
    $scope.connected = false;
    $scope.registered = false;
    $scope.showForm = false;
    
    Facebook.getLoginStatus(function(response){
       
        console.log(response);      
        if(response.status=="connected") {                      //connected , dont show form and show MI number and so on.
            $scope.connected = true;
            $scope.userID = response.authResponse.userID;
            $scope.register(response);                      
        }

    });


    $scope.addUser = function() {
        console.log("Entering new user");
        var newUser = $resource('/api/insert');
        newUser.save($scope.user,function(){
            $scope.showForm = false;
            $scope.registered = true;
            $scope.connected = true;
        });
    }


    $scope.login = function() {                                 //logged in, register
        Facebook.login(function(response) {
            console.log(response);
            $scope.connected = true;
            $scope.userID = response.authResponse.userID;
            $scope.register(response);
        }, {scope:'public_profile,email,user_birthday',return_scopes:true});
    };

    $scope.register = function(fbresponse) {

        var FacebookUser = $resource('/api/insert/fbLogin');
        // console.log($scope.userID + "\n\n\n\n " + "y");

        FacebookUser.save({'fb_id':$scope.userID},function(res) {       // find the userID and check its there or not
            
            console.log(res);
            if(res.message=="not_registered") {
                console.log(1);
                //not registered, get all data and show the form
                Facebook.api('me?fields=name,email,birthday,gender',function(response) {
                    console.log("Response");
                    console.log(response);
                    $scope.user = {
                        'name':response.name,
                        'email':response.email,
                        'gender':response.gender,
                        'fb_id':$scope.userID,
                        'dob':response.dob
                    };
                    $scope.showForm = true;                     
                });
                
            }
            else {
                $scope.user = res;
                $scope.registered = true;
                console.log($scope.user);
            }

        });
    };

}]);



app.controller('AddUser', ['$scope', '$resource', '$location', function($scope, $resource, $location){
        $scope.register = function(){
        var Users = $resource('/api/insert');
           Users.save($scope.user,function()
             {
               console.log('works');
             });
        };
    }]);
