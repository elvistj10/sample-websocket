'use strict';

/* Controllers */

angular.module('springWs.controller', [])
    .controller('WebSocketCtrl',['$scope', 'ConnSocket', function ($scope, connSocket) {

    console.clear();
    $scope.pesan = "Dancing Queen . . .";
    var endpoint = 'http://localhost:8080/websocketEndpoint';

        var initStompClient = function() {
            connSocket.init(endpoint);
            
            connSocket.connect(function(frame) {

                document.getElementById("status").innerHTML = frame + " (connected to : " + endpoint + ")";

                connSocket.subscribe('/topic/pesan', function (message) {
                    document.getElementById("serverReply").innerHTML += message.body + "<br>";
                });
                  
            }, function(error) {
                document.getElementById("status").innerHTML = error;
                
            });
        };

        $scope.connectWebSocket = function(){
            initStompClient();
        };

        $scope.shcedulling5 = function(){
            connSocket.subscribe('/topic/schedule5', function (message) {
                document.getElementById("scheduller5").innerHTML += message.body + "<br>";
            });
        };

        $scope.shcedulling10 = function(){
            connSocket.subscribe('/topic/schedule10', function (message) {
                document.getElementById("scheduller10").innerHTML += message.body + "<br>";
            });
        };

        $scope.send = function(){
            connSocket.send("/app/clientMessage/" + $scope.pesan);
        };

        $scope.disconnectWebsocket = function(){
            connSocket.disconnect();
            document.getElementById("status").innerHTML = "disconnected . . .";
        };

}]);