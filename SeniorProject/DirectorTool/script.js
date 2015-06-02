
var app = angular.module("plunker", [ 'googlechart']).
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
     $routeProvider.when('/times',
    {
      templateUrl:    'times.html',
      controller:     'timesCtrl'
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
    $scope.loadTimes = function (){
        $location.url('/times');
    };

    
}]);
app.controller('auditionsCtrl', function($scope, $compile, $timeout) {

  $scope.dancerSignInSheet = function(){

    Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
    var DancerForm = Parse.Object.extend("DancerForm");
    var query = new Parse.Query(DancerForm);
    var data = [];
      
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          object.save('dancerId', i + 1);
          data.push({"name" : object.get('DancerName'), "id": i + 1, "sig": ""});       
        }
      },
      error: function(error) {
        sweetAlert("Oops...", "Something went wrong!", "error");
      }
    }).then(function(object) {
        var columns = [
        {title: "Dancer Name", key: "name"}, 
        {title: "Dancer Audition Number", key: "id"}, 
        {title: "Sign in", key: "sig"}];

        var options = {
          padding: 3, // Horizontal cell padding
          fontSize: 10,
          lineHeight: 20,
          renderHeader: function (doc, pageNumber, settings) {}, // Called before every page          
          renderFooter: function (doc, lastCellPos, pageNumber, settings) {}, // Called at the end of every page
          renderHeaderCell: function (x, y, width, height, key, value, settings) {
              doc.setFillColor(238, 238, 238); 
              doc.setTextColor(133, 77, 201);
              doc.setFontStyle('bold');
              doc.rect(x, y, width, height, 'B');
              y += settings.lineHeight / 2 + doc.internal.getLineHeight() / 2 - 2.5;
              doc.text('' + value, x + settings.padding, y);
          },
          renderCell: function (x, y, width, height, key, value, row, settings) {
              doc.setFillColor(row % 2 === 0 ? 245 : 255);
              doc.rect(x, y, width, height, 'S');
              y += settings.lineHeight / 2 + doc.internal.getLineHeight() / 2 - 2.5;
              doc.text('' + value, x + settings.padding, y);
          },
          margins: {horizontal: 40, top: 50, bottom: 50}
       };

        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, data, options);
        doc.save('DancerSignInSheets.pdf');
    });
  };

  $scope.choreoNoteSheet = function() {
    var doc = new jsPDF('p', 'pt');
    Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
    var DancerForm = Parse.Object.extend("DancerForm");
    var ChoreoForm = Parse.Object.extend("ChoreoForm");

    var queryDancer = new Parse.Query(DancerForm);
    var queryChoreo = new Parse.Query(ChoreoForm);
    var dancers = []; 
    var choreos = []; 
      
    queryDancer.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          dancers.push(object);      
        }
      },
      error: function(error) {
        sweetAlert("Oops...", "Something went wrong!", "error");
      }
    }).then (function(object) {
          queryChoreo.find({
            success: function(results) {
              for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                choreos.push(object);      
              }
            },
            error: function(error) {
              sweetAlert("Oops...", "Something went wrong!", "error");
            }
          }).then (function(object) {
          console.log("testing");
          var last = false; 
            for (var i = 0; i < choreos.length; i++){
              var interestedDancers = "";

              for (var j = 0; j < dancers.length; j++){
                var dancerPrefs = dancers[j].get('times').split(",");
                //console.log("DANCER PREFS: " + dancerPrefs);

                for (var k = 0; k < dancerPrefs.length; k++){

                  if (choreos[i].get('Cid').indexOf(dancerPrefs[k]) != -1 &&
                    interestedDancers.indexOf(dancers[j].get('dancerId')) === -1){
                    interestedDancers += dancers[j].get('dancerId') + ", ";
                      //console.log(dancers[j].get('dancerId') + ", ");
                  }

                }
              }
              if (i == choreos.length -1){
                last = true; 
              }
              // console.log(interestedDancers);
              interestedDancers = interestedDancers.substring(0, interestedDancers.length - 2);
              interestedDancers = interestedDancers.split(", ");
              interestedDancers.sort(); 
              interestedDancers = interestedDancers.toString(); 
             // console.log(interestedDancers);


              addToDoc(choreos[i].get('Name'), interestedDancers, doc, last);
            }
        }).then(function() {
          doc.save('ChoreoNoteSheet.pdf');
        });
      });
   }; //end function


   addToDoc = function(name, interestedDancers, doc, last){

        doc.setLineWidth(0.2);
        var columns = [
        {title: "Dream Cast", key: "name"}, 
        {title: "Other Dancers I Would Like to Work With", key: "id"}, 
        {title: "Dancers That Caught My Eye", key: "sig"}];
        var data = [];

        for (var i = 0; i < 32; i++){
           data.push({"name" : "", "id": "", "sig": ""});  
        }
       
        var header = function (doc, pageCount, options) {
            doc.setFontSize(20);
            doc.text(name, options.margins.horizontal, 50);
            doc.setFontSize(14);
            doc.text("Interested Dancers: " + interestedDancers, options.margins.horizontal, 70);
            doc.setFontSize(options.fontSize);
        };

        var options = {
          padding: 3, // Horizontal cell padding
          fontSize: 10,
          lineHeight: 20,
          renderHeader: header, // Called before every page
          renderFooter: function (doc, lastCellPos, pageNumber, settings) {}, // Called at the end of every page
          renderHeaderCell: function (x, y, width, height, key, value, settings) {
              doc.setFillColor(238, 238, 238); // Asphalt
              doc.setTextColor(133, 77, 201);
              doc.setFontStyle('bold');
              doc.rect(x, y, width, height, 'B');
              y += settings.lineHeight / 2 + doc.internal.getLineHeight() / 2 - 2.5;
              doc.text('' + value, x + settings.padding, y);
          },
          renderCell: function (x, y, width, height, key, value, row, settings) {
              doc.setFillColor(row % 2 === 0 ? 245 : 255);
              doc.rect(x, y, width, height, 'S');
              y += settings.lineHeight / 2 + doc.internal.getLineHeight() / 2 - 2.5;
              doc.text('' + value, x + settings.padding, y);
          },
          margins: {horizontal: 40, top: 100, bottom: 50}
       };

        
        //var options = {renderHeader: header, margins: {horizontal: 40, top: 100, bottom: 50}};
        doc.autoTable(columns, data, options);
        if (!last){
          doc.addPage();
        }
        return doc; 
   }
}); //end controller




app.controller('ChoreoCtrl2', function($scope, $compile, $timeout) {
  var SelectedName; 
   Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
  var ChoreoForm = Parse.Object.extend("ChoreoForm");
  var query = new Parse.Query(ChoreoForm);

  refreshEmails = function(){
  
  var names = [];
  var emails = "";
  var emailsInShow = ""; 
  
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        // names[i] = object.get('Name');
        names[i] = object; 
        emails += object.get('Name') + " <" + object.get('Email') + ">; ";

        if (object.get('inShow') == "true"){
          emailsInShow += object.get('Name') + " <" + object.get('Email') + ">; ";
          object.save('Cid', i);
        }
      }

       console.log(names);
    },
    error: function(error) {
      //alert("Error: " + error.code + " " + error.message);
      sweetAlert("Oops...", "Something went wrong!", "error");
    }
  }).then(function(object) {
          $scope.Names = names;
          $scope.emails = emails;
          $scope.emailsInShow = emailsInShow;
          $scope.$apply(); 
      });

 }
 refreshEmails();
      
    $scope.addToShow = function () {

      if ($scope.button == "Add Choreographer to Show"){
        console.log(SelectedName.get('objectId'));
        SelectedName.save('inShow', "true");

        var ChoreoForm = Parse.Object.extend("ChoreoForm");
          var query = new Parse.Query(ChoreoForm);
          var names = [];
          
          query.find({
            success: function(results) {
              for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                // names[i] = object.get('Name');
                names[i] = object; 
              }
            },
            error: function(error) {
              //alert("Error: " + error.code + " " + error.message);
              sweetAlert("Oops...", "Something went wrong!", "error");
            }
          }).then(function(object) {
                  $scope.Names = names;
                  refreshGraphs(); 
                  refreshEmails(); 
                  $scope.button = "Remove Choreographer from Show";
                  $scope.$apply(); 
              });
        }
        else if ($scope.button == "Remove Choreographer from Show"){
          SelectedName.save('inShow', "false");
          var ChoreoForm = Parse.Object.extend("ChoreoForm");
            var query = new Parse.Query(ChoreoForm);
            var names = [];
            
            query.find({
              success: function(results) {
                for (var i = 0; i < results.length; i++) { 
                  var object = results[i];
                  // names[i] = object.get('Name');
                  names[i] = object; 
                }
              },
              error: function(error) {
                //alert("Error: " + error.code + " " + error.message);
                sweetAlert("Oops...", "Something went wrong!", "error");
              }
            }).then(function(object) {
                    $scope.Names = names;
                    refreshGraphs(); 
                    refreshEmails();
                    $scope.button = "Add Choreographer to Show";
                    $scope.$apply(); 
                });
        }

    };
    
     
    $scope.getChoreoInfo = function(name) {
      $scope.elements = "";
      var temp = "";
      var inShow = "false";
      
      console.log("in get info");

      var query = new Parse.Query(ChoreoForm);
      query.equalTo("Name", name);
      query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              SelectedName = object; 
              var times = object.get('times').match(/([A-Z])\w+ [0-9]+[a-z]+ [-] [0-9]+[a-z]+/g);
              var formattedTimes = "\n";

              for (var j = 0; j < times.length; j++){
                formattedTimes += times[j] + "\n";
              } 

              var flexible = "not flexible";
              if (object.get('flexible') == "on"){
                flexible = "flexible";
              }

              console.log(object.get('inShow'));
              if (object.get('inShow') == "true"){
                console.log("inshow 1");
                inShow = "true";
                $scope.button = "Remove Choreographer from Show";
              }
              else {
                $scope.button = "Add Choreographer to Show";
              }

              temp += "Name: " + object.get('Name') +
              "\n\nPhone Number: " + object.get('PhoneNumber') +
              "\n\nEmail: " + object.get('Email') +
              "\n\nWhat motivated you to choreograph for the Spring Dance Concert? " + object.get('q1') +
              "\n\nPrevious Choreographic Experience: " + object.get('q2') +
              "\n\nPotential Title for your piece: " + object.get('q3') +
              "\n\nStyle of choreography proposed: " + object.get('q4') +
              "\n\nBreifly describe the movement style and concept: " + object.get('q5') +
              "\n\nDoes your piece require any specific lighting/technical needs? Please explain. " + object.get('q6') +
              "\n\nMusic (composer and title): " + object.get('q7') +
              "\n\nLength of dance: " + object.get('q8') +
              "\n\nDo the dancers need to have any particular characteristics or skills? (Gender, skill level, or particular movment experience) " + object.get('q9') +
              "\n\nHow many dancers would you like to work with? " + object.get('min') + " - " + object.get('max') + ", " + flexible + 
              "\n\nRehearsal times in order of preference: " + formattedTimes; 
            }

             console.log(temp);
          },
          error: function(error) {
            //alert("Error: " + error.code + " " + error.message);
            sweetAlert("Oops...", "Something went wrong!", "error");
          }
        }).then(function(object) {
          // $scope.Names = names;
          // $scope.$apply(); 
          console.log("get info function called");
        $scope.elements = temp;

        if (inShow == "true"){
          console.log("purple");
          $scope.color = "purple";
        }
        
        $scope.$apply();
      }); 
    };
});

app.controller('HomeCtrl', function($scope, $compile) {
  console.log('inside home controller');

});

app.controller('ChoreoCtrl', function($scope, $compile) {

  refreshGraphs = function() {
    Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
    var ChoreoForm = Parse.Object.extend("ChoreoForm");
    var query = new Parse.Query(ChoreoForm);
    var styles = [];
    var count = 0; 
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          if (object.get('inShow') == "true"){
            count++; 
            styles[i] = object.get('q4'); 
          }
        }

         console.log("STYLES: " + styles);
      },
      error: function(error) {
          sweetAlert("Oops...", "Something went wrong!", "error");      
      }
    }).then(function(object) {
    
      console.log('inside choreo controller');
      var chart1 = {};
        chart1.type = "PieChart";
        chart1.data = [
           ['Style', 'amount'],
           ['jazz', 0]

          ];
        // chart1.data.push(['Services',20000]);
        // console.log(chart1.data.update(['Tap', 4]));
        
        chart1.options = {
            displayExactValues: true,
            width: 500,
            height: 200,
            is3D: false,
            colors: ['#28173C', '#422664', '#7845B5', '#915FCE', '#AA82D9',  '#F3EDFA'],
            chartArea: {left:10,top:10,bottom:10,height:"100%"}
        };

        chart1.formatters = {
          number : [{
            columnNum: 1
            // pattern: "##0.00"
          }]
        };

        console.log(styles.length);
        for (var j = 0; j < styles.length; j++){
          var added = false; 
          for (var i = 0; i < chart1.data.length; i++){
            if (chart1.data[i][0] != null && styles[j] != null){
              var temp1 = chart1.data[i][0].toLowerCase();
              var temp2 = styles[j].toLowerCase();
            
              if (temp1 === temp2){
                chart1.data[i][1] += 1; 
                console.log("found");
                added = true;
              }
            }
          }
          if(!added && styles[j] != null){
            chart1.data.push([styles[j], 1]);
          }
        }
        console.log(chart1.data);
         console.log(chart1.data);
        $scope.chartA = chart1;

        $scope.aa=1*$scope.chartA.data[1][1];
        $scope.bb=1*$scope.chartA.data[2][1];
        $scope.cc=1*$scope.chartA.data[3][1];

        $scope.Choreos = count; 
        $scope.$apply(); 


    });
  }

  refreshGraphs(); 
});

app.controller('DancersCtrl', function($scope, $compile) {
  refreshDancerGraphs = function() {
    Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
    var DancerForm = Parse.Object.extend("DancerForm");
    var query = new Parse.Query(DancerForm);
    var colleges = [];
    var exper = [];
    var count = 0; 
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          colleges[i] = object.get('college'); 
          exper[i] = object.get('experience');
          count++; 
        }
      },
      error: function(error) {
        //alert("Error: " + error.code + " " + error.message);
        sweetAlert("Oops...", "Something went wrong!", "error");
      }
    }).then(function(object) {
    
      console.log('inside choreo controller');
      var chart1 = {};
        chart1.type = "PieChart";
        chart1.data = [
           ['Style', 'amount'],
           ['jazz', 0]

          ];
        // chart1.data.push(['Services',20000]);
        // console.log(chart1.data.update(['Tap', 4]));
        
        chart1.options = {
            displayExactValues: true,
            width: 500,
            height: 170,
            is3D: false,
            colors: ['#28173C', '#AA82D9', '#422664', '#7845B5', '#915FCE', '#C2A6E4', '#F3EDFA'],
            chartArea: {left:10,top:10,bottom:10,height:"100%"}
        };

        chart1.formatters = {
          number : [{
            columnNum: 1
            // pattern: "##0.00"
          }]
        };

        console.log(colleges.length);
        for (var j = 0; j < colleges.length; j++){
          var added = false; 
          for (var i = 0; i < chart1.data.length; i++){
            if (chart1.data[i][0] != null && colleges[j] != null){
              var temp1 = chart1.data[i][0].toLowerCase();
              var temp2 = colleges[j].toLowerCase();
            
              if (temp1 === temp2){
                chart1.data[i][1] += 1; 
                console.log("found");
                added = true;
              }
            }
          }
          if(!added && colleges[j] != null){
            chart1.data.push([colleges[j], 1]);
          }
        }
        $scope.chartCollege = chart1;


        var chart2 = {};
        chart2.type = "PieChart";
        chart2.data = [
           ['Style', 'amount'],
           ['jazz', 0]

          ];
        // chart1.data.push(['Services',20000]);
        // console.log(chart1.data.update(['Tap', 4]));
        
        chart2.options = {
            displayExactValues: true,
            width: 500,
            height: 170,
            is3D: false,
            colors: ['#0D0814', '#422664', '#7845B5', '#915FCE', '#C2A6E4', '#DACAEF', '#F3EDFA'],
            chartArea: {left:10,top:10,bottom:10,height:"100%"}
        };

        chart2.formatters = {
          number : [{
            columnNum: 1
          }]
        };

        for (var j = 0; j < exper.length; j++){
          var added = false; 
          for (var i = 0; i < chart2.data.length; i++){
            if (chart2.data[i][0] != null && exper[j] != null){
              var temp1 = chart2.data[i][0].toLowerCase();
              var temp2 = exper[j].toLowerCase();
            
              if (temp1 === temp2){
                chart2.data[i][1] += 1; 
                added = true;
              }
            }
          }
          if(!added && exper[j] != null){
            chart2.data.push([exper[j], 1]);
          }
        }
        $scope.chartExper = chart2;


        console.log("COUNT: "  + count);
        $scope.dancers = count; 
        $scope.$apply(); 


    });
  }

  refreshDancerGraphs(); 

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


app.controller('d', function($scope, $compile, $timeout) {

  console.log("insideDacnerCTRL");
  var SelectedName; 
  Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
  var DancerForm = Parse.Object.extend("DancerForm");

  var ChoreoForm = Parse.Object.extend("ChoreoForm");
  var query = new Parse.Query(DancerForm);

  refreshDancerEmails = function(){
  
    var dancerNames = [];
    var dancerEmails = "";
    var dancers = 0; 
    
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          dancers++; 
          var object = results[i];
          dancerNames[i] = object; 
          dancerEmails += object.get('DancerName') + " <" + object.get('DancerEmail') + ">; ";        
        }

         console.log(dancerNames);
      },
      error: function(error) {
        sweetAlert("Oops...", "Something went wrong!", "error");
      }
    }).then(function(object) {
            $scope.dancerNames = dancerNames;
            $scope.dancerEmails = dancerEmails;
            //$scope.dancers = dancers; 
            refreshDancerGraphs(); 
            $scope.$apply(); 
        });

 }
 refreshDancerEmails();


      
    $scope.addToShow = function () {

      if ($scope.button == "Add Choreographer to Show"){
        console.log(SelectedName.get('objectId'));
        SelectedName.save('inShow', "true");

        var ChoreoForm = Parse.Object.extend("ChoreoForm");
          var query = new Parse.Query(ChoreoForm);
          var names = [];
          
          query.find({
            success: function(results) {
              for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                // names[i] = object.get('Name');
                names[i] = object; 
              }
            },
            error: function(error) {
              sweetAlert("Oops...", "Something went wrong!", "error");
            }
          }).then(function(object) {
                  $scope.Names = names;
                  refreshGraphs(); 
                  refreshEmails(); 
                  $scope.button = "Remove Choreographer from Show";
                  $scope.$apply(); 
              });
        }
        else if ($scope.button == "Remove Choreographer from Show"){
          SelectedName.save('inShow', "false");
          var ChoreoForm = Parse.Object.extend("ChoreoForm");
            var query = new Parse.Query(ChoreoForm);
            var names = [];
            
            query.find({
              success: function(results) {
                for (var i = 0; i < results.length; i++) { 
                  var object = results[i];
                  // names[i] = object.get('Name');
                  names[i] = object; 
                }
              },
              error: function(error) {
                sweetAlert("Oops...", "Something went wrong!", "error");
              }
            }).then(function(object) {
                    $scope.Names = names;
                    refreshGraphs(); 
                    refreshEmails();
                    $scope.button = "Add Choreographer to Show";
                    $scope.$apply(); 
                });
        }

    };
    

    $scope.deleteDancer = function(name) {

      swal({   title: "Are you sure you want to delete " + name + "?",   
        text: "You will not be able to recover this dancer after deleting",   
        type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Yes, delete dancer!",   closeOnConfirm: false }, 
        function(){   swal("Deleted!", name + " has been permanently deleted.", "success"); 
          var query = new Parse.Query(DancerForm);
          query.equalTo("DancerName", name);
          query.find({
            success: function(results) {
              for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                object.destroy({
                  success: function(myObject) {
                     refreshDancerEmails(); 
                  },
                  error: function(myObject, error) {
                    // error is a Parse.Error with an error code and message.
                  }
                });
              }
            },
            error: function(error) {
              sweetAlert("Oops...", "Something went wrong!", "error");
            }
          })
        });
    }
     
    $scope.getDancerInfo = function(name) {
      $scope.dancerElements = "";
      var temp = "";      

      var queryChoreo = new Parse.Query(ChoreoForm);
      var allChoreos = [];
      queryChoreo.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            var object = results[i];
            console.log(object.get('Name'));
            allChoreos.push(object);
          }
        },
        error: function(error) {
          sweetAlert("Oops...", "Something went wrong!", "error");
        }
      })

      console.log("all choreos " + allChoreos);
              

      var query = new Parse.Query(DancerForm);
      query.equalTo("DancerName", name);
      query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              SelectedName = object; 
              var formattedTimes = "\n";

              var choreoIDArray = object.get('times').split(",");
              for (var i = 0; i < choreoIDArray.length; i++){
                for (var j = 0; j < allChoreos.length; j++){
                  if (choreoIDArray[i] == allChoreos[j].get('Cid')){
                    formattedTimes += allChoreos[j].get('Name') + " " + allChoreos[j].get('q4') + " " + allChoreos[j].get('assignedTime') + "\n";
                  }
                }
              }

              temp += "Name: " + object.get('DancerName') +
              "\n\nPhone Number: " + object.get('DancerPhoneNumber') +
              "\n\nEmail: " + object.get('DancerEmail') +
              "\n\nCollege: " + object.get('college') +
              "\n\nGrade Level: " + object.get('grade') +
              "\n\nNumber of years of dance experience: " + object.get('experience') +
              "\n\nStyle Experience:" + 
              "\nPointe Ballet: " + object.get('pointe') +
              "\nHip Hop: " + object.get('hipHop') +
              "\nTap: " + object.get('tap') +
              "\nContemporary: " + object.get('contemporary') +
              "\nBallet: " + object.get('ballet') +
              "\nAfrican: " + object.get('african') +
              "\nModern: " + object.get('modern') +
              "\nBollywood: " + object.get('bollywood') +
              "\nBreakdance: " + object.get('breakdance') +

              
              "\n\nDances in order of preference: " + formattedTimes; 
            }

             console.log(temp);
          },
          error: function(error) {
            sweetAlert("Oops...", "Something went wrong!", "error");
          }
        }).then(function(object) {
          // $scope.Names = names;
          // $scope.$apply(); 
        $scope.dancerElements = temp;

        // if (inShow == "true"){
        //   console.log("purple");
        //   $scope.color = "purple";
        // }
        
        $scope.$apply();
      }); 
    };

}); 









app.controller('scheduleCtrl', function($scope, $compile, $timeout) {
  var SelectedName = null; 
  $scope.dances = [];

$scope.allDancers = []; 
 var s2 = Sortable.create(foo, {
            group: {
              name: 'foo',
              put: ['qux']
            },
            animation: 100,
            sort: false, 
            // Element is dropped into the list from another list
            onAdd: function (/**Event*/evt) {
            var ChoreoForm = Parse.Object.extend("ChoreoForm");

                //add's dancer number to choreolist              
                if ($scope.allDancers != undefined){
                  if ($scope.allDancers[evt.oldIndex -1] != undefined){
                    console.log($scope.allDancers[evt.oldIndex -1].get('DancerName'));

                    if (SelectedName != null){
                      var id = $scope.allDancers[evt.oldIndex -1].get('dancerId');
                      SelectedName.addUnique('assignedDancers', id);
                      SelectedName.save(); 
                      var cid = parseInt(SelectedName.get('Cid'));
                      console.log('cid ' + cid);

                      //console.log($scope.allDancers[evt.oldIndex -1].addUnique('assignedDances', SelectedName.get('Cid'));
                      var DancerForm = Parse.Object.extend("DancerForm");

                      $scope.allDancers[evt.oldIndex -1].addUnique('assignedDances', cid);
                      $scope.allDancers[evt.oldIndex -1].save();
                    }
                  }
                }

                //$scope.$apply();

            },
            // onRemove: function (/**Event*/evt) {
            //    console.log($scope.dances[evt.newIndex -1].get('DancerName') + " has been removed");
              
                
            // },

            
          });

          var s1 = Sortable.create(qux, {
            group: {
              name: 'qux',
              // pull: 'clone',
              put: ['foo', 'bar']
            },
            animation: 100, 
            // Element is dropped into the list from another list
           // Element is removed from the list into another list
            onAdd: function (/**Event*/evt) {
              // $scope.dancerBadge = 99;
              // $scope.$apply();
              var ChoreoForm = Parse.Object.extend("ChoreoForm");

                //add's dancer number to choreolist              
                if ($scope.dances != undefined){
                  if ($scope.dances[evt.oldIndex-1] != undefined){
                    console.log($scope.dances[evt.oldIndex-1].get('DancerName'));

                    if (SelectedName != null){
                      var id = $scope.dances[evt.oldIndex -1].get('dancerId');
                      SelectedName.remove('assignedDancers', id);
                      SelectedName.save(); 

                      // $scope.allDancers[evt.oldIndex -1].addUnique('assignedDances', Parse.Object.SelectedName.get('Cid'));
                      // $scope.allDancers[evt.oldIndex -1].save();
                    }
              
                    }
                }


                // $scope.allDancers[evt.newIndex].get('assignedDances').length = 45;
                // //$scope.dances[evt.oldIndex-1].get('assignedDances').length;
                $scope.$apply();
              
            },
            sort: false
          });
    
  



$scope.badge = function(index){
  $scope.allDancers[index].x = 4;
}







   Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
  var ChoreoForm = Parse.Object.extend("ChoreoForm");
  var query = new Parse.Query(ChoreoForm);

  refreshEmails = function(){
  
  var names = [];
  var emails = "";
  var emailsInShow = ""; 
  
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        // names[i] = object.get('Name');
        //names[i] = object; 
        emails += object.get('Name') + " <" + object.get('Email') + ">; ";
        if (object.get('inShow') == "true"){
          emailsInShow += object.get('Name') + " <" + object.get('Email') + ">; ";
          names.push(object);
        }
      }

       console.log(names);
    },
    error: function(error) {
      //alert("Error: " + error.code + " " + error.message);
      sweetAlert("Oops...", "Something went wrong!", "error");
    }
  }).then(function(object) {
          $scope.Names = names;
          $scope.emails = emails;
          $scope.emailsInShow = emailsInShow;
          $scope.$apply(); 
      });

 }
 refreshEmails();
      
     $scope.getChoreoInfo = function() {
        $scope.getChoreoInfo(SelectedName);
      }

    
     
    $scope.getChoreoInfo = function(name) {
      SelectedName = name; 
      $scope.elements = "";
      var temp = "";
      var inShow = "false";
      
      console.log("in get info");

      var query = new Parse.Query(ChoreoForm);
      query.equalTo("Name", name);
      query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              SelectedName = object; 
              var times = object.get('times').match(/([A-Z])\w+ [0-9]+[a-z]+ [-] [0-9]+[a-z]+/g);
              var formattedTimes = "\n";

              for (var j = 0; j < times.length; j++){
                formattedTimes += times[j] + "\n";
              } 

              var flexible = "not flexible";
              if (object.get('flexible') == "on"){
                flexible = "flexible";
              }

              console.log(object.get('inShow'));
              if (object.get('inShow') == "true"){
                console.log("inshow 1");
                inShow = "true";
                $scope.button = "Remove Choreographer from Show";
              }
              else {
                $scope.button = "Add Choreographer to Show";
              }

              temp += "Name: " + object.get('Name') +
              "\nStyle: " + object.get('q4') +
              "\nDancer requirements: " + object.get('q9') +
              "\nNumber of Dancers: " + object.get('min') + " - " + object.get('max') + ", " + flexible;
            }

             console.log(temp);
          },
          error: function(error) {
            //alert("Error: " + error.code + " " + error.message);
            sweetAlert("Oops...", "Something went wrong!", "error");
          }
        }).then(function(object) {
          // $scope.Names = names;
          // $scope.$apply(); 
          console.log("get info function called");
        $scope.elements = temp;

        if (inShow == "true"){
          console.log("purple");
          $scope.color = "purple";
        }
        getDancerList(name);
        
        $scope.$apply();
      }); 
    };

    var selectedChoreo = '';
    var assignedDancers = [];
     getDancerList = function(name){
        Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
        var ChoreoForm = Parse.Object.extend("ChoreoForm");
        var query = new Parse.Query(ChoreoForm);

        
        var dances = [];
       
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              if (object.get('Name') == name){
                selectedChoreo = object; 
                assignedDancers = object.get('assignedDancers');
              }
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        }).then(function(object) {
                $scope.dances = [];

                //here go through dancers and put dancer objs in dances
                $scope.$apply(); 
       



        var DancerForm = Parse.Object.extend("DancerForm");
        var queryDancer = new Parse.Query(DancerForm);
        var allDancers = [];
        dances = []; 
        queryDancer.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
                
                if (assignedDancers != null && assignedDancers != undefined){ 
                  if (assignedDancers.length > 0){
                    if (assignedDancers.indexOf(object.get('dancerId')) > -1
                      && object.get('assignedDances').indexOf(object.get('dancerId')) == -1){
                        dances.push(object);
                    }
                    else {
                      allDancers.push(object);
                    }
                  }
                }
                
                else {
                  allDancers.push(object);
                }
            }

          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        }).then(function(object) {
                $scope.choreoBadge = dances.length;
                $scope.dances = dances; 
                $scope.allDancers = allDancers;
                $scope.$apply(); 
        });

      });
    }

     addToDoc = function(name, interestedDancers, doc, last){

        doc.setLineWidth(0.2);
        doc.text(35, 55, "Choreographer: " + name);
        doc.setFontType("bold");
        doc.text(35, 85, "Cast \n"); 
        doc.setFontType("normal");
        doc.text(35, 105, interestedDancers);

         
       //  var columns = [
       //  {key: "one"}, 
       //  {key: "two"}, 
       //  {key: "three"}];
       //  var data = [];

       //  for (var i = 0; i < 32; i++){
       //     data.push({"one" : interestedDancers, "id": "", "sig": ""});  
       //  }
       
       //  var header = function (doc, pageCount, options) {
       //      doc.setFontSize(20);
       //      doc.text(name, options.margins.horizontal, 50);
       //      doc.setFontSize(14);
       //      doc.text("Interested Dancers: " + interestedDancers, options.margins.horizontal, 70);
       //      doc.setFontSize(options.fontSize);
       //  };

       //  var options = {
       //    padding: 3, // Horizontal cell padding
       //    fontSize: 10,
       //    lineHeight: 20,
       //    renderHeader: header, // Called before every page
       //    renderFooter: function (doc, lastCellPos, pageNumber, settings) {}, // Called at the end of every page
       //    renderHeaderCell: function (x, y, width, height, key, value, settings) {
       //        doc.setFillColor(238, 238, 238); // Asphalt
       //        doc.setTextColor(133, 77, 201);
       //        doc.setFontStyle('bold');
       //        doc.rect(x, y, width, height, 'B');
       //        y += settings.lineHeight / 2 + doc.internal.getLineHeight() / 2 - 2.5;
       //        doc.text('' + value, x + settings.padding, y);
       //    },
       //    renderCell: function (x, y, width, height, key, value, row, settings) {
       //        doc.setFillColor(row % 2 === 0 ? 245 : 255);
       //        doc.rect(x, y, width, height, 'S');
       //        y += settings.lineHeight / 2 + doc.internal.getLineHeight() / 2 - 2.5;
       //        doc.text('' + value, x + settings.padding, y);
       //    },
       //    margins: {horizontal: 40, top: 100, bottom: 50}
       // };

        
       //  //var options = {renderHeader: header, margins: {horizontal: 40, top: 100, bottom: 50}};
       //  doc.autoTable(columns, data, options);
        if (!last){
          doc.addPage();
        }
        return doc; 
   }


    $scope.isMatch = function(dancerID, dancersChoreoList){
      Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
      var ChoreoForm = Parse.Object.extend("ChoreoForm");
      if ((SelectedName.get('dancers').indexOf(dancerID) > -1) && (dancersChoreoList.indexOf(SelectedName.get('Cid')) > -1)){
        return 4; 
      }
      else if (dancersChoreoList.indexOf(SelectedName.get('Cid')) > -1){
        return 3; 
      }
      else if (SelectedName.get('dancers').indexOf(dancerID) > -1){
        return 2;
      }
      return 0; 
    }

    $scope.finalCastList = function(){
      var doc = new jsPDF('p', 'pt');
      var DancerForm = Parse.Object.extend("DancerForm");
      var ChoreoForm = Parse.Object.extend("ChoreoForm");

      var queryDancer = new Parse.Query(DancerForm);
      var queryChoreo = new Parse.Query(ChoreoForm);
      var dancers = []; 
      var choreos = []; 
        
      queryChoreo.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            var object = results[i];
            choreos.push(object);      
          }
        },
        error: function(error) {
          sweetAlert("Oops...", "Something went wrong!", "error");
        }
      }).then (function(object) {
            queryDancer.find({
              success: function(results) {
                for (var i = 0; i < results.length; i++) { 
                  var object = results[i];
                  dancers.push(object);      
                }
              },
              error: function(error) {
                sweetAlert("Oops...", "Something went wrong!", "error");
              }
            }).then (function(object) {
            console.log("testing");
            var last = false; 
              for (var i = 0; i < choreos.length; i++){
                
                var assignedDancers = "";
                if (choreos[i].get('inShow') === "true"){
                  var assignedDancersIds = choreos[i].get('assignedDancers');
                  if (assignedDancersIds == undefined){
                      sweetAlert("Oops...", "Please make sure every choreographer has at least 1 dancer!", "error");
                  }

                  for (var j = 0; j < dancers.length; j++){
                    for (var n = 0; n < assignedDancersIds.length; n++){
                      if (assignedDancersIds[n] == dancers[j].get('dancerId')){
                        assignedDancers += dancers[j].get('DancerName') + "\n";
                      }
                    }
                  }
                

                  
                    
                  if (i == choreos.length -1){
                    last = true; 
                  }

                   console.log(assignedDancers);
                  
                 // console.log(interestedDancers);


                  addToDoc(choreos[i].get('Name'), assignedDancers, doc, last);
                }
                
              }
          }).then(function() {
            doc.save('FinalCast.pdf');
          });
        });
    }


});

app.controller('timesCtrl', function($scope, $compile, $timeout) {

  $scope.assignTimes = function() {
    swal({   title: "Generating Schedules",
     showConfirmButton: false,  imageUrl: "timer.gif" });

    Parse.initialize("J7zNcQVm5ur1pZJOrsBpTQWdSAeBuO9CB1GxOvcV", "C1qL36XfAR6ojrunRQff48JQEqihlef6DhWNTw9d");  
    var ChoreoForm = Parse.Object.extend("ChoreoForm");
    var queryChoreo = new Parse.Query(ChoreoForm);

    var allTimes = [];
    allTimes[0] = ["Sunday 8am - 10am", 0];
    allTimes[1] = ["Sunday 10am - 12pm", 0];
    allTimes[2] = ["Sunday 12pm - 2pm", 0];
    allTimes[3] = ["Sunday 2pm - 4pm", 0];
    allTimes[4] = ["Sunday 4pm - 6pm", 0];
    allTimes[5] = ["Sunday 6pm - 8pm", 0];
    allTimes[6] = ["Sunday 8pm - 10pm", 0];
    allTimes[7] = ["Monday 6pm - 8pm", 0];
    allTimes[8] = ["Monday 8pm - 10pm", 0];
    allTimes[9] = ["Tuesday 6pm - 8pm", 0];
    allTimes[10] = ["Tuesday 8pm - 10pm", 0];
    allTimes[11] = ["Wednesday 6pm - 8pm", 0];
    allTimes[12] = ["Wednesday 8pm - 10pm", 0];
    allTimes[13] = ["Thursday 6pm - 8pm", 0];
    allTimes[14] = ["Thursday 8pm - 10pm", 0];
    allTimes[15] = ["Friday 8am - 10am", 0];
    allTimes[16] = ["Friday 10am - 12pm", 0];
    allTimes[17] = ["Saturday 8am - 10am", 0];
    allTimes[18] = ["Saturday 10am - 12pm", 0];
    allTimes[19] = ["Saturday 12pm - 2pm", 0];
    allTimes[20] = ["Saturday 2pm - 4pm", 0];
    allTimes[21] = ["Saturday 4pm - 6pm", 0];
    allTimes[22] = ["Saturday 6pm - 8pm", 0];
    allTimes[23] = ["Saturday 8pm - 10pm", 0];

    $scope.allTimes = allTimes;
   // $scope.$apply();

    var allChoreos = [];
    queryChoreo.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          console.log(object.get('Name'));
          if (object.get('inShow') === "true"){
            object.unset('AssignedTime');
            allChoreos.push(object);
          }
        }
      },
      error: function(error) {
        sweetAlert("Oops...", "Something went wrong!", "error");
      }
    }).then (function(object) {
      $scope.allChoreos = allChoreos;
      $scope.$apply(); 
      for(var accuracy = 1; accuracy < 10; accuracy++){

        for (var i = 0; i < allTimes.length; i++){
          for (var j = 0; j < allChoreos.length; j++){
            var choreoTimes = convertToArray(allChoreos[j].get('times'));
            for (var k = 0; k < choreoTimes.length; k++){
              if (k < accuracy){
                
                if (allTimes[i][1] != 1){
                  if (allChoreos[j].get('AssignedTime') === undefined){
                    if(allTimes[i][0] === choreoTimes[k]){

                      console.log("MATCH " + allChoreos[j].get('Name'));
                      allTimes[i][1] = 1; 
                      allChoreos[j].save('AssignedTime', allTimes[i][0]);
                    }
                  }
                }
              }
            }
          }

        }

      }
      $scope.$apply(); 
      swal.close();

    });
  }

  convertToArray = function(times){
     var times = times.match(/([A-Z])\w+ [0-9]+[a-z]+ [-] [0-9]+[a-z]+/g);
     return times; 
  };

  var choreo; 
  $scope.setChoreo = function(ac){
    choreo = ac; 
  }

  $scope.changeTime = function(ac){
    console.log($('#selectTime').val());
    choreo.save('AssignedTime', $('#selectTime').val());
  }

});








