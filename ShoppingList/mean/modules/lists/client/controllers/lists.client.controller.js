(function () {
  'use strict';

  // Lists controller
  angular
    .module('lists')
    .controller('ListsController', ListsController, '$scope', function($scope){
      $scope.lists=[
      {name:String,priority:Number}
      ];
      $scope.items=[
      {name:String}, {color: String}
      ];
    });

  ListsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'listResolve'];

  function ListsController ($scope, $state, $window, Authentication, list) {
    var vm = this;

    vm.authentication = Authentication;
    vm.list = list;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.saveItem = saveItem;
   
    //Add Item
    function saveItem(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.listForm');
        return false;
      }
      var newItem = vm.item;
      //Push into item array
      vm.list.items.push(newItem);

      // TODO: move create/update logic to service
      if (vm.list._id) {
        vm.list.$update(successCallback, errorCallback);
      } else {
        vm.list.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('lists.view', {
          listId: res._id
        },
        $scope.vm.item.name = "",
        $scope.vm.item.priority = ""
        );
      }

      function errorCallback(res) {
        vm.error = res.data.message;}


      //$scope.vm.form.listForm = "";
      //$scope.vm.form.listForm.$setUntouched();
      //$scope.vm.form.listForm.$setPristine();
    }

    // Remove list item
    function remove(item){
      var removedItem = $scope.vm.list.items.indexOf(item);
      $scope.vm.list.items.splice(removedItem, 1);
      
      if (vm.list._id) {
        vm.list.$update(successCallback, errorCallback);
      } else {
        vm.list.$save(successCallback, errorCallback);
      }

            function successCallback(res) {
        $state.go('lists.view', {
          listId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;}
    }


    // Save List
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.listForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.list._id) {
        vm.list.$update(successCallback, errorCallback);
      } else {
        vm.list.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('lists.list', {
          listId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());