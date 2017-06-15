(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    function profileController(currentUser, $location, $routeParams, userService) {
        var model = this;
        model.user = currentUser;
        model.userId = currentUser._id;//$routeParams['userId'];
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;

        // model.user = userService.findUserById(userId);
        // userService
        //     .findUserById(userId)
        //     .then(renderUser);

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "user updated successfully";

                });


        }
        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/login');
                }, function (err) {
                    console.log(err);
                })

        }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

    }
})();
