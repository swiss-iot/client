var app = angular.module("sensorApp");
app.directive('deleteSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'SensorModel/deleteSensorDirectiveView.html',
        controller: function($scope, sensorModelService){
            $scope.deleteButton = true;
            $scope.deleteDisplay = false;
            $scope.startDelete = function(){
                $scope.deleteDisplay = true;
                $scope.deleteButton = false;
                $scope.detailsDisplay = false;
                $scope.editButton = false;
                $scope.measurementsButton = false;
                $scope.chartButton = false;
            }
            $scope.deleteSensor = function(gatewayAddress, clientAddress, sensors, sensor){
                var idx = sensors.indexOf(sensor);
                if(idx > -1){
                    sensors.splice(idx, 1);
                }
                sensorModelService.deleteSensors(gatewayAddress, clientAddress);
            };
            $scope.cancelDeleteSensor = function(){
                $scope.deleteDisplay = false;
                $scope.deleteButton = true;
                $scope.detailsDisplay = true;
                $scope.editButton = true;
                $scope.measurementsButton = true;
                $scope.chartButton = true;
            };
        }
    }
});