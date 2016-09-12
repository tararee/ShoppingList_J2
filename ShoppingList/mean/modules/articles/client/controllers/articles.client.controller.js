
'use strict';

// Articles controller
angular
  .module('articles')
  .controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  
  function ($scope, $stateParams, $location, Authentication, Articles) {
  
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var article = new Articles({
        title: this.title,
        content: this.content,
        listColor: this.listColor
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
  
  //Danyel's Stuff
  $scope.todo_lists = [];
  $scope.new_item = ""; $scope.form_error = "";
  
  $scope.addItem = function () {
    if($scope.new_item.length === 0){
      $scope.form_error = true;
    }
    else{
      $scope.form_error = false;
      $scope.todo_lists.unshift($scope.new_item);
      $scope.new_item = '';
    }
    };

    $scope.deleteItem = function(i){
      if(confirm("Are  you sure?")){
        $scope.todo_lists.splice(i, 1);
      }
     };
    //  $scope.filter('capitalize', function() {
    // return function(input) {
    //   return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  //  };
 // });
  }
]);

