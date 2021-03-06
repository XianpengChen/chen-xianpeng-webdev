(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    function loginController($location, userService) {
        var model = this;


        model.login = function (username, password) {

            // var found = userService.findUserByCredentials(username, password);

            userService
                .login(username, password)
                .then(login, handleError);



            function login(found) {
                if (found !== null) {
                    $location.url('/');
                }
                else {
                    model.message = "Username " + username + " not found, please try again";
                }

            }
            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";


            }





        };

    }
})();
