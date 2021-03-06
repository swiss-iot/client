(function(){
var app = angular.module("sensorApp");
app.directive('editDirective', function(){
    return {
        restrict: 'E',
        templateUrl: 'SensorModel/editSensorView.html',
        controller: function($scope, SENSOR_TYPE, $localStorage, $sessionStorage, sensorModelService, $timeout){
            $scope.editDisplay = false;
            $scope.startEdit = function(){
                document.getElementById('editButton').style.backgroundColor = '#168040';
                document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('details').style.backgroundColor = '#3CDB41';
                document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';

                if($scope.editDisplay == false){
                    $scope.editDisplay = true;
                    $scope.editLocationDisplay = false;
                    $scope.deleteDisplay = false;
                    $scope.showGateways = false;
                    $scope.chartDisplay = false;
                    $scope.measurementsDisplay = false; 
                    $scope.name = $sessionStorage.name;
                    $scope.measurementsButton = false;
                    $scope.chartButton = false;
                    $scope.sensorEditError = false;
                    $scope.sensorEditSuccess = false;
                    $scope.detailsDisplay = false;
                    $scope.editLocation = false;
                   
                }
            }
            if ($localStorage.email && $localStorage.password){
              var encodedData = btoa($localStorage.email +':'+ $localStorage.password)
            }else{
                var encodedData = btoa($sessionStorage.email +':'+ $sessionStorage.password)
            }
            sensorModelService.getSensorsById(encodedData, $sessionStorage.netId, $sessionStorage.sensorId)
                        .then(function(sensor){
                                var name = sensor.name;
                                var uploadInterval = sensor.uploadInterval;
                                var latitude = sensor.latitude;
                                var longitude = sensor.longitude;
                                $scope.editSensor = {name, uploadInterval, latitude, longitude};
                                
                            $scope.sensorEdit = function(editName,  editDays, editHours, editMinutes){
                                if (editName){
                                    $scope.editSensor.name = editName
                                } 
                                if(editDays || editHours || editMinutes){
                                    if (editDays == null){
                                        editDays = 0;
                                    }
                                    if (editHours == null){
                                        editHours = 0;
                                    }
                                    if(editMinutes == null){
                                        editMinutes = 0;
                                    }
                                    $scope.editSensor.uploadInterval = (editDays* 1440) + (editHours* 60) + editMinutes;
                                }
                                if(!editName && !editDays && !editHours && !editMinutes){
                                    $scope.editSensor ='';
                                } 
                                sensorModelService.updateSensors(encodedData , $sessionStorage.netId, $sessionStorage.sensorId, $scope.editSensor)
                                    .then(function(response){
                                        if($scope.editSensor.uploadInterval < sensor.uploadInterval){
                                            $scope.ui = true;
                                            $scope.uploadIntMessage = response.message;
                                        }
                                        $scope.sensorEditError = false;
                                        $scope.sensorEditSuccess = true;
                                        $scope.sensor.uploadInterval=$scope.editSensor.uploadInterval;
                                        $scope.sensor.name = $scope.editSensor.name;
                                        $timeout(function(){
                                            $scope.editButton = true;
                                            $scope.editDisplay = false;
                                            $scope.detailsDisplay = true;
                                            $scope.deleteButton = true;
                                            $scope.measurementsButton = true;
                                            $scope.editLocation = true;
                                            $scope.chartButton = true;
                                            $scope.sensorEditError = false;
                                            $scope.sensorEditSuccess = false;
                                            $scope.cards = false;
                                            $scope.grid = true;
                                            $scope.backButton = true;
                                            document.getElementById('hideDetailsButton').style.backgroundColor = '#4DA8F2';
                                            document.getElementById('details').style.backgroundColor = '#168040';
                                            document.getElementById('gatewaysButton').style.backgroundColor = '#4DA8F2';
                                            document.getElementById('chartButton').style.backgroundColor = '#4DA8F2';
                                            document.getElementById('editButton').style.backgroundColor = '#3CDB41';
                                            document.getElementById('mapButton').style.backgroundColor = '#4DA8F2';
                                            document.getElementById('deleteButton').style.backgroundColor = '#E88282';
                                            document.getElementById('gridButton').style.backgroundColor = '#4DA8F2';
                                        }, 1000)
                                        
                                    })
                                    .catch(function(response){
                                        $scope.message = response.data.message;
                                        if(!editName && !editDays && !editHours && !editMinutes){
                                            $scope.message ='You did not edit any field!';
                                        }
                                        $scope.sensorEditError = true;
                                        $scope.sensorEditSuccess = false;
                                    });
                            };
                        })
        }
    }
});
}());
