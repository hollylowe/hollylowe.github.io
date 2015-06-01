var app = angular.module("dancerForm", []).controller('dance-info', function ($scope, $http) {

});

var choreoIDList = []; 
app.controller('dance-info', function($scope, $compile) {
  Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
  var ChoreoForm = Parse.Object.extend("ChoreoForm");
  var query = new Parse.Query(ChoreoForm);
  var dances = [];
 
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        if (object.get('inShow') == "true"){
          choreoIDList.push([object.get('Name'), object.get('Cid')]);
          dances.push(["" + object.get('Name') + " " + object.get('q4') + " " + object.get('AssignedTime'), object.get('Cid')]);
        }
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  }).then(function(object) {
          console.log(choreoIDList);
          $scope.dances = dances;
          $scope.$apply(); 
      });

  

      Sortable.create(foo, {
      group: {
        name: 'foo',
        clone: false,
        put: ['qux']
      },
      animation: 100,
      
    });

    Sortable.create(qux, {
      group: {
        name: 'qux',
        put: ['foo', 'bar']
      },
      animation: 100
    });

    

});

app.controller('submitCtrl', function($scope, $compile) {



	$scope.submit = function() {
       Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");    
        var DancerForm = Parse.Object.extend("DancerForm");
        var dancerForm = new DancerForm();

        var choreoList = [];
        for (var c = 0; c < choreoIDList.length; c++){
          if ($('#qux #timeitem').text().indexOf(choreoIDList[c][0]) != -1){
            choreoList.push(choreoIDList[c][1]);
          }
        }
        console.log(choreoList);

        dancerForm.save({ DancerName: $('#dancerName').val(), 
                          DancerPhoneNumber: $('#phoneNumber').val(),
                          DancerEmail: $('#email').val(),
                          college: $('#college').val(),
                          grade: $('#grade').val(),
                          experience: $('#experience').val(),
                          pointe: $scope.pointeValue,
                          hipHop: $scope.hipValue,
                          tap: $scope.tapValue, 
                          contemporary: $scope.contempValue,
                          ballet: $scope.balletValue, 
                          african: $scope.africanValue,
                          modern: $scope.modernValue, 
                          bollywood: $scope.bollywoodValue, 
                          breakdance: $scope.breakdanceValue,
						              //times: $('#qux #timeitem').text()
                          times: choreoList.toString(),
                          assignedDances: []
                          // inShow: "false"
                           }).then(function(object) {
                            //console.log($('#qux #timeitem').text());
                           	// console.log($('#college').val());
                           	// console.log($('#grade').val());
                           	// console.log($('#experience').val());
          //alert("Thank you for submitting your information!");
          swal("Thank you!", "Your information has been submitted!", "success");
          //console.log($('#qux #timeitem').text());
      });
    }
});





