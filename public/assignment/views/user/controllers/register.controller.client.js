(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);
    function registerController($location, $routeParams, userService) {
        var model = this;

        model.register = register;


        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = userService.findUserByUsername(username);

            if (found !== null) {
                model.error = "Username is not available";
            }
            else {

                var user = {
                    username: username,
                    password: password
                };

                userService.createUser(user);
                $location.url('/user/' + user._id);
            }

        }

    }
})();

