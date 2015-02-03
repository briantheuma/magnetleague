'use strict';

/**
 * @ngdoc function
 * @name leagueApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leagueApp
 */
leagueApp.controller('MainCtrl', ['$scope', '$firebase',
  function($scope, $firebase) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = new Firebase("https://magnetleague.firebaseio.com/");
    $scope.Teams = $firebase(ref).$asArray();

    //ADD MESSAGE METHOD
    $scope.addTeam = function() {
      var Player = $scope.Player;
      var Club = $scope.Club;
      $scope.Teams.$add({Player: Player, Club: Club});
    };

    $scope.removeTeam = function(id) {
      var itemRef = new Firebase(ref + '/' + id);
      itemRef.remove();
    };

  }
]);
