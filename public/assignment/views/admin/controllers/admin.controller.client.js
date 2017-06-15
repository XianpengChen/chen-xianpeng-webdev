(function () {
    angular
        .module('WAM')
        .controller('adminController', adminController);
    function adminController(userService) {
        var model= this;
        model.deleteUser = deleteUser;
        function init() {
            findAllUsers();

        }
        init();

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers)
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })

        }


    }
})();
