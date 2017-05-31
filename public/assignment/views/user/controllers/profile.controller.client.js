(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams['userId'];

        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        // model.user = userService.findUserById(userId);
        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;


        }
        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "user updated successfully";

                });


        }
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                })

        }

    }
})();
