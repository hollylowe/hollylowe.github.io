var app = angular.module("dancerForm", []).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/proposal',
    {
      templateUrl:    'proposal.html',
      controller:     'proposalCtrl'
    });
    $routeProvider.when('/submit',
    {
      templateUrl:    'submit.html',
      controller:     'submitCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/proposal',
      controller:     'proposalCtrl', 
    }
  );
});

app.controller('NavCtrl', 
['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'proposal';
    return page === currentRoute ? 'active' : '';
  };
  
    $scope.loadProposal = function () {
        $location.url('/proposal');
    };
    
      $scope.loadSubmit = function () {
        $location.url('/submit');
    };
}]);

app.controller('proposalCtrl', function($scope, $compile) {
  console.log('inside proposal controller');
  // Sortable.create(listWithHandle, {
  //   handle: '.my-handle',
  //   animation: 150
  // });

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

app.controller('submitCtrl', function($scope, $compile){
    $scope.submit = function() {
       Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");    
        var ChoreoForm = Parse.Object.extend("ChoreoForm");
        var choreoForm = new ChoreoForm();

        choreoForm.save({ Name: $('#dancerName').val(), 
                          PhoneNumber: $('#phoneNumber').val(),
                          Email: $('#email').val(),
                          q1: $('#q1').val(),
                          q2: $('#q2').val(),
                          q3: $('#q3').val(),
                          q4: $('#q4').val(),
                          q5: $('#q5').val(),
                          q6: $('#q6').val(),
                          q7: $('#q7').val(),
                          q8: $('#q8').val(),
                          q9: $('#q9').val(),
                          min: $('#min').val(),
                          max: $('#max').val(),
                          flexible: $('#flexible').val(),
                          times: $('#qux #timeitem').text(),
                          inShow: "false"
                        }).then(function(object) {
                          swal("Thank you!", "Your information has been submitted!", "success");
          });
      }
});


app.controller('submitDancersCtrl', function($scope, $compile){
    $scope.submitDancers = function() {
       Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");    
        var ChoreoForm = Parse.Object.extend("ChoreoForm");
        var query = new Parse.Query(ChoreoForm);

        var arr = $('#dancers').val().split(',');

        query.equalTo("Name", $('#choreoName').val());
        query.find({
          success: function(results) {
              
              for (var i = 0; i < results.length; i++) { 
                 var object = results[i];
              }
              if (object != undefined){
                object.save('dancers', arr).then(function(object) {
                          swal("Thank you!", "Your information has been submitted!", "success");
                        });
              }
              else {
                 swal("That name wasn't found", "Please enter your name exactly as it was on your proposal", "error");
              }
          },
          error: function(error) {
             swal("That name wasn't found", "Please enter your name exactly as it was on your proposal", "error");
          }
        });
      }
});









        