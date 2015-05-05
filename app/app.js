var app = angular.module('myApp', ['firebase', 'ngTouch', 'ng-fire-alarm', 'windowEventBroadcasts'])

	function MainController($scope, $firebase, $timeout) {
		var ref = new Firebase("https://LAMAINTERACTIVES.firebaseio.com/");
		var init = true;
		var newpostsRef ;
		$scope.range = "";
		$scope.votes = [];
		
		$scope.rangevalue = 0;
		
		$scope.hideRange = true;
		
		var votes = ref.child('votes');

		votes.$toAlarm({collection: true}) // will transform object into native array
		.$thenNotify(function(returned_votes){ // notify you on ANY changes 
		
			var switches = returned_votes[returned_votes.length-1];
			
			console.log("switches  "+switches);
			
			if(switches == "Start" || switches == "reset"){
				$scope.hideRange = true;
			}
			else{
				$scope.hideRange = false;
			}
			
			if(init){
					newpostsRef = votes.child(returned_votes.length+1);
					newpostsRef.push({
					vote: 0
				});
				
				newpostsRef.set({ vote: 0});
				
				init = false;
			}
			
			if(switches == "reset"){
				 
				 newpostsRef.remove();
				 var btn = ref.child("votes");
				 btn.update({ start: "Start"});
				 
				 init = true;
				 $scope.rangevalue  = 0;
				 
				 
			}
			
			newpostsRef.onDisconnect().remove();
			newpostsRef.onDisconnect().set(null);
			
			//$scope.votes =  returned_votes;
			console.log(returned_votes);
			//console.log(returned_votes[returned_votes.length-1]);
			
		});
		
		$scope.update = function(val){
			var num = parseInt(val);
			if( num > 0){
				num = parseInt(100 + num);
			}else{
				num = parseInt(100 + num);
			}
			newpostsRef.set({ vote: num});
		}
		
		// $windowBlur $windowFocus $windowHide* $windowShow*
		$scope.$on('$windowBlur', function(broadcastEvent, browserEvent) {
			// Something useful, like refreshing stale data, perhaps?
			$scope.rangevalue = 0;
			newpostsRef.remove();
			//newpostsRef.set({ vote: 0});
		});
	}
	
	function displayController($scope, $firebase, $timeout) {
		var ref = new Firebase("https://LAMAINTERACTIVES.firebaseio.com/");

		$scope.total = 0;
		
		var init = true;
		
		$scope.totalVote = 0;
		
		$scope.totalpercentage = 0;
	
		//$scope.likeImg = "images/like/like12.png";
		
		var votes = ref.child('votes');
		
		votes.$toAlarm({collection: true}) // will transform object into native array
		.$thenNotify(function(returned_votes){ // notify you on ANY changes 
				
			$scope.totalVote = 0;
			$scope.totalpercentage = 0;
			//console.log($scope.total[1].vote);
			
			var switches = returned_votes[returned_votes.length-1];
			
			
			if(switches == "Start"){
					
					$scope.likeImg = "images/like/like"+12+".png";
					
			}else{
		
				for (var i = 0; i < returned_votes.length-1; i++) {
			
					$scope.totalVote += parseInt(returned_votes[i].vote);
					
					if($scope.totalVote == 0){
						$scope.totalVote = 1;
					}
				
					var num = returned_votes.length-1;
					
					if(num < 1){
						num = 1;
					}
				
				
					$scope.totalpercentage = parseInt(($scope.totalVote/((num) * 200)) * 100);
					
					var imageNumber = Math.round(($scope.totalpercentage * 25)/ 100);
					
					$scope.likeImg = "images/like/like"+imageNumber+".png";
				
				}
			}
			
		});

	}
	
	function ctrlController($scope, $firebase, $timeout) {
		var ref = new Firebase("https://LAMAINTERACTIVES.firebaseio.com/");
			
		var init = true;
		
		$scope.btnText = "Start";
		
		var votes = ref.child('votes');
		votes.$toAlarm({collection: true}) // will transform object into native array
		.$thenNotify(function(returned_votes){ // notify you on ANY changes 
			for (var i = 0; i < returned_votes.length-1; i++) {
				
					/* if(init){
						ref.set({ start: "start" });
						init = false;
					} */
				$scope.returned_votes = returned_votes;
			}
		});
		
				
		$scope.reset = function(){
			var btn = ref.child("votes");
			//btn.set(null);
			btn.update({ start: "reset"});
		}
		
		$scope.hardreset = function(){
			var btn = ref.child("votes");
			btn.set(null);
			btn.update({ start: "reset"});
			
		}
		
		
		$scope.start = function(){
		
			if(	$scope.btnText == "Start" || $scope.btnText == "reset"){
				$scope.btnText = "Stop";
			}else{
				$scope.btnText = "Start";
			}
			
			var btn = ref.child("votes");
			
			console.log($scope.returned_votes);
			
			btn.update({ start: $scope.btnText });

		}
	}
