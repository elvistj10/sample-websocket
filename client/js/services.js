'use strict';

/* Services */

angular.module('springWs.services', [])
	.factory('ConnSocket', ['$rootScope', function($rootScope) {
			var stompClient;
			
			var wrappedSocket = {
					
					init: function(url) {
						stompClient = Stomp.over(new SockJS(url));
					},
					connect: function(successCallback, errorCallback) {
						
						stompClient.connect({}, function(frame) {
							$rootScope.$apply(function() {
								successCallback(frame);
							});
						}, function(error) {
							$rootScope.$apply(function(){
								errorCallback(error);
							});
				        });
					},
					disconnect: function() {
						stompClient.disconnect();
					},
					subscribe : function(destination, callback) {
						stompClient.subscribe(destination, function(message) {
							  $rootScope.$apply(function(){
								  callback(message);
							  });
				          });	
					},
					unsubscribe : function(destination, callback) {
						stompClient.unsubscribe(destination, callback);
					},
					send: function(destination, headers, object) {
						stompClient.send(destination, headers, object);
					}
			}
			
			return wrappedSocket;
		
	}]);