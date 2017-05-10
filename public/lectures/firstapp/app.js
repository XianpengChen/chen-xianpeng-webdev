/**
 * Created by 28609 on 5/10/2017.
 */

(function () {//IIFE
    angular
        .module("ToDoApp", [])
        .controller("ToDoListController", ToDoListController);
    function ToDoListController($scope) {
        $scope.todo = {title: "initial title"};
        $scope.addTodo = addTodo;
        $scope.todos = [];


        function addTodo(todo) {
            var newTodo = {
                title: todo.title
            };
            console.log(newTodo);
            $scope.todos.push(newTodo);
        }
    }
})();


