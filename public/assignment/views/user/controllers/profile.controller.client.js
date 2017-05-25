(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    function profileController($location, $routeParams, userService, websiteService) {
        var model = this;


        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        model.toWeb = function () {
            var found = websiteService.findAllWebsitesForUser(userId);

            if (found !== null) {
                $location.url('/user/' + found._id + '/website');
            }
            else {
                model.message = "Username " + username + " not found, please try again";
            }

        }

    }
})();
