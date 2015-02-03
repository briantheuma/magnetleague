'use strict';

/**
 * @ngdoc function
 * @name leagueApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leagueApp
 */
leagueApp.controller('MainCtrl', function($scope, $firebase,$filter, ngTableParams) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = new Firebase("https://magnetleague.firebaseio.com/");
    $scope.Teams = $firebase(ref).$asArray();


    //ADD PLAYER
    $scope.addTeam = function() {
      var Player = $scope.Player;
      var Club = $scope.Club;
      $scope.Teams.$add({Player: Player, Club: Club});
      $scope.Player = "";
      $scope.Club = "";
    };

    //REMOVE PLAYER
    $scope.removeTeam = function(id) {
      var itemRef = new Firebase(ref + '/' + id);
      itemRef.remove();
    };


    var sync = $firebase(ref);
    var data = sync.$asArray(); // load data as array
    data.$loaded().then(function() { // we need to load data first
    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10,
      sorting: { name: 'asc' }
    },
      {
        total: data.length,
        getData: function($defer, params) {
          var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    });


    //data.$loaded().then(function() { // we need to load data first
    //
    //  $scope.tableParams = new ngTableParams({
    //    page: 1,            // show first page
    //    count: 10,          // count per page
    //    sorting: {
    //      name: 'asc'     // initial sorting
    //    }
    //  }, {
    //    total: data.length,
    //    getData: function ($defer, params) {
    //      var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
    //      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    //    }
    //  });
    //});
});
