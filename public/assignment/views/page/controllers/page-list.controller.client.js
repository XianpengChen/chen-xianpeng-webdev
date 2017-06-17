(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);
    function pageListController(currentUser, $routeParams, pageService, $location) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;


        //eventHandler
        model.createPage = createPage;


        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();
        function createPage(page) {
            pageService.createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/user/website/'+model.websiteId+'/page');
                })
        }
    }
})();



