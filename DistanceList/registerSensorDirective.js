var app = angular.module("sensorApp");
app.directive('registerSensor', function(){
    return { 
        restrict: 'E',
        templateUrl: 'DistanceList/registerSensorDirectiveView.html',
        controller: function($scope, distanceService){
            $scope.registerDisplay = false;
            $scope.registerButton = true;
            $scope.startRegister = function(){
            $scope.distanceList = false;
                if($scope.registerDisplay == false){
                    $scope.registerDisplay = true;
                    $scope.registerButton = false;
                } 
        };
        $scope.sensorRegister = function(registerProductionDate, registerUploadInterval, registerBatchSize, registerGatewayAddress, registerClientAddress, sensors){
            $scope.registerDisplay = false;
            $scope.registerButton = true;
            $scope.distanceList = true;
            var sensorPost = {'sensorTypeId':"14",'productionDate':registerProductionDate, 'uploadInterval':registerUploadInterval, 'batchSize':registerBatchSize, 'gatewayAddress':registerGatewayAddress,'clientAddress':registerClientAddress,userId: "1" }
            distanceService.insertSensors(sensorPost);
            sensors.unshift(sensorPost);
            $scope.registerProductionDate ='';
            $scope.registerUploadInterval = '';
            $scope.registerBatchSize = '';
            $scope.registerGatewayAddress = '';
            $scope.registerClientAddress = '';
        };
        $scope.cancelRegisterSensor = function(){
            $scope.registerDisplay = false;
            $scope.registerButton = true;
            $scope.distanceList = true;
            $scope.registerProductionDate ='';
            $scope.registerUploadInterval = '';
            $scope.registerBatchSize = '';
            $scope.registerGatewayAddress = '';
            $scope.registerClientAddress = '';
        };
        }
    }
});