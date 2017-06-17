(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(currentUser, $routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = currentUser._id;

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        // implementation
        function createWebsite(website) {

            website.developerId = model.userId;
            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/user/website/');
                });
        }
    }
})();