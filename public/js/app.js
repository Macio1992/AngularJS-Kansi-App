angular.module('kansiapp', ['ui.router', 'angularUtils.directives.dirPagination'])

.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/posts');

    $stateProvider

        .state('/posts', {
            url: '/posts',
            templateUrl: 'public/views/posts.html',
            controller: 'PostsController'
        })

        .state('/post', {
            url: '/posts/{postId}',
            templateUrl: 'public/views/post.html',
            controller: 'PostController'
        })

        .state('/newPost', {
            url: '/newPost',
            templateUrl: 'public/views/newPost.html',
            controller: 'NewPostController'
        })
})

.controller('PostsController', function($scope, $http){

    $http.get('http://jsonplaceholder.typicode.com/posts').then(function(response){
        $scope.posts = response.data;
    });

})

.controller('PostController', function($scope, $http, $stateParams){
    $http.get('http://jsonplaceholder.typicode.com/posts/' + $stateParams.postId).then(function(response){
        $scope.chosenPost = response.data;

        $http.get('http://jsonplaceholder.typicode.com/users/' + response.data.userId).then(function(response){
            $scope.user = response.data;
        });

    });

    $http.get('http://jsonplaceholder.typicode.com/posts/' + $stateParams.postId + '/comments').then(function(response){
        $scope.comments = response.data;
    });
})

.controller('NewPostController', function($scope, $http){
    $scope.message = 'Add new task';
    $scope.newPost = {};
    $scope.showMessage = false;

    $scope.createNewPost = function(){
        $scope.showMessage = true;
        $http.post('http://jsonplaceholder.typicode.com/posts', $scope.newPost).then(function(response){
            console.log(response.data);
        });
        $scope.newPost = {};
    };
});