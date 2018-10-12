(function(){
    'use strict';
    var app = angular.module('sensorApp');
    app.controller('accountEmailCtrl', function($scope, $location, autentificationService,$sessionStorage){
        var vm  = this;
        $scope.sendCode = function(emailAddress){
            $sessionStorage.accountEmail = emailAddress;
            $scope.email = {email: emailAddress}
            autentificationService.getActivationCode($scope.email)
                .then(function(response){
                    $location.path("/logIn/accountEmail/activateAccount")
                })
                .catch(function(response){
                    console.log("Error!")
                })
        }
    })
}())