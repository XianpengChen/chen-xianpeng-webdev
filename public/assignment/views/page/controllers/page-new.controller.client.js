(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    function pageNewController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        //eventHandler
        model.createPage = createPage;

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                })
        }
        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                })

        }
    }
})();



