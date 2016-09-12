(function () {
  'use strict';

  angular
    .module('lists')
    .controller('ListsListController', ListsListController);


  ListsListController.$inject = ['$scope', '$state', '$window', 'ListsService'];

  function ListsListController($scope, $state, $window, ListsService) {

    var vm = this;

    vm.elim = elim;
    vm.lists = ListsService.query();
  
    //Remove entire list
      function elim(list) {
        var removedList = $scope.vm.lists.indexOf(list);
      	$scope.vm.lists.splice(removedList, 1);
        list.$remove($state.go('lists.list'));


      }
  }
    
}());
