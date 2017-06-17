(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController(currentUser, $routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;

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
        function updateWebsite(website) {

            websiteService.updateWebsite( model.websiteId, website)
                .then(function () {
                    $location.url('/user/website/');

                })
        }
        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/website/');

                })


        }
    }
})();
