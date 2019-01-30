var app = angular.module("sensorApp");
app.directive('deleteSensor', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/deleteSensorDirectiveView.html',
        controller: function($scope, sensorModelService, $window, $timeout, $localStorage, $sessionStorage){
            $scope.deleteButton = true;
            $scope.deleteDisplay = false;
            $scope.startDelete = function(){
                $scope.deleteDisplay = true;
                $scope.deleteButton = false;
                $scope.detailsDisplay = false;
                $scope.editButton = false;
                $scope.editLocation = false;
                $scope.measurementsButton = false;
                $scope.chartButton = false;
                $scope.cards = false;
            }
            if($localStorage.email && $localStorage.password){
                $scope.encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                $scope.encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            if($sessionStorage.cards == true){
                $scope.gaCa = function(ga, ca){
                    $scope.del = true;
                    $scope.gaAdd = ga;
                    $scope.clAdd = ca;

                } 
            }
            var timer;
            $scope.deleteSensor = function(gatewayAddress, clientAddress){
                sensorModelService.deleteSensors(gatewayAddress, clientAddress, $scope.encodedData);
                timer = $timeout(function(){
                    $window.location.reload();
                },300);
            };
            $timeout.cancel(timer);
            $scope.cancelDeleteSensor = function(){
                $scope.deleteDisplay = false;
                $scope.deleteButton = true;
                $scope.detailsDisplay = true;
                $scope.editLocation = true;
                $scope.editButton = true;
                $scope.measurementsButton = true;
                $scope.chartButton = true;
                if($sessionStorage.cards == true){
                    $window.location.reload();
                    $timeout(function(){
                        $scope.cards = true;
                        $scope.grid = false;
                    }, 100)
                } else{
                    $scope.cards = false;
                    $scope.grid = true;
                }
            };
        }
    }
});
