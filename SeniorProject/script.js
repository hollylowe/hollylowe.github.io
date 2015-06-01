var app = angular.module("plunker", []).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/home',
    {
      templateUrl:    'home.html',
      controller:     'HomeCtrl'
    });
    $routeProvider.when('/choreo',
    {
      templateUrl:    'choreo.html',
      controller:     'ChoreoCtrl'
    });
    $routeProvider.when('/dancers',
    {
      templateUrl:    'dancers.html',
      controller:     'DancersCtrl'
    });
    $routeProvider.when('/auditions',
    {
      templateUrl:    'auditions.html',
      controller:     'auditionsCtrl'
    });
    $routeProvider.when('/schedule',
    {
      templateUrl:    'schedule.html',
      controller:     'scheduleCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/home',
      controller:     'HomeCtrl', 
    }
  );
});

app.controller('NavCtrl', 
['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };
  
    $scope.loadHome = function () {
        $location.url('/home');
    };
    
      $scope.loadChoreo = function () {
        $location.url('/choreo');
    };
    
      $scope.loadDancers = function () {
        $location.url('/dancers');
    };
    $scope.loadAuditions = function () {
        $location.url('/auditions');
    };
    $scope.loadSchedule = function () {
        $location.url('/schedule');
    };
    
}]);

app.controller('ChoreoCtrl', function($scope, $compile) {
  console.log('inside about controller');

});

app.controller('HomeCtrl', function($scope, $compile) {
  console.log('inside home controller');

});

app.controller('DancersCtrl', function($scope, $compile) {
  console.log('inside contact controller');

});

app.controller('TodoController', 
['$scope', '$location', function ($scope, $location) {
  $scope.todos = [
      {text:'Email Dancers Information', done:true},
      {text:'Print out Note Sheets', done:false}];
 
    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
    };
 
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    $scope.clearCompleted = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
}]);  








